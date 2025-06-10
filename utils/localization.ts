import { SUPPORTED_CURRENCIES, HNL_CONVERSION_RATE } from '../constants';

export const formatCurrency = (amount: number, targetCurrencyCode: string): string => {
  const baseAmountUSD = amount; // Assuming input 'amount' is always in USD from mockData
  let displayAmount = baseAmountUSD;

  const currencyInfo = SUPPORTED_CURRENCIES.find(c => c.code === targetCurrencyCode);
  if (!currencyInfo) {
    // Fallback to USD if target currency is not found
    const usdInfo = SUPPORTED_CURRENCIES.find(c => c.code === 'USD')!;
    return new Intl.NumberFormat(usdInfo.locale, { style: 'currency', currency: usdInfo.code }).format(baseAmountUSD);
  }

  if (targetCurrencyCode === 'HNL') {
    displayAmount = baseAmountUSD * HNL_CONVERSION_RATE;
  }
  
  try {
    return new Intl.NumberFormat(currencyInfo.locale, { 
        style: 'currency', 
        currency: currencyInfo.code,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(displayAmount);
  } catch (e) {
    console.error("Error formatting currency:", e);
    // Fallback simple formatting
    return `${currencyInfo.symbol}${displayAmount.toFixed(2)}`;
  }
};

// Simple translation helper
// In a real app, this would be more sophisticated (e.g., using i18next)
export const t = (translations: Record<string, string>, lang: string, key: string, fallback?: string): string => {
  return translations[`${key}_${lang}`] || fallback || key;
};
