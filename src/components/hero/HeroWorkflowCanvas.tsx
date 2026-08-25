import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  Building2,
  FileCheck,
  CreditCard,
  UserCheck,
  ArrowRight,
  Sparkles,
  Phone,
  Send,
  MapPin,
  ShieldCheck,
  Check,
  Zap,
  Globe,
  Award
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { TRANSLATIONS, Language } from '../../data/translations';

interface HeroWorkflowCanvasProps {
  onOpenConsultation: () => void;
  lang: Language;
}

export const HeroWorkflowCanvas: React.FC<HeroWorkflowCanvasProps> = ({
  onOpenConsultation,
  lang
}) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickType, setQuickType] = useState('Free Zone');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-license');
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1);

  // Settings toggles in node inspector
  const [includeGoldenVisa, setIncludeGoldenVisa] = useState(true);
  const [multiCurrencyBank, setMultiCurrencyBank] = useState(true);
  const [expressProcessing, setExpressProcessing] = useState(true);

  const nodes = [
    {
      id: 'node-jurisdiction',
      stepNum: 1,
      name: t.step1Title,
      type: t.step1Type,
      icon: Building2,
      color: '#0ea5e9',
      status: t.step1Status,
      desc: t.step1Desc,
      details: isRtl ? {
        'هيكل الملكية': 'ملكية أجنبية 100% للمستثمر',
        'النظام الضريبي': '0% ضريبة دخل وضريبة شركات تفضيلية',
        'المقر الرئيسي': 'مجمع الشارقة للابتكار SRTI Park',
        'الأنشطة المتاحة': 'أكثر من 2000 نشاط تجاري واستشاري'
      } : {
        'Ownership Structure': '100% Foreign Expat Equity Permitted',
        'Tax Framework': '0% Personal & Qualifying Free Zone Corporate Tax',
        'Headquarters Hub': 'SRTI Innovation Park, Sharjah UAE',
        'Activities Permitted': 'Over 2,000+ Commercial, Tech & Consulting Codes'
      }
    },
    {
      id: 'node-license',
      stepNum: 2,
      name: t.step2Title,
      type: t.step2Type,
      icon: FileCheck,
      color: '#0284c7',
      status: t.step2Status,
      desc: t.step2Desc,
      details: isRtl ? {
        'الجهة المصدرة': 'دائرة التنمية الاقتصادية / سلطة المنطقة الحرة',
        'المدة الزمنية': 'من 2 إلى 4 أيام عمل مضمونة',
        'مساحة المكتب': 'مكتب مرن أو ذكي بمجمع الشارقة للابتكار',
        'التوثيق القانوني': 'عقد تأسيس رسمي موثق حكومياً'
      } : {
        'Issuing Authority': 'Sharjah SEDD / Free Zone Authority',
        'Turnaround SLA': '2 to 4 Working Days Guaranteed',
        'Office Space': 'Flexi-Desk, Smart Office or Dedicated Suite at SRTI',
        'Legal Certification': 'Official Government Notarized MOA'
      }
    },
    {
      id: 'node-visa',
      stepNum: 3,
      name: t.step3Title,
      type: t.step3Type,
      icon: UserCheck,
      color: '#38bdf8',
      status: t.step3Status,
      desc: t.step3Desc,
      details: isRtl ? {
        'فئة التأشيرة': 'تأشيرة مستثمر / شريك / موظف',
        'مدة الصلاحية': includeGoldenVisa ? 'إقامة ذهبية لمدة 10 سنوات' : 'إقامة متجددة لمدة سنتين',
        'كفالة الأسرة': 'تأشيرات الزوجة والأبناء والوالدين',
        'خدمات العلاقات العامة': 'فحص طبي VIP ومعاملة سريعة'
      } : {
        'Visa Category': 'Investor / Partner / Employment Visa',
        'Validity Period': includeGoldenVisa ? '10-Year Golden Visa Eligible' : '2-Year Renewable Residence',
        'Family Sponsorship': 'Spouse, Children & Parents Dependent Visas',
        'PRO Concierge': 'VIP Doorstep Escort & Express Typing'
      }
    },
    {
      id: 'node-banking',
      stepNum: 4,
      name: t.step4Title,
      type: t.step4Type,
      icon: CreditCard,
      color: '#10b981',
      status: t.step4Status,
      desc: t.step4Desc,
      details: isRtl ? {
        'البنوك الشريكة': 'Wio Business، بنك الإمارات دبي الوطني، المشرق، أبوظبي الأول',
        'ميزات الحساب': multiCurrencyBank ? 'أرقام آيبان متعددة العملات (درهم، دولار، يورو)' : 'آيبان بالدرهم الإماراتي',
        'الخدمات الرقمية': 'تطبيق جوال وبطاقات ائتمان وتحويلات فورية',
        'فحص الامتثال': 'فحص متطلبات الامتثال المسبق لضمان الموافقة'
      } : {
        'Partner Banks': 'Wio Business, Emirates NBD, Mashreq, First Abu Dhabi Bank',
        'Account Features': multiCurrencyBank ? 'AED, USD, EUR, GBP Multi-Currency IBAN' : 'Standard AED IBAN',
        'Digital Banking': 'Mobile App, Virtual Corporate Debit Cards, Instant SWIFT',
        'KYC Pre-Screening': 'Zero-rejection compliance pre-check by AnalyzeMarkets'
      }
    }
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[1];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickName && quickPhone) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      setQuickName('');
      setQuickPhone('');
    }
  };

  const handleRunSimulation = () => {
    if (isRunningPipeline) return;
    setIsRunningPipeline(true);
    let step = 0;
    const interval = setInterval(() => {
      if (step < nodes.length) {
        setSelectedNodeId(nodes[step].id);
        setActiveStepIndex(step + 1);
        step++;
      } else {
        clearInterval(interval);
        setIsRunningPipeline(false);
      }
    }, 900);
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50 dark:bg-[#070b16] transition-colors duration-300">
      {/* Background Ambient Glow Orbs */}
      <div className="glow-orb-sky -top-40 -left-40 animate-pulse-glow" />
      <div className="glow-orb-cyan top-1/2 -right-40 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Hero Grid: Headline + Side Visual Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left 7 Cols: Headline & Intro */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#1e293b] text-xs text-slate-700 dark:text-slate-300 font-mono shadow-sm animate-float">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-sky-600 dark:text-sky-400 font-bold">{t.heroPill}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              {t.heroTitleLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400">
                {t.heroTitleLine2}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              {t.heroDesc}
            </p>

            {/* Feature Motion Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0e1628] p-2.5 rounded-xl border border-slate-200 dark:border-[#1e293b] shadow-sm motion-card">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t.heroCheck1}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0e1628] p-2.5 rounded-xl border border-slate-200 dark:border-[#1e293b] shadow-sm motion-card">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t.heroCheck2}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0e1628] p-2.5 rounded-xl border border-slate-200 dark:border-[#1e293b] shadow-sm motion-card">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t.heroCheck3}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0e1628] p-2.5 rounded-xl border border-slate-200 dark:border-[#1e293b] shadow-sm motion-card">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t.heroCheck4}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Button
                onClick={onOpenConsultation}
                size="md"
                variant="primary"
                className="font-mono text-xs shadow-lg shadow-sky-500/25 hover:scale-[1.02] transition-transform"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1 text-white" />
                <span>{t.heroCtaBtn}</span>
                <ArrowRight className={'w-3.5 h-3.5 ml-1 ' + (isRtl ? 'rotate-180' : '')} />
              </Button>

              <a
                href="tel:+971563396961"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-[#1e293b] hover:border-sky-500 text-xs font-mono text-slate-800 dark:text-white transition-all shadow-sm hover:scale-[1.02]"
              >
                <Phone className="w-3.5 h-3.5 text-sky-500" />
                <span dir="ltr">+971 56 339 6961</span>
              </a>
            </div>
          </div>

          {/* Right 5 Cols: Side Image & Quick Consultation Box */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Side Visual Card with UAE Skyline Background */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1e293b] shadow-2xl bg-white dark:bg-[#0e1628] motion-card group">
              <div className="h-44 w-full relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
                  alt="UAE Business Hub - Sharjah & Dubai"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 dark:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0e1628] via-white/30 dark:via-[#0e1628]/40 to-transparent" />
                
                {/* Floating Badge on Image */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/90 dark:bg-[#080d1a]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-900 dark:text-white shadow-sm">
                  <Award className="w-3.5 h-3.5 text-sky-500" />
                  <span>{t.licensedBadge}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-900 dark:text-white">
                  <div className="flex items-center gap-1.5 font-bold">
                    <MapPin className="w-3.5 h-3.5 text-sky-500" />
                    <span>SRTI Park Block B - B34-B047</span>
                  </div>
                  <Badge variant="green" size="sm" dot>{t.openNow}</Badge>
                </div>
              </div>

              {/* Consultation Form inside Card */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1e293b] pb-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                    {t.quickConsultTitle}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">{t.quickConsultSla}</span>
                </div>

                {isSubmitted ? (
                  <div className="p-4 text-center space-y-2 bg-emerald-50 dark:bg-[#111c33] rounded-xl border border-emerald-500/40 font-mono">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.quickSuccessTitle}</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      {t.quickSuccessDesc}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-2.5 font-mono text-xs">
                    <input
                      type="text"
                      required
                      value={quickName}
                      onChange={e => setQuickName(e.target.value)}
                      placeholder={t.quickNameLabel}
                      className="w-full bg-slate-50 dark:bg-[#111c33] border border-slate-200 dark:border-[#1e293b] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                    />

                    <input
                      type="tel"
                      required
                      value={quickPhone}
                      onChange={e => setQuickPhone(e.target.value)}
                      placeholder={t.quickPhoneLabel}
                      className="w-full bg-slate-50 dark:bg-[#111c33] border border-slate-200 dark:border-[#1e293b] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                    />

                    <select
                      value={quickType}
                      onChange={e => setQuickType(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#111c33] border border-slate-200 dark:border-[#1e293b] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                    >
                      <option value="Free Zone">{t.quickOptFreezone}</option>
                      <option value="Mainland">{t.quickOptMainland}</option>
                      <option value="Offshore">{t.quickOptOffshore}</option>
                      <option value="Consultancy">{t.quickOptConsultancy}</option>
                    </select>

                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      className="w-full justify-center font-mono text-xs pt-1.5"
                    >
                      <Send className={'w-3.5 h-3.5 mr-1 ' + (isRtl ? 'rotate-180' : '')} />
                      <span>{t.quickSubmitBtn}</span>
                    </Button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* UNIFIED SLEEK NODE WORKFLOW CANVAS (Fixed background & seamless dark/light styling) */}
        <div className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-[#1e293b] rounded-2xl shadow-2xl overflow-hidden mt-6">
          
          {/* Canvas Window Header Bar */}
          <div className="bg-slate-100 dark:bg-[#0e162a] px-5 py-3.5 border-b border-slate-200 dark:border-[#1e293b] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="h-4 w-[1px] bg-slate-300 dark:bg-[#1e293b]" />
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-900 dark:text-white font-bold">{t.workflowTitle}</span>
                <span className="text-sky-600 dark:text-sky-400 font-semibold">{t.workflowPipeline}</span>
                <Badge variant="green" size="sm" dot>{t.workflowLive}</Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRunSimulation}
                disabled={isRunningPipeline}
                className={'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ' + (
                  isRunningPipeline
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                    : 'bg-white dark:bg-[#15203a] text-slate-800 dark:text-white border border-slate-200 dark:border-[#273552] hover:border-sky-500'
                )}
              >
                <Play className={'w-3 h-3 text-emerald-500 ' + (isRunningPipeline ? 'animate-spin' : '')} />
                <span>{isRunningPipeline ? t.workflowRunningStep + ' ' + activeStepIndex + '...' : t.workflowSimulateBtn}</span>
              </button>

              <Button
                onClick={onOpenConsultation}
                variant="primary"
                size="sm"
                className="font-mono text-xs shadow-md"
              >
                {t.workflowIncorporateNow}
              </Button>
            </div>
          </div>

          {/* Seamless 2-Column Canvas Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            
            {/* Left 8 Cols: Unified Dark Canvas with 4 Formation Nodes */}
            <div className="lg:col-span-8 p-6 sm:p-8 relative bg-slate-50/70 dark:bg-[#0a0f1d] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#1e293b]">
              
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-4">
                <span>{t.workflowHeaderHint}</span>
                <span className="text-sky-600 dark:text-sky-400 font-bold">{t.workflowTurnkey}</span>
              </div>

              {/* 4 Nodes Grid with Sleek Contrast */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {nodes.map((node) => {
                  const Icon = node.icon;
                  const isSelected = selectedNodeId === node.id;
                  const isCurrentActive = activeStepIndex === node.stepNum && isRunningPipeline;

                  return (
                    <div
                      key={node.id}
                      onClick={() => { setSelectedNodeId(node.id); setActiveStepIndex(node.stepNum); }}
                      className={'p-5 rounded-2xl border cursor-pointer transition-all relative group motion-card ' + (
                        isSelected
                          ? 'bg-white dark:bg-[#121c33] border-sky-500 shadow-xl shadow-sky-500/15 scale-[1.01]'
                          : 'bg-white/90 dark:bg-[#0e1628] border-slate-200 dark:border-[#1e293b] hover:border-sky-400 hover:dark:bg-[#111b30]'
                      )}
                    >
                      {/* Top Node Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="p-2.5 rounded-xl transition-transform group-hover:scale-110 shadow-sm"
                            style={{ backgroundColor: node.color + '18', color: node.color }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#080d1a] border border-slate-200 dark:border-[#1e293b] text-slate-600 dark:text-slate-400">
                              {node.type}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" />
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-3 group-hover:text-sky-500 transition-colors">
                        {node.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {node.desc}
                      </p>

                      {/* Bottom Status / SLA */}
                      <div className="pt-3.5 mt-3.5 border-t border-slate-100 dark:border-[#1e293b] flex items-center justify-between text-[11px] font-mono">
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          {node.status}
                        </span>
                        <span className="text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5 transition-transform font-bold">
                          {t.workflowConfigure}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Connecting Bottom Banner */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#1e293b] flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-sky-500" />
                  <span>{t.workflowSlaBanner}</span>
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t.workflowSuccessRecord}</span>
              </div>
            </div>

            {/* Right 4 Cols: Active Node Settings & Parameter Inspector */}
            <div className="lg:col-span-4 bg-slate-100/70 dark:bg-[#0c1324] p-6 flex flex-col justify-between">
              <div className="space-y-4">
                
                <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-[#1e293b]">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-sky-600 dark:text-sky-400 font-bold tracking-wider">
                      {t.workflowInspectorTitle}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {selectedNode.name}
                    </h3>
                  </div>
                  <Badge variant="sky" size="sm">
                    {selectedNode.type}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedNode.desc}
                </p>

                {/* Interactive Toggles for Settings */}
                <div className="space-y-2.5 bg-white dark:bg-[#080d1a] p-3.5 rounded-xl border border-slate-200 dark:border-[#1e293b] shadow-sm">
                  <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold block">
                    {t.workflowOptionsTitle}
                  </span>
                  
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-700 dark:text-slate-300">{t.workflowOptGoldenVisa}</span>
                    <button
                      onClick={() => setIncludeGoldenVisa(!includeGoldenVisa)}
                      className={'w-9 h-5 rounded-full transition-colors p-0.5 cursor-pointer ' + (includeGoldenVisa ? 'bg-sky-500' : 'bg-slate-300 dark:bg-[#1e293b]')}
                    >
                      <div className={'w-4 h-4 rounded-full bg-white transition-transform ' + (includeGoldenVisa ? (isRtl ? '-translate-x-4' : 'translate-x-4') : 'translate-x-0')} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-700 dark:text-slate-300">{t.workflowOptMultiCurrency}</span>
                    <button
                      onClick={() => setMultiCurrencyBank(!multiCurrencyBank)}
                      className={'w-9 h-5 rounded-full transition-colors p-0.5 cursor-pointer ' + (multiCurrencyBank ? 'bg-sky-500' : 'bg-slate-300 dark:bg-[#1e293b]')}
                    >
                      <div className={'w-4 h-4 rounded-full bg-white transition-transform ' + (multiCurrencyBank ? (isRtl ? '-translate-x-4' : 'translate-x-4') : 'translate-x-0')} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-700 dark:text-slate-300">{t.workflowOptExpressPro}</span>
                    <button
                      onClick={() => setExpressProcessing(!expressProcessing)}
                      className={'w-9 h-5 rounded-full transition-colors p-0.5 cursor-pointer ' + (expressProcessing ? 'bg-sky-500' : 'bg-slate-300 dark:bg-[#1e293b]')}
                    >
                      <div className={'w-4 h-4 rounded-full bg-white transition-transform ' + (expressProcessing ? (isRtl ? '-translate-x-4' : 'translate-x-4') : 'translate-x-0')} />
                    </button>
                  </div>
                </div>

                {/* Parameter Details */}
                <div className="space-y-2 bg-white dark:bg-[#080d1a] p-3.5 rounded-xl border border-slate-200 dark:border-[#1e293b] font-mono text-xs shadow-sm">
                  {Object.entries(selectedNode.details).map(([k, v]) => (
                    <div key={k} className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{k}:</span>
                      <span className="text-xs text-slate-900 dark:text-white font-semibold block">{v}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200 dark:border-[#1e293b]">
                <Button
                  onClick={onOpenConsultation}
                  variant="primary"
                  size="sm"
                  className="w-full justify-center font-mono text-xs shadow-md"
                >
                  <span>{t.workflowApplyBtn}</span>
                  <ArrowRight className={'w-3.5 h-3.5 ml-1 ' + (isRtl ? 'rotate-180' : '')} />
                </Button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
