import React, { useState, useId } from 'react';
import {
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Calculator,
  FileDown,
  MessageCircle,
  Mail,
  Building,
  Laptop,
  Warehouse
} from 'lucide-react';
import { Language } from '../../data/translations';
import confetti from 'canvas-confetti';
import {
  BASE_PRICES,
  WORKSPACE_ADDONS,
  ACTIVITY_ADDONS,
  MAX_VISAS,
  calculateSetupAed,
  formatMoney,
  Jurisdiction,
  Workspace,
  Activity,
} from '../../data/pricing';
import { submitLead, openAdvisoryWhatsApp, openAdvisoryEmail } from '../../utils/submitLead';

interface EnterpriseSetupStudioProps {
  lang: Language;
  currency: string;
}

export const EnterpriseSetupStudio: React.FC<EnterpriseSetupStudioProps> = ({
  lang,
  currency
}) => {
  const isAr = lang === 'ar';
  const uid = useId();

  // Configurator state
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('freezone');
  const [activity, setActivity] = useState<Activity>('tech');
  const [workspace, setWorkspace] = useState<Workspace>('flexi');
  const [visaCount, setVisaCount] = useState<number>(2);
  
  // Lead dispatch inputs
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitChannel, setSubmitChannel] = useState<'whatsapp' | 'email' | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const activityLabels: Record<Activity, string> = {
    tech: 'AI, Tech & Software',
    trading: 'General Trading / Import',
    ecommerce: 'E-Commerce & Digital',
    consulting: 'Management Consulting',
  };

  const jurisdictionLabels: Record<Jurisdiction, string> = {
    freezone: 'Free Zone (0% QFZP)',
    mainland: 'Mainland LLC (DED / DET)',
    offshore: 'Offshore SPV & Holding',
  };

  const workspaceLabels: Record<Workspace, string> = {
    flexi: 'Smart Flexi-Desk (Included)',
    office: 'Dedicated Office (+Ejari)',
    warehouse: 'Logistics Warehouse',
  };

  // All amounts come from data/pricing.ts so the hero, the packages grid and the
  // cost calculator can never disagree, and every currency renders its own symbol.
  const rawAedTotal = calculateSetupAed({ jurisdiction, workspace, activity, visaCount });
  const formattedTotal = formatMoney(rawAedTotal, currency);
  const quoteSummary =
    jurisdictionLabels[jurisdiction] +
    ' • ' +
    activityLabels[activity] +
    ' • ' +
    workspaceLabels[workspace] +
    ' • ' +
    visaCount +
    ' visa(s)';

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    setError('');
    try {
      // Loaded on demand: jspdf + html2canvas are ~390KB and most visitors never
      // click this button.
      const { generateQuotePdf } = await import('../../utils/quotePdfGenerator');
      generateQuotePdf({
        clientName: clientName.trim() || 'Client',
        clientPhone: clientPhone.trim() || '+971 56 339 6961',
        jurisdiction: jurisdictionLabels[jurisdiction],
        activity: `${activityLabels[activity]} • ${workspaceLabels[workspace]}`,
        visaCount,
        totalFormatted: formattedTotal,
        currency
      });
      confetti({ particleCount: 50, spread: 40, origin: { y: 0.6 } });
    } catch (e) {
      console.error('PDF generation failed', e);
      setError('Could not generate the PDF. Please try again or contact us directly.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleStudioSubmit = async (e: React.FormEvent, channel: 'whatsapp' | 'email') => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;
    setError('');
    setIsSubmitting(true);

    const advisory = {
      name: clientName.trim(),
      phone: clientPhone.trim(),
      email: clientEmail.trim() || undefined,
      service: 'Venture Estimator quote',
      notes: quoteSummary,
      quote: formattedTotal,
    };

    try {
      await submitLead({
        ...advisory,
        source: 'venture-estimator',
      });
    } catch (err) {
      console.error('Lead capture failed, continuing to advisory channel', err);
    } finally {
      setIsSubmitting(false);
    }

    setSubmitChannel(channel);
    setIsSubmitted(true);
    confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });

    setTimeout(() => {
      if (channel === 'whatsapp') openAdvisoryWhatsApp(advisory);
      else openAdvisoryEmail(advisory);
      setIsSubmitted(false);
      setSubmitChannel(null);
      setClientName('');
      setClientPhone('');
      setClientEmail('');
    }, 1500);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-full sm:max-w-[460px] text-slate-900 transition-all font-sans relative overflow-hidden">
      
      {/* Header Bar */}
      <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 text-white rounded-lg">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 font-sans">
              {isAr ? 'حاسبة التأسيس — فانتشر' : 'Venture — The Estimator'}
            </h2>
            <span className="text-[11px] font-mono text-slate-500 block">
              {isAr ? 'حاسبة الرسوم الحكومية المعتمدة' : 'Official 2026 Tariff Simulator'}
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold">
          Live 2026 Tariffs
        </span>
      </div>

      {/* Body Controls */}
      <div className="p-5 space-y-3.5">
        
        {/* 1. Jurisdiction Selection */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="font-bold text-slate-700 uppercase tracking-wide">
              1. {isAr ? 'الهيكل القانوني:' : 'Jurisdiction Structure:'}
            </span>
            <span className="text-slate-600 text-[10px] font-semibold">
              {jurisdiction === 'freezone' ? '100% Tax-Free' : jurisdiction === 'mainland' ? 'Direct UAE Trade' : 'Asset Protection'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center">
            {([
              { key: 'freezone', title: isAr ? 'منطقة حرة' : 'Free Zone' },
              { key: 'mainland', title: isAr ? 'بر رئيسي' : 'Mainland LLC' },
              { key: 'offshore', title: isAr ? 'أوفشور' : 'Offshore SPV' },
            ] as { key: Jurisdiction; title: string }[]).map((j) => (
              <button
                key={j.key}
                type="button"
                aria-pressed={jurisdiction === j.key}
                onClick={() => setJurisdiction(j.key)}
                className={'p-2 rounded-lg border text-center transition-all cursor-pointer ' + (
                  jurisdiction === j.key
                    ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400'
                )}
              >
                <span className="font-bold text-xs block">{j.title}</span>
                <span className="text-[10px] font-mono block opacity-80">
                  {formatMoney(BASE_PRICES[j.key], currency)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Activity Code */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wide block">
            2. {isAr ? 'النشاط التجاري:' : 'Commercial Activity:'}
          </span>

          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {(Object.keys(activityLabels) as Activity[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={activity === key}
                onClick={() => setActivity(key)}
                className={'p-1.5 rounded-lg border text-center transition-all cursor-pointer font-medium text-[11px] ' + (
                  activity === key
                    ? 'bg-slate-900 text-white border-slate-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400'
                )}
              >
                <span className="block truncate">{activityLabels[key]}</span>
                <span className="block text-[9px] font-mono opacity-75">
                  {ACTIVITY_ADDONS[key] === 0
                    ? isAr
                      ? 'مشمول'
                      : 'Included'
                    : '+' + formatMoney(ACTIVITY_ADDONS[key], currency)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Operational Workspace Selection (Integrated from Wizard) */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wide block">
            3. {isAr ? 'المساحة التشغيلية / المكتب:' : 'Workspace Requirement:'}
          </span>

          <div className="grid grid-cols-3 gap-1.5 text-center">
            {([
              { key: 'flexi', title: isAr ? 'مكتب مرن' : 'Smart Flexi', icon: Laptop },
              { key: 'office', title: isAr ? 'مكتب خاص' : 'Private Office', icon: Building },
              { key: 'warehouse', title: isAr ? 'مستودع' : 'Warehouse', icon: Warehouse },
            ] as { key: Workspace; title: string; icon: any }[]).map((ws) => {
              const Icon = ws.icon;
              return (
                <button
                  key={ws.key}
                  type="button"
                  aria-pressed={workspace === ws.key}
                  onClick={() => setWorkspace(ws.key)}
                  className={'p-2 rounded-lg border text-center transition-all cursor-pointer ' + (
                    workspace === ws.key
                      ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400'
                  )}
                >
                  <Icon className="w-3.5 h-3.5 mx-auto mb-0.5 opacity-80" />
                  <span className="font-bold text-[11px] block">{ws.title}</span>
                  <span className="text-[9px] font-mono block opacity-75">
                    {WORKSPACE_ADDONS[ws.key] === 0
                      ? isAr
                        ? 'مشمول'
                        : 'Included'
                      : '+' + formatMoney(WORKSPACE_ADDONS[ws.key], currency)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Visas Counter Stepper */}
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              4. {isAr ? 'تأشيرات الإقامة والهوية:' : 'Residence Visas & EID:'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              VIP Medical & Biometrics Included
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setVisaCount(Math.max(0, visaCount - 1))}
              disabled={visaCount === 0}
              aria-label={isAr ? 'إنقاص عدد التأشيرات' : 'Decrease visa count'}
              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span
              className="text-xs font-black font-mono text-slate-900 w-12 text-center"
              aria-live="polite"
            >
              {visaCount} {visaCount === 1 ? 'Visa' : 'Visas'}
            </span>
            <button
              type="button"
              onClick={() => setVisaCount(Math.min(MAX_VISAS, visaCount + 1))}
              disabled={visaCount === MAX_VISAS}
              aria-label={isAr ? 'زيادة عدد التأشيرات' : 'Increase visa count'}
              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Total Price Banner */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block tracking-wider">
              ALL-INCLUSIVE ESTIMATE:
            </span>
            <span
              className="text-2xl font-black text-slate-950 font-mono block mt-0.5 tracking-tight"
              aria-live="polite"
            >
              {formattedTotal}
            </span>
          </div>

          <div className="text-end space-y-0.5 font-mono text-[10px]">
            <div className="flex items-center gap-1 text-slate-700 justify-end">
              <Clock className="w-3 h-3 text-slate-500" />
              <span className="font-bold">2-4 Days SLA</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-700 justify-end font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>99.8% Bank Match</span>
            </div>
          </div>
        </div>

        {/* 1-Click Fast Dispatch & Instant PDF Proposal */}
        {isSubmitted ? (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1 font-mono">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
            <span className="text-xs font-bold text-emerald-950 block">
              {submitChannel === 'email'
                ? isAr
                  ? 'جارٍ فتح بريدك لإرسال الطلب...'
                  : 'Opening your email client...'
                : isAr
                  ? 'جارٍ الاتصال بمستشار عبر واتساب...'
                  : 'Connecting to Senior Advisor via WhatsApp...'}
            </span>
            <span className="text-[11px] text-emerald-800 block">
              {isAr ? 'تم تجهيز الرسالة مسبقاً.' : 'Pre-filled advisory message ready.'}
            </span>
          </div>
        ) : (
          <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
            {error && (
              <p role="alert" className="text-[11px] text-rose-600 font-medium">
                {error}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <div>
                <label htmlFor={uid + '-studio-name'} className="sr-only">
                  {isAr ? 'الاسم بالكامل' : 'Full name'}
                </label>
                <input
                  id={uid + '-studio-name'}
                  type="text"
                  required
                  autoComplete="name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={isAr ? 'الاسم بالكامل *' : 'Full Name *'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800"
                />
              </div>

              <div>
                <label htmlFor={uid + '-studio-phone'} className="sr-only">
                  {isAr ? 'الهاتف / واتساب' : 'Phone or WhatsApp'}
                </label>
                <input
                  id={uid + '-studio-phone'}
                  type="tel"
                  required
                  dir="ltr"
                  autoComplete="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder={isAr ? 'الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800"
                />
              </div>
            </div>

            <div>
              <label htmlFor={uid + '-studio-email'} className="sr-only">
                {isAr ? 'البريد الإلكتروني' : 'Email address'}
              </label>
              <input
                id={uid + '-studio-email'}
                type="email"
                dir="ltr"
                autoComplete="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder={isAr ? 'البريد الإلكتروني (اختياري)' : 'Email (optional, for reply)'}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-bold text-[11px] py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all sm:col-span-2"
              >
                <FileDown className="w-3.5 h-3.5 text-slate-700" aria-hidden="true" />
                <span>{isDownloadingPdf ? 'Generating...' : 'Download PDF Quote'}</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={(e) => handleStudioSubmit(e, 'whatsapp')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting
                    ? isAr
                      ? 'جارٍ الإرسال...'
                      : 'Sending...'
                    : isAr
                      ? 'واتساب — تأكيد العرض'
                      : 'Lock Quote on WhatsApp'}
                </span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={(e) => handleStudioSubmit(e, 'email')}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold text-[11px] uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting
                    ? isAr
                      ? 'جارٍ الإرسال...'
                      : 'Sending...'
                    : isAr
                      ? 'بريد — تأكيد العرض'
                      : 'Send Quote by Email'}
                </span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
