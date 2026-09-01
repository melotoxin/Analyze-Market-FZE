import React, { useState } from 'react';
import { Phone, MapPin, ExternalLink, ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { Language } from '../../data/translations';
import { AmDxbLogo } from '../ui/AmDxbLogo';
import { ServiceSlug, getServiceNav } from '../../data/servicesData';
import { servicePath } from '../../utils/router';
import { submitLead } from '../../utils/submitLead';
import { COMPANY_DETAILS } from '../../data/mockData';

interface FooterProps {
  onNavigateService?: (slug: ServiceSlug) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateService, lang }) => {
  const [quickPhone, setQuickPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  // This used to clear the field and show a tick without sending anything.
  const handleQuickCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone.trim() || sending) return;
    setSending(true);
    setError('');
    try {
      await submitLead({
        name: 'Callback request',
        phone: quickPhone,
        service: 'Callback request from footer',
        source: 'footer-callback',
      });
      setSent(true);
      setQuickPhone('');
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send. Please call us directly.');
    } finally {
      setSending(false);
    }
  };

  const services = getServiceNav(lang);



  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs relative z-10 font-sans transition-colors duration-200">
      
      {/* Mandate Callback Banner */}
      <div className="border-b border-slate-800 bg-slate-950">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl text-center lg:text-start">
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-widest block">
              Direct Advisory Channel
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              Speak directly with our senior corporate structuring team
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Headquartered at SRTI Park Sharjah with direct Mainland & Free Zone licensing desks.
            </p>
          </div>

          <div className="w-full max-w-md">
            <form onSubmit={handleQuickCallback} className="flex flex-col sm:flex-row gap-3">
              <input
                type="tel"
                required
                value={quickPhone}
                onChange={(e) => setQuickPhone(e.target.value)}
                placeholder="Enter your phone or WhatsApp..."
                aria-label="Your phone or WhatsApp number"
                autoComplete="tel"
                dir="ltr"
                className="flex-1 bg-slate-900 border border-slate-700 px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white font-mono rounded-lg transition-colors"
              />
              <button
                type="submit"
                disabled={sending}
                className="bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase px-5 py-3 rounded-lg shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>{sending ? 'Sending...' : sent ? 'Dispatched' : 'Request Callback'}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </form>

            {/*
              The error state was being set but never rendered: a failed callback
              left the form looking idle, so the visitor assumed it had gone through.
            */}
            <p role="status" aria-live="polite" className="sr-only">
              {sent ? 'Callback request sent.' : ''}
            </p>
            {error && (
              <p role="alert" className="mt-2 text-[11px] text-rose-400">
                {error}{' '}
                <a
                  href={'tel:' + COMPANY_DETAILS.phone.replace(/\s/g, '')}
                  className="underline font-bold"
                  dir="ltr"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </p>
            )}
            {sent && !error && (
              <p className="mt-2 text-[11px] text-emerald-400">
                Thanks — an advisor will call you back shortly.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand & Credentials */}
        <div className="md:col-span-5 space-y-4">
          <AmDxbLogo size="md" />
          
          <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed font-normal">
            AnalyzeMarkets FZE is a premier UAE management consultancy and corporate intelligence firm headquartered at the Sharjah Research Technology and Innovation Park (SRTI Park).
          </p>

          <div className="pt-2 space-y-2 text-xs font-mono text-slate-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>SRTI Park, Block B - Office B34-047, Sharjah, United Arab Emirates</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <a href="tel:+971563396961" dir="ltr" className="text-white hover:underline font-bold">
                +971 56 339 6961
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <a href="mailto:contact@amdxb.com" className="text-white hover:underline font-bold">
                contact@amdxb.com
              </a>
            </div>
          </div>
        </div>

        {/* Service links, count derived so it cannot go stale again */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
            Official Services ({services.length})
          </h4>
          <ul className="space-y-2.5 text-xs">
            {services.map((s, idx) => (
              <li key={idx}>
                {/* Real hrefs: the footer is where crawlers discover every service page. */}
                <a
                  href={servicePath(s.slug)}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || !onNavigateService) return;
                    e.preventDefault();
                    onNavigateService(s.slug);
                  }}
                  className="text-slate-400 hover:text-white transition-colors text-start cursor-pointer flex items-center justify-between w-full group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
                >
                  <span>{s.label}</span>
                  <span aria-hidden="true" className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Portals & Direct Links */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
            Direct Portals
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><a href="https://amdxb.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center justify-between"><span>amdxb.com</span><ExternalLink className="w-3 h-3" /></a></li>
            <li><a href="https://srtip.ae/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center justify-between"><span>SRTI Park Authority</span><ExternalLink className="w-3 h-3" /></a></li>
            <li><a href="https://tax.gov.ae/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center justify-between"><span>Federal Tax Authority</span><ExternalLink className="w-3 h-3" /></a></li>
            <li><a href="https://sedd.ae/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center justify-between"><span>Sharjah SEDD</span><ExternalLink className="w-3 h-3" /></a></li>
            <li><a href="https://wa.me/971563396961" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 flex items-center justify-between text-emerald-400 font-bold"><span>WhatsApp Desk</span><MessageCircle className="w-3 h-3" /></a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            Copyright © 2026 AnalyzeMarkets FZE. Licensed by SRTI Park, Sharjah, UAE. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>ISO 9001 Process Compliant</span>
            <span className="text-slate-700">|</span>
            <a 
              href="https://www.adrevnview.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-white font-semibold"
            >
              AdRevnView
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
