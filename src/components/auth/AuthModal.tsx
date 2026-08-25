import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { User, Lock, Mail, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Building2, Key, LayoutDashboard } from 'lucide-react';
import { Language } from '../../data/translations';

export interface UserSession {
  name: string;
  email: string;
  role: string;
  company: string;
  activeAppId: string;
  isAdmin?: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserSession) => void;
  onOpenAdmin?: () => void;
  lang: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenAdmin,
  lang
}) => {
  const isAr = lang === 'ar';
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg(isAr ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter your email and password');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      const session: UserSession = {
        name: name || (email.split('@')[0].toUpperCase()),
        email: email,
        role: 'Client / Investor',
        company: company || 'Horizon Global Holdings',
        activeAppId: 'SRTI-FZE-8492'
      };
      onLoginSuccess(session);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      onClose();
    }, 800);
  };

  const handleDemoInvestor = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const session: UserSession = {
        name: isAr ? 'طارق المنصور' : 'Tariq Al-Mansoor',
        email: 'tariq.mansoor@horizoninvest.ae',
        role: isAr ? 'مستثمر / شريك مؤسس' : 'Partner / Investor',
        company: isAr ? 'مجموعة هورايزون للاستثمار' : 'Horizon Investment Group',
        activeAppId: 'SRTI-FZE-8492'
      };
      onLoginSuccess(session);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      onClose();
    }, 600);
  };

  const handleAdminLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const session: UserSession = {
        name: 'AnalyzeMarkets Director',
        email: 'admin@analyzemarkets.com',
        role: 'Corporate Managing Director',
        company: 'AnalyzeMarkets FZE (SRTI Park)',
        activeAppId: 'ADMIN-PORTAL-ACTIVE',
        isAdmin: true
      };
      onLoginSuccess(session);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      onClose();
      if (onOpenAdmin) onOpenAdmin();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isRegisterMode ? (isAr ? 'إنشاء حساب مستثمر جديد' : 'Create Investor Account') : (isAr ? 'تسجيل الدخول إلى البوابة' : 'Client & Admin Portal Sign In')}
      subtitle={isAr ? 'بوابة إدارة التراخيص والتأشيرات - أنالايز ماركتس ش.م.ح' : 'AnalyzeMarkets FZE - Incorporation & Visa Management Hub'}
      maxWidth="md"
    >
      <div className="space-y-4 font-mono text-xs">
        
        {/* Quick 1-Click Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleDemoInvestor}
            className="p-3 bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 rounded-xl text-left hover:border-sky-500 transition-colors cursor-pointer"
          >
            <span className="text-[11px] font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>Investor Demo</span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 font-sans">
              Client VDR with active license
            </span>
          </button>

          <button
            type="button"
            onClick={handleAdminLogin}
            className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 rounded-xl text-left hover:border-emerald-500 transition-colors cursor-pointer"
          >
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-500" />
              <span>Admin Sales CRM</span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 font-sans">
              Manage all client sales & requests
            </span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 rounded-lg text-xs">
            {errorMsg}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          {isRegisterMode && (
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase block">
                {isAr ? 'الاسم الكامل *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isAr ? 'طارق المنصور' : 'Tariq Al-Mansoor'}
                className="w-full bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-[#1e293b] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase block">
              {isAr ? 'البريد الإلكتروني للعمل *' : 'Corporate Work Email *'}
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAr ? 'investor@company.ae' : 'partner@fund.ae'}
                className="w-full bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-[#1e293b] rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase block">
              {isAr ? 'كلمة المرور *' : 'Password *'}
            </label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-[#1e293b] rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>

          {isRegisterMode && (
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase block">
                {isAr ? 'اسم الشركة أو الصندوق' : 'Company / Fund Name'}
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Horizon Capital"
                className="w-full bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-[#1e293b] rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          )}

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-sky-500" />
              <span>{isAr ? 'تذكرني' : 'Remember Me'}</span>
            </label>
            <a href="#" className="text-sky-600 dark:text-sky-400 hover:underline">
              {isAr ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isLoading}
            className="w-full justify-center text-xs mt-2 shadow-md"
          >
            <Key className="w-3.5 h-3.5 mr-1" />
            <span>{isRegisterMode ? (isAr ? 'تسجيل حساب جديد' : 'Create Account') : (isAr ? 'تسجيل الدخول' : 'Sign In to Portal')}</span>
          </Button>
        </form>

        {/* Toggle Mode */}
        <div className="pt-3 border-t border-slate-100 dark:border-[#1e293b] text-center text-slate-500 dark:text-slate-400 text-xs">
          <span>{isRegisterMode ? (isAr ? 'لديك حساب بالفعل؟' : 'Already have an account?') : (isAr ? 'ليس لديك حساب؟' : 'Don\'t have an account?')}</span>{' '}
          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-sky-600 dark:text-sky-400 font-bold hover:underline cursor-pointer"
          >
            {isRegisterMode ? (isAr ? 'تسجيل الدخول' : 'Sign In') : (isAr ? 'إنشاء حساب' : 'Register Now')}
          </button>
        </div>

        <div className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>{isAr ? 'حماية مشفرة عبر خوادم مجمع الشارقة للابتكار' : 'AES-256 Encrypted Client VDR Access'}</span>
        </div>
      </div>
    </Modal>
  );
};
