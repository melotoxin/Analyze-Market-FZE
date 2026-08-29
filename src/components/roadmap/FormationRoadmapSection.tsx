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
  Zap,
  Layers
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
      day: isAr ? 'المرحلة 01' : 'Stage 01',
      title: isAr ? 'التشخيص الاستراتيجي والمطابقة' : 'Strategic Diagnostic & Activity Mapping',
      desc: isAr 
        ? 'فحص فوري للاسم التجاري لدى سلطات الترخيص في الشارقة ودبي، وتحديد الأنشطة التجارية المصنفة، والتحقق الأمني المسبق لجوازات السفر.'
        : 'Deep-dive analysis of your commercial activities, shareholder structure, and selection of the optimal Free Zone vs Mainland jurisdiction for 0% tax eligibility.',
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
      day: isAr ? 'المرحلة 02' : 'Stage 02',
      title: isAr ? 'الموافقة الأمنية والمبدئية للحكومة' : 'Government Initial Approval (IA) & Security',
      desc: isAr 
        ? 'إصدار الموافقة الأمنية الإلكترونية والموافقة المبدئية مباشرة من وزارة الاقتصاد ودائرة التنمية.'
        : 'Direct electronic submission to Ministry of Economy and licensing registrar for statutory initial approval and foreign shareholder security clearance.',
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
      day: isAr ? 'المرحلة 03' : 'Stage 03',
      title: isAr ? 'عقد التأسيس الإلكتروني وإصدار الرخصة' : 'Bilingual MOA & Commercial License Issuance',
      desc: isAr 
        ? 'توقيع عقد التأسيس (MOA) رقمياً واستلام الرخصة التجارية الرسمية المعتمدة مع رمز QR.'
        : 'Execution of bilingual Memorandum of Association with digital notarization, followed by immediate issuance of your Commercial Trade License.',
      sla: '24 to 48 Hours',
      icon: Building,
      deliverables: [
        isAr ? 'عقد تأسيس مصدق وموثق رسمياً' : 'Notarized & Attested Memorandum of Association',
        isAr ? 'الرخصة التجارية الأصلية مع رمز QR' : 'Official Commercial Trade License (PDF + QR Seal)',
        isAr ? 'شهادة السجل التجاري وعضوية الغرفة' : 'Commercial Registry & Chamber of Commerce Membership'
      ]
    },
    {
      id: 4,
      day: isAr ? 'المرحلة 04' : 'Stage 04',
      title: isAr ? 'الإقامة الذهبية وتفعيل الحساب البنكي' : 'VIP Residency Visa & Tier-1 Corporate Bank IBAN',
      desc: isAr 
        ? 'مرافقة VIP للفحص الطبي وإصدار بطاقة الهوية الإماراتية، مع تفعيل الحساب البنكي التجاري النشط.'
        : 'Dedicated executive concierge for 2-hour VIP medical fitness, biometric Emirates ID issuance, and guaranteed corporate bank account opening with Emirates NBD / Wio.',
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
    <section id="how-we-work" className="py-24 sm:py-32 bg-[#141518] border-t border-[#2d3139] relative overflow-hidden transition-colors duration-300 font-sans text-white">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Cyber-Duck Editorial Typography */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-[#191a1e] border border-slate-700 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest shadow-sm">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'منهجية العمل والاعتمادات' : '03 / HOW WE WORK & REPEATABLE PROCESS'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-sans">
            {isAr ? 'منهجية معتمدة من 4 مراحل دقيقة' : (
              <>
                <span className="font-light text-slate-300">Our 4-stage </span>
                <span className="font-bold text-white">ISO-accredited incorporation process</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
            {isAr 
              ? 'إجراءات مبسطة وشفافة بالكامل ومدعومة بنظام إلكتروني دون الحاجة إلى معاملات ورقية معقدة.'
              : 'Combining a proven, repeatable 4-stage process with transparent client collaboration and dedicated executive concierge.'
            }
          </p>
        </div>

        {/* 4-Step Horizontal Interactive Timeline Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {steps.map((s, idx) => {
            const isCurrent = activeStep === idx;
            const Icon = s.icon;

            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(idx)}
                className={'p-5 border text-left transition-all cursor-pointer relative group flex flex-col justify-between ' + (
                  isCurrent
                    ? 'bg-[#191a1e] border-amber-400 shadow-xl'
                    : 'bg-[#191a1e]/60 border-[#2d3139] hover:border-slate-500'
                )}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={'text-xs font-mono font-bold px-2.5 py-0.5 ' + (
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-[#141518] text-slate-400 border border-[#2d3139]'
                  )}>
                    {s.day}
                  </span>

                  <div className={'p-2 ' + (
                    isCurrent ? 'bg-amber-500/15 text-amber-400' : 'bg-[#141518] text-slate-400 group-hover:text-slate-200'
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h4 className={'text-sm font-bold leading-tight ' + (
                    isCurrent ? 'text-white' : 'text-slate-300'
                  )}>
                    {s.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-emerald-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{s.sla}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Showcase Bento Card */}
        <div className="bg-[#191a1e] border border-[#2d3139] p-8 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-500 text-slate-950 shadow-md">
                Stage {steps[activeStep].id} of 4
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>SLA Guaranteed: {steps[activeStep].sla}</span>
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
              {steps[activeStep].title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {steps[activeStep].desc}
            </p>

            <div className="space-y-2.5 pt-3 border-t border-white/[0.08]">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                Official Stage Deliverables:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {steps[activeStep].deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-[#141518] border border-[#2d3139] text-xs font-medium text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#141518] border border-[#2d3139] p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Dedicated Concierge</span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-[#191a1e] text-emerald-400 font-bold border border-emerald-500/30">Live Support</span>
              </div>
              <h4 className="text-base font-bold text-white">
                Zero Physical Presence Required
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stages 1 through 3 are executed 100% remotely. You only fly to the UAE for Stage 4 (VIP Medicals & Bank KYC) with our executive driver accompanying you.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
              <button
                onClick={() => onOpenConsultation(`Roadmap Stage ${steps[activeStep].id}: ${steps[activeStep].title}`)}
                className="btn-cyber-primary w-full justify-center"
              >
                <span>Start This Stage With AM DXB</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
