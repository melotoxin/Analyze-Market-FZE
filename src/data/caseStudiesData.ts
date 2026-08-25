import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    client: 'ApexCloud Infrastructure (Backed by Tier-1 PE)',
    industry: 'Enterprise AI & SaaS',
    dealSize: ' Cross-Border Buyout',
    outcomeMetric: '+',
    metricLabel: 'Enterprise Value Unlock',
    summary: 'Analyzer Market team conducted a rapid 12-day due diligence analyzing server GPU cluster utilization rates, uncovering an unpriced  annual compute margin expansion opportunity.',
    beforeStats: { label: 'Pre-Deal Projected Margin', value: '44.5% EBITDA' },
    afterStats: { label: 'Optimized Realized Margin', value: '58.2% EBITDA' },
    quote: 'Analyzer Market delivered the analytical rigor of a top-three strategy firm with 4x the speed and unparalleled technical depth on modern AI compute economics.',
    author: 'David Vance',
    authorTitle: 'Senior Partner, Horizon Capital Partners',
    tags: ['M&A Due Diligence', 'Cloud Economics', 'PE Buyout']
  },
  {
    id: 'cs2',
    client: 'Novus Therapeutics Diagnostics',
    industry: 'HealthTech & Bio',
    dealSize: ' Series C Round',
    outcomeMetric: '6.4x',
    metricLabel: 'Adoption Rate Acceleration',
    summary: 'Built a granular CMS reimbursement model and hospital procurement decision pathway that slashed payer approval cycles from 18 months down to 4.5 months.',
    beforeStats: { label: 'Payer Approval Cycle', value: '18 Months' },
    afterStats: { label: 'Compressed Timeline', value: '4.5 Months' },
    quote: 'The depth of the regulatory and payer reimbursement models constructed by the Analyzer Market team gave our syndicate total conviction.',
    author: 'Dr. Evelyn Brand',
    authorTitle: 'Chief Strategy Officer, Novus Bio',
    tags: ['Reimbursement Strategy', 'HealthTech', 'Commercialization']
  },
  {
    id: 'cs3',
    client: 'VoltGrid Energy Solutions',
    industry: 'Climate & CleanTech',
    dealSize: ' Infrastructure Fund Allocation',
    outcomeMetric: '280 bps',
    metricLabel: 'IRR Improvement',
    summary: 'Created a proprietary levelized cost of battery storage simulator that mapped high-volatility peak shaving arbitrage across 12 ERCOT and CAISO nodes.',
    beforeStats: { label: 'Initial Baseline IRR', value: '11.4%' },
    afterStats: { label: 'Node-Optimized IRR', value: '14.2%' },
    quote: 'They are without doubt the sharpest quant-focused energy strategists we have ever collaborated with.',
    author: 'Henrik Lindqvist',
    authorTitle: 'Managing Director, Nordic Infrastructure Partners',
    tags: ['Grid Arbitrage', 'CleanTech', 'Quant Modeling']
  }
];
