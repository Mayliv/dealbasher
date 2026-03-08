import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deals } from '@/utils/data';
import { useLocalization } from '@/contexts/LocalizationContext';
import { getStoredTemp } from '@/hooks/useTemperatureVote';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, ChevronDown, ChevronUp, Crown, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Deterministic "deal of the day" based on date seed
const getDealOfTheDay = (regionDeals: typeof deals, dateOffset = 0) => {
  const now = new Date();
  const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dateOffset);
  const seed = day.getFullYear() * 10000 + (day.getMonth() + 1) * 100 + day.getDate();
  const sorted = [...regionDeals].sort(
    (a, b) => getStoredTemp(b.id, b.temperature) - getStoredTemp(a.id, a.temperature)
  );
  if (sorted.length === 0) return null;
  return sorted[seed % sorted.length];
};

export const isDealOfTheDay = (dealId: number, regionDeals: typeof deals) => {
  const dotd = getDealOfTheDay(regionDeals);
  return dotd?.id === dealId;
};

export const wasDealOfTheDay = (dealId: number, regionDeals: typeof deals) => {
  const yesterday = getDealOfTheDay(regionDeals, 1);
  return yesterday?.id === dealId;
};

// Countdown to midnight
const useCountdown = () => {
  const getTimeLeft = () => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const diff = midnight.getTime() - now.getTime();
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
};

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl sm:text-3xl font-extrabold text-foreground tabular-nums">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
  </div>
);

interface DealOfTheDayProps {
  regionDeals: typeof deals;
}

const DealOfTheDay: React.FC<DealOfTheDayProps> = ({ regionDeals }) => {
  const { formatPrice, region } = useLocalization();
  const { toast } = useToast();
  const countdown = useCountdown();
  const [yesterdayOpen, setYesterdayOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const todayDeal = getDealOfTheDay(regionDeals);
  const yesterdayDeal = getDealOfTheDay(regionDeals, 1);
  const currency = region === 'kz' ? 'KZT' : region === 'ru' ? 'RUB' : 'USD';

  if (!todayDeal) return null;

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
    toast({
      title: subscribed ? 'Подписка отменена' : '✅ Вы подписались!',
      description: subscribed
        ? 'Вы больше не будете получать сделку дня'
        : 'Вы будете получать лучшую сделку дня каждый день',
    });
  };

  return (
    <section className="mb-8 space-y-3">
      {/* Main banner */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-yellow-400/60 dark:border-yellow-500/40 dotd-shine">
        {/* Golden gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-50/80 to-orange-50 dark:from-yellow-900/20 dark:via-amber-900/10 dark:to-card" />

        <div className="relative p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🏆</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                  Сделка дня
                </h2>
                <p className="text-xs text-muted-foreground">Лучшее предложение сегодня</p>
              </div>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-xl border border-border px-4 py-2">
              <CountdownUnit value={countdown.h} label="час" />
              <span className="text-xl font-bold text-muted-foreground">:</span>
              <CountdownUnit value={countdown.m} label="мин" />
              <span className="text-xl font-bold text-muted-foreground">:</span>
              <CountdownUnit value={countdown.s} label="сек" />
            </div>
          </div>

          {/* Deal content */}
          <Link to={`/deal/${todayDeal.id}`} className="block group">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Image */}
              <div className="sm:w-48 h-40 sm:h-auto rounded-xl overflow-hidden bg-muted shrink-0 border border-yellow-200 dark:border-yellow-800/30">
                <img
                  src={todayDeal.imageUrl}
                  alt={todayDeal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge className="bg-yellow-500 text-white border-0 text-xs font-bold">
                      👑 Deal of the Day
                    </Badge>
                    <Badge variant="secondary" className="text-xs">{todayDeal.store}</Badge>
                    {todayDeal.discount && (
                      <Badge className="bg-[hsl(var(--deal-success))] text-primary-foreground border-0 text-xs font-bold">
                        -{todayDeal.discount}%
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {todayDeal.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{todayDeal.description}</p>
                </div>

                <div className="flex items-end justify-between gap-4 mt-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[hsl(var(--deal-success))]">
                        {formatPrice(todayDeal.dealPrice, currency)}
                      </span>
                      {todayDeal.originalPrice && (
                        <span className="text-base text-muted-foreground line-through">
                          {formatPrice(todayDeal.originalPrice, currency)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                      <span>🔥 {getStoredTemp(todayDeal.id, todayDeal.temperature)}°</span>
                      <span>·</span>
                      <span>💬 {todayDeal.comments}</span>
                    </div>
                  </div>

                  <a
                    href={todayDeal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 inline-flex items-center gap-2 gradient-primary text-primary-foreground px-5 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
                  >
                    🛒 Перейти к скидке
                  </a>
                </div>
              </div>
            </div>
          </Link>

          {/* Subscribe row */}
          <div className="mt-4 pt-4 border-t border-yellow-200/60 dark:border-yellow-800/20 flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-muted-foreground">
              📧 Получайте лучшую сделку каждый день на почту или в Telegram
            </p>
            <Button
              variant={subscribed ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'gap-1.5 text-xs',
                subscribed && 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500'
              )}
              onClick={handleSubscribe}
            >
              {subscribed ? (
                <>
                  <Bell className="h-3.5 w-3.5" />
                  Подписка оформлена
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Получать сделку дня
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Yesterday's deal — collapsible */}
      {yesterdayDeal && yesterdayDeal.id !== todayDeal.id && (
        <Collapsible open={yesterdayOpen} onOpenChange={setYesterdayOpen}>
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-card border hover:bg-muted/50 transition-colors text-sm">
              <span className="flex items-center gap-2 text-muted-foreground font-medium">
                <Crown className="h-4 w-4 text-yellow-500/60" />
                Вчерашняя сделка дня
              </span>
              {yesterdayOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Link to={`/deal/${yesterdayDeal.id}`} className="block mt-2">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border hover:shadow-md transition-shadow group">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                  <img src={yesterdayDeal.imageUrl} alt={yesterdayDeal.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {yesterdayDeal.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-extrabold text-[hsl(var(--deal-success))]">
                      {formatPrice(yesterdayDeal.dealPrice, currency)}
                    </span>
                    {yesterdayDeal.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(yesterdayDeal.originalPrice, currency)}
                      </span>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] text-muted-foreground shrink-0">
                  Вчера
                </Badge>
              </div>
            </Link>
          </CollapsibleContent>
        </Collapsible>
      )}
    </section>
  );
};

export default DealOfTheDay;
