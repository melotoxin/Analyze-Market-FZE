import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  Play,
  Users,
  Building2,
  Lock
} from 'lucide-react';

interface HeroSectionProps {
  onOpenRfp: () => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRfp,
  onOpenBooking
}) => {
  const [activeMetricTab, setActiveMetricTab] = useState<'multiples' | 'turnaround' | 'acceptance'>('multiples');

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center bg-[#070b14]">
      {/* Background Animated Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[130px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-slate-300 backdrop-blur-md shadow-lg shadow-cyan-500/5 hover:border-cyan-500/60 transition-all cursor-pointer">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-semibold text-cyan-300">Q1 2026 Private Market Multiples Index</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 hover:text-white flex items-center gap-1">
              Read 80+ Page Deal Memo <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Elite Market Intelligence <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              & Specialized Advisory
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            The on-demand platform connecting Private Equity, Sovereign Wealth Funds, and high-growth boards with ex-MBB Partners and quant market researchers.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={onOpenRfp}
              size="lg"
              variant="primary"
              className="w-full sm:w-auto shadow-xl shadow-cyan-500/25 group text-base"
            >
              <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>Scope Advisory Sprint (RFP)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>

            <Button
              onClick={onOpenBooking}
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto text-base group"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Browse 250+ Verified Partners</span>
            </Button>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Top 1% Ex-MBB / Tier-1 Tech Leads</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>48-Hour Sprint Kickoff SLA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>Master Automated Mutual NDA</span>
            </div>
          </div>
        </div>

        {/* Interactive Advisory Pulse Interactive Box */}
        <div className="mt-14 max-w-4xl mx-auto glass-panel-glow bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="cyan" size="sm">LIVE ADVISORY TELEMETRY</Badge>
                <span className="text-xs font-mono text-slate-400">Global Execution Engine</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">Institutional Sprint Performance Matrix</h3>
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveMetricTab('multiples')}
                className={'text-xs font-medium px-3 py-1.5 rounded-lg transition-all ' + (
                  activeMetricTab === 'multiples' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                )}
              >
                Valuation Multiples
              </button>
              <button
                onClick={() => setActiveMetricTab('turnaround')}
                className={'text-xs font-medium px-3 py-1.5 rounded-lg transition-all ' + (
                  activeMetricTab === 'turnaround' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                )}
              >
                DD Turnaround
              </button>
              <button
                onClick={() => setActiveMetricTab('acceptance')}
                className={'text-xs font-medium px-3 py-1.5 rounded-lg transition-all ' + (
                  activeMetricTab === 'acceptance' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                )}
              >
                Network Acceptance
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
            {activeMetricTab === 'multiples' && (
              <>
                <div className="space-y-1 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-xs font-mono text-slate-400">GenAI Infra Multiple</div>
                  <div className="text-3xl font-extrabold text-cyan-400 font-mono">18.4x EV</div>
                  <p className="text-[11px] text-slate-500">+2.4x expansion over legacy SaaS median</p>
                </div>
                <div className="space-y-1 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-xs font-mono text-slate-400">CleanTech Storage CapEx</div>
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">$65/kWh</div>
                  <p className="text-[11px] text-slate-500">Commercial viability threshold reached</p>
                </div>
                <div className="space-y-1 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-xs font-mono text-slate-400">FinTech PayFac Take-Rate</div>
                  <div className="text-3xl font-extrabold text-indigo-400 font-mono">142 bps</div>
                  <p className="text-[11px] text-slate-500">Top-quartile embedded payment margin</p>
                </div>
              </>
            )}

            {activeMetricTab === 'turnaround' && (
              <>
                <div className="space-y-1 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-xs font-mono text-slate-400">Rapid Due Diligence</div>
                  <div className="text-3xl font-extrabold text-cyan-400 font-mono">7.2 Days</div>
                  <p className="text-[11px] text-slate-500">From term-sheet to 45-page IC dossier</p>
                </div>
                <div className="space-y-1 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-xs font-mono text-slate-400">Expert Blind Calls</div>
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">&lt; 36 Hours</div>
                  <p className="text-[11px] text-slate-500">10-15 customer reference interviews</p>
                </div>
                <div className="space-y-1 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-xs font-mono text-slate-400">Clean-Room Enclave Setup</div>
                  <div className="text-3xl font-extrabold text-indigo-400 font-mono">2.0 Hours</div>
                  <p className="text-[11px] text-slate-500">Hardware-isolated VDR partitioning</p>
                </div>
              </>
            )}

            {activeMetricTab === 'acceptance' && (
              <>
                <div className="space-y-1 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-xs font-mono text-slate-400">Analyst Acceptance Rate</div>
                  <div className="text-3xl font-extrabold text-cyan-400 font-mono">1.8%</div>
                  <p className="text-[11px] text-slate-500">Rigorous 4-stage case & peer audit</p>
                </div>
                <div className="space-y-1 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-xs font-mono text-slate-400">Partner Average Experience</div>
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">12.4 Yrs</div>
                  <p className="text-[11px] text-slate-500">Ex-McKinsey, BCG, Bain & BigTech VPs</p>
                </div>
                <div className="space-y-1 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-xs font-mono text-slate-400">Client Repeat Engagement</div>
                  <div className="text-3xl font-extrabold text-indigo-400 font-mono">94.6%</div>
                  <p className="text-[11px] text-slate-500">Tier-1 PE & Sovereign wealth retention</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Institutional Client Logos Bar */}
        <div className="mt-16 pt-10 border-t border-slate-800/60 text-center">
          <p className="text-xs font-mono uppercase text-slate-500 tracking-wider mb-6">
            Advising Global Leaders Across Private Equity, Sovereign Wealth & Corporate Development
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="text-sm font-bold tracking-wider font-sans text-slate-300">HORIZON CAPITAL</span>
            <span className="text-sm font-bold tracking-wider font-sans text-slate-300">BLACKSTONE ALLIANCE</span>
            <span className="text-sm font-bold tracking-wider font-sans text-slate-300">APOLLO GROWTH</span>
            <span className="text-sm font-bold tracking-wider font-sans text-slate-300">SEQUOIA HERITAGE</span>
            <span className="text-sm font-bold tracking-wider font-sans text-slate-300">TEMASEK DIRECT</span>
          </div>
        </div>

      </div>
    </section>
  );
};
