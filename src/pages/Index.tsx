
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import DealCard from '@/components/DealCard';
import FeaturedDeals from '@/components/FeaturedDeals';
import Footer from '@/components/Footer';
import SortingTabs from '@/components/SortingTabs';
import TimePeriodSelector from '@/components/TimePeriodSelector';
import MarketplaceBar from '@/components/MarketplaceBar';
import { deals } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Flame, MapPin } from 'lucide-react';
import { useLocalization } from '@/contexts/LocalizationContext';

const Index = () => {
  const [sortTab, setSortTab] = useState('hot');
  const [timePeriod, setTimePeriod] = useState('week');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { t, region } = useLocalization();

  // Get selected city from localStorage based on current region
  useEffect(() => {
    const savedCity = localStorage.getItem(`dealbasher_city_${region}`);
    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, [region]);

  // Filter deals by region first
  const regionDeals = deals.filter(deal => !deal.region || deal.region === region);
  
  // Then filter by location if a city is selected
  const filteredDeals = selectedCity 
    ? regionDeals.filter(deal => !deal.location || deal.location === selectedCity)
    : regionDeals;

  // Sort deals based on selected tab
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortTab === 'hot') {
      return b.temperature - a.temperature;
    } else if (sortTab === 'new') {
      return b.id - a.id;
    } else if (sortTab === 'discussed') {
      return b.comments - a.comments;
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      <MarketplaceBar />
      
      <main className="flex-1 container mx-auto px-4">
        <FeaturedDeals deals={regionDeals.filter(deal => deal.isFeatured)} />
        
        {selectedCity && (
          <div className="mb-6 flex items-center">
            <MapPin className="text-deal-red mr-2" />
            <h2 className="text-lg font-semibold">Предложения в вашем городе</h2>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <Flame className="text-deal-red mr-2" />
            <h2 className="text-xl font-bold">{t('nav.deals')}</h2>
          </div>
          
          <SortingTabs activeTab={sortTab} onChangeTab={setSortTab} />
        </div>
        
        <TimePeriodSelector activePeriod={timePeriod} onChangePeriod={setTimePeriod} />
        
        <div className="space-y-4">
          {sortedDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Button className="bg-deal-red hover:bg-deal-red/90">
            Загрузить ещё предложения
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
