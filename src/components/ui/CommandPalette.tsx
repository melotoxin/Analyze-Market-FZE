import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Building2, 
  Award, 
  Receipt, 
  Calculator, 
  RefreshCw, 
  FileCheck2, 
  XCircle, 
  Globe, 
  DollarSign, 
  Moon, 
  Sun, 
  LayoutDashboard, 
  PhoneCall, 
  Sparkles, 
  X,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { ServiceSlug } from '../../data/servicesData';
import { Language } from '../../data/translations';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateService: (slug: ServiceSlug) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenConsultation: (pkg?: string) => void;
  onOpenAdmin: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  lang: Language;
  onToggleLang: () => void;
  currency: string;
  onSetCurrency: (curr: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateService,
  onNavigateSection,
  onOpenConsultation,
  onOpenAdmin,
  isDarkMode,
  onToggleTheme,
  lang,
  onToggleLang,
  currency,
  onSetCurrency,
}) => {
  const [query, setQuery] = useState('');
  const isAr = lang === 'ar';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          setQuery('');
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    // Sections & Tools
    {
      category: isAr ? 'أدوات المنصة' : 'Platform Tools',
      items: [
        {
          id: 'cost-calculator',
          title: isAr ? 'حاسبة تكاليف وضريبة الشركات' : 'Interactive UAE Cost & Tax Visualizer',
          sub: isAr ? 'محاكاة فورية لرسوم التأسيس والتأشيرات' : 'Simulate setup investment, office tier, and 9% tax',
          icon: Calculator,
          action: () => { onNavigateSection('cost-calculator'); onClose(); },
          badge: 'Simulator'
        },
        {
          id: 'roadmap',
          title: isAr ? 'خارطة طريق التأسيس في 7 أيام' : 'Turnkey 7-Day Formation Roadmap',
          sub: isAr ? 'مراحل التأسيس مع الضمان الزمني SLA' : '5-step milestone journey with SLA guarantees',
          icon: TrendingUp,
          action: () => { onNavigateSection('roadmap'); onClose(); },
          badge: 'SLA'
        },
        {
          id: 'freezones-dir',
          title: isAr ? 'دليل 40+ منطقة حرة بالإمارات' : 'Explore 40+ UAE Free Zones',
          sub: isAr ? 'مقارنة الشارقة ودبي ورأس الخيمة وعجمان' : 'Compare license fees, quotas, and activities',
          icon: Globe,
          action: () => { onNavigateSection('freezones'); onClose(); },
          badge: '40+ Zones'
        },
        {
          id: 'packages-dir',
          title: isAr ? 'باقات التأسيس المتكاملة' : 'Turnkey Corporate Packages',
          sub: isAr ? 'أسعار شاملة وثابتة بدون رسوم خفية' : 'Sharjah, Dubai, Mainland LLC, Dual License',
          icon: Sparkles,
          action: () => { onNavigateSection('packages'); onClose(); },
          badge: 'Fixed Pricing'
        }
      ]
    },
    // Official Corporate Services
    {
      category: isAr ? 'الخدمات المعتمدة (7)' : 'Official Corporate Services (7)',
      items: [
        {
          id: 'golden-visa',
          title: isAr ? 'خدمات الإقامة الذهبية (10 سنوات)' : 'Golden Visa Services (10-Year)',
          sub: isAr ? 'كفالة عائلية كاملة وبدون كفيل محلي' : 'Real estate investors, founders & executives',
          icon: Award,
          action: () => { onNavigateService('golden-visa-services'); onClose(); },
          badge: '10-Year'
        },
        {
          id: 'tax-vat',
          title: isAr ? 'ضريبة الشركات والقيمة المضافة' : 'VAT & Corporate Tax Filing (9%)',
          sub: isAr ? 'وكيل ضريبي معتمد لدى الهيئة الاتحادية للضرائب' : 'FTA registration, TRN, and QFZP 0% relief',
          icon: Receipt,
          action: () => { onNavigateService('vat-corporate-tax-filing-services'); onClose(); },
          badge: 'FTA Agent'
        },
        {
          id: 'incorp',
          title: isAr ? 'تأسيس الشركات وإصدار التراخيص' : 'Company Incorporation (Mainland & Free Zone)',
          sub: isAr ? 'ملكية أجنبية 100% وحساب بنكي مؤهل' : '100% expat ownership & tier-1 corporate banking',
          icon: Building2,
          action: () => { onNavigateService('company-incorporation'); onClose(); },
          badge: 'Turnkey'
        },
        {
          id: 'pro-renewal',
          title: isAr ? 'تجديد الرخص وخدمات العلاقات العامة' : 'Trade License Renewal & PRO Services',
          sub: isAr ? 'توثيق إيجاري وبطاقة المنشأة والتعديلات' : 'Fast-track renewal & corporate amendments',
          icon: RefreshCw,
          action: () => { onNavigateService('license-renewal-pro-services'); onClose(); },
          badge: 'Annual'
        },
        {
          id: 'liquidation',
          title: isAr ? 'تصفية وإلغاء تسجيل الشركات' : 'Company Liquidation Services',
          sub: isAr ? 'مصفٍ قانوني معتمد وشهادات براءة ذمة' : 'Official liquidator report & Ministry clearance',
          icon: XCircle,
          action: () => { onNavigateService('company-liquidation-services'); onClose(); },
          badge: 'Legal'
        },
        {
          id: 'audit',
          title: isAr ? 'التدقيق والضمان المالي المعتمد' : 'Audit & Assurance Services',
          sub: isAr ? 'تقارير تدقيق معتمدة ومقبولة بنكياً' : 'Statutory audit accepted by all UAE banks',
          icon: FileCheck2,
          action: () => { onNavigateService('audit-and-assurance-services'); onClose(); },
          badge: 'Assurance'
        }
      ]
    },
    // Quick Actions
    {
      category: isAr ? 'إجراءات سريعة' : 'Quick Actions',
      items: [
        {
          id: 'book-call',
          title: isAr ? 'حجز موعد استشارة تنفيذية' : 'Book Executive Consultation',
          sub: isAr ? 'تواصل مباشر مع مستشارينا في مجمع الشارقة للابتكار' : 'Connect directly with senior directors at SRTI Park',
          icon: PhoneCall,
          action: () => { onOpenConsultation(); onClose(); },
          badge: 'Direct'
        },
        {
          id: 'admin-crm',
          title: isAr ? 'لوحة تحكم المبيعات (Admin CRM)' : 'Admin Sales CRM Dashboard',
          sub: isAr ? 'إدارة الطلبات والعملاء المحتملين' : 'Pipeline manager & lead conversion hub',
          icon: LayoutDashboard,
          action: () => { onOpenAdmin(); onClose(); },
          badge: 'Staff'
        }
      ]
    }
  ];

  const filteredCategories = items.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.sub.toLowerCase().includes(query.toLowerCase()) ||
      item.badge.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#070e22] border border-slate-200 dark:border-sky-500/30 rounded-3xl shadow-2xl overflow-hidden font-sans animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative p-4 sm:p-5 border-b border-slate-200 dark:border-white/[0.08] flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={isAr ? 'ابحث في الخدمات، المناطق الحرة، التكاليف، أو الإجراءات...' : 'Search services, free zones, tax calculator, or actions (Ctrl+K)...'}
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 sm:p-4 space-y-4">
          {filteredCategories.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-mono text-xs">
              {isAr ? 'لم يتم العثور على نتائج مطابقة' : 'No matching services or tools found'}
            </div>
          ) : (
            filteredCategories.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 block">
                  {cat.category}
                </span>

                <div className="space-y-1">
                  {cat.items.map(item => {
                    const ItemIcon = item.icon;

                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        className="w-full p-3 rounded-2xl flex items-center justify-between gap-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/[0.06]"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-slate-900 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-white/10 group-hover:scale-105 transition-transform shrink-0">
                            <ItemIcon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors truncate">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {item.sub}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08]">
                            {item.badge}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 font-bold">ESC</kbd>
            <span>to close</span>
          </div>
          <span>AnalyzeMarkets FZE Enterprise Suite</span>
        </div>

      </div>

    </div>
  );
};
