export type IndustrySector = 
  | 'All'
  | 'Enterprise AI & SaaS'
  | 'FinTech & DeFi'
  | 'HealthTech & Bio'
  | 'Climate & CleanTech'
  | 'Global E-Commerce'
  | 'DeepTech & Semi';

export type ExperienceLevel = 'Partner / Principal' | 'Senior Practice Lead' | 'Staff Quant Analyst' | 'Specialist Fellow';

export interface Consultant {
  id: string;
  name: string;
  avatar: string;
  title: string;
  formerFirm: string;
  sector: IndustrySector;
  level: ExperienceLevel;
  rating: number;
  reviewCount: number;
  completedDeals: number;
  hourlyRate: number;
  availability: 'Available Immediately' | '2 Slots Available' | 'Next Week';
  location: string;
  bio: string;
  skills: string[];
  featuredAchievement: string;
  topInsightsCount: number;
  languages: string[];
  verifiedStatus: 'Top 1% Global' | 'Enterprise Certified' | 'Ex-MBB Lead';
}

export interface SectorMetrics {
  name: string;
  cagr: number;
  tam2026: number;
  tam2030: number;
  evRevenueMultiple: number;
  dealVelocity: string;
  riskScore: number;
  sentiment: 'Bullish' | 'Neutral' | 'Hyper-Growth' | 'Volatile';
  topCatalysts: string[];
  trendHistory: { year: string; marketSize: number; valuationMultiple: number }[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  competitors: { name: string; marketShare: number; growthRate: number; innovationScore: number }[];
}

export interface AdvisoryService {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  category: string;
  timeline: string;
  pricingTier: string;
  deliverables: string[];
  suitableFor: string;
  badge?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  dealSize: string;
  outcomeMetric: string;
  metricLabel: string;
  summary: string;
  beforeStats: { label: string; value: string };
  afterStats: { label: string; value: string };
  quote: string;
  author: string;
  authorTitle: string;
  tags: string[];
}

export interface ActiveDeliverable {
  id: string;
  title: string;
  status: 'In Progress' | 'Review Ready' | 'Completed' | 'Data Verification';
  progress: number;
  leadAnalyst: string;
  dueDate: string;
  fileSize: string;
  category: string;
}

export interface ProjectScopeSubmission {
  companyName: string;
  email: string;
  sector: string;
  budgetRange: string;
  timeline: string;
  primaryObjective: string;
  advisoryType: string;
  dataAccessAvailable: boolean;
}
