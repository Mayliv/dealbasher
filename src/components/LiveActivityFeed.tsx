import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { deals } from '@/utils/data';
import { useLocalization } from '@/contexts/LocalizationContext';

const NAMES = ['Алексей', 'Марина', 'Дмитрий', 'Анна', 'Сергей', 'Екатерина', 'Иван', 'Ольга', 'Николай', 'Татьяна', 'Артём', 'Юлия'];
const CITIES = ['Москвы', 'Екатеринбурга', 'Алматы', 'Астаны', 'Новосибирска', 'Казани', 'Санкт-Петербурга', 'Краснодара', 'Самары', 'Челябинска'];
const COMMENTS = [
  'Брала вчера, всё пришло!',
  'Топ цена, забрал!',
  'Проверено, работает 👍',
  'У меня такой же, рекомендую',
  'Спасибо за находку!',
  'Уже заказал, ждём',
];

type FeedItem = {
  id: number;
  type: 'deal' | 'comment' | 'pricebug';
  text: string;
  emoji: string;
  dealId: number;
};

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateItem = (formatPrice: (p: number, c: string) => string, currency: string): FeedItem => {
  const deal = pick(deals);
  const name = pick(NAMES);
  const city = pick(CITIES);
  const type = pick(['deal', 'comment', 'pricebug'] as const);
  const price = formatPrice(deal.dealPrice, currency);

  switch (type) {
    case 'deal':
      return { id: Date.now(), type, emoji: '🔥', text: `${name} из ${city} только что добавил сделку на ${deal.title.slice(0, 30)} за ${price}`, dealId: deal.id };
    case 'comment':
      return { id: Date.now(), type, emoji: '💬', text: `${name} прокомментировал: «${pick(COMMENTS)}»`, dealId: deal.id };
    case 'pricebug':
      return { id: Date.now(), type, emoji: '⚡', text: `Баг цены! ${deal.title.slice(0, 25)} за ${price} на ${deal.store}`, dealId: deal.id };
  }
};

const DISMISS_KEY = 'activity_feed_dismissed';

const LiveActivityFeed = () => {
  const navigate = useNavigate();
  const { formatPrice, region } = useLocalization();
  const currency = region === 'kz' ? 'KZT' : region === 'ru' ? 'RUB' : 'USD';

  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISS_KEY) === 'true');
  const [current, setCurrent] = useState<FeedItem | null>(null);
  const [visible, setVisible] = useState(false);

  const showNext = useCallback(() => {
    const item = generateItem(formatPrice, currency);
    setCurrent(item);
    setVisible(true);
    setTimeout(() => setVisible(false), 5000);
  }, [formatPrice, currency]);

  useEffect(() => {
    if (dismissed) return;
    const initialDelay = setTimeout(showNext, 5000);
    const interval = setInterval(showNext, 15000 + Math.random() * 15000);
    return () => { clearTimeout(initialDelay); clearInterval(interval); };
  }, [dismissed, showNext]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    setDismissed(true);
    localStorage.setItem(DISMISS_KEY, 'true');
  };

  if (dismissed || !current) return null;

  return (
    <div
      className={cn(
        'fixed bottom-20 left-4 z-50 max-w-xs w-full cursor-pointer transition-all duration-500 ease-out',
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0 pointer-events-none'
      )}
      onClick={() => { setVisible(false); navigate(`/deal/${current.dealId}`); }}
    >
      <div className="bg-card border border-border rounded-xl shadow-lg p-3 pr-8 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <p className="text-sm text-foreground leading-snug">
          <span className="mr-1">{current.emoji}</span>
          {current.text}
        </p>
        <p className="text-[10px] text-muted-foreground mt-1">только что</p>
      </div>
    </div>
  );
};

export default LiveActivityFeed;
