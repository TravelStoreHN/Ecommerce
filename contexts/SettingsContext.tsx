import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DEFAULT_LANGUAGE, DEFAULT_CURRENCY, SUPPORTED_LANGUAGES, SUPPORTED_CURRENCIES } from '../constants';

interface SettingsContextType {
  language: string;
  setLanguage: (language: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  supportedLanguages: { code: string; name: string }[];
  supportedCurrencies: { code: string; name: string; symbol: string; locale: string }[];
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(DEFAULT_LANGUAGE);
  const [currency, setCurrencyState] = useState<string>(DEFAULT_CURRENCY);

  const setLanguage = (langCode: string) => {
    if (SUPPORTED_LANGUAGES.find(lang => lang.code === langCode)) {
      setLanguageState(langCode);
    }
  };

  const setCurrency = (currencyCode: string) => {
    if (SUPPORTED_CURRENCIES.find(curr => curr.code === currencyCode)) {
      setCurrencyState(currencyCode);
    }
  };

  return (
    <SettingsContext.Provider value={{ 
        language, 
        setLanguage, 
        currency, 
        setCurrency,
        supportedLanguages: SUPPORTED_LANGUAGES,
        supportedCurrencies: SUPPORTED_CURRENCIES
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
