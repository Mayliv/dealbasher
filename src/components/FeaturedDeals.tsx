
import React from 'react';
import { Deal } from '@/utils/data';
import { Flame } from 'lucide-react';
import DealCard from '@/components/DealCard';

interface FeaturedDealsProps {
  deals: Deal[];
}

const FeaturedDeals: React.FC<FeaturedDealsProps> = ({ deals }) => {
  const featuredDeals = deals.filter(deal => deal.isFeatured);
  
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Горячие предложения</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedDeals;
