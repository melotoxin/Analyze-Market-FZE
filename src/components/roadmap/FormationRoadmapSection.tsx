import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Building, 
  CreditCard, 
  Award,
  Zap
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Language } from '../../data/translations';

interface FormationRoadmapSectionProps {
  lang?: Language;
  onOpenConsultation: (topic?: string) => void;
}

export const FormationRoadmapSection: React.FC<FormationRoadmapSectionProps> = ({
  lang = 'en',
  onOpenConsultation
}) => {
  const isAr = lang === 'ar';
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      day: isAr ? 'اليوم 1' : 'Day 1',
      title: isAr ? 'حجز الاسم التجاري والمطابقة القانونية' : 'Trade Name Reservation & KYC Clearance',
      desc: isAr 
        ? 'فحص فوري للاسم التجاري لدى سلطات الترخيص في الشارقة ودبي، والتحقق الأمني المسبق لجوازات السفر.'
        : 'Automated name availability check across 40+ Free Zones & DED, initial KYC verification and shareholder registry.',
      sla: '2 to 4 Hours',
      icon: FileText,
      deliverables: [
        isAr ? 'شهادة حجز الاسم التجاري المعتمدة' : 'Official Trade Name Approval Certificate',
        isAr ? 'اعتماد الأنشطة التجارية المصنفة' : 'Approved Commercial Activity Code Mapping',
        isAr ? 'التحقق المسبق من الشركاء والمساهمين' : 'Shareholder Due Diligence & Pre-KYC File'
      ]
    },
    {
      id: 2,
      day: isAr ? 'اليوم 2' : 'Day 2',
      title: isAr ? 'الموافقة الأمنية والمبدئية للحكومة' : 'Government Initial Approval (IA)',
      desc: isAr 
        ? 'إصدار الموافقة الأمنية الإلكترونية والموافقة المبدئية مباشرة من وزارة الاقتصاد ودائرة التنمية.'
        : 'Direct submission to Ministry of Economy and licensing registrar for statutory initial approval clearance.',
      sla: '24 Hours',
      icon: ShieldCheck,
      deliverables: [
        isAr ? 'وثيقة الموافقة المبدئية الحكومية' : 'Official Initial Approval Certificate',
        isAr ? 'الموافقة الأمنية للشركاء الدوليين' : 'Security Clearance for Foreign Shareholders',
        isAr ? 'تأكيد الهيكل القانوني للمؤسسة' : 'Entity Legal Charter Ratification'
      ]
    },
    {
      id: 3,
      day: isAr ? 'اليوم 3' : 'Day 3',
      title: isAr ? 'عقد التأسيس الإلكتروني وتفعيل القناة' : 'Digital MOA & E-Channel Portal Activation',
      desc: isAr 
        ? 'توقيع عقد التأسيس (MOA) رقمياً وتفعيل نظام القناة الذكية للإقامة والجوازات (ICP).'
        : 'Execution of bilingual Memorandum of Association with digital notarization & federal ICP residency gateway activation.',
      sla: '24 Hours',
      icon: Building,
      deliverables: [
        isAr ? 'عقد تأسيس مصدق وموثق رسمياً' : 'Notarized & Attested Memorandum of Association',
        isAr ? 'تفعيل بطاقة المنشأة الذكية (ICP)' : 'Federal Immigration Establishment Card',
        isAr ? 'فتح ملف الشركة في وزارة الموارد البشرية' : 'Corporate E-Channel System Activation'
      ]
    },
    {
      id: 4,
      day: isAr ? 'اليوم 4' : 'Day 4',
      title: isAr ? 'إصدار الرخصة التجارية الرسمية' : 'Official Trade License & Chamber Attestation',
      desc: isAr 
        ? 'استلام الرخصة التجارية المعتمدة، والسجل التجاري، وشهادة عضوية غرفة التجارة والصناعة.'
        : 'Final issuance of legal Commercial Trade License, Commercial Register, and Chamber of Commerce registration.',
      sla: 'Instant PDF + QR',
      icon: Award,
      deliverables: [
        isAr ? 'الرخصة التجارية الأصلية مع رمز QR الرسمي' : 'Commercial Trade License (Instant PDF + QR Seal)',
        isAr ? 'شهادة السجل التجاري الحكومي' : 'Official Commercial Registry Certificate',
        isAr ? 'عضوية غرفة التجارة والصناعة' : 'Chamber of Commerce & Industry Membership'
      ]
    },
    {
      id: 5,
      day: isAr ? 'الأيام 5-7' : 'Days 5-7',
      title: isAr ? 'الإقامة الذهبية / المستثمر والحساب البنكي' : 'VIP Residency Visa & Tier-1 Corporate Banking',
      desc: isAr 
        ? 'مرافقة VIP للفحص الطبي خلال ساعتين، وإصدار الهوية الإماراتية، وفتح الحساب البنكي التجاري.'
        : 'Dedicated concierge for 2-hour VIP medical fitness, biometric Emirates ID issuance, and guaranteed corporate bank account opening.',
      sla: '3 to 5 Days',
      icon: CreditCard,
      deliverables: [
        isAr ? 'تأشيرة إقامة مستثمر / إقامة ذهبية 10 سنوات' : 'UAE 2-Year Investor Visa / 10-Year Golden Visa',
        isAr ? 'بطاقة الهوية الإماراتية الذكية' : 'Official Biometric Emirates ID Card',
        isAr ? 'حساب بنكي تجاري نشط متعدد العملات' : 'Fully Active Tier-1 Corporate Bank Account (IBAN)'
      ]
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-[#040815] border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Visual Accent Ambient Orbs */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 dark:bg-slate-900 border border-sky-400/30 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest shadow-sm">
            <Zap className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span>{isAr ? 'مسار التأسيس خطوة بخطوة' : 'Turnkey Formation Roadmap'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
            {isAr ? 'مسار التأسيس السريع من اليوم الأول حتى الحساب البنكي' : (
              <>
                <span className="font-light text-slate-600 dark:text-slate-300">From Name Reservation to Bank IBAN in </span>
                <span className="font-bold text-slate-900 dark:text-white bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">7 Business Days</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {isAr 
              ? 'إجراءات مبسطة وشفافة بالكامل ومدعومة بنظام إلكتروني دون الحاجة إلى معاملات ورقية معقدة.'
              : 'Our zero-friction 5-step incorporation pathway with dedicated executive concierge and 100% legal SLA guarantee.'
            }
          </p>
        </div>

        {/* 5-Step Horizontal Interactive Timeline Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
          {steps.map((s, idx) => {
            const isCurrent = activeStep === idx;
            const Icon = s.icon;

            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(idx)}
                className={'p-4 sm:p-5 rounded-3xl border text-left transition-all cursor-pointer relative group flex flex-col justify-between ' + (
                  isCurrent
                    ? 'bg-white dark:bg-gradient-to-b dark:from-[#0d1c3e] dark:to-[#09132a] border-sky-400 shadow-xl shadow-sky-500/20 ring-1 ring-sky-400/50'
                    : 'bg-white/80 dark:bg-[#070d1e]/80 border-slate-200 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-slate-600'
                )}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={'text-[11px] font-mono font-black px-2.5 py-0.5 rounded-full border ' + (
                    isCurrent
                      ? 'bg-sky-500 text-white border-sky-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/[0.08]'
                  )}>
                    {s.day}
                  </span>

                  <div className={'p-2 rounded-xl transition-colors ' + (
                    isCurrent ? 'bg-sky-500/20 text-sky-500 dark:text-sky-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-slate-200'
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h4 className={'text-xs sm:text-sm font-bold leading-tight ' + (
                    isCurrent ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                  )}>
                    {s.title}
                  </h4>
                  <div className="flex items-center gap-1 mt-2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Clock className="w-3 h-3" />
                    <span>{s.sla}</span>
                  </div>
                </div>

                {/* Active Indicator bottom line */}
                {isCurrent && (
                  <div className="absolute -bottom-[1px] left-6 right-6 h-[2px] bg-gradient-to-r from-sky-400 to-cyan-300 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Showcase Bento Card */}
        <div className="bg-white dark:bg-gradient-to-r dark:from-[#0c1833] dark:via-[#091226] dark:to-[#0c1833] border border-slate-200 dark:border-white/[0.12] rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-500 text-white shadow-md shadow-sky-500/30">
                Step {steps[activeStep].id} of 5
              </span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>SLA Guaranteed: {steps[activeStep].sla}</span>
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
              {steps[activeStep].title}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {steps[activeStep].desc}
            </p>

            <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-white/[0.08]">
              <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold block">
                Official Step Deliverables:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {steps[activeStep].deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.06] text-xs font-medium text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 dark:bg-[#070e22] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">Dedicated Concierge</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold">Live Support</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Zero Physical Presence Required
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Steps 1 through 4 are executed 100% remotely. You only fly to the UAE for Step 5 (VIP Medicals & Bank KYC) with our executive driver accompanying you.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] flex items-center gap-3">
              <Button
                onClick={() => onOpenConsultation(`Roadmap Step ${steps[activeStep].id}: ${steps[activeStep].title}`)}
                variant="primary"
                size="md"
                className="w-full font-bold text-xs shadow-lg shadow-sky-500/25 py-3"
              >
                <span>Start This Step With AM DXB</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
