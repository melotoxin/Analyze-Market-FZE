import { AdvisoryService } from '../types';

export const ADVISORY_SERVICES: AdvisoryService[] = [
  {
    id: 's1',
    title: 'M&A & Commercial Due Diligence',
    tagline: 'Deep-dive technology moat, customer retention cohort audits, and downside margin simulations.',
    iconName: 'SearchCheck',
    category: 'Transaction Advisory',
    timeline: '1 to 3 Weeks',
    pricingTier: 'Starting at \,000 / Sprint',
    deliverables: [
      'Comprehensive 45-Page Commercial DD Dossier',
      'Unit Economics & Churn Stress-Test Model',
      'Key Executive & Customer Reference Blind Calls (10-15 Interviews)',
      'IC Ready Presentation & Executive Summary'
    ],
    suitableFor: 'Private Equity, Growth Funds, Corporate Development & M&A Teams',
    badge: 'Most Requested'
  },
  {
    id: 's2',
    title: 'Market Entry & TAM Sizing Studio',
    tagline: 'Bottom-up addressable market segmentation, regulatory arbitrage, and localized go-to-market roadmaps.',
    iconName: 'Compass',
    category: 'Growth & Strategy',
    timeline: '2 to 4 Weeks',
    pricingTier: 'Starting at \,500 / Project',
    deliverables: [
      'Micro-Segmented Bottom-Up TAM/SAM/SOM Engine',
      'Competitor Positioning & Vulnerability Matrix',
      'Go-To-Market Pricing Strategy & Tier Optimization',
      'Regulatory Filing & Compliance Playbook'
    ],
    suitableFor: 'Scale-ups entering new geographies, Global enterprises launching new business lines'
  },
  {
    id: 's3',
    title: 'GenAI & DeepTech Moat Audits',
    tagline: 'Rigorous assessment of compute unit economics, model defensibility, and proprietary data lineage.',
    iconName: 'Cpu',
    category: 'Technology & Moats',
    timeline: '10 Business Days',
    pricingTier: 'Starting at \,000 / Audit',
    deliverables: [
      'Hardware / Compute Cost per Token Efficiency Benchmark',
      'IP & Model Weight Defensibility Evaluation',
      'Vendor Lock-in & Open Source Vulnerability Scan',
      'Capex Optimization Roadmap for Series B-D'
    ],
    suitableFor: 'VCs investing in AI infra, Founders optimizing gross margins before IPO',
    badge: 'High Impact'
  },
  {
    id: 's4',
    title: 'Fractional Practice Lead & Retained Advisory',
    tagline: 'Direct, on-demand executive sparring sessions with ex-MBB Partners and industry veterans.',
    iconName: 'Users',
    category: 'Executive Advisory',
    timeline: 'Ongoing / Flexible Retainer',
    pricingTier: 'From \,500 / Month',
    deliverables: [
      'Bi-Weekly Board/Executive Advisory Strategy Sessions',
      'Asynchronous Model & Pitch Review with 24h Turnaround',
      'Direct Introductions to Sovereign & Tier-1 Strategic Partners',
      'Continuous Industry Pulse Alert Memos'
    ],
    suitableFor: 'CEOs, Board Members, Family Office Investment Committees'
  }
];
