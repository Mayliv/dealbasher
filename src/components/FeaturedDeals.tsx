
import React from 'react';
import { Deal } from '@/utils/data';
import { Fire } from 'lucide-react';

interface FeaturedDealsProps {
  deals: Deal[];
}

const FeaturedDeals: React.FC<FeaturedDealsProps> = ({ deals }) => {
  const featuredDeals = deals.filter(deal => deal.isFeatured);
  
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
      <div className="bg-deal-red text-white px-4 py-2 flex items-center">
        <Fire className="mr-2 h-5 w-5" />
        <h2 className="text-lg font-semibold">Featured Hot Deals</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
        {featuredDeals.map((deal) => (
          <div key={deal.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="aspect-video bg-muted rounded-md overflow-hidden mb-3">
              <img 
                src={deal.imageUrl} 
                alt={deal.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="font-semibold line-clamp-1 hover:text-deal-red">
              <a href={deal.url} className="hover:underline">{deal.title}</a>
            </h3>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <span className="text-sm font-medium text-deal-red">${deal.dealPrice.toFixed(2)}</span>
                {deal.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through ml-2">
                    ${deal.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center text-xs bg-deal-red text-white px-1.5 py-0.5 rounded-full">
                <Fire className="mr-1 h-3 w-3" />
                <span>{deal.temperature}</span>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-muted-foreground">
              {deal.store}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDeals;
