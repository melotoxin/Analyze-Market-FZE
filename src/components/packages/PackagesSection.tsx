import React from 'react';
import { CheckCircle2, ArrowRight, Building, Globe, Shield, Clock, GitFork, Layers } from 'lucide-react';
import { formatMoney } from '../../data/pricing';
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
      subtitle: isAr ? 'ملكية أجنبية 100% وإعفاءات ضريبية شاملة' : '100% Expat Ownership & 0% QFZP Tax',
      badge: isAr ? 'الأكثر طلباً' : 'Most Popular',
      popular: true,
      price: formatMoney(11500, currency),
      turnaround: '2 - 4 Business Days',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
      features: isAr
        ? ['تحويل كامل للأرباح ورأس المال بنسبة 100%', '0% ضريبة دخل شخصي ومزايا ضريبية تفضيلية', 'أكثر من 40 منطقة حرة معتمدة في الإمارات السبع', 'مساعدة مباشرة وسريعة لفتح الحساب البنكي']
        : ['100% Repatriation of Capital & Profits', '0% Personal Tax & 0% QFZP Corporate Tax', 'Access to 40+ Established Free Zones', 'Guaranteed Corporate Bank Account Support'],
      icon: Globe
    },
    {
      id: 'mainland',
      title: isAr ? 'شركات البر الرئيسي (LLC)' : 'Mainland LLC Companies',
      subtitle: isAr ? 'تجارة حرة ومباشرة داخل السوق الإماراتي والخليجي' : 'Unrestricted Direct UAE & GCC Trade',
      badge: isAr ? 'عقود حكومية' : 'Gov & Local Contracts',
      popular: false,
      price: formatMoney(17500, currency),
      turnaround: '4 - 7 Business Days',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      features: isAr
        ? ['ممارسة التجارة بحرية في أي مكان داخل الإمارات', 'المشاركة في المناقصات والعقود الحكومية', 'تأشيرات عمل بلا سقف (مرتبطة بمساحة المكتب)', 'توثيق رسمي لدى دوائر التنمية الاقتصادية (DED)']
        : ['Trade anywhere inside UAE Mainland & GCC', 'Direct participation in Government Tenders', 'Uncapped visa quota (linked to lease size)', 'Official DED / DET Commercial Licensing Clearance'],
      icon: Building
    },
    {
      id: 'offshore',
      title: isAr ? 'الشركات الخارجية والقابضة' : 'Offshore & Holding Entities',
      subtitle: isAr ? 'حماية الأصول وهيكلة الملكية الدولية' : 'Asset Protection & International Holdings',
      badge: isAr ? 'حماية الأصول' : 'Asset Protection',
      popular: false,
      price: formatMoney(13500, currency),
      turnaround: '3 - 5 Business Days',
      image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=600&q=80',
      features: isAr
        ? ['هيكل ملكية مثالي للعقارات والأصول العالمية', 'سرية مصرفية وقانونية كاملة', 'حسابات بنكية دولية متعددة العملات', 'لا تشترط وجود مكتب فعلي داخل الدولة']
        : ['Global Real Estate & Asset Holding Structure', 'Statutory Privacy & Shareholder Protection', 'Multi-currency International Bank Accounts', 'No Physical Office Requirement in UAE'],
      icon: Shield
    },
    {
      id: 'dual-license',
      title: isAr ? 'الرخص المزدوجة والفروع' : 'Dual License & Branches',
      subtitle: isAr ? 'الجمع بين مزايا المنطقة الحرة والتجارة البرية' : 'Free Zone Base + Mainland Reach',
      badge: isAr ? 'توسع مرن' : 'Enterprise Growth',
      popular: false,
      price: formatMoney(22800, currency),
      turnaround: '5 - 8 Business Days',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80',
      features: isAr
        ? ['الاستفادة من الحوافز الضريبية والوصول للمستهلك المحلي', 'مكتب رئيسي موحد دون تكرار التكاليف', 'تأشيرات وإقامات مرنة لكبار التنفيذيين', 'تمثيل تجاري رسمي بكافة الدوائر الحكومية']
        : ['Combine Free Zone tax perks with Mainland local sales', 'Single operations hub without duplicate overhead', 'Flexible executive residence visa quotas', 'Direct representation across federal ministries'],
      icon: GitFork
    }
  ];

  return (
    <section id="packages" className="py-20 sm:py-28 bg-white border-b border-slate-200 font-sans text-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-mono font-bold text-slate-700">
            <Layers className="w-3.5 h-3.5 text-slate-700" />
            <span>04 / Turnkey Packages</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight font-sans">
            {isAr ? 'باقات تأسيس شفافة وشاملة' : 'Transparent incorporation packages'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            {isAr 
              ? 'أسعار واضحة تشمل كافة الرسوم الحكومية، والتسجيل التجاري، وتوثيق عقود التأسيس، وتفعيل الحسابات البنكية.'
              : 'Fixed corporate packages with zero hidden fees. Includes commercial license, notarized MOA, VIP investor visas, and Tier-1 banking setup.'
            }
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => {
            const Icon = pkg.icon;

            return (
              <div
                key={pkg.id}
                className={'bg-[#FBFBFA] border rounded-2xl overflow-hidden flex flex-col justify-between transition-all group relative shadow-sm hover:shadow-md ' + (
                  pkg.popular
                    ? 'border-slate-900 ring-1 ring-slate-900 bg-white'
                    : 'border-slate-200 hover:border-slate-400'
                )}
              >
                {/* Visual Photographic Header */}
                <div className="h-36 relative overflow-hidden bg-slate-100">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-white/90 text-slate-900 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    {pkg.popular ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono text-[10px] uppercase font-bold tracking-wider shadow-sm">
                        {pkg.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/90 text-slate-700 font-medium shadow-sm">
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-sans">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Price Banner */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1 font-mono">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Starting Fee:</span>
                    <span className="text-2xl font-black text-slate-950 block tracking-tight">{pkg.price}</span>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 pt-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{pkg.turnaround}</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-3 border-t border-slate-200">
                    <span className="text-[11px] font-mono uppercase text-slate-500 font-bold block">
                      Included Deliverables:
                    </span>
                    <ul className="space-y-2">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom CTA */}
                  <div className="pt-4 mt-4 border-t border-slate-200">
                    <button
                      onClick={() => onSelectPackage(pkg.title)}
                      className={'w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ' + (
                        pkg.popular
                          ? 'bg-slate-900 hover:bg-slate-800 text-white'
                          : 'bg-white hover:bg-slate-100 border border-slate-300 text-slate-900'
                      )}
                    >
                      <span>{isAr ? 'طلب التأسيس الآن' : 'Incorporate Now'}</span>
                      <ArrowRight className={'w-3.5 h-3.5 ' + (isAr ? 'rotate-180' : '')} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
