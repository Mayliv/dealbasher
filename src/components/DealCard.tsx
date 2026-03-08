
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Deal, deals } from '@/utils/data';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useTemperatureVote } from '@/hooks/useTemperatureVote';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { isDealOfTheDay } from '@/components/DealOfTheDay';

interface DealCardProps {
  deal: Deal;
}

const getTemperatureColor = (temp: number) => {
  if (temp < 0) return 'text-blue-500';
  if (temp <= 50) return 'text-muted-foreground';
  if (temp <= 200) return 'text-orange-500';
  return 'text-red-600';
};

// ─── Animated counter ──────────────────────────────────────
const AnimatedTemp = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    prevRef.current = to;

    const steps = 12;
    const stepTime = 30;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplay(Math.round(from + ((to - from) * i) / steps));
      if (i >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return <>{display > 0 ? '+' : ''}{display}°</>;
};

// ─── Floating delta animation ──────────────────────────────
const FloatingDelta = ({ delta }: { delta: number | null }) => {
  const [visible, setVisible] = useState(false);
  const [currentDelta, setCurrentDelta] = useState<number | null>(null);

  useEffect(() => {
    if (delta === null) return;
    setCurrentDelta(delta);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, [delta]);

  if (!visible || currentDelta === null) return null;
  const isPositive = currentDelta > 0;

  return (
    <span
      className={cn(
        'absolute -top-5 left-1/2 -translate-x-1/2 text-sm font-bold pointer-events-none animate-vote-float',
        isPositive ? 'text-orange-500' : 'text-blue-500'
      )}
    >
      {isPositive ? '+' : ''}{currentDelta}
    </span>
  );
};

// ─── Swipe overlay feedback ────────────────────────────────
const SwipeOverlay = ({ direction, opacity }: { direction: 'hot' | 'cold' | null; opacity: number }) => {
  if (!direction || opacity <= 0) return null;
  return (
    <div
      className={cn(
        'absolute inset-0 z-30 rounded-xl flex items-center justify-center pointer-events-none transition-opacity',
        direction === 'hot' ? 'bg-orange-500/20' : 'bg-blue-500/20'
      )}
      style={{ opacity: Math.min(opacity, 1) }}
    >
      <span className="text-5xl">{direction === 'hot' ? '🔥' : '❄️'}</span>
    </div>
  );
};

const DealCard = ({ deal }: DealCardProps) => {
  const { formatPrice, region } = useLocalization();
  const { temperature, userVote, lastDelta, vote } = useTemperatureVote(deal.id, deal.temperature);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const isExpired = temperature < -10;
  const isOnFire = temperature > 300;
  const currency = region === 'kz' ? 'KZT' : region === 'ru' ? 'RUB' : 'USD';

  const regionDeals = deals.filter(d => !d.region || d.region === region);
  const isDOTD = isDealOfTheDay(deal.id, regionDeals);

  // ─── Swipe gesture state ─────────────────────────────────
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'hot' | 'cold' | null>(null);
  const SWIPE_THRESHOLD = 80;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isMobile || userVote) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, [isMobile, userVote]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isMobile || userVote || touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dy) > Math.abs(dx)) return;
    setSwipeOffset(dx);
    setSwipeDirection(dx > 30 ? 'hot' : dx < -30 ? 'cold' : null);
  }, [isMobile, userVote]);

  const handleTouchEnd = useCallback(() => {
    if (!isMobile || userVote) return;
    if (swipeOffset > SWIPE_THRESHOLD) vote('hot');
    else if (swipeOffset < -SWIPE_THRESHOLD) vote('cold');
    setSwipeOffset(0);
    setSwipeDirection(null);
    touchStartX.current = null;
    touchStartY.current = null;
  }, [isMobile, userVote, swipeOffset, vote]);

  const swipeOpacity = Math.abs(swipeOffset) / SWIPE_THRESHOLD;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('[data-no-navigate]')) return;
    navigate(`/deal/${deal.id}`);
  };

  return (
    <div
      className={cn(
        'group bg-card text-card-foreground rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-200 relative cursor-pointer',
        !isMobile && 'hover:-translate-y-0.5',
        isOnFire && 'hot-deal-glow',
        isDOTD && 'border-yellow-400/60 dark:border-yellow-500/40'
      )}
      onClick={handleCardClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={isMobile && swipeOffset ? { transform: `translateX(${swipeOffset * 0.3}px)`, transition: swipeOffset === 0 ? 'transform 0.3s' : 'none' } : undefined}
    >
      {/* Deal of the Day crown */}
      {isDOTD && (
        <div className="dotd-crown-badge">
          <span className="text-2xl" title="Сделка дня">👑</span>
        </div>
      )}

      {/* Swipe overlay */}
      <SwipeOverlay direction={swipeDirection} opacity={swipeOpacity} />

      {/* Expired overlay */}
      {isExpired && (
        <div className="absolute inset-0 z-20 bg-background/70 backdrop-blur-[2px] flex items-center justify-center rounded-xl">
          <div className="text-center">
            <span className="text-4xl">❄️</span>
            <p className="text-sm font-semibold text-muted-foreground mt-1">Истёкшая сделка?</p>
          </div>
        </div>
      )}

      {/* 3-column layout */}
      <div className="flex items-stretch">
        {/* LEFT: Voting widget (20%) */}
        <div className="w-[20%] shrink-0 flex flex-col items-center justify-center gap-1.5 py-3 px-1 border-r border-border" data-no-navigate>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); vote('hot'); }}
            disabled={!!userVote}
            data-no-navigate
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center text-base transition-all duration-200',
              userVote === 'hot'
                ? 'bg-orange-500 scale-110 shadow-md'
                : userVote
                  ? 'bg-muted opacity-50 cursor-not-allowed'
                  : 'bg-orange-500/10 hover:bg-orange-500/20 hover:scale-110 cursor-pointer'
            )}
            title="Hot!"
          >
            🔥
          </button>

          {/* Temperature */}
          <div className="relative">
            <FloatingDelta delta={lastDelta} />
            <span className={cn('text-lg font-extrabold', getTemperatureColor(temperature))}>
              <AnimatedTemp value={temperature} />
            </span>
          </div>

          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); vote('cold'); }}
            disabled={!!userVote}
            data-no-navigate
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center text-base transition-all duration-200',
              userVote === 'cold'
                ? 'bg-blue-500 scale-110 shadow-md'
                : userVote
                  ? 'bg-muted opacity-50 cursor-not-allowed'
                  : 'bg-blue-500/10 hover:bg-blue-500/20 hover:scale-110 cursor-pointer'
            )}
            title="Cold"
          >
            ❄️
          </button>
        </div>

        {/* CENTER: Product image (45%) */}
        <div className="w-[45%] shrink-0 relative">
          <div className="aspect-square w-full overflow-hidden bg-muted">
            <img
              src={deal.imageUrl}
              alt={deal.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Price Bug badge */}
          {deal.isPriceBug && (
            <div className="absolute top-2 left-2">
              <Badge variant="outline" className="bg-background/90 border-destructive text-destructive backdrop-blur-sm text-[10px] font-bold">
                🐛 Bug
              </Badge>
            </div>
          )}

          {/* Mobile: swipe hint */}
          {isMobile && !userVote && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <span className="text-[10px] text-white/80 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5">
                ← ❄️ свайп 🔥 →
              </span>
            </div>
          )}
        </div>

        {/* RIGHT: Content (35%) */}
        <div className="w-[35%] flex flex-col justify-between p-3 min-w-0">
          {/* Store badge */}
          <Badge variant="secondary" className="self-start text-[10px] px-1.5 py-0 h-5 mb-1.5 shrink-0">
            {deal.store}
          </Badge>

          {/* Title */}
          <h3 className="text-sm font-bold leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors mb-auto">
            {deal.title}
          </h3>

          {/* Price block */}
          <div className="mt-2 space-y-0.5">
            <span className="text-lg font-extrabold text-[hsl(var(--deal-success))] block leading-tight">
              {formatPrice(deal.dealPrice, currency)}
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {deal.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(deal.originalPrice, currency)}
                </span>
              )}
              {deal.discount && (
                <Badge className="bg-[hsl(var(--deal-success))] text-primary-foreground border-0 text-[10px] font-bold px-1.5 py-0 h-4">
                  -{deal.discount}%
                </Badge>
              )}
            </div>
          </div>

          {/* Bottom row: user, time, comments */}
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-muted-foreground">
            <span className="truncate max-w-[60px]">{deal.postedBy}</span>
            <span>·</span>
            <Clock className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{deal.postedAt}</span>
            <span>·</span>
            <MessageSquare className="w-2.5 h-2.5 shrink-0" />
            <span>{deal.comments}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR: CTA Button */}
      <a
        href={deal.url}
        target="_blank"
        rel="noopener noreferrer"
        data-no-navigate
        onClick={(e) => e.stopPropagation()}
        className="block w-full gradient-primary text-primary-foreground text-center py-2.5 text-sm font-bold hover:opacity-90 transition-opacity"
      >
        🛒 Перейти к скидке
      </a>
    </div>
  );
};

export default DealCard;
