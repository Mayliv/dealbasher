
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Share2, Clock, Tag, MapPin, Store } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Deal } from '@/utils/data';
import { useLocalization } from '@/contexts/LocalizationContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTemperatureVote } from '@/hooks/useTemperatureVote';

interface DealCardProps {
  deal: Deal;
}

const getTemperatureStyle = (temp: number) => {
  if (temp < 0) return { gradient: 'from-blue-600 to-blue-400' };
  if (temp <= 50) return { gradient: 'from-gray-500 to-gray-300' };
  if (temp <= 200) return { gradient: 'from-orange-600 to-orange-400' };
  return { gradient: 'from-red-700 to-red-500' };
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
      className={`absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold pointer-events-none
        ${isPositive ? 'text-orange-500' : 'text-blue-500'}
        animate-vote-float`}
    >
      {isPositive ? '+' : ''}{currentDelta}
    </span>
  );
};

const DealCard = ({ deal }: DealCardProps) => {
  const { formatPrice } = useLocalization();
  const { temperature, userVote, lastDelta, vote } = useTemperatureVote(deal.id, deal.temperature);
  const tempStyle = getTemperatureStyle(temperature);

  const isExpired = temperature < -10;
  const isOnFire = temperature > 300;

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/deal/${deal.id}`);
  };

  return (
    <div className={`group bg-card text-card-foreground rounded-xl border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 relative ${isOnFire ? 'hot-deal-glow' : ''}`}>
      {/* Expired overlay */}
      {isExpired && (
        <div className="absolute inset-0 z-20 bg-background/70 backdrop-blur-[2px] flex items-center justify-center rounded-xl">
          <div className="text-center">
            <span className="text-4xl">❄️</span>
            <p className="text-sm font-semibold text-muted-foreground mt-1">Истёкшая сделка?</p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative sm:w-56 lg:w-64 shrink-0">
          <AspectRatio ratio={16 / 9} className="sm:h-full">
            <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover" />
          </AspectRatio>

          {/* Store badge */}
          <div className="absolute top-2 right-2">
            <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-0 text-xs font-medium shadow-sm">
              {deal.store}
            </Badge>
          </div>

          {/* Price Bug badge */}
          {deal.isPriceBug && (
            <div className="absolute top-2 left-2">
              <Badge variant="outline" className="bg-background/90 border-destructive text-destructive backdrop-blur-sm text-xs font-bold">
                🐛 Price Bug
              </Badge>
            </div>
          )}

          {/* Offline badge */}
          {deal.isOffline && (
            <div className={`absolute ${deal.isPriceBug ? 'top-9' : 'top-2'} left-2`}>
              <Badge className="bg-deal-success text-primary-foreground border-0 backdrop-blur-sm text-xs font-bold shadow-sm">
                <Store className="w-3 h-3 mr-1" /> Офлайн
              </Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div className="flex items-start gap-3">
            {/* Voting column */}
            <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); vote('hot'); }}
                disabled={!!userVote}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-base transition-all duration-200
                  ${userVote === 'hot'
                    ? 'bg-orange-500 scale-110 shadow-md'
                    : userVote
                      ? 'bg-muted opacity-50 cursor-not-allowed'
                      : 'bg-muted hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:scale-110 cursor-pointer'
                  }`}
                title="Hot!"
              >
                🔥
              </button>

              {/* Temperature display */}
              <div className="relative">
                <FloatingDelta delta={lastDelta} />
                <div className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-gradient-to-r ${tempStyle.gradient} text-white text-xs font-bold min-w-[48px] shadow-sm`}>
                  <AnimatedTemp value={temperature} />
                </div>
              </div>

              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); vote('cold'); }}
                disabled={!!userVote}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-base transition-all duration-200
                  ${userVote === 'cold'
                    ? 'bg-blue-500 scale-110 shadow-md'
                    : userVote
                      ? 'bg-muted opacity-50 cursor-not-allowed'
                      : 'bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:scale-110 cursor-pointer'
                  }`}
                title="Cold"
              >
                ❄️
              </button>
            </div>

            {/* Title & Description */}
            <div className="flex-1 min-w-0">
              <Link to={`/deal/${deal.id}`} className="text-base font-semibold leading-snug hover:text-primary transition-colors line-clamp-2">
                {deal.title}
              </Link>
              <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                {deal.description}
              </p>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-xl font-bold text-deal-success">
                  {formatPrice(deal.dealPrice, 'USD')}
                </span>
                {deal.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(deal.originalPrice, 'USD')}
                  </span>
                )}
                {deal.discount && (
                  <Badge className="bg-deal-success text-primary-foreground border-0 text-xs font-bold">
                    -{deal.discount}%
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Meta Row */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-3 min-w-0 overflow-hidden">
              <div className="flex items-center gap-1.5 shrink-0">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={deal.avatarUrl} />
                  <AvatarFallback className="text-[10px]">
                    {deal.postedBy.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground truncate max-w-[80px]">{deal.postedBy}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                <Clock className="w-3 h-3" />
                <span>{deal.postedAt}</span>
              </div>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 shrink-0 hidden sm:inline-flex">
                <Tag className="w-2.5 h-2.5 mr-0.5" />
                {deal.category}
              </Badge>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Link to={`/deal/${deal.id}`}>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground">
                  <MessageSquare className="w-3.5 h-3.5 mr-1" />
                  {deal.comments}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground" onClick={handleShare}>
                <Share2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
