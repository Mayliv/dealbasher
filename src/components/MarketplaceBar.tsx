
import React from 'react';
import { kazMarketplaces, ruMarketplaces } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/contexts/LocalizationContext';

const MarketplaceBar = () => {
  const { t, region } = useLocalization();
  
  // Select marketplaces based on region
  const marketplaces = region === 'kz' ? kazMarketplaces : ruMarketplaces;
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm py-3 mb-6">
      <div className="container mx-auto px-4">
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
          {region === 'kz' ? 'Популярные маркетплейсы:' : 'Популярные российские маркетплейсы:'}
        </h2>
        <div className="flex flex-wrap gap-2">
          {marketplaces.map((marketplace) => (
            <Button
              key={marketplace.id}
              variant="outline"
              size="sm"
              className="h-9 flex items-center gap-2 bg-white dark:bg-gray-800"
            >
              <img 
                src={marketplace.icon} 
                alt={marketplace.name} 
                className="w-5 h-5 rounded-sm"
              />
              <span>{marketplace.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceBar;
