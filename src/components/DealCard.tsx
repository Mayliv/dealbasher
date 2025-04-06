
import React from 'react';
import { Deal } from '@/utils/data';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface DealCardProps {
  deal: Deal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const { toast } = useToast();

  const handleVote = (type: 'up' | 'down', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: type === 'up' ? "Спасибо за голос!" : "Спасибо за ваше мнение",
      description: type === 'up' 
        ? "Вы проголосовали за эту сделку" 
        : "Вы проголосовали против этой сделки",
    });
  };

  return (
    <Link to={`/deal/${deal.id}`} className="block">
      <div className="deal-card bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-48 h-48 overflow-hidden bg-muted shrink-0">
            <img 
              src={deal.imageUrl} 
              alt={deal.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-4 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold line-clamp-1 hover:text-deal-red">
                  {deal.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">{deal.store}</span>
                  {deal.discount && (
                    <Badge variant="outline" className="bg-deal-discount text-white border-0">
                      {deal.discount}% OFF
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                {deal.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${deal.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-lg font-bold text-deal-red">
                  ${deal.dealPrice.toFixed(2)}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {deal.description}
            </p>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <button 
                    className="temperature-button text-deal-red hover:bg-deal-red/10 p-1 rounded-full"
                    onClick={(e) => handleVote('up', e)}
                  >
                    <ThumbsUp size={18} />
                  </button>
                  <span className={`font-medium mx-1.5 ${deal.temperature > 0 ? 'text-deal-red' : 'text-muted-foreground'}`}>
                    {deal.temperature}
                  </span>
                  <button 
                    className="temperature-button text-muted-foreground hover:bg-muted p-1 rounded-full"
                    onClick={(e) => handleVote('down', e)}
                  >
                    <ThumbsDown size={18} />
                  </button>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <MessageSquare size={18} />
                  <span className="ml-1.5 text-sm">{deal.comments}</span>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Опубликовано <span className="font-medium">{deal.postedBy}</span> • {deal.postedAt}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DealCard;
