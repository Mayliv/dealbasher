
import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageSquare, Store, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Deal } from '@/utils/data';
import { useLocalization } from '@/contexts/LocalizationContext';

interface DealCardProps {
  deal: Deal;
}

const DealCard = ({ deal }: DealCardProps) => {
  const { t, formatPrice } = useLocalization();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-40 lg:w-48 p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <img 
            src={deal.imageUrl} 
            alt={deal.title} 
            className="max-h-32 object-contain"
          />
        </div>
        
        <div className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div>
              <Link to={`/deal/${deal.id}`} className="text-lg font-semibold hover:text-deal-red">
                {deal.title}
              </Link>
              <div className="flex items-center mt-1 space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Store className="w-4 h-4" />
                <span>{deal.store}</span>
                {deal.discount && (
                  <Badge variant="outline" className="bg-deal-red text-white border-0">
                    {deal.discount}% OFF
                  </Badge>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {deal.description}
              </p>
            </div>
            
            <div className="flex flex-col items-end mt-3 md:mt-0">
              {deal.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(deal.originalPrice, 'USD')}
                </span>
              )}
              <span className="text-lg font-bold text-deal-red">
                {formatPrice(deal.dealPrice, 'USD')}
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm">
                <ThumbsUp className="w-4 h-4 mr-1 text-deal-red" />
                <span>{deal.temperature}</span>
              </div>
              <div className="flex items-center text-sm">
                <MessageSquare className="w-4 h-4 mr-1 text-gray-500" />
                <span>{deal.comments}</span>
              </div>
              <div className="text-xs text-gray-500">
                {deal.postedAt}
              </div>
            </div>
            
            <div>
              <Link to={`/deal/${deal.id}`}>
                <Button variant="outline" size="sm" className="mr-2">
                  Подробнее
                </Button>
              </Link>
              <a href={deal.url} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-deal-red hover:bg-deal-red/90">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Перейти
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
