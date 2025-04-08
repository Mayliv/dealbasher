
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import DealCard from '@/components/DealCard';
import Footer from '@/components/Footer';
import { deals } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useLocalization } from '@/contexts/LocalizationContext';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { region } = useLocalization();
  
  // Filter deals by region first
  const regionDeals = deals.filter(deal => !deal.region || deal.region === region);
  
  // Then filter by search query
  const filteredDeals = regionDeals.filter(deal => 
    deal.title.toLowerCase().includes(query.toLowerCase()) || 
    deal.description.toLowerCase().includes(query.toLowerCase()) ||
    deal.store.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Search className="text-deal-red mr-2" />
          <h2 className="text-xl font-bold">
            Результаты поиска: "{query}"
          </h2>
        </div>
        
        {filteredDeals.length > 0 ? (
          <div className="space-y-4">
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              К сожалению, по вашему запросу "{query}" ничего не найдено. Попробуйте изменить запрос или проверить другие категории.
            </p>
            <Button className="bg-deal-red hover:bg-deal-red/90" onClick={() => window.history.back()}>
              Вернуться назад
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
