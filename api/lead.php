<?php
/**
 * cPanel port of api/lead.ts.
 *
 * Same URL, same request and response shapes, so the front end needs no change:
 * POST /api/lead  ->  200 {"ok":true} | 4xx/5xx {"error":"..."}
 *
 * Vercel's serverless function cannot run on Apache/PHP shared hosting, so this
 * is the equivalent. Keep the two in step if either changes.
 *
 * Requires PHP 7.4+ with the curl extension (standard on cPanel).
 * The Resend key comes from config.php next to this file — see config.sample.php.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function send(int $status, array $payload): void {
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    send(405, ['error' => 'Method not allowed']);
}

// --- configuration ----------------------------------------------------------
$config = [];
if (is_file(__DIR__ . '/config.php')) {
    $config = require __DIR__ . '/config.php';
}
$apiKey = $config['RESEND_API_KEY'] ?? (getenv('RESEND_API_KEY') ?: '');
$to     = $config['LEAD_TO_EMAIL']  ?? (getenv('LEAD_TO_EMAIL') ?: 'info@amdxb.com');
$from   = $config['LEAD_FROM_EMAIL'] ?? (getenv('LEAD_FROM_EMAIL') ?: 'AM DXB Website <onboarding@resend.dev>');

// --- rate limit -------------------------------------------------------------
// ponytail: a JSON file in the system temp dir. PHP gives each request a fresh
// process, so the in-memory Map the Node version uses has no equivalent here.
// Move to Redis only if the site ever sees distributed abuse.
const WINDOW_SECONDS = 60;
const MAX_PER_WINDOW = 5;

function rate_limited(string $ip): bool {
    $path = sys_get_temp_dir() . '/amdxb-lead-rate.json';
    $handle = @fopen($path, 'c+');
    if ($handle === false) {
        return false; // never block a genuine lead because the temp dir is unwritable
    }
    try {
        if (!flock($handle, LOCK_EX)) {
            return false;
        }
        $size = (int) (fstat($handle)['size'] ?? 0);
        $hits = $size > 0 ? json_decode((string) fread($handle, $size), true) : [];
        if (!is_array($hits)) {
            $hits = [];
        }
        $now = time();
        foreach ($hits as $key => $stamps) {
            $kept = array_values(array_filter((array) $stamps, fn($t) => $now - (int) $t < WINDOW_SECONDS));
            if ($kept === []) {
                unset($hits[$key]);
            } else {
                $hits[$key] = $kept;
            }
        }
        if (count($hits) > 5000) {
            $hits = []; // crude bound on the file size
        }
        $hits[$ip][] = $now;
        $limited = count($hits[$ip]) > MAX_PER_WINDOW;

        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, (string) json_encode($hits));
        fflush($handle);
        return $limited;
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

$forwarded = (string) ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? '');
$ip = trim(explode(',', $forwarded)[0]) ?: (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (rate_limited($ip)) {
    send(429, ['error' => 'Too many requests. Please try again shortly.']);
}

// --- body -------------------------------------------------------------------
$raw = file_get_contents('php://input');
$body = json_decode((string) $raw, true);
if (!is_array($body)) {
    send(400, ['error' => 'Invalid request body.']);
}

/**
 * Stripping control characters is the point: left in, they would corrupt the
 * outgoing email headers and body (a classic header-injection vector).
 * $multiline keeps \n, which the notes textarea produces and the HTML body
 * renders as <br>.
 */
function clean($value, int $max, bool $multiline = false): string {
    if (!is_string($value)) {
        return '';
    }
    if ($multiline) {
        $value = preg_replace('/\r\n?/', "\n", $value);
        $stripped = preg_replace('/[\x00-\x09\x0B-\x1F\x7F]/u', '', (string) $value);
    } else {
        $stripped = preg_replace('/[\x00-\x1F\x7F]/u', '', $value);
    }
    $trimmed = trim((string) $stripped);
    // mbstring is near-universal on cPanel but not guaranteed, and a missing
    // function here would be a fatal error on a live form rather than a 400.
    return function_exists('mb_substr') ? mb_substr($trimmed, 0, $max) : substr($trimmed, 0, $max);
}

function text_length(string $s): int {
    return function_exists('mb_strlen') ? mb_strlen($s) : strlen($s);
}

$esc = fn(string $s): string => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

// Honeypot: silently accept so bots do not learn they were caught.
if (clean($body['company'] ?? null, 100) !== '') {
    send(200, ['ok' => true]);
}

$name    = clean($body['name'] ?? null, 120);
$phone   = clean($body['phone'] ?? null, 32);
$email   = clean($body['email'] ?? null, 160);
$service = clean($body['service'] ?? null, 160) ?: 'General enquiry';
$notes   = clean($body['notes'] ?? null, 2000, true);
$quote   = clean($body['quote'] ?? null, 120);
$source  = clean($body['source'] ?? null, 60) ?: 'website';

// Deliberately permissive: UAE clients write numbers many ways. We only reject
// input that cannot be a phone number at all.
if (text_length($name) < 2) {
    send(400, ['error' => 'Please enter your full name.']);
}
if (!preg_match('/^[+()\d](?=.*\d)[\d\s().-]{6,24}$/', $phone)) {
    send(400, ['error' => 'Please enter a valid phone number.']);
}
if ($email !== '' && !preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email)) {
    send(400, ['error' => 'Please enter a valid email address.']);
}

$rows = [
    ['Name', $name],
    ['Phone / WhatsApp', $phone],
];
if ($email !== '') {
    $rows[] = ['Email', $email];
}
$rows[] = ['Service', $service];
$rows[] = ['Estimate', $quote !== '' ? $quote : '—'];
$rows[] = ['Source', $source];
$rows[] = ['Received', gmdate('c')];

$tableRows = '';
foreach ($rows as [$k, $v]) {
    $tableRows .= '<tr><td style="padding:6px 14px 6px 0;color:#64748b">' . $esc($k) . '</td>'
        . '<td style="padding:6px 0;font-weight:600">' . $esc($v) . '</td></tr>';
}
$html = '<h2 style="font-family:sans-serif">New consultation request — amdxb.com</h2>'
    . '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' . $tableRows . '</table>';
if ($notes !== '') {
    $html .= '<p style="font-family:sans-serif"><b>Notes</b><br>'
        . nl2br($esc($notes)) . '</p>';
}

// --- send -------------------------------------------------------------------
$ref = base_convert((string) time(), 10, 36) . '-' . bin2hex(random_bytes(3));

if ($apiKey === '') {
    // Log a correlation id only — never PII in the error log.
    error_log('LEAD_UNSENT_NO_API_KEY ref=' . $ref . ' source=' . $source);
    send(503, ['error' => 'Email service is not configured.']);
}

$payload = (string) json_encode([
    'from' => $from,
    'to' => [$to],
    'reply_to' => $email !== '' ? $email : $to,
    'subject' => 'New lead: ' . $name . ' — ' . $service,
    'html' => $html,
]);

/**
 * Shared hosting varies in what it enables. curl is the normal path; the stream
 * wrapper covers hosts that ship without it. If neither is available we return a
 * JSON 503, because the alternative — calling a missing function — is a fatal
 * error, and PHP emits that as a blank page with HTTP 200, so the front end
 * reads a broken send as success.
 *
 * @return array{0:int,1:string} status code and response body
 */
function post_json(string $url, string $authorization, string $payload): array {
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 15,
            CURLOPT_HTTPHEADER => [
                'Authorization: ' . $authorization,
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS => $payload,
        ]);
        $body = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        if ($body === false || $error !== '') {
            return [0, $error !== '' ? $error : 'curl failed'];
        }
        return [$status, (string) $body];
    }

    if (!ini_get('allow_url_fopen')) {
        return [-1, 'neither curl nor allow_url_fopen is available'];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Authorization: " . $authorization . "\r\nContent-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 15,
            'ignore_errors' => true, // read the body on a 4xx instead of returning false
        ],
    ]);
    $body = @file_get_contents($url, false, $context);
    $status = 0;
    foreach ($http_response_header ?? [] as $line) {
        if (preg_match('#^HTTP/\S+\s+(\d{3})#', $line, $m)) {
            $status = (int) $m[1];
        }
    }
    if ($body === false && $status === 0) {
        return [0, 'stream request failed'];
    }
    return [$status, (string) $body];
}

[$status, $response] = post_json('https://api.resend.com/emails', 'Bearer ' . $apiKey, $payload);

if ($status === -1) {
    error_log('LEAD_NO_HTTP_CLIENT ref=' . $ref . ' detail=' . $response);
    send(503, ['error' => 'Email service is not configured.']);
}
if ($status === 0) {
    error_log('LEAD_SEND_ERROR ref=' . $ref . ' message=' . $response);
    send(502, ['error' => 'Could not send your request.']);
}
if ($status < 200 || $status >= 300) {
    error_log('LEAD_SEND_FAILED ref=' . $ref . ' status=' . $status . ' detail=' . substr($response, 0, 200));
    send(502, ['error' => 'Could not send your request.']);
}

send(200, ['ok' => true]);
