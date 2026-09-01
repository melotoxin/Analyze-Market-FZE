import { Building2, XCircle, Award, RefreshCw, Receipt, Calculator } from 'lucide-react';
import type { ServiceSlug } from './servicesData';

/**
 * One slug -> icon map. The navbar and the service detail page each carried their
 * own copy, so adding or renaming a service meant remembering both.
 * Kept out of servicesData.ts so that file stays free of component imports.
 */
export const SERVICE_ICONS: Record<ServiceSlug, typeof Building2> = {
  'company-incorporation': Building2,
  'company-liquidation-services': XCircle,
  'golden-visa-services': Award,
  'license-renewal-pro-services': RefreshCw,
  'vat-corporate-tax-filing-services': Receipt,
  'accounting-services': Calculator,
};
