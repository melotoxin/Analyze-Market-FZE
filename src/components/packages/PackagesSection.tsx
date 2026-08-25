import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CheckCircle2, ArrowRight, Building, Globe, Shield, Briefcase, Sparkles, Check, Clock, Phone, MessageCircle, GitFork } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../data/translations';

interface PackagesSectionProps {
  onSelectPackage: (packageName: string) => void;
  lang: Language;
  currency: string;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onSelectPackage,
  lang,
  currency
}) => {
  const t = TRANSLATIONS[lang];
  const isAr = lang === 'ar';

  const packages = [
    {
      id: 'freezone',
      title: isAr ? 'شركات المناطق الحرة' : 'Free Zone Companies',
      subtitle: isAr ? 'ملكية أجنبية 100% وإعفاءات ضريبية شاملة' : '100% Expat Ownership & QFZP Tax Perks',
      badge: isAr ? 'الأكثر طلباً' : 'Most Popular',
      popular: true,
      price: currency === 'USD' ? '$3,400' : currency === 'EUR' ? '€3,150' : 'AED 12,500',
      turnaround: '2 - 4 Business Days',
      types: isAr
        ? ['مؤسسة منطقة حرة (مساهم فردي FZE)', 'شركة منطقة حرة (مساهمين متعددين FZC)', 'فرع شركة محلية أو أجنبية']
        : ['Free Zone Establishment (FZE - Solo)', 'Free Zone Corporation (FZC - Multi-Shareholder)', 'Branch of Foreign / Local Company'],
      features: isAr
        ? ['تحويل كامل للأرباح ورأس المال بنسبة 100%', '0% ضريبة دخل شخصي ومزايا ضريبية تفضيلية', 'أكثر من 40 منطقة حرة معتمدة في الإمارات السبع', 'مساعدة مباشرة وسريعة لفتح الحساب البنكي']
        : ['100% Repatriation of Capital & Profits', '0% Personal Tax & QFZP Corporate Exemptions', 'Over 40+ Established Free Zones across UAE', 'Guaranteed Corporate Bank Account Support'],
      icon: Globe
    },
    {
      id: 'mainland',
      title: isAr ? 'شركات البر الرئيسي (LLC)' : 'Mainland LLC Companies',
      subtitle: isAr ? 'تجارة حرة ومباشرة داخل السوق الإماراتي والخليجي' : 'Unrestricted Direct UAE & GCC Trade',
      badge: isAr ? 'عقود حكومية' : 'Gov & Local Contracts',
      popular: false,
      price: currency === 'USD' ? '$5,000' : currency === 'EUR' ? '€4,650' : 'AED 18,500',
      turnaround: '4 - 7 Business Days',
      types: isAr
        ? ['شركة ذات مسؤولية محدودة (LLC)', 'فرع ومكتب تمثيل تجاري', 'شركة مهنية / مؤسسة فردية']
        : ['Limited Liability Company (LLC)', 'Branch & Representative Office', 'Civil & Professional Firm Setup'],
      features: isAr
        ? ['ممارسة التجارة بحرية في أي مكان داخل الإمارات', 'المشاركة في المناقصات والعقود الحكومية', 'تأشيرات عمل بلا سقف (مرتبطة بمساحة المكتب)', 'توثيق رسمي لدى دوائر التنمية الاقتصادية (DED)']
        : ['Trade anywhere inside UAE Mainland & GCC', 'Direct participation in Government Tenders', 'No visa cap (linked to physical office space)', 'Full DED / DET Commercial Licensing Clearance'],
      icon: Building
    },
    {
      id: 'offshore',
      title: isAr ? 'الشركات الخارجية والقابضة' : 'Offshore & Holding Entities',
      subtitle: isAr ? 'حماية الأصول وهيكلة الملكية الدولية' : 'Asset Protection & Tax Structuring',
      badge: isAr ? 'حماية الأصول' : 'Asset Protection',
      popular: false,
      price: currency === 'USD' ? '$3,800' : currency === 'EUR' ? '€3,500' : 'AED 14,000',
      turnaround: '3 - 5 Business Days',
      types: isAr
        ? ['شركة أوفشور جافزا (JAFZA Offshore)', 'شركة رأس الخيمة الدولية (RAK ICC)', 'كيانات الأغراض الخاصة (ADGM / DIFC SPV)']
        : ['JAFZA Offshore Entity', 'RAK ICC International Business Company', 'ADGM / DIFC Special Purpose Vehicle (SPV)'],
      features: isAr
        ? ['هيكل ملكية مثالي للعقارات والأصول العالمية', 'سرية مصرفية وقانونية كاملة', 'حسابات بنكية دولية متعددة العملات', 'لا تشترط وجود مكتب فعلي داخل الدولة']
        : ['Global Real Estate & Asset Holding Structure', 'Statutory Privacy & Confidentiality', 'Multi-currency International Bank Accounts', 'No Physical Office Requirement in UAE'],
      icon: Shield
    },
    {
      id: 'dual-license',
      title: isAr ? 'الرخص المزدوجة والفروع' : 'Dual License & Branches',
      subtitle: isAr ? 'الجمع بين مزايا المنطقة الحرة والتجارة البرية' : 'Free Zone Base + Mainland Reach',
      badge: isAr ? 'توسع مرن' : 'Enterprise Growth',
      popular: false,
      price: currency === 'USD' ? '$6,200' : currency === 'EUR' ? '€5,800' : 'AED 22,800',
      turnaround: '5 - 8 Business Days',
      types: isAr
        ? ['رخصة مزدوجة مشتركة (Dual License)', 'فرع شركة أجنبية دولية', 'فرع شركة قائمة في منطقة حرة']
        : ['Dual Licensing Framework', 'Branch of Foreign International Firm', 'Mainland Branch of Existing Free Zone Co'],
      features: isAr
        ? ['الاستفادة من الحوافز الضريبية والوصول للمستهلك المحلي', 'مكتب رئيسي موحد دون تكرار التكاليف', 'تأشيرات وإقامات مرنة لكبار التنفيذيين', 'تمثيل تجاري رسمي بكافة الدوائر الحكومية']
        : ['Combine Free Zone tax perks with Mainland local sales', 'Single centralized operations hub without duplicate overhead', 'Flexible executive residence visa quotas', 'Direct commercial representation across all ministries'],
      icon: GitFork
    }
  ];

  return (
    <section id="packages" className="py-24 sm:py-32 bg-[#060913] border-t border-white/[0.08] relative overflow-hidden transition-colors duration-300 font-sans">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with n8n typography */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-sky-500/30 text-xs font-mono font-bold text-sky-400 uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{isAr ? 'باقات التأسيس المتكاملة' : 'Turnkey Incorporation Packages'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-sans">
            {isAr ? 'باقات تأسيس شفافة وشاملة' : (
              <>
                <span className="font-light text-slate-300">All-inclusive packages </span>
                <span className="font-bold text-white">built for global founders</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            {isAr 
              ? 'أسعار شفافة تشمل كافة الرسوم الحكومية، والتسجيل التجاري، وتوثيق عقود التأسيس، وتفعيل الحسابات البنكية.'
              : 'Transparent corporate packages with zero hidden fees. Includes trade license, notarized MOA, VIP investor visas, and tier-1 banking setup.'
            }
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg) => {
            const Icon = pkg.icon;

            return (
              <div
                key={pkg.id}
                className={'bg-[#0b1329] border rounded-3xl p-6 flex flex-col justify-between transition-all group motion-card relative ' + (
                  pkg.popular
                    ? 'border-sky-400 shadow-2xl shadow-sky-500/15'
                    : 'border-white/[0.08] hover:border-sky-500/50'
                )}
              >
                {/* Popular Glow Indicator */}
                {pkg.popular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold font-mono text-[10px] uppercase tracking-wider shadow-md">
                    {pkg.badge}
                  </div>
                )}

                <div className="space-y-4">
                  
                  {/* Top Header with Icon */}
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-2xl bg-sky-500/15 text-sky-400 border border-sky-500/20 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    {!pkg.popular && (
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-white/[0.08]">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-sans group-hover:text-sky-300 transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Price Banner */}
                  <div className="p-3.5 bg-[#080e20] rounded-2xl border border-white/[0.08] space-y-1 font-mono">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Starting Investment:</span>
                    <span className="text-2xl font-black text-white block">{pkg.price}</span>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 pt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.turnaround}</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                    <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
                      Included Deliverables:
                    </span>
                    <ul className="space-y-2">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Bottom CTA */}
                <div className="pt-6 mt-6 border-t border-white/[0.08]">
                  <Button
                    onClick={() => onSelectPackage(pkg.title)}
                    variant={pkg.popular ? 'primary' : 'secondary'}
                    size="md"
                    className="w-full justify-center text-xs font-bold shadow-md py-2.5"
                  >
                    <span>{isAr ? 'طلب التأسيس الآن' : 'Incorporate Now'}</span>
                    <ArrowRight className={'w-3.5 h-3.5 ml-1.5 ' + (isAr ? 'rotate-180' : '')} />
                  </Button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
