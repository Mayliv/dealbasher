
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ru' | 'kk' | 'en';
type Currency = 'KZT' | 'RUB' | 'USD';

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (key: string) => string;
  formatPrice: (price: number, originalCurrency?: Currency) => string;
}

const defaultLocalization: LocalizationContextType = {
  language: 'ru',
  setLanguage: () => {},
  currency: 'KZT',
  setCurrency: () => {},
  t: (key: string) => key,
  formatPrice: (price: number) => `${price}`,
};

const LocalizationContext = createContext<LocalizationContextType>(defaultLocalization);

export const useLocalization = () => useContext(LocalizationContext);

// Simplified translations for demonstration
const translations: Record<Language, Record<string, string>> = {
  ru: {
    'app.title': 'DealBasher Казахстан',
    'app.tagline': 'Лучшие скидки и предложения в Казахстане',
    'nav.home': 'Главная',
    'nav.categories': 'Категории',
    'nav.deals': 'Скидки',
    'nav.promocodes': 'Промокоды',
    'nav.freebies': 'Бесплатно',
    'nav.discussions': 'Обсуждения',
    'currency.kzt': 'тенге',
    'currency.rub': 'руб',
    'currency.usd': 'USD',
    // Add more translations as needed
  },
  kk: {
    'app.title': 'DealBasher Қазақстан',
    'app.tagline': 'Қазақстандағы ең жақсы жеңілдіктер мен ұсыныстар',
    'nav.home': 'Басты бет',
    'nav.categories': 'Санаттар',
    'nav.deals': 'Жеңілдіктер',
    'nav.promocodes': 'Промокодтар',
    'nav.freebies': 'Тегін',
    'nav.discussions': 'Талқылаулар',
    'currency.kzt': 'теңге',
    'currency.rub': 'руб',
    'currency.usd': 'USD',
    // Add more translations as needed
  },
  en: {
    'app.title': 'DealBasher Kazakhstan',
    'app.tagline': 'Best deals and offers in Kazakhstan',
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.deals': 'Deals',
    'nav.promocodes': 'Promo Codes',
    'nav.freebies': 'Freebies',
    'nav.discussions': 'Discussions',
    'currency.kzt': 'KZT',
    'currency.rub': 'RUB',
    'currency.usd': 'USD',
    // Add more translations as needed
  }
};

// Exchange rates (simplified for demonstration)
const exchangeRates: Record<Currency, Record<Currency, number>> = {
  KZT: { KZT: 1, RUB: 0.18, USD: 0.0022 },
  RUB: { KZT: 5.6, RUB: 1, USD: 0.012 },
  USD: { KZT: 462, RUB: 82, USD: 1 }
};

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');
  const [currency, setCurrency] = useState<Currency>('KZT');

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('dealbasher_language') as Language | null;
    const savedCurrency = localStorage.getItem('dealbasher_currency') as Currency | null;
    
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('dealbasher_language', language);
    localStorage.setItem('dealbasher_currency', currency);
  }, [language, currency]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Price formatter with currency conversion
  const formatPrice = (price: number, originalCurrency: Currency = 'USD'): string => {
    // Convert price to the target currency
    const convertedPrice = price * exchangeRates[originalCurrency][currency];
    
    // Format the price based on the selected currency
    switch (currency) {
      case 'KZT':
        return `${Math.round(convertedPrice).toLocaleString()} ${t('currency.kzt')}`;
      case 'RUB':
        return `${Math.round(convertedPrice).toLocaleString()} ${t('currency.rub')}`;
      case 'USD':
        return `$${convertedPrice.toFixed(2)}`;
      default:
        return `${convertedPrice.toFixed(2)}`;
    }
  };

  return (
    <LocalizationContext.Provider value={{ 
      language, 
      setLanguage, 
      currency, 
      setCurrency, 
      t, 
      formatPrice 
    }}>
      {children}
    </LocalizationContext.Provider>
  );
};
