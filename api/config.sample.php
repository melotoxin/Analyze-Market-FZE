<?php
/**
 * Copy to config.php beside this file and fill in the key, then upload it.
 * config.php is git-ignored and must never be committed.
 *
 * The Resend key lives here rather than in .htaccess because SetEnv is not
 * available on every shared host, and PHP files are executed, never served as
 * source — a request for /api/config.php returns an empty 200, not the key.
 */
return [
    // Required. Create at https://resend.com/api-keys
    'RESEND_API_KEY' => '',

    // Where leads are delivered. Until amdxb.com is verified in Resend, this
    // must be the email address that owns the Resend account.
    'LEAD_TO_EMAIL' => 'info@amdxb.com',

    // Must be a domain verified in Resend. Leave the sandbox sender until then.
    'LEAD_FROM_EMAIL' => 'AM DXB Website <onboarding@resend.dev>',
];
