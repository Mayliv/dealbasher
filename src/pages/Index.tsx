
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
import { Flame, MapPin, Thermometer } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useLocalization } from '@/contexts/LocalizationContext';
import { getStoredTemp } from '@/hooks/useTemperatureVote';

const Index = () => {
  const [sortTab, setSortTab] = useState('hot');
  const [timePeriod, setTimePeriod] = useState('week');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [minTemp, setMinTemp] = useState(0);
  const { t, region } = useLocalization();

  useEffect(() => {
    const savedCity = localStorage.getItem(`dealbasher_city_${region}`);
    if (savedCity) setSelectedCity(savedCity);
  }, [region]);

  const regionDeals = deals.filter(deal => !deal.region || deal.region === region);

  const filteredDeals = (selectedCity
    ? regionDeals.filter(deal => !deal.location || deal.location === selectedCity)
    : regionDeals
  ).filter(deal => getStoredTemp(deal.id, deal.temperature) >= minTemp);

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortTab === 'hot') return getStoredTemp(b.id, b.temperature) - getStoredTemp(a.id, a.temperature);
    if (sortTab === 'new') return b.id - a.id;
    if (sortTab === 'discussed') return b.comments - a.comments;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CategoryBar />
      <MarketplaceBar />
      
      <main className="flex-1 container mx-auto px-4">
        <FeaturedDeals deals={regionDeals.filter(deal => deal.isFeatured)} />
        
        {selectedCity && (
          <div className="mb-6 flex items-center">
            <MapPin className="text-primary mr-2" />
            <h2 className="text-lg font-semibold text-foreground">Предложения в вашем городе</h2>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <Flame className="text-primary mr-2" />
            <h2 className="text-xl font-bold text-foreground">{t('nav.deals')}</h2>
          </div>
          <SortingTabs activeTab={sortTab} onChangeTab={setSortTab} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <TimePeriodSelector activePeriod={timePeriod} onChangePeriod={setTimePeriod} />

          {/* Temperature filter */}
          <div className="flex items-center gap-3 bg-card rounded-lg border px-4 py-2 min-w-[280px]">
            <Thermometer className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs text-muted-foreground whitespace-nowrap">Мин. 🔥:</span>
            <Slider
              value={[minTemp]}
              onValueChange={([v]) => setMinTemp(v)}
              min={-50}
              max={500}
              step={10}
              className="flex-1"
            />
            <span className="text-xs font-bold text-foreground min-w-[40px] text-right">
              {minTemp}°
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          {sortedDeals.length > 0 ? (
            sortedDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border">
              <p className="text-muted-foreground">Нет сделок с температурой выше {minTemp}°</p>
            </div>
          )}
        </div>
        
        {sortedDeals.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button className="gradient-primary text-primary-foreground">
              Загрузить ещё предложения
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
