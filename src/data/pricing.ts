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
