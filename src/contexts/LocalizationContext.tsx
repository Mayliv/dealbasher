
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ru' | 'kk' | 'en';
type Currency = 'KZT' | 'RUB' | 'USD';
type Region = 'kz' | 'ru';

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  region: Region;
  setRegion: (region: Region) => void;
  t: (key: string) => string;
  formatPrice: (price: number, originalCurrency?: Currency) => string;
}

const defaultLocalization: LocalizationContextType = {
  language: 'ru',
  setLanguage: () => {},
  currency: 'KZT',
  setCurrency: () => {},
  region: 'kz',
  setRegion: () => {},
  t: (key: string) => key,
  formatPrice: (price: number) => `${price}`,
};

const LocalizationContext = createContext<LocalizationContextType>(defaultLocalization);

export const useLocalization = () => useContext(LocalizationContext);

const translations: Record<Language, Record<string, string>> = {
  ru: {
    'app.title': 'DealBasher Казахстан',
    'app.title.kz': 'DealBasher Казахстан',
    'app.title.ru': 'DealBasher Россия',
    'app.tagline': 'Лучшие скидки и предложения',
    'app.tagline.kz': 'Лучшие скидки и предложения в Казахстане',
    'app.tagline.ru': 'Лучшие скидки и предложения в России',
    'nav.home': 'Главная',
    'nav.categories': 'Категории',
    'nav.deals': 'Скидки',
    'nav.promocodes': 'Промокоды',
    'nav.freebies': 'Бесплатно',
    'nav.discussions': 'Обсуждения',
    'nav.submit': 'Добавить сделку',
    'nav.profile': 'Профиль',
    'nav.settings': 'Настройки',
    'nav.login': 'Войти',
    'nav.logout': 'Выйти',
    'currency.kzt': '₸',
    'currency.rub': '₽',
    'currency.usd': '$',
    'deal.hot': 'Горячее',
    'deal.new': 'Новое',
    'deal.discussed': 'Обсуждаемое',
    'deal.expired': 'Истекло',
    'deal.online': 'Онлайн',
    'deal.offline': 'Офлайн',
    'deal.all': 'Все',
    'deal.pricebug': 'Баг цены',
    'deal.comments': 'Комментарии',
    'deal.share': 'Поделиться',
    'deal.loadmore': 'Загрузить ещё',
    'deal.nomore': 'Нет сделок',
    'section.hot_now': '🔥 Горячее прямо сейчас',
    'section.price_bugs': '🐛 Свежие баги цен',
    'section.all_bugs': 'Все баги',
    'section.in_city': '📍 В вашем городе',
    'section.kaspi_red': '🔴 Kaspi RED — рассрочка 0%',
    'filter.period': 'Период',
    'filter.type': 'Тип',
    'filter.min_temp': 'Мин. температура',
    'filter.filters': 'Фильтры',
    'filter.sort': 'Сортировка',
    'search.placeholder': 'Поиск предложений...',
    'search.empty': 'Поле поиска пусто',
    'search.empty_desc': 'Пожалуйста, введите поисковый запрос',
    'sidebar.top_stores': 'Топ магазины недели',
    'sidebar.top_hunters': 'Самые активные охотники',
    'sidebar.hot_categories': 'Горячие категории',
    'submit.title': 'Добавить сделку',
    'submit.subtitle': 'Поделитесь выгодным предложением с сообществом',
    'footer.rights': 'Все права защищены',
  },
  kk: {
    'app.title': 'DealBasher Қазақстан',
    'app.title.kz': 'DealBasher Қазақстан',
    'app.title.ru': 'DealBasher Ресей',
    'app.tagline': 'Ең жақсы жеңілдіктер мен ұсыныстар',
    'app.tagline.kz': 'Қазақстандағы ең жақсы жеңілдіктер мен ұсыныстар',
    'app.tagline.ru': 'Ресейдегі ең жақсы жеңілдіктер мен ұсыныстар',
    'nav.home': 'Басты бет',
    'nav.categories': 'Санаттар',
    'nav.deals': 'Жеңілдіктер',
    'nav.promocodes': 'Промокодтар',
    'nav.freebies': 'Тегін',
    'nav.discussions': 'Талқылаулар',
    'nav.submit': 'Мәміле қосу',
    'nav.profile': 'Профиль',
    'nav.settings': 'Баптаулар',
    'nav.login': 'Кіру',
    'nav.logout': 'Шығу',
    'currency.kzt': '₸',
    'currency.rub': '₽',
    'currency.usd': '$',
    'deal.hot': 'Ыстық',
    'deal.new': 'Жаңа',
    'deal.discussed': 'Талқыланған',
    'deal.expired': 'Мерзімі өткен',
    'deal.online': 'Онлайн',
    'deal.offline': 'Офлайн',
    'deal.all': 'Барлығы',
    'deal.pricebug': 'Баға қатесі',
    'deal.comments': 'Пікірлер',
    'deal.share': 'Бөлісу',
    'deal.loadmore': 'Тағы жүктеу',
    'deal.nomore': 'Мәмілелер жоқ',
    'section.hot_now': '🔥 Қазір ыстық',
    'section.price_bugs': '🐛 Жаңа баға қателері',
    'section.all_bugs': 'Барлық қателер',
    'section.in_city': '📍 Сіздің қалаңызда',
    'section.kaspi_red': '🔴 Kaspi RED — 0% бөліп төлеу',
    'filter.period': 'Кезең',
    'filter.type': 'Түрі',
    'filter.min_temp': 'Мин. температура',
    'filter.filters': 'Сүзгілер',
    'filter.sort': 'Сұрыптау',
    'search.placeholder': 'Ұсыныстарды іздеу...',
    'search.empty': 'Іздеу өрісі бос',
    'search.empty_desc': 'Іздеу сұрауын енгізіңіз',
    'sidebar.top_stores': 'Аптаның үздік дүкендері',
    'sidebar.top_hunters': 'Ең белсенді аңшылар',
    'sidebar.hot_categories': 'Ыстық санаттар',
    'submit.title': 'Мәміле қосу',
    'submit.subtitle': 'Қоғамдастықпен тиімді ұсыныспен бөлісіңіз',
    'footer.rights': 'Барлық құқықтар қорғалған',
  },
  en: {
    'app.title': 'DealBasher Kazakhstan',
    'app.title.kz': 'DealBasher Kazakhstan',
    'app.title.ru': 'DealBasher Russia',
    'app.tagline': 'Best deals and offers',
    'app.tagline.kz': 'Best deals and offers in Kazakhstan',
    'app.tagline.ru': 'Best deals and offers in Russia',
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.deals': 'Deals',
    'nav.promocodes': 'Promo Codes',
    'nav.freebies': 'Freebies',
    'nav.discussions': 'Discussions',
    'nav.submit': 'Submit Deal',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.login': 'Sign In',
    'nav.logout': 'Sign Out',
    'currency.kzt': '₸',
    'currency.rub': '₽',
    'currency.usd': '$',
    'deal.hot': 'Hot',
    'deal.new': 'New',
    'deal.discussed': 'Discussed',
    'deal.expired': 'Expired',
    'deal.online': 'Online',
    'deal.offline': 'Offline',
    'deal.all': 'All',
    'deal.pricebug': 'Price Bug',
    'deal.comments': 'Comments',
    'deal.share': 'Share',
    'deal.loadmore': 'Load More',
    'deal.nomore': 'No deals',
    'section.hot_now': '🔥 Hot Right Now',
    'section.price_bugs': '🐛 Fresh Price Bugs',
    'section.all_bugs': 'All bugs',
    'section.in_city': '📍 In Your City',
    'section.kaspi_red': '🔴 Kaspi RED — 0% Installment',
    'filter.period': 'Period',
    'filter.type': 'Type',
    'filter.min_temp': 'Min. temperature',
    'filter.filters': 'Filters',
    'filter.sort': 'Sort',
    'search.placeholder': 'Search deals...',
    'search.empty': 'Search field is empty',
    'search.empty_desc': 'Please enter a search query',
    'sidebar.top_stores': 'Top Stores This Week',
    'sidebar.top_hunters': 'Most Active Hunters',
    'sidebar.hot_categories': 'Hot Categories',
    'submit.title': 'Submit Deal',
    'submit.subtitle': 'Share a great deal with the community',
    'footer.rights': 'All rights reserved',
  }
};

// Exchange rates
const exchangeRates: Record<Currency, Record<Currency, number>> = {
  KZT: { KZT: 1, RUB: 0.18, USD: 0.0022 },
  RUB: { KZT: 5.6, RUB: 1, USD: 0.012 },
  USD: { KZT: 462, RUB: 82, USD: 1 }
};

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedRegion = localStorage.getItem('dealbasher_region') as Region || 'kz';
  
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('dealbasher_language') as Language) || 'ru';
  });
  const defaultCurrency = savedRegion === 'kz' ? 'KZT' : 'RUB';
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [region, setRegion] = useState<Region>(savedRegion);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('dealbasher_language', lang);
  };

  // Reset currency when region changes
  useEffect(() => {
    if (region === 'kz') {
      setCurrency('KZT');
    } else {
      setCurrency('RUB');
    }
    localStorage.setItem('dealbasher_region', region);

    // Apply KZ accent color
    const root = document.documentElement;
    if (region === 'kz') {
      root.setAttribute('data-region', 'kz');
    } else {
      root.setAttribute('data-region', 'ru');
    }
  }, [region]);

  // Translation function
  const t = (key: string): string => {
    const regionKey = `${key}.${region}`;
    if (translations[language][regionKey]) {
      return translations[language][regionKey];
    }
    return translations[language][key] || key;
  };

  // Price formatter
  const formatPrice = (price: number, originalCurrency: Currency = 'USD'): string => {
    const convertedPrice = price * exchangeRates[originalCurrency][currency];
    
    switch (currency) {
      case 'KZT':
        return `${Math.round(convertedPrice).toLocaleString()} ₸`;
      case 'RUB':
        return `${Math.round(convertedPrice).toLocaleString()} ₽`;
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
      region,
      setRegion,
      t, 
      formatPrice 
    }}>
      {children}
    </LocalizationContext.Provider>
  );
};
