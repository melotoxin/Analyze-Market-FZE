import { SectorMetrics } from '../types';

export const SECTOR_METRICS: Record<string, SectorMetrics> = {
  'Enterprise AI & SaaS': {
    name: 'Enterprise AI & SaaS',
    cagr: 28.4,
    tam2026: 480,
    tam2030: 1340,
    evRevenueMultiple: 18.4,
    dealVelocity: 'Hyper-Active (89 Deals/Qtr)',
    riskScore: 38,
    sentiment: 'Hyper-Growth',
    topCatalysts: [
      'Agentic workflow monetization shifting from seat-based to compute-consumption models',
      'Proprietary fine-tuned enterprise models gaining enterprise moat superiority over raw foundation LLMs',
      'Severe enterprise security and compliance guardrail budget expansion (+45% YoY)'
    ],
    trendHistory: [
      { year: '2022', marketSize: 180, valuationMultiple: 12.2 },
      { year: '2023', marketSize: 245, valuationMultiple: 14.1 },
      { year: '2024', marketSize: 340, valuationMultiple: 16.5 },
      { year: '2025', marketSize: 420, valuationMultiple: 17.8 },
      { year: '2026 (E)', marketSize: 480, valuationMultiple: 18.4 },
      { year: '2028 (P)', marketSize: 820, valuationMultiple: 16.0 },
      { year: '2030 (P)', marketSize: 1340, valuationMultiple: 14.8 }
    ],
    swot: {
      strengths: ['Massive efficiency gains in knowledge work', 'Sticky API integrations', 'Expansive net expansion rates (NDR > 135%)'],
      weaknesses: ['High inferencing compute capex', 'Data residency concerns in regulated banking/healthcare'],
      opportunities: ['Autonomous multi-agent orchestration', 'Vertical enterprise agents replacing legacy ERP modules'],
      threats: ['Commoditization of base intelligence layers', 'Regulatory scrutiny on training dataset provenance']
    },
    competitors: [
      { name: 'Hyperscale Agents', marketShare: 42, growthRate: 34, innovationScore: 94 },
      { name: 'Vertical SaaS', marketShare: 28, growthRate: 46, innovationScore: 88 },
      { name: 'Legacy Modernizers', marketShare: 18, growthRate: 12, innovationScore: 68 },
      { name: 'Open-Source Enterprise', marketShare: 12, growthRate: 52, innovationScore: 91 }
    ]
  },
  'FinTech & DeFi': {
    name: 'FinTech & DeFi',
    cagr: 16.8,
    tam2026: 390,
    tam2030: 710,
    evRevenueMultiple: 11.2,
    dealVelocity: 'Consolidation Wave (44 Deals/Qtr)',
    riskScore: 48,
    sentiment: 'Bullish',
    topCatalysts: [
      'Real-world asset (RWA) treasury tokenization hitting institutional liquidity thresholds',
      'Instant settlement protocols compressing interchange fees and driving FX/treasury value-adds',
      'Embedded lending underwriting powered by real-time telemetry APIs'
    ],
    trendHistory: [
      { year: '2022', marketSize: 210, valuationMultiple: 15.0 },
      { year: '2023', marketSize: 240, valuationMultiple: 9.8 },
      { year: '2024', marketSize: 295, valuationMultiple: 10.4 },
      { year: '2025', marketSize: 345, valuationMultiple: 10.9 },
      { year: '2026 (E)', marketSize: 390, valuationMultiple: 11.2 },
      { year: '2028 (P)', marketSize: 520, valuationMultiple: 11.8 },
      { year: '2030 (P)', marketSize: 710, valuationMultiple: 12.0 }
    ],
    swot: {
      strengths: ['Global scalability', 'High recurring transaction volume', 'Superior UX over incumbent banks'],
      weaknesses: ['Tightening compliance overhead (AML/KYC)', 'Interest rate sensitivity in consumer credit'],
      opportunities: ['B2B Cross-border instant treasury settlement', 'Institutional DeFi liquidity rails'],
      threats: ['Central Bank Digital Currency displacement', 'Cyber fraud vector escalation']
    },
    competitors: [
      { name: 'Core Payment Rails', marketShare: 39, growthRate: 18, innovationScore: 82 },
      { name: 'Digital Asset Custody', marketShare: 24, growthRate: 38, innovationScore: 90 },
      { name: 'Embedded Neobanks', marketShare: 22, growthRate: 21, innovationScore: 78 },
      { name: 'Alternative Credit', marketShare: 15, growthRate: 27, innovationScore: 85 }
    ]
  }
};
SECTOR_METRICS['HealthTech & Bio'] = {
  name: 'HealthTech & Bio',
  cagr: 22.1,
  tam2026: 310,
  tam2030: 730,
  evRevenueMultiple: 14.6,
  dealVelocity: 'Strategic In-Licensing (52 Deals/Qtr)',
  riskScore: 54,
  sentiment: 'Bullish',
  topCatalysts: [
    'In-silico molecular candidate generation cutting early-stage lead discovery',
    'Remote continuous patient telemetry integration into insurance actuarial models',
    'Gene-editing therapies gaining accelerated CMS reimbursement codes'
  ],
  trendHistory: [
    { year: '2022', marketSize: 140, valuationMultiple: 13.5 },
    { year: '2023', marketSize: 175, valuationMultiple: 12.8 },
    { year: '2024', marketSize: 220, valuationMultiple: 13.9 },
    { year: '2025', marketSize: 265, valuationMultiple: 14.2 },
    { year: '2026 (E)', marketSize: 310, valuationMultiple: 14.6 },
    { year: '2028 (P)', marketSize: 480, valuationMultiple: 15.1 },
    { year: '2030 (P)', marketSize: 730, valuationMultiple: 15.5 }
  ],
  swot: {
    strengths: ['High regulatory barriers create enduring moats', 'Enormous demographic aging tailwinds'],
    weaknesses: ['Long capital payback cycles and FDA approval uncertainties'],
    opportunities: ['AI-guided clinical trial patient stratification', 'Decentralized remote clinic ecosystems'],
    threats: ['Medicare pricing negotiation pressure', 'Bio-security and algorithmic diagnostic liability']
  },
  competitors: [
    { name: 'Computational Discovery', marketShare: 35, growthRate: 31, innovationScore: 96 },
    { name: 'Virtual Care Systems', marketShare: 29, growthRate: 19, innovationScore: 80 },
    { name: 'Next-Gen Genomics', marketShare: 21, growthRate: 25, innovationScore: 92 },
    { name: 'Hospital Operating OS', marketShare: 15, growthRate: 11, innovationScore: 71 }
  ]
};

SECTOR_METRICS['Climate & CleanTech'] = {
  name: 'Climate & CleanTech',
  cagr: 25.7,
  tam2026: 410,
  tam2030: 1180,
  evRevenueMultiple: 9.8,
  dealVelocity: 'Infrastructure CapEx Heavy (68 Deals/Qtr)',
  riskScore: 42,
  sentiment: 'Hyper-Growth',
  topCatalysts: [
    'Stationary grid storage reaching <\/kWh threshold',
    'Industrial hydrogen electrolyzer deployment subsidies',
    'AI data center demand driving clean baseload nuclear/geothermal PPA contracts'
  ],
  trendHistory: [
    { year: '2022', marketSize: 130, valuationMultiple: 8.5 },
    { year: '2023', marketSize: 185, valuationMultiple: 9.0 },
    { year: '2024', marketSize: 260, valuationMultiple: 9.4 },
    { year: '2025', marketSize: 330, valuationMultiple: 9.6 },
    { year: '2026 (E)', marketSize: 410, valuationMultiple: 9.8 },
    { year: '2028 (P)', marketSize: 690, valuationMultiple: 10.4 },
    { year: '2030 (P)', marketSize: 1180, valuationMultiple: 11.2 }
  ],
  swot: {
    strengths: ['Irreversible global policy mandates', 'Declining manufacturing costs per megawatt'],
    weaknesses: ['Grid connection queue bottlenecks (3-7 year delays)', 'Commodity price volatility'],
    opportunities: ['Direct air carbon capture industrial credits', 'Modular micro-reactors for data centers'],
    threats: ['Geopolitical trade tariffs on solar PV cells and battery minerals']
  },
  competitors: [
    { name: 'Grid Energy Storage', marketShare: 38, growthRate: 36, innovationScore: 91 },
    { name: 'Carbon Removal Systems', marketShare: 24, growthRate: 42, innovationScore: 89 },
    { name: 'Next-Gen Nuclear/Geo', marketShare: 22, growthRate: 28, innovationScore: 95 },
    { name: 'Green Hydrogen Systems', marketShare: 16, growthRate: 19, innovationScore: 83 }
  ]
};
