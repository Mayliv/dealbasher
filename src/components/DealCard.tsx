
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Clock, Share2, Flag, TimerOff, ChevronUp, ChevronDown, Bookmark, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Deal, deals } from '@/utils/data';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useTemperatureVote } from '@/hooks/useTemperatureVote';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { isDealOfTheDay } from '@/components/DealOfTheDay';
import ShareModal from '@/components/ShareModal';
import ReportDealModal, { getReportCount, reportExpired } from '@/components/ReportDealModal';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DealCardProps {
  deal: Deal;
  variant?: 'default' | 'compact';
}

const getTemperatureColor = (temp: number) => {
  if (temp < 0) return 'text-deal-cold';
  if (temp <= 50) return 'text-meta';
  if (temp <= 200) return 'text-primary';
  return 'text-deal-hot';
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
        isPositive ? 'text-deal-hot' : 'text-deal-cold'
      )}
    >
      {isPositive ? '+' : ''}{currentDelta}
    </span>
  );
};

const DealCard = ({ deal, variant = 'default' }: DealCardProps) => {
  const { formatPrice, region } = useLocalization();
  const { temperature, userVote, lastDelta, vote } = useTemperatureVote(deal.id, deal.temperature);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [shareOpen, setShareOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportCount, setReportCount] = useState(() => getReportCount(deal.id));
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [shareCount, setShareCount] = useState(() => {
    const stored = localStorage.getItem(`share_count_${deal.id}`);
    return stored ? parseInt(stored, 10) : Math.floor(Math.random() * 120);
  });

  const handleShare = () => {
    const newCount = shareCount + 1;
    setShareCount(newCount);
    localStorage.setItem(`share_count_${deal.id}`, String(newCount));
  };

  const handleExpiredReport = (e: React.MouseEvent) => {
    e.stopPropagation();
    reportExpired(deal.id);
    setReportCount(prev => prev + 1);
    toast({ title: '🕐 Отмечено как истёкшее', description: 'Спасибо за обратную связь!' });
  };

  const isUnderReview = reportCount >= 3;
  const isExpired = temperature < -10;
  const currency = region === 'kz' ? 'KZT' : region === 'ru' ? 'RUB' : 'USD';

  const regionDeals = deals.filter(d => !d.region || d.region === region);
  const isDOTD = isDealOfTheDay(deal.id, regionDeals);

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-no-navigate]')) return;
    navigate(`/deal/${deal.id}`);
  };

  // ─── COMPACT variant (for horizontal scroll "Самое горячее") ───
  if (variant === 'compact') {
    return (
      <div
        className="w-[220px] shrink-0 bg-card border rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all group"
        onClick={handleCardClick}
      >
        {/* Image */}
        <div className="relative h-[140px] overflow-hidden bg-muted">
          <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <Badge className="absolute top-2 right-2 text-[10px] px-1.5 py-0 h-5 bg-[hsl(var(--deal-success))] text-primary-foreground border-0 backdrop-blur-sm">
            {deal.store}
          </Badge>
          {deal.isPriceBug && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0 h-5 border-0">
              🐛 Баг
            </Badge>
          )}
          {isDOTD && (
            <Badge className="absolute bottom-2 left-2 bg-yellow-500 text-white text-[10px] px-1.5 py-0 h-5 border-0">
              👑 Сделка дня
            </Badge>
          )}
        </div>

        {/* Vote row (horizontal) */}
        <div className="flex items-center justify-center gap-2 py-2 border-b border-border" data-no-navigate>
          <button
            onClick={(e) => { e.stopPropagation(); vote('hot'); }}
            disabled={!!userVote}
            data-no-navigate
            className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center transition-all',
              userVote === 'hot' ? 'bg-deal-hot text-white' : userVote ? 'bg-muted opacity-50' : 'hover:bg-deal-hot/20 text-muted-foreground hover:text-deal-hot'
            )}
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <div className="relative">
            <FloatingDelta delta={lastDelta} />
            <span className={cn('text-sm font-extrabold', getTemperatureColor(temperature))}>
              <AnimatedTemp value={temperature} />
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); vote('cold'); }}
            disabled={!!userVote}
            data-no-navigate
            className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center transition-all',
              userVote === 'cold' ? 'bg-deal-cold text-white' : userVote ? 'bg-muted opacity-50' : 'hover:bg-deal-cold/20 text-muted-foreground hover:text-deal-cold'
            )}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          <h3 className="text-[13px] font-bold leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {deal.title}
          </h3>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-base font-extrabold text-destructive">
              {formatPrice(deal.dealPrice, currency)}
            </span>
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

          {/* CTA */}
          <a
            href={deal.url}
            target="_blank"
            rel="noopener noreferrer"
            data-no-navigate
            onClick={(e) => e.stopPropagation()}
            className="block w-full text-center gradient-primary text-primary-foreground text-xs font-bold py-2 rounded-lg hover:scale-[1.03] transition-transform"
          >
            Забрать скидку →
          </a>
        </div>
      </div>
    );
  }

  // ─── DEFAULT variant: Full-width horizontal Pepper-style ───
  return (
    <div
      className={cn(
        'group bg-card text-card-foreground border-b border-border hover:bg-muted/30 hover:shadow-sm transition-all duration-200 relative cursor-pointer',
        isExpired && 'opacity-60',
        deal.isPriceBug && 'ring-2 ring-destructive/40 animate-bug-pulse rounded-xl',
        !deal.isPriceBug && 'rounded-none first:rounded-t-xl last:rounded-b-xl'
      )}
      onClick={handleCardClick}
    >
      {/* Expired overlay */}
      {isExpired && (
        <div className="absolute inset-0 z-20 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
          <div className="text-center">
            <span className="text-3xl">❄️</span>
            <p className="text-xs font-semibold text-muted-foreground mt-1">Истёкшая сделка</p>
          </div>
        </div>
      )}

      {/* Community review overlay */}
      {isUnderReview && !isExpired && (
        <div className="absolute inset-0 z-20 bg-amber-500/10 backdrop-blur-[1px] flex items-center justify-center">
          <div className="text-center bg-background/90 rounded-lg px-3 py-2">
            <span className="text-xl">⚠️</span>
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1">Проверяется</p>
          </div>
        </div>
      )}

      <div className={cn('flex items-center', isMobile ? 'px-3 py-3 gap-3' : 'px-4 py-3 gap-4')}>
        {/* LEFT: Vote widget */}
        <div className="w-[52px] shrink-0 flex flex-col items-center gap-0.5" data-no-navigate>
          <button
            onClick={(e) => { e.stopPropagation(); vote('hot'); }}
            disabled={!!userVote}
            data-no-navigate
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center transition-all',
              userVote === 'hot'
                ? 'bg-deal-hot text-white shadow-md'
                : userVote
                  ? 'text-muted-foreground/30'
                  : 'text-muted-foreground hover:bg-deal-hot/10 hover:text-deal-hot'
            )}
          >
            <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <div className="relative py-0.5">
            <FloatingDelta delta={lastDelta} />
            <span className={cn('text-base font-extrabold leading-none', getTemperatureColor(temperature))}>
              <AnimatedTemp value={temperature} />
            </span>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); vote('cold'); }}
            disabled={!!userVote}
            data-no-navigate
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center transition-all',
              userVote === 'cold'
                ? 'bg-deal-cold text-white shadow-md'
                : userVote
                  ? 'text-muted-foreground/30'
                  : 'text-muted-foreground hover:bg-deal-cold/10 hover:text-deal-cold'
            )}
          >
            <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* CENTER-LEFT: Image */}
        <div className={cn(
          'shrink-0 relative rounded-lg overflow-hidden bg-muted',
          isMobile ? 'w-[100px] h-[80px]' : 'w-[160px] h-[120px]',
          deal.isPriceBug && 'ring-2 ring-destructive ring-offset-1 ring-offset-background'
        )}>
          <img
            src={deal.imageUrl}
            alt={deal.title}
            className="w-full h-full object-cover"
          />
          {/* Store badge on image */}
          <Badge className="absolute top-1.5 right-1.5 text-[9px] px-1 py-0 h-4 bg-[hsl(var(--deal-success))] text-primary-foreground border-0 backdrop-blur-sm">
            {deal.store}
          </Badge>
          {/* Special badges on image */}
          {deal.isPriceBug && (
            <Badge className="absolute bottom-1.5 left-1.5 bg-destructive text-destructive-foreground text-[9px] px-1 py-0 h-4 border-0">
              🐛 Баг цены
            </Badge>
          )}
          {deal.dealPrice === 0 && (
            <Badge className="absolute bottom-1.5 left-1.5 bg-[hsl(var(--deal-success))] text-primary-foreground text-[9px] px-1 py-0 h-4 border-0">
              🆓 Бесплатно
            </Badge>
          )}
          {deal.isOffline && (
            <Badge className="absolute bottom-1.5 left-1.5 bg-blue-500 text-white text-[9px] px-1 py-0 h-4 border-0">
              📍 {deal.city ? deal.city : 'Офлайн'}
            </Badge>
          )}
          {isDOTD && (
            <Badge className="absolute top-1.5 left-1.5 bg-yellow-500 text-white text-[9px] px-1 py-0 h-4 border-0">
              👑
            </Badge>
          )}
        </div>

        {/* CENTER: Content block */}
        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
          {/* Row 1: Title */}
          <h3 className="text-[15px] font-bold leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {deal.title}
          </h3>

          {/* Row 2: Price row */}
          <div className="flex items-center gap-2 flex-wrap mt-1">
            <span className="text-lg font-extrabold text-destructive leading-none">
              {formatPrice(deal.dealPrice, currency)}
            </span>
            {deal.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(deal.originalPrice, currency)}
              </span>
            )}
            {deal.discount && (
              <Badge className="bg-[hsl(var(--deal-success))] text-primary-foreground border-0 text-[10px] font-bold px-1.5 py-0 h-4">
                -{deal.discount}%
              </Badge>
            )}
          </div>

          {/* Row 3: Description */}
          {deal.description && (
            <div className="mt-1">
              <p className={cn('text-[13px] text-muted-foreground', expanded ? '' : 'line-clamp-1')}>
                {deal.description}
              </p>
              {!expanded && deal.description.length > 60 && (
                <button
                  data-no-navigate
                  onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
                  className="text-[12px] text-primary hover:underline"
                >
                  Показать ещё
                </button>
              )}
            </div>
          )}

          {/* Row 4: Meta row */}
          <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-muted-foreground flex-wrap">
            <Avatar className="h-4 w-4">
              <AvatarFallback className="text-[8px] bg-primary/10 text-primary">
                {deal.postedBy.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="truncate max-w-[70px]">{deal.postedBy}</span>
            <span className="text-border">·</span>
            <Clock className="w-3 h-3 shrink-0" />
            <span className="truncate">{deal.postedAt}</span>
            <span className="text-border">·</span>
            <Link
              to={`/category/${deal.category}`}
              data-no-navigate
              onClick={(e) => e.stopPropagation()}
              className="hover:text-primary transition-colors"
            >
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 cursor-pointer hover:bg-primary/10">
                {deal.category}
              </Badge>
            </Link>
            <span className="text-border">·</span>
            <Link
              to={`/deal/${deal.id}#comments`}
              data-no-navigate
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-0.5 hover:text-primary transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span>{deal.comments}</span>
            </Link>

            {/* Bookmark - right aligned */}
            <button
              data-no-navigate
              onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
              className={cn('ml-auto hover:text-primary transition-colors', saved && 'text-primary')}
            >
              <Bookmark className={cn('w-3.5 h-3.5', saved && 'fill-current')} />
            </button>
          </div>
        </div>

        {/* RIGHT: CTA button (hidden on mobile, shown on desktop) */}
        {!isMobile && (
          <div className="w-[120px] shrink-0 flex flex-col items-center justify-center gap-2" data-no-navigate>
            <a
              href={deal.url}
              target="_blank"
              rel="noopener noreferrer"
              data-no-navigate
              onClick={(e) => e.stopPropagation()}
              className="w-full text-center gradient-primary text-primary-foreground text-sm font-bold py-2.5 px-3 rounded-lg hover:scale-[1.03] transition-transform leading-tight"
            >
              Забрать скидку →
            </a>
            <div className="flex items-center gap-2">
              <button
                data-no-navigate
                onClick={(e) => { e.stopPropagation(); setShareOpen(true); }}
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Поделиться"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                data-no-navigate
                onClick={(e) => { e.stopPropagation(); handleExpiredReport(e); }}
                className="text-muted-foreground hover:text-amber-500 transition-colors"
                title="Истекла"
              >
                <TimerOff className="w-3.5 h-3.5" />
              </button>
              <button
                data-no-navigate
                onClick={(e) => { e.stopPropagation(); setReportOpen(true); }}
                className="text-muted-foreground hover:text-destructive transition-colors"
                title="Пожаловаться"
              >
                <Flag className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile: bottom action bar */}
      {isMobile && (
        <div className="flex items-center border-t border-border" data-no-navigate>
          <a
            href={deal.url}
            target="_blank"
            rel="noopener noreferrer"
            data-no-navigate
            onClick={(e) => e.stopPropagation()}
            className="flex-1 gradient-primary text-primary-foreground text-center py-2 text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Забрать скидку →
          </a>
          <button
            data-no-navigate
            onClick={(e) => { e.stopPropagation(); setShareOpen(true); }}
            className="px-3 py-2 text-muted-foreground hover:text-primary transition-colors border-l border-border"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            data-no-navigate
            onClick={(e) => { e.stopPropagation(); handleExpiredReport(e); }}
            className="px-3 py-2 text-muted-foreground hover:text-amber-500 transition-colors border-l border-border"
          >
            <TimerOff className="w-4 h-4" />
          </button>
          <button
            data-no-navigate
            onClick={(e) => { e.stopPropagation(); setReportOpen(true); }}
            className="px-3 py-2 text-muted-foreground hover:text-destructive transition-colors border-l border-border"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modals */}
      <ShareModal
        deal={deal}
        open={shareOpen}
        onOpenChange={setShareOpen}
        shareCount={shareCount}
        onShare={handleShare}
      />
      <ReportDealModal
        dealId={deal.id}
        dealTitle={deal.title}
        open={reportOpen}
        onOpenChange={(open) => { setReportOpen(open); if (!open) setReportCount(getReportCount(deal.id)); }}
      />
    </div>
  );
};

export default DealCard;
