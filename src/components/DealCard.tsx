
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Share2, Clock, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Deal } from '@/utils/data';
import { useLocalization } from '@/contexts/LocalizationContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DealCardProps {
  deal: Deal;
}

const getTemperatureStyle = (temp: number) => {
  if (temp < 0) return { bg: 'bg-blue-500', text: 'text-white', gradient: 'from-blue-600 to-blue-400' };
  if (temp <= 50) return { bg: 'bg-gray-400', text: 'text-white', gradient: 'from-gray-500 to-gray-300' };
  if (temp <= 200) return { bg: 'bg-orange-500', text: 'text-white', gradient: 'from-orange-600 to-orange-400' };
  return { bg: 'bg-red-600', text: 'text-white', gradient: 'from-red-700 to-red-500' };
};

const DealCard = ({ deal }: DealCardProps) => {
  const { formatPrice } = useLocalization();
  const tempStyle = getTemperatureStyle(deal.temperature);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/deal/${deal.id}`);
  };

  return (
    <div className="group bg-card text-card-foreground rounded-xl border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative sm:w-56 lg:w-64 shrink-0">
          <AspectRatio ratio={16 / 9} className="sm:h-full">
            <img
              src={deal.imageUrl}
              alt={deal.title}
              className="w-full h-full object-cover"
            />
          </AspectRatio>

          {/* Store badge - top right */}
          <div className="absolute top-2 right-2">
            <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-0 text-xs font-medium shadow-sm">
              {deal.store}
            </Badge>
          </div>

          {/* Temperature badge - bottom left */}
          <div className="absolute bottom-2 left-2">
            <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r ${tempStyle.gradient} ${tempStyle.text} text-xs font-bold shadow-md`}>
              🔥 {deal.temperature > 0 ? '+' : ''}{deal.temperature}°
            </div>
          </div>

          {/* Price Bug badge */}
          {deal.isPriceBug && (
            <div className="absolute top-2 left-2">
              <Badge variant="outline" className="bg-background/90 border-destructive text-destructive backdrop-blur-sm text-xs font-bold">
                🐛 Price Bug
              </Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          {/* Title & Description */}
          <div>
            <Link to={`/deal/${deal.id}`} className="text-base font-semibold leading-snug hover:text-primary transition-colors line-clamp-2">
              {deal.title}
            </Link>
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
              {deal.description}
            </p>
          </div>

          {/* Price Row */}
          <div className="flex items-baseline gap-3 mt-3">
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              {formatPrice(deal.dealPrice, 'USD')}
            </span>
            {deal.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(deal.originalPrice, 'USD')}
              </span>
            )}
            {deal.discount && (
              <Badge className="bg-green-600 dark:bg-green-500 text-white border-0 text-xs font-bold">
                -{deal.discount}%
              </Badge>
            )}
          </div>

          {/* Bottom Meta Row */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-3 min-w-0 overflow-hidden">
              {/* User */}
              <div className="flex items-center gap-1.5 shrink-0">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={deal.avatarUrl} />
                  <AvatarFallback className="text-[10px]">
                    {deal.postedBy.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground truncate max-w-[80px]">{deal.postedBy}</span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                <Clock className="w-3 h-3" />
                <span>{deal.postedAt}</span>
              </div>

              {/* Category */}
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
