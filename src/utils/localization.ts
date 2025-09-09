// Localized number formatting utilities
export interface LocalizationConfig {
  country: string;
  currency: string;
  numberFormat: 'indian' | 'international';
  currencySymbol: string;
}

// Country to currency mapping
const COUNTRY_CURRENCY_MAP: { [key: string]: string } = {
  'India': 'INR',
  'United States': 'USD',
  'United Kingdom': 'GBP', 
  'Canada': 'CAD',
  'Australia': 'AUD',
  'Singapore': 'SGD',
  'UAE': 'AED',
  'Germany': 'EUR'
};

// Currency symbols
const CURRENCY_SYMBOLS: { [key: string]: string } = {
  'INR': '₹',
  'USD': '$',
  'GBP': '£',
  'EUR': '€',
  'CAD': 'C$',
  'AUD': 'A$',
  'SGD': 'S$',
  'AED': 'د.إ'
};

// Countries that use international numbering system
const INTERNATIONAL_COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia'
];

export function getLocalizationConfig(country: string, currency?: string): LocalizationConfig {
  const detectedCurrency = currency || COUNTRY_CURRENCY_MAP[country] || 'INR';
  const numberFormat = country === 'India' ? 'indian' : 'international';
  
  return {
    country,
    currency: detectedCurrency,
    numberFormat,
    currencySymbol: CURRENCY_SYMBOLS[detectedCurrency] || '₹'
  };
}

export function formatNumber(amount: number, config: LocalizationConfig, showCurrency: boolean = true): string {
  if (isNaN(amount) || !isFinite(amount)) {
    return showCurrency ? `${config.currencySymbol}0` : '0';
  }

  const absAmount = Math.abs(amount);
  const isNegative = amount < 0;
  const prefix = isNegative ? '-' : '';
  const currencyPrefix = showCurrency ? config.currencySymbol : '';

  if (config.numberFormat === 'indian') {
    return `${prefix}${currencyPrefix}${formatIndianStyle(absAmount)}`;
  } else {
    return `${prefix}${currencyPrefix}${formatInternationalStyle(absAmount)}`;
  }
}

function formatIndianStyle(amount: number): string {
  if (amount >= 10000000) { // 1 Crore
    const crores = amount / 10000000;
    return `${crores.toFixed(2)} crore${crores !== 1 ? 's' : ''}`;
  } else if (amount >= 100000) { // 1 Lakh
    const lakhs = amount / 100000;
    return `${lakhs.toFixed(2)} lakh${lakhs !== 1 ? 's' : ''}`;
  } else if (amount >= 1000) { // 1 Thousand
    const thousands = amount / 1000;
    return `${thousands.toFixed(2)} thousand`;
  } else {
    return amount.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  }
}

function formatInternationalStyle(amount: number): string {
  if (amount >= 1000000000) { // 1 Billion
    const billions = amount / 1000000000;
    return `${billions.toFixed(2)} billion`;
  } else if (amount >= 1000000) { // 1 Million
    const millions = amount / 1000000;
    return `${millions.toFixed(2)} million`;
  } else if (amount >= 1000) { // 1 Thousand
    const thousands = amount / 1000;
    return `${thousands.toFixed(2)} thousand`;
  } else {
    return amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
}

export function formatPercentage(value: number): string {
  if (isNaN(value) || !isFinite(value)) {
    return '0.0%';
  }
  return `${value.toFixed(1)}%`;
}

export function formatScore(score: number): string {
  if (isNaN(score) || !isFinite(score)) {
    return '0.0';
  }
  return score.toFixed(1);
}

// Legacy compatibility - enhanced formatCurrency function
export const formatCurrency = (amount: number, currencyCode: string = 'INR', country: string = 'India'): string => {
  const config = getLocalizationConfig(country, currencyCode);
  return formatNumber(amount, config, true);
};