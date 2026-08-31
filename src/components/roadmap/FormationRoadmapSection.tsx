import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Building, 
  CreditCard, 
  Layers
} from 'lucide-react';
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
        : 'Analysis of commercial activities, shareholder structure, and selection of the optimal Free Zone vs Mainland jurisdiction for 0% tax eligibility.',
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
        : 'Dedicated executive concierge for VIP medical fitness, biometric Emirates ID issuance, and corporate bank account opening with Emirates NBD / Wio.',
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
    <section id="how-we-work" className="py-20 sm:py-28 bg-[#FBFBFA] border-b border-slate-200 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-mono font-bold text-slate-700">
            <Layers className="w-3.5 h-3.5 text-slate-700" />
            <span>03 / How We Work</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight font-sans">
            {isAr ? 'منهجية معتمدة من 4 مراحل دقيقة' : 'Our 4-stage incorporation process'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            {isAr 
              ? 'إجراءات مبسطة وشفافة بالكامل ومدعومة بنظام إلكتروني دون الحاجة إلى معاملات ورقية معقدة.'
              : 'A structured, repeatable process with transparent milestone tracking and dedicated executive support.'
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
                className={'p-5 rounded-xl border text-start transition-all cursor-pointer relative group flex flex-col justify-between ' + (
                  isCurrent
                    ? 'bg-white border-slate-900 shadow-md ring-1 ring-slate-900'
                    : 'bg-white/80 border-slate-200 hover:border-slate-400'
                )}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={'text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ' + (
                    isCurrent
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600'
                  )}>
                    {s.day}
                  </span>

                  <div className={'p-2 rounded-lg ' + (
                    isCurrent ? 'bg-slate-100 text-slate-900' : 'bg-slate-50 text-slate-400 group-hover:text-slate-700'
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className={'text-sm font-bold leading-tight ' + (
                    isCurrent ? 'text-slate-900' : 'text-slate-700'
                  )}>
                    {s.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-emerald-700 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{s.sla}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-900 text-white rounded-full">
                Stage {steps[activeStep].id} of 4
              </span>
              <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>SLA: {steps[activeStep].sla}</span>
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
              {steps[activeStep].title}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {steps[activeStep].desc}
            </p>

            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <span className="text-xs font-mono uppercase text-slate-500 font-bold block">
                Stage Deliverables:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {steps[activeStep].deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 uppercase">Concierge Support</span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-bold border border-emerald-200">Active</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                100% Remote Preparation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stages 1 through 3 are executed remotely. You only visit the UAE for Stage 4 (VIP Medical & Bank KYC) accompanied by our executive concierge.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenConsultation(`Roadmap Stage ${steps[activeStep].id}: ${steps[activeStep].title}`)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>Initiate This Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
