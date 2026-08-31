import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Mail } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';
import {
  ADVISORY_EMAIL,
  openAdvisoryEmail,
  openAdvisoryWhatsApp,
} from '../../utils/submitLead';

interface FaqSectionProps {
  onOpenConsultation: () => void;
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onOpenConsultation,
  lang
}) => {
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: isAr ? 'هل يمكن للأجانب امتلاك الشركة بنسبة 100% دون كفيل محلي؟' : 'Can foreigners own 100% of a UAE company without a local sponsor?',
      a: isAr 
        ? 'نعم، بموجب التحديثات القانونية الأخيرة في دولة الإمارات، يحق للمستثمرين الأجانب امتلاك 100% من أسهم الشركات سواء في المناطق الحرة أو في معظم أنشطة البر الرئيسي (Mainland) دون اشتراط شريك أو وكيل خدمات مواطن.'
        : 'Yes. Under federal commercial law amendments, foreign nationals can own 100% of their company in all UAE Free Zones and across more than 1,000 commercial and industrial Mainland activities with zero local sponsor equity required.'
    },
    {
      q: isAr ? 'كيف يتم التعامل مع ضريبة الشركات (Corporate Tax) في المناطق الحرة؟' : 'How does the 9% UAE Corporate Tax apply to Free Zone companies?',
      a: isAr 
        ? 'تستفيد الشركات المؤهلة في المناطق الحرة (QFZP) من نسبة ضريبة 0% على الدخل المؤهل الناتج عن المعاملات مع كيانات خارج الدولة أو داخل المناطق الحرة المؤهلة، مع الالتزام بمتطلبات الوجود الاقتصادي الفعلي والتدقيق المحاسبي.'
        : 'Qualifying Free Zone Persons (QFZP) benefit from a 0% corporate tax rate on qualifying income derived from transactions with foreign entities and other Free Zone entities, provided they maintain adequate substance and audited financial records.'
    },
    {
      q: isAr ? 'ما هي المدة الزمنية اللازمة لإصدار الرخصة التجارية والإقامة؟' : 'What is the realistic timeline for trade license and residency visa issuance?',
      a: isAr 
        ? 'يتم إصدار الرخصة التجارية والموافقة الأمنية خلال 2 إلى 4 أيام عمل. وتستغرق إجراءات تأشيرة الإقامة والهوية الإماراتية والفحص الطبي VIP من 3 إلى 5 أيام إضافية.'
        : 'Trade license issuance typically takes 2 to 4 business days. Investor/employment residence visas and Emirates ID biometrics take an additional 3 to 5 business days with our VIP medical fast-track service.'
    },
    {
      q: isAr ? 'هل فتح الحساب البنكي التجاري مضمون للشركات الجديدة؟' : 'Is corporate bank account opening guaranteed for new startups?',
      a: isAr 
        ? 'نعمل بشكل مباشر مع شركائنا المصرفيين مثل Wio Business و Emirates NBD و Mashreq Bank. نقوم بإعداد الملف التعريفي والتحقق المسبق من النشاط لضمان أعلى معدل قبول ومطابقة يتجاوز 99%.'
        : 'We maintain direct compliance channels with UAE banking partners (Wio Bank, Emirates NBD, Mashreq). We pre-screen your business model, source of funds, and compliance dossier to achieve a 99%+ first-time approval rate.'
    },
    {
      q: isAr ? 'أين يقع المقر الرئيسي لشركة أنالايز ماركتس (AnalyzeMarkets FZE)؟' : 'Where is AnalyzeMarkets FZE officially located and licensed?',
      a: isAr 
        ? 'يقع مقرنا الرئيسي في مجمع الشارقة للبحوث والتكنولوجيا والابتكار (SRTI Park)، المبنى B - المكتب B34-B047، ومرخصون رسمياً لتقديم خدمات الاستشارات الإدارية وأبحاث الأسواق وتأسيس الشركات.'
        : 'Our headquarters is based in Sharjah Research Technology & Innovation Park (SRTI Park), Block B - Office B34-B047, officially accredited for management consultancy, market research, and corporate structuring services.'
    }
  ];

  const faqAdvisory = {
    name: 'Prospective client',
    phone: 'To be provided',
    service: 'FAQ advisory enquiry',
    notes: 'Reached via FAQ section — seeking guidance on UAE company formation.',
  };

  const contactBtn =
    'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs transition-all duration-200 shadow-sm motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer';

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white border-b border-slate-200 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Heading & Support Card */}
          <div className="lg:col-span-5 space-y-6 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-mono font-bold text-slate-700">
              <HelpCircle className="w-3.5 h-3.5 text-slate-700" />
              <span>10 / Frequently Asked Questions</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight font-sans">
              {isAr ? 'كل ما تحتاج معرفته عن التأسيس في الإمارات' : 'Clear answers for international founders'}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {isAr 
                ? 'إجابات رسمية ومباشرة حول القوانين والضرائب والحسابات البنكية والإقامة الذهبية.'
                : 'Direct answers to critical questions about 100% expat ownership, corporate tax exemptions, banking clearance, and legal licensing.'
              }
            </p>

            {/* Direct Contact Card */}
            <div className="bg-[#FBFBFA] border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Need immediate guidance on your case?</span>
              </div>
              <p className="text-xs text-slate-600">
                Speak directly with an accredited senior formation director in Sharjah or Dubai.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => openAdvisoryWhatsApp(faqAdvisory)}
                  className={`${contactBtn} bg-emerald-600 hover:bg-emerald-500 text-white focus-visible:ring-emerald-500`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'واتساب المستشار' : 'WhatsApp Senior Advisor'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => openAdvisoryEmail(faqAdvisory)}
                  className={`${contactBtn} bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 hover:border-slate-400 focus-visible:ring-slate-400`}
                >
                  <Mail className="w-4 h-4" />
                  <span>{isAr ? 'بريد المستشار' : 'Email Senior Advisor'}</span>
                </button>
              </div>
              <p className="text-[10px] text-slate-500 font-mono">
                {isAr ? 'البريد:' : 'Email:'}{' '}
                <a
                  href={`mailto:${ADVISORY_EMAIL}`}
                  className="text-slate-700 hover:text-emerald-700 hover:underline"
                >
                  {ADVISORY_EMAIL}
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className={'border rounded-xl overflow-hidden transition-all ' + (
                    isOpen
                      ? 'bg-white border-slate-900 shadow-sm'
                      : 'bg-[#FBFBFA] border-slate-200 hover:border-slate-400'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-start flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900 font-sans leading-snug">
                      {faq.q}
                    </span>
                    <div className={'p-1.5 rounded-lg border shrink-0 transition-colors ' + (
                      isOpen ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-100 text-slate-600 border-slate-200'
                    )}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
