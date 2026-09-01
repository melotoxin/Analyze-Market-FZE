import React, { useState, useEffect, useId } from 'react';
import confetti from 'canvas-confetti';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { COMPANY_DETAILS } from '../../data/mockData';
import { Phone, CheckCircle2, Send, MessageCircle, Mail, AlertCircle } from 'lucide-react';
import { Language } from '../../data/translations';
import { getServiceNav } from '../../data/servicesData';
import { submitLead, openAdvisoryWhatsApp, openAdvisoryEmail } from '../../utils/submitLead';

interface QuickConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
  lang: Language;
}


export const QuickConsultationModal: React.FC<QuickConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultPackage,
  lang,
}) => {
  const isAr = lang === 'ar';
  const uid = useId();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const serviceOptions = getServiceNav('en').map((s) => s.label);
  const [packageChoice, setPackageChoice] = useState(defaultPackage || serviceOptions[0]);
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultPackage) setPackageChoice(defaultPackage);
  }, [defaultPackage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await submitLead({
        name,
        phone,
        email: email.trim() || undefined,
        service: packageChoice,
        notes,
        source: 'consultation-modal',
        company: honeypot,
      });
      setIsSubmitted(true);
      confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after the closing frame so the user never sees the form flash back.
    setTimeout(() => {
      setIsSubmitted(false);
      setError('');
      setName('');
      setPhone('');
      setEmail('');
      setNotes('');
    }, 200);
  };

  const inputClass =
    'w-full bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-[#1e293b] rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors';
  const labelClass = 'text-[11px] font-semibold uppercase text-slate-600 dark:text-[#94a3b8] block';

  const advisoryPayload = {
    name,
    phone,
    email: email.trim() || undefined,
    service: packageChoice,
    notes: notes.trim() || undefined,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        isSubmitted
          ? isAr
            ? 'تم إرسال طلب الاستشارة'
            : 'Consultation Request Sent'
          : isAr
            ? 'احجز استشارة / مكالمة'
            : 'Book a Consultation / Call'
      }
      subtitle={
        isSubmitted
          ? isAr
            ? 'سيتواصل معك أحد مستشارينا قريباً.'
            : 'An AnalyzeMarkets advisor will reach out to you.'
          : isAr
            ? 'استشارات الشركات المباشرة — أنالايز ماركتس ش.م.ح'
            : 'Direct Corporate Advisory — AnalyzeMarkets FZE'
      }
      maxWidth="md"
    >
      {isSubmitted ? (
        <div className="text-center py-5 space-y-4 font-mono">
          <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'تم استلام طلبك' : 'Consultation Request Received'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-[#94a3b8]">
              {isAr ? 'استلم فريقنا في' : 'Our advisory team at'}{' '}
              <span className="text-sky-500 font-bold">SRTI Park Sharjah</span>{' '}
              {isAr ? 'طلبك بنجاح.' : 'has received your request.'}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-[#182032] p-3.5 rounded-xl border border-slate-200 dark:border-[#1e293b] text-start text-xs space-y-1.5 shadow-sm">
            <div className="flex justify-between gap-3 text-slate-500 dark:text-[#94a3b8]">
              <span>{isAr ? 'الاسم:' : 'Contact Name:'}</span>
              <span className="text-slate-900 dark:text-white font-bold">{name}</span>
            </div>
            <div className="flex justify-between gap-3 text-slate-500 dark:text-[#94a3b8]">
              <span>{isAr ? 'الهاتف:' : 'Phone Number:'}</span>
              <span className="text-sky-600 dark:text-sky-400 font-bold" dir="ltr">
                {phone}
              </span>
            </div>
            <div className="flex justify-between gap-3 text-slate-500 dark:text-[#94a3b8]">
              <span>{isAr ? 'الخدمة:' : 'Selected Service:'}</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold">{packageChoice}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button onClick={handleClose} variant="primary" size="sm" className="text-xs font-mono">
              {isAr ? 'العودة للموقع' : 'Back to Website'}
            </Button>
            <button
              type="button"
              onClick={() => openAdvisoryWhatsApp(advisoryPayload)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isAr ? 'محادثة واتساب' : 'Chat on WhatsApp'}</span>
            </button>
            <button
              type="button"
              onClick={() => openAdvisoryEmail(advisoryPayload)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-sky-500/40 text-sky-600 dark:text-sky-400 text-xs font-bold hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{isAr ? 'إرسال بريد' : 'Send by Email'}</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5 font-mono text-xs">
          {error && (
            <div
              role="alert"
              className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 rounded-lg text-xs flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-px" />
              <span>
                {error}{' '}
                <a
                  href={'tel:' + COMPANY_DETAILS.phone.replace(/\s/g, '')}
                  className="underline font-bold"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </span>
            </div>
          )}

          {/*
            Honeypot: clipped to nothing and hidden from assistive tech, but still a
            real focusable field that bots fill in. Clipping rather than an off-screen
            negative offset — the latter pushed the RTL layout into horizontal overflow.
          */}
          <div
            aria-hidden="true"
            className="absolute w-px h-px overflow-hidden whitespace-nowrap border-0 p-0 m-[-1px] [clip:rect(0,0,0,0)]"
          >
            <label htmlFor={uid + '-company'}>Company</label>
            <input
              id={uid + '-company'}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor={uid + '-name'} className={labelClass}>
              {isAr ? 'الاسم الكامل *' : 'Full Name *'}
            </label>
            <input
              id={uid + '-name'}
              name="name"
              type="text"
              required
              minLength={2}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isAr ? 'مثال: طارق المنصور' : 'e.g. Alexander Vance'}
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor={uid + '-phone'} className={labelClass}>
              {isAr ? 'الهاتف / واتساب *' : 'Phone / WhatsApp *'}
            </label>
            <input
              id={uid + '-phone'}
              name="phone"
              type="tel"
              required
              dir="ltr"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+971 56 339 6961"
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor={uid + '-email'} className={labelClass}>
              {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email (Optional)'}
            </label>
            <input
              id={uid + '-email'}
              name="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor={uid + '-service'} className={labelClass}>
              {isAr ? 'الخدمة المطلوبة' : 'Required Service'}
            </label>
            <select
              id={uid + '-service'}
              name="service"
              value={packageChoice}
              onChange={(e) => setPackageChoice(e.target.value)}
              className={inputClass + ' cursor-pointer'}
            >
              {/* A quote or package name arrives via defaultPackage and is not in the list. */}
              {!serviceOptions.includes(packageChoice) && (
                <option value={packageChoice}>{packageChoice}</option>
              )}
              {serviceOptions.map((s, i) => (
                <option key={s} value={s}>
                  {i + 1}. {s}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor={uid + '-notes'} className={labelClass}>
              {isAr ? 'رسالة أو نشاط محدد (اختياري)' : 'Message or Specific Activity (Optional)'}
            </label>
            <textarea
              id={uid + '-notes'}
              name="notes"
              rows={2}
              maxLength={2000}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                isAr
                  ? 'مثال: شركة تقنية مع تأشيرتي مستثمر وفتح حساب بنكي...'
                  : 'e.g. AI & Tech startup with 2 investor visas and corporate bank opening...'
              }
              className={inputClass}
            />
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-[#1e293b] flex items-center justify-between gap-3">
            <a
              href={'tel:' + COMPANY_DETAILS.phone.replace(/\s/g, '')}
              className="text-sky-600 dark:text-sky-400 hover:underline text-[11px] flex items-center gap-1 font-bold"
              dir="ltr"
            >
              <Phone className="w-3 h-3" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              className="font-mono text-xs shadow-md"
            >
              <Send className="w-3.5 h-3.5 mr-1" />
              <span>{isAr ? 'إرسال الطلب' : 'Send Request'}</span>
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
