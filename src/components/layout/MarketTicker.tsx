import React from 'react';
import { MARKET_TICKER_ITEMS } from '../../data/mockData';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export const MarketTicker: React.FC = () => {
  const tickerData = [...MARKET_TICKER_ITEMS, ...MARKET_TICKER_ITEMS];

  return (
    <div className="w-full bg-slate-100 dark:bg-[#080d1a] border-y border-slate-200 dark:border-[#1e293b] py-2.5 overflow-hidden select-none relative z-20 transition-colors duration-300">
      <div className="flex items-center">
        {/* Left Ticker Label */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-[#080d1a] z-10 px-4 border-r border-slate-200 dark:border-[#1e293b] shrink-0 font-mono">
          <Activity className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            UAE MARKET TELEMETRY
          </span>
        </div>

        {/* Marquee Container */}
        <div className="flex overflow-hidden whitespace-nowrap mask-radial">
          <div className="flex animate-marquee shrink-0 items-center space-x-8 text-xs font-mono">
            {tickerData.map((item, index) => (
              <div key={index} className="inline-flex items-center space-x-2 shrink-0">
                <span className="text-slate-500 dark:text-[#94a3b8]">{item.label}:</span>
                <span className="font-bold text-slate-900 dark:text-white">{item.value}</span>
                <span
                  className={
                    'inline-flex items-center text-[10px] font-semibold ' +
                    (item.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')
                  }
                >
                  {item.isPositive ? (
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                  )}
                  {item.change}
                </span>
                <span className="text-slate-300 dark:text-[#1e293b] ml-4 font-normal">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
