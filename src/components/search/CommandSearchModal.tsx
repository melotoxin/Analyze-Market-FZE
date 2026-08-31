import React, { useState, useEffect } from 'react';
import {
  Search,
  Building,
  Globe,
  Award,
  Calculator,
  ArrowRight,
  X,
  Phone,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { Language } from '../../data/translations';

interface CommandSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionType: string, value?: string) => void;
  lang: Language;
}

export const CommandSearchModal: React.FC<CommandSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAction,
  lang
}) => {
  const [query, setQuery] = useState('');
  const isAr = lang === 'ar';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via custom event or external state
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

  const freeZones = [
    { name: 'SRTI Park (Sharjah Research & Tech)', emirate: 'Sharjah', tag: 'HQ Hub • 0% QFZP' },
    { name: 'DMCC (Dubai Multi Commodities Centre)', emirate: 'Dubai', tag: 'Global Commodities' },
    { name: 'DIFC (Dubai International Financial Centre)', emirate: 'Dubai', tag: 'Common Law Banking' },
    { name: 'ADGM (Abu Dhabi Global Market)', emirate: 'Abu Dhabi', tag: 'English Common Law' },
    { name: 'SHAMS (Sharjah Media City)', emirate: 'Sharjah', tag: 'Media & Digital' },
    { name: 'RAKEZ (Ras Al Khaimah Economic Zone)', emirate: 'Ras Al Khaimah', tag: 'Industrial & Trade' },
    { name: 'DAFZA (Dubai Airport Freezone)', emirate: 'Dubai', tag: 'Aviation & Cargo' },
    { name: 'IFZA (International Free Zone Authority)', emirate: 'Dubai', tag: 'Fast-Track Setup' }
  ];

  const activities = [
    { title: 'Artificial Intelligence & Machine Learning Tech', cat: 'Tech & Innovation' },
    { title: 'General Trading & Global Commodity Import/Export', cat: 'Commercial Trade' },
    { title: 'Cross-Border E-Commerce & Marketplace Retail', cat: 'Digital Commerce' },
    { title: 'Strategic Management Consulting & Market Research', cat: 'Advisory (AM DXB Core)' },
    { title: 'Holding Company & Real Estate Asset Protection SPV', cat: 'Wealth & Asset' }
  ];

  const quickActions = [
    { label: 'Calculate 2026 Company Incorporation Cost', icon: Calculator, action: 'scroll-calculator' },
    { label: '10-Year Golden Visa Eligibility Check', icon: Award, action: 'consult-visa' },
    { label: 'Book SRTI Park Corporate Advisory Session', icon: Building, action: 'consult-srti' },
    { label: 'Connect with Senior Director via WhatsApp', icon: MessageCircle, action: 'whatsapp' }
  ];

  const filteredFreeZones = freeZones.filter(
    (fz) => fz.name.toLowerCase().includes(query.toLowerCase()) || fz.emirate.toLowerCase().includes(query.toLowerCase())
  );

  const filteredActivities = activities.filter(
    (act) => act.title.toLowerCase().includes(query.toLowerCase()) || act.cat.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-sm transition-all font-sans">
      
      {/* Search Palette Container */}
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن منطقة حرة، نشاط تجاري، أو خدمة...' : 'Search 40+ Free Zones, commercial activities, or services...'}
            className="w-full text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5 text-xs font-sans">
          
          {/* Quick Actions */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block px-2">
              Quick Shortcuts
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {quickActions.map((qa, i) => {
                const Icon = qa.icon;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      onSelectAction(qa.action);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 flex items-center gap-2.5 text-start transition-all cursor-pointer group"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-slate-800 text-[11px] truncate flex-1">{qa.label}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Free Zones */}
          {filteredFreeZones.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block px-2">
                UAE Free Zones ({filteredFreeZones.length})
              </span>
              <div className="space-y-1">
                {filteredFreeZones.map((fz, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onSelectAction('freezone', fz.name);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between transition-colors text-start cursor-pointer group border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-slate-500" />
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">{fz.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{fz.emirate}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                      {fz.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Activities */}
          {filteredActivities.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block px-2">
                Commercial Activities ({filteredActivities.length})
              </span>
              <div className="space-y-1">
                {filteredActivities.map((act, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onSelectAction('activity', act.title);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between transition-colors text-start cursor-pointer group border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <Building className="w-4 h-4 text-slate-500" />
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">{act.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{act.cat}</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all">➔</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px]">ESC</kbd> to close</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px]">↵</kbd> to select</span>
          </div>
          <span>AnalyzeMarkets FZE Search</span>
        </div>

      </div>

    </div>
  );
};
