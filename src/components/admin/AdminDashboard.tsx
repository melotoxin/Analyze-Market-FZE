import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  Building2,
  FileCheck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Download,
  Plus,
  Phone,
  MessageCircle,
  MoreVertical,
  X,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  CreditCard
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AmDxbLogo } from '../ui/AmDxbLogo';
import { Language } from '../../data/translations';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface SaleLead {
  id: string;
  clientName: string;
  companyName: string;
  phone: string;
  email: string;
  jurisdiction: string;
  packageValue: string;
  valueNumeric: number;
  visas: number;
  status: 'New Request' | 'Contacted' | 'MOA Drafting' | 'License Issued' | 'Bank Live';
  timestamp: string;
  source: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  if (!isOpen) return null;
  const isAr = lang === 'ar';

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<SaleLead | null>(null);

  // Initial sales & requests data
  const [leads, setLeads] = useState<SaleLead[]>([
    {
      id: 'REQ-9481',
      clientName: 'Rashid Al-Nuaimi',
      companyName: 'Apex Quantum AI FZE',
      phone: '+971 50 821 4492',
      email: 'rashid@apexquantum.io',
      jurisdiction: 'SRTI Park (Sharjah)',
      packageValue: 'AED 22,500',
      valueNumeric: 22500,
      visas: 3,
      status: 'New Request',
      timestamp: '10 mins ago',
      source: 'Interactive Configurator'
    },
    {
      id: 'REQ-9480',
      clientName: 'Alexander Morozov',
      companyName: 'Nordic Trade Logistics LLC',
      phone: '+971 56 312 8840',
      email: 'a.morozov@nordiclogistics.ae',
      jurisdiction: 'Dubai Mainland (DET)',
      packageValue: 'AED 38,000',
      valueNumeric: 38000,
      visas: 5,
      status: 'MOA Drafting',
      timestamp: '45 mins ago',
      source: 'Quick Consultation Modal'
    },
    {
      id: 'REQ-9479',
      clientName: 'Elena Rostova',
      companyName: 'Aura Fintech SPV',
      phone: '+971 52 901 3321',
      email: 'elena@auracapital.com',
      jurisdiction: 'Offshore / ADGM SPV',
      packageValue: 'AED 28,000',
      valueNumeric: 28000,
      visas: 0,
      status: 'License Issued',
      timestamp: '2 hours ago',
      source: 'Direct WhatsApp'
    },
    {
      id: 'REQ-9478',
      clientName: 'Marcus Vance',
      companyName: 'Vance Advisory Group FZC',
      phone: '+44 7911 123456',
      email: 'marcus@vancegroup.uk',
      jurisdiction: 'SHAMS Media City',
      packageValue: 'AED 15,650',
      valueNumeric: 15650,
      visas: 2,
      status: 'Bank Live',
      timestamp: '5 hours ago',
      source: 'Packages Section'
    },
    {
      id: 'REQ-9477',
      clientName: 'Tariq Al-Mansoor',
      companyName: 'Horizon Investment Group FZE',
      phone: '+971 56 339 6961',
      email: 'tariq.mansoor@horizoninvest.ae',
      jurisdiction: 'SRTI Park (Sharjah)',
      packageValue: 'AED 45,000',
      valueNumeric: 45000,
      visas: 4,
      status: 'Contacted',
      timestamp: '1 day ago',
      source: 'Client Portal'
    },
    {
      id: 'REQ-9476',
      clientName: 'Dr. Michael Chen',
      companyName: 'BioHealth Tech Global LLC',
      phone: '+971 55 443 2190',
      email: 'm.chen@biohealth.ae',
      jurisdiction: 'Sharjah Mainland (SEDD)',
      packageValue: 'AED 34,500',
      valueNumeric: 34500,
      visas: 4,
      status: 'MOA Drafting',
      timestamp: '1 day ago',
      source: 'Interactive Configurator'
    }
  ]);

  const handleUpdateStatus = (id: string, newStatus: SaleLead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const filteredLeads = leads.filter(l => {
    const matchesFilter = activeFilter === 'All' ||
                          (activeFilter === 'New' && l.status === 'New Request') ||
                          (activeFilter === 'FreeZone' && l.jurisdiction.includes('Sharjah') || l.jurisdiction.includes('SHAMS') || l.jurisdiction.includes('Free Zone')) ||
                          (activeFilter === 'Mainland' && l.jurisdiction.includes('Mainland'));
    
    const matchesSearch = l.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const totalMonthlySales = leads.reduce((acc, curr) => acc + curr.valueNumeric, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-7xl h-[92vh] flex flex-col overflow-hidden shadow-2xl text-slate-100">
        
        {/* Top Header Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AmDxbLogo size="sm" />
            <div className="h-5 w-[1px] bg-slate-800" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {isAr ? 'لوحة تحكم المبيعات والطلبات التنفيذية' : 'Executive Sales & Mandate Operations Portal'}
                </h2>
                <Badge variant="sky" size="sm">Admin Server v2.4</Badge>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SRTI Node-01 (Active)</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                {isAr ? 'إدارة طلبات التأسيس والمبيعات والإيرادات اللحظية' : 'Real-time sales CRM, client requests pipeline, and corporate banking dispatch'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Exporting full sales audit log (CSV/Excel)...')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Workspace */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Top 4 KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>{isAr ? 'إجمالي المبيعات النشطة' : 'Active Pipeline Value'}</span>
                <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                AED {totalMonthlySales.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+32.4% vs last month</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>{isAr ? 'طلبات التأسيس الجارية' : 'Active Client Mandates'}</span>
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {leads.length} Companies
              </div>
              <div className="flex items-center gap-1 text-[11px] text-sky-400 font-mono">
                <span>4 Free Zone | 2 Mainland</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>{isAr ? 'معدل التحويل والإغلاق' : 'Lead Conversion Rate'}</span>
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                68.4%
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                <span>Avg. SLA: 3.2 Days</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>{isAr ? 'حسابات بنكية موافق عليها' : 'Corporate Bank Clearances'}</span>
                <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                99.8%
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                <span>Wio, ENBD, Mashreq</span>
              </div>
            </div>

          </div>

          {/* Controls Bar: Search & Filters */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {[
                { key: 'All', label: isAr ? 'كافة الطلبات' : 'All Requests', count: leads.length },
                { key: 'New', label: isAr ? 'طلبات جديدة' : 'New Inquiries', count: leads.filter(l => l.status === 'New Request').length },
                { key: 'FreeZone', label: isAr ? 'المناطق الحرة' : 'Free Zones', count: 3 },
                { key: 'Mainland', label: isAr ? 'البر الرئيسي' : 'Mainland', count: 2 }
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={'px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ' + (
                    activeFilter === f.key
                      ? 'bg-sky-500 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  )}
                >
                  <span>{f.label}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-black/30 text-[10px] font-mono">{f.count}</span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isAr ? 'بحث بالاسم أو الرقم أو الشركة...' : 'Search by client, company, phone...'}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Sales Requests Data Table */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                    <th className="p-4">Ref & Client</th>
                    <th className="p-4">Entity & Jurisdiction</th>
                    <th className="p-4">Contract Value</th>
                    <th className="p-4">Visas</th>
                    <th className="p-4">Mandate Status</th>
                    <th className="p-4">Date / Source</th>
                    <th className="p-4 text-right">Instant Contact Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/60 transition-colors">
                      
                      {/* Ref & Client */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono text-sky-400 font-bold bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-800/80">
                            {lead.id}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white pt-1">{lead.clientName}</h4>
                          <span className="text-[11px] text-slate-400 block font-mono">{lead.email}</span>
                        </div>
                      </td>

                      {/* Entity & Jurisdiction */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <span className="text-xs font-semibold text-slate-200 block">{lead.companyName}</span>
                          <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-sky-500" />
                            {lead.jurisdiction}
                          </span>
                        </div>
                      </td>

                      {/* Contract Value */}
                      <td className="p-4">
                        <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono block">
                          {lead.packageValue}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">Turnkey Delivery</span>
                      </td>

                      {/* Visas */}
                      <td className="p-4 font-mono text-xs text-slate-300">
                        {lead.visas} Visa(s)
                      </td>

                      {/* Mandate Status Dropdown/Selector */}
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                          className={'text-xs font-mono font-bold px-2.5 py-1.5 rounded-xl border cursor-pointer focus:outline-none ' + (
                            lead.status === 'New Request'
                              ? 'bg-rose-950/60 border-rose-700 text-rose-300'
                              : lead.status === 'Contacted'
                                ? 'bg-amber-950/60 border-amber-700 text-amber-300'
                                : lead.status === 'MOA Drafting'
                                  ? 'bg-sky-950/60 border-sky-700 text-sky-300'
                                  : lead.status === 'License Issued'
                                    ? 'bg-indigo-950/60 border-indigo-700 text-indigo-300'
                                    : 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                          )}
                        >
                          <option value="New Request">🔴 New Request</option>
                          <option value="Contacted">🟡 Contacted</option>
                          <option value="MOA Drafting">🔵 MOA Drafting</option>
                          <option value="License Issued">🟣 License Issued</option>
                          <option value="Bank Live">🟢 Bank Account Live</option>
                        </select>
                      </td>

                      {/* Date / Source */}
                      <td className="p-4 font-mono text-xs text-slate-400">
                        <span className="block text-slate-300">{lead.timestamp}</span>
                        <span className="text-[10px] text-slate-500 block">{lead.source}</span>
                      </td>

                      {/* Instant Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Direct WhatsApp Client Button */}
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Direct Phone Call */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
                            title="Call Phone"
                          >
                            <Phone className="w-4 h-4 text-sky-400" />
                          </a>

                          <Button
                            onClick={() => alert(`Generating official Government SOW & Invoice for ${lead.companyName} (${lead.packageValue})...`)}
                            size="sm"
                            variant="outline"
                            className="text-[11px] font-mono py-1 px-2.5"
                          >
                            <span>Invoice</span>
                          </Button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Dashboard Bottom Status Bar */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
          <div>
            AnalyzeMarkets FZE Internal CRM • Connected to Sharjah SRTI Park Datacenter
          </div>
          <div className="text-emerald-400 font-semibold">
            ● All systems operational (100% SLA)
          </div>
        </div>

      </div>
    </div>
  );
};
