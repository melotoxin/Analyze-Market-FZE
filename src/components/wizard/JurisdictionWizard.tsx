import React, { useState } from 'react';
import {
  Sparkles,
  Building,
  Globe,
  Shield,
  MessageCircle,
  FileDown,
  ArrowLeft
} from 'lucide-react';
import { Language } from '../../data/translations';
import { generateQuotePdf } from '../../utils/quotePdfGenerator';
import confetti from 'canvas-confetti';

interface JurisdictionWizardProps {
  onOpenConsultation: (details?: string) => void;
  lang: Language;
  currency: string;
}

export const JurisdictionWizard: React.FC<JurisdictionWizardProps> = ({
  onOpenConsultation,
  lang,
  currency
}) => {
  const isAr = lang === 'ar';
  const [step, setStep] = useState<number>(1);

  // Diagnostic selections
  const [marketScope, setMarketScope] = useState<'global' | 'local' | 'both'>('global');
  const [visaBracket, setVisaBracket] = useState<'0' | '1-2' | '3-5' | '6+'>('1-2');
  const [officeType, setOfficeType] = useState<'flexi' | 'physical' | 'warehouse'>('flexi');

  const calculateRecommendation = () => {
    if (marketScope === 'both') {
      return {
        title: isAr ? 'رخصة مزدوجة (منطقة حرة + فرع بر رئيسي)' : 'Dual License (Free Zone Hub + Mainland Branch)',
        tag: 'Recommended: Maximum Flexibility',
        jurisdiction: 'Dual License',
        reason: isAr
          ? 'تمنحك إعفاء 0% ضريبي على الدخل المؤهل الخارجي مع حق البيع المباشر داخل السوق الإماراتي والخليجي.'
          : 'Allows 0% corporate tax on international business while trading directly across UAE local markets.',
        estimatedFee: currency === 'USD' ? '$6,200' : 'AED 22,800',
        turnaround: '5 - 8 Days',
        icon: Globe
      };
    }
    if (marketScope === 'local' || officeType === 'physical') {
      return {
        title: isAr ? 'شركة بر رئيسي ذات مسؤولية محدودة (Mainland LLC)' : 'Mainland LLC (DED / DET Licensed)',
        tag: 'Recommended: Direct Local Trade',
        jurisdiction: 'Mainland LLC',
        reason: isAr
          ? 'الخيار الأفضل للشركات التي تبيع للجمهور والوزارات والهيئات الحكومية داخل دولة الإمارات.'
          : 'The optimal structure for bidding on government contracts and direct local customer trading.',
        estimatedFee: currency === 'USD' ? '$4,750' : 'AED 17,500',
        turnaround: '4 - 7 Days',
        icon: Building
      };
    }
    return {
      title: isAr ? 'شركة منطقة حرة (Free Zone FZE - SRTI Park)' : 'Free Zone FZE (SRTI Innovation Park)',
      tag: 'Recommended: 100% Tax-Free Global Hub',
      jurisdiction: 'Free Zone FZE',
      reason: isAr
        ? 'ملكية أجنبية 100%، إعفاء 0% ضريبة شركات للمؤهلين، وسرعة إصدار الرخصة في 48 ساعة.'
        : '100% foreign ownership, 0% corporate tax (QFZP), and rapid 48-hour incorporation SLA.',
      estimatedFee: currency === 'USD' ? '$3,150' : 'AED 11,500',
      turnaround: '2 - 4 Days',
      icon: Shield
    };
  };

  const rec = calculateRecommendation();

  const handleDownloadDiagnosticPdf = () => {
    generateQuotePdf({
      clientName: 'Diagnostic Client',
      clientPhone: '+971 56 339 6961',
      jurisdiction: rec.jurisdiction,
      activity: 'Custom Diagnostic Setup',
      visaCount: visaBracket === '0' ? 0 : visaBracket === '1-2' ? 2 : visaBracket === '3-5' ? 4 : 6,
      totalFormatted: rec.estimatedFee,
      currency
    });
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
  };

  return (
    <section id="jurisdiction-wizard" className="py-20 sm:py-28 bg-[#FBFBFA] border-b border-slate-200 font-sans text-slate-900">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-mono font-bold text-slate-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-slate-700" />
            <span>03 / 30-Second Jurisdiction Diagnostic</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight font-sans">
            {isAr ? 'حدد الهيكل القانوني الأنسب لنشاطك في 30 ثانية' : 'Find your optimal UAE corporate structure'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            {isAr 
              ? 'أجب عن 3 أسئلة بسيطة للحصول على التوصية القانونية المعتمدة وحساب التكلفة والجدول الزمني فوراً.'
              : 'Answer 3 fast diagnostic questions to receive an instant legal recommendation and official cost breakdown.'
            }
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          
          {/* Step Progress Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 font-mono text-xs">
            <div className="flex items-center gap-3">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => setStep(num)}
                  className={'w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ' + (
                    step === num
                      ? 'bg-slate-900 text-white shadow-sm'
                      : step > num
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500'
                  )}
                >
                  {step > num ? '✓' : num}
                </button>
              ))}
            </div>
            <span className="text-slate-500 uppercase tracking-wider font-bold">
              Step {step} of 3
            </span>
          </div>

          {/* Question Step 1: Trading Scope */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-500 uppercase font-bold">Question 01</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {isAr ? 'أين يقع عملاؤك ونطاق مبيعاتك الرئيسي؟' : 'Where will you trade and sell your products/services?'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    key: 'global',
                    title: isAr ? 'عالمياً وخارج الإمارات' : 'Global / International Only',
                    desc: isAr ? 'مبيعات لعملاء خارج الدولة أو لشركات المناطق الحرة (0% ضريبة QFZP)' : 'Clients outside the UAE or B2B Free Zones (0% QFZP tax optimization)'
                  },
                  {
                    key: 'local',
                    title: isAr ? 'داخل السوق المحلي الإماراتي' : 'Direct Inside UAE Mainland',
                    desc: isAr ? 'مبيعات مباشرة للمستهلكين والشركات المحلية والوزارات' : 'Direct B2C retail, local contracts, and government tenders'
                  },
                  {
                    key: 'both',
                    title: isAr ? 'كلاهما (محلياً ودولياً)' : 'Both Local & International',
                    desc: isAr ? 'هيكل مزدوج يجمع بين الحوافز الضريبية والانتشار المحلي' : 'Dual operation: International IP holding + local commercial trading'
                  }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      setMarketScope(opt.key as any);
                      setStep(2);
                    }}
                    className={'p-6 rounded-xl border text-left transition-all cursor-pointer space-y-2 ' + (
                      marketScope === opt.key
                        ? 'border-slate-900 bg-slate-50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-400 bg-white'
                    )}
                  >
                    <span className="font-bold text-sm text-slate-900 block">{opt.title}</span>
                    <span className="text-xs text-slate-600 leading-relaxed block font-normal">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question Step 2: Visa Requirements */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-500 uppercase font-bold">Question 02</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {isAr ? 'كم عدد تأشيرات الإقامة والهوية التي تحتاجها في السنة الأولى؟' : 'How many UAE residence/investor visas will you require in Year 1?'}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                {[
                  { key: '0', label: '0 Visas', sub: 'Holding / Flexi' },
                  { key: '1-2', label: '1 - 2 Visas', sub: 'Founder / Partner' },
                  { key: '3-5', label: '3 - 5 Visas', sub: 'Core Team' },
                  { key: '6+', label: '6+ Visas', sub: 'Enterprise Scale' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      setVisaBracket(opt.key as any);
                      setStep(3);
                    }}
                    className={'p-5 rounded-xl border text-center transition-all cursor-pointer space-y-1 ' + (
                      visaBracket === opt.key
                        ? 'border-slate-900 bg-slate-900 text-white font-bold shadow-sm'
                        : 'border-slate-200 hover:border-slate-400 bg-white text-slate-900'
                    )}
                  >
                    <span className="text-base font-black block">{opt.label}</span>
                    <span className="text-[11px] opacity-80 block">{opt.sub}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Step 1</span>
                </button>
              </div>
            </div>
          )}

          {/* Question Step 3: Office Preference */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-500 uppercase font-bold">Question 03</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {isAr ? 'ما هو نوع المساحة المكتبية المطلوبة؟' : 'What is your operational workspace requirement?'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    key: 'flexi',
                    title: isAr ? 'مكتب مرن / ذكي (Smart Desk)' : 'Smart Flexi-Desk / Virtual',
                    desc: isAr ? 'حل اقتصادي ومرن يلبي كافة المتطلبات القانونية للتأشيرات' : 'Zero overhead, fully compliant with immigration & bank approvals'
                  },
                  {
                    key: 'physical',
                    title: isAr ? 'مكتب خاص دائم (Physical Office)' : 'Dedicated Commercial Office',
                    desc: isAr ? 'مكتب خاص مع عقد إيجاري موثق لفرق العمل المتواجدة يومياً' : 'Commercial lease with registered Ejari for full daily operational teams'
                  },
                  {
                    key: 'warehouse',
                    title: isAr ? 'مستودع لوجستي (Logistics Hub)' : 'Industrial / Warehouse Facility',
                    desc: isAr ? 'مساحات تخزين جمركية وتوزيع للبضائع في الموانئ والمطارات' : 'Bonded storage and distribution hub in seaports or air cargo zones'
                  }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      setOfficeType(opt.key as any);
                    }}
                    className={'p-6 rounded-xl border text-left transition-all cursor-pointer space-y-2 ' + (
                      officeType === opt.key
                        ? 'border-slate-900 bg-slate-50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-400 bg-white'
                    )}
                  >
                    <span className="font-bold text-sm text-slate-900 block">{opt.title}</span>
                    <span className="text-xs text-slate-600 leading-relaxed block font-normal">{opt.desc}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Step 2</span>
                </button>
              </div>
            </div>
          )}

          {/* Diagnostic Result Card */}
          <div className="mt-8 pt-8 border-t border-slate-100 bg-[#FBFBFA] p-6 sm:p-8 rounded-xl border border-slate-200 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                {rec.tag}
              </span>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
                <span>Timeline: <strong className="text-slate-900">{rec.turnaround}</strong></span>
                <span>Starting Tariff: <strong className="text-slate-950 text-sm font-black">{rec.estimatedFee}</strong></span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-slate-950 font-sans">
                {rec.title}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                {rec.reason}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadDiagnosticPdf}
                className="px-4 py-2.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-bold text-xs transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
              >
                <FileDown className="w-4 h-4 text-slate-700" />
                <span>Download Diagnostic Quote (.PDF)</span>
              </button>

              <a
                href={`https://wa.me/971563396961?text=${encodeURIComponent(`Hello AM DXB Advisory, my diagnostic test recommended a ${rec.title} with an estimated tariff of ${rec.estimatedFee}. Please advise on the next steps.`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss Recommendation on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
