export interface CompanyInfo {
  name: string;
  legalName: string;
  phone: string;
  email: string;
  location: string;
  address: string;
  domain: string;
  established: string;
  about: string;
}

export const COMPANY_DETAILS: CompanyInfo = {
  name: 'Analyze Markets',
  legalName: 'AnalyzeMarkets FZE',
  phone: '+971 56 339 6961',
  email: 'info@amdxb.com',
  location: 'Sharjah, United Arab Emirates',
  address: 'SRTI (Sharjah Research Technology & Innovation Park) Block B - Office B34-047',
  domain: 'amdxb.com',
  established: 'Sharjah, UAE',
  about: 'AnalyzeMarkets FZE is a Management Consultancy & Research Information company established in Sharjah, UAE. Our offerings include full business incorporation as well as comprehensive corporate support services, all bundled under one roof.'
};

export const MARKET_TICKER_ITEMS = [
  { label: 'Free Zone Companies Active', value: '40+ Zones', change: '100% Ownership', isPositive: true },
  { label: 'UAE Arab Economy Rank', value: '2nd Largest', change: 'Trillions in Trade', isPositive: true },
  { label: 'Personal & QFZP Tax', value: '0% Tax Benefits', change: 'Optimized', isPositive: true },
  { label: 'Turnaround Time', value: '2-4 Working Days', change: 'Fast Track', isPositive: true },
  { label: 'SRTI Innovation Park HQ', value: 'Sharjah UAE', change: 'Direct Assistance', isPositive: true },
  { label: 'Corporate Bank Account', value: 'Wio, ENBD, Mashreq', change: 'Handheld', isPositive: true }
];

export const UAE_PACKAGES = [
  {
    id: 'freezone',
    title: 'Free Zone Companies',
    subtitle: '100% Foreign Ownership & Tax Optimization',
    badge: 'Most Popular',
    popular: true,
    startingPrice: 'AED 12,500',
    turnaround: '2 - 4 Working Days',
    ownership: '100% Foreign Ownership',
    types: [
      'Free Zone Establishment (FZE - Single Shareholder)',
      'Free Zone Corporation (FZC - Multi-Shareholder)',
      'Branch of Foreign or Local Company'
    ],
    features: [
      '100% Repatriation of Capital & Profits',
      '0% Personal and Corporate Tax Perks',
      'Over 40+ Established Free Zones across 7 Emirates',
      'Fast-track Investor & Employee Residence Visas',
      'Corporate Bank Account Opening Assistance',
      'Flexible Flexi-Desk and Dedicated Office Options'
    ],
    zones: ['SRTI Park Sharjah', 'DMCC Dubai', 'IFZA', 'SHAMS Sharjah', 'DAFZA', 'Meydan', 'RAKEZ']
  },
  {
    id: 'mainland',
    title: 'Mainland Companies',
    subtitle: 'Unrestricted Direct UAE & GCC Market Trading',
    badge: 'Local & Gov Contracts',
    popular: false,
    startingPrice: 'AED 18,500',
    turnaround: '4 - 7 Working Days',
    ownership: '100% Expat Ownership on 1,000+ Activities',
    types: [
      'Limited Liability Company (LLC)',
      'Branch and Representative Office',
      'Civil Company / Professional Firm Setup',
      'Public & Private Shareholding Companies',
      'Joint Ventures'
    ],
    features: [
      'Trade freely anywhere inside UAE Mainland & GCC',
      'Direct participation in Government Tenders & Contracts',
      'No cap on employment visas (linked to office space)',
      'Department of Economy & Tourism (DET / DED) Licensing',
      'Commercial Lease Registration (Ejari / Tawtheeq)',
      'Complete Corporate Secretary & PRO Clearance'
    ],
    zones: ['Dubai Economy (DET)', 'Sharjah SEDD', 'Abu Dhabi DED', 'Ajman DED']
  },
  {
    id: 'offshore',
    title: 'Offshore & Holding Companies',
    subtitle: 'Asset Protection & International Tax Structuring',
    badge: 'Confidentiality',
    popular: false,
    startingPrice: 'AED 14,000',
    turnaround: '3 - 5 Working Days',
    ownership: '100% Foreign Ownership',
    types: [
      'JAFZA Offshore Entity',
      'RAK ICC International Business Company',
      'ADGM / DIFC Special Purpose Vehicle (SPV)',
      'Family Holding & Asset Protection Entities'
    ],
    features: [
      'Global Real Estate & Asset Holding Structure',
      'High Confidentiality & Statutory Privacy',
      'Zero Local Corporate & Withholding Taxes',
      'Multi-currency International Bank Accounts',
      'Succession Planning & Wealth Preservation',
      'No Physical Office Requirement in UAE'
    ],
    zones: ['RAK ICC', 'JAFZA Offshore', 'ADGM SPV', 'DIFC Foundation']
  },
  {
    id: 'consultancy',
    title: 'Management Consultancy & Research',
    subtitle: 'Feasibility, Strategy & Corporate Structuring',
    badge: 'Executive Advisory',
    popular: false,
    startingPrice: 'Custom SOW',
    turnaround: 'Ongoing / Milestone',
    ownership: 'Strategic Information',
    types: [
      'Market Feasibility & Entry Studies',
      'Commercial Due Diligence & Valuation',
      'Corporate Restructuring & M&A Support',
      'VAT & Corporate Tax Compliance Filing',
      'Banking Compliance & AML Remediation'
    ],
    features: [
      'Tailored GCC & MENA Market Sizing Studies',
      'Corporate Tax Registration & Optimization Guidance',
      'PRO Support for Visa Processing, Emirates ID & Medical',
      'End-to-End Handholding until Bank Account is Live',
      'Headquartered at SRTI Innovation Park, Sharjah'
    ],
    zones: ['Sharjah Research Technology & Innovation Park', 'Dubai', 'Abu Dhabi']
  }
];

export const FREE_ZONES_LIST = [
  { name: 'SRTI Park (Sharjah Innovation)', emirate: 'Sharjah', minCost: 'AED 11,500', visas: 'Up to 5', focus: 'Tech, R&D, Consultancy' },
  { name: 'SHAMS (Sharjah Media City)', emirate: 'Sharjah', minCost: 'AED 8,050', visas: 'Up to 6', focus: 'Media, Trading, Services' },
  { name: 'IFZA (International Free Zone)', emirate: 'Dubai', minCost: 'AED 12,900', visas: 'Up to 10', focus: 'General Trading, Consultancy' },
  { name: 'DMCC (Dubai Multi Commodities)', emirate: 'Dubai', minCost: 'AED 24,000', visas: 'Unlimited', focus: 'Commodities, Tech, Financial' },
  { name: 'Meydan Free Zone', emirate: 'Dubai', minCost: 'AED 12,500', visas: 'Up to 4', focus: 'E-commerce, Tech, Consulting' },
  { name: 'DAFZA (Dubai Airport Freezone)', emirate: 'Dubai', minCost: 'AED 21,000', visas: 'Up to 8', focus: 'Aviation, Logistics, Trade' },
  { name: 'RAKEZ (Ras Al Khaimah)', emirate: 'RAK', minCost: 'AED 6,500', visas: 'Up to 4', focus: 'Industrial, Trading, Services' },
  { name: 'Ajman Free Zone', emirate: 'Ajman', minCost: 'AED 9,500', visas: 'Up to 5', focus: 'E-Commerce, Manufacturing' }
];

export const WHY_UAE_POINTS = [
  {
    title: '2nd-Largest Economy in Arab World',
    desc: 'Acting as the nerve center for trillions of dollars in trade and investment across the Middle East, Europe, Africa, India, and Asia.'
  },
  {
    title: '100% Foreign Company Ownership',
    desc: 'Full foreign equity ownership across all 40+ Free Zones and hundreds of commercial mainland activities without mandatory local sponsors.'
  },
  {
    title: '0% Personal & Competitive Tax Regime',
    desc: '0% personal income tax, 0% capital gains tax, and preferential qualifying free zone person (QFZP) corporate tax benefits.'
  },
  {
    title: 'World-Class Banking & Connectivity',
    desc: 'Direct flight connectivity to 200+ global hubs and access to premier regional and international banking institutions.'
  }
];

export const CONSULTANTS: any[] = [];
export const SECTOR_METRICS: any = {};
export const ADVISORY_SERVICES: any[] = [];
export const CASE_STUDIES: any[] = [];
export const DEMO_DELIVERABLES: any[] = [];
