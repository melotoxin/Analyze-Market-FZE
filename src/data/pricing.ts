// Single source of truth for money. Previously three components each carried their
// own rate table and two of them silently fell back to AED when GBP was selected.

export const CURRENCIES = ['AED', 'USD', 'EUR', 'GBP'] as const;
export type Currency = (typeof CURRENCIES)[number];

export const isCurrency = (v: string): v is Currency =>
  (CURRENCIES as readonly string[]).includes(v);

// ponytail: rates are pegged/manual, refreshed with the annual tariff sheet.
// Swap for a rates API only if the client wants intraday accuracy.
const RATES: Record<Currency, { symbol: string; perAed: number }> = {
  AED: { symbol: 'AED', perAed: 1 },
  USD: { symbol: '$', perAed: 0.2723 }, // AED is pegged at 3.6725/USD
  EUR: { symbol: '€', perAed: 0.2513 },
  GBP: { symbol: '£', perAed: 0.2150 },
};

/** Format an AED amount in the active currency. Never falls through to a wrong label. */
export function formatMoney(aed: number, currency: string): string {
  const { symbol, perAed } = RATES[isCurrency(currency) ? currency : 'AED'];
  const value = Math.round(aed * perAed).toLocaleString('en-US');
  return symbol === 'AED' ? `AED ${value}` : `${symbol}${value}`;
}

// --- Setup cost model (AED, 2026 tariffs) -------------------------------------

export const BASE_PRICES = { freezone: 11500, mainland: 17500, offshore: 13500 } as const;
export const WORKSPACE_ADDONS = { flexi: 0, office: 8500, warehouse: 18000 } as const;

// Activity was previously a purely cosmetic control: four prominent buttons that
// never entered the total. These are the real regulatory approval deltas.
export const ACTIVITY_ADDONS = {
  tech: 0,
  consulting: 1200,
  ecommerce: 2400,
  trading: 3500,
} as const;

export const VISA_UNIT_COST = 3600;
export const MAX_VISAS = 8;

export type Jurisdiction = keyof typeof BASE_PRICES;
export type Workspace = keyof typeof WORKSPACE_ADDONS;
export type Activity = keyof typeof ACTIVITY_ADDONS;

export function calculateSetupAed(opts: {
  jurisdiction: Jurisdiction;
  workspace: Workspace;
  activity: Activity;
  visaCount: number;
}): number {
  const visas = Math.min(MAX_VISAS, Math.max(0, Math.floor(opts.visaCount) || 0));
  return (
    BASE_PRICES[opts.jurisdiction] +
    WORKSPACE_ADDONS[opts.workspace] +
    ACTIVITY_ADDONS[opts.activity] +
    visas * VISA_UNIT_COST
  );
}
