
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import DealCard from '@/components/DealCard';
import FeaturedDeals from '@/components/FeaturedDeals';
import Footer from '@/components/Footer';
import SortingTabs from '@/components/SortingTabs';
import TimePeriodSelector from '@/components/TimePeriodSelector';
import MarketplaceBar from '@/components/MarketplaceBar';
import CityPickerModal from '@/components/CityPickerModal';
import { getSelectedCity } from '@/components/CityPickerModal';
import { deals, offlineCitiesRu, offlineCitiesKz } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, MapPin, Thermometer, Store, Wifi, LayoutGrid } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useLocalization } from '@/contexts/LocalizationContext';
import { getStoredTemp } from '@/hooks/useTemperatureVote';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type DealTypeFilter = 'all' | 'online' | 'offline';

const Index = () => {
  const [sortTab, setSortTab] = useState('hot');
  const [timePeriod, setTimePeriod] = useState('week');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [minTemp, setMinTemp] = useState(0);
  const [dealTypeFilter, setDealTypeFilter] = useState<DealTypeFilter>('all');
  const [userCity, setUserCity] = useState<string | null>(getSelectedCity());
  const { t, region } = useLocalization();

  useEffect(() => {
    const savedCity = localStorage.getItem(`dealbasher_city_${region}`);
    if (savedCity) setSelectedCity(savedCity);
  }, [region]);

  // Listen for city picker changes
  useEffect(() => {
    const handler = () => setUserCity(getSelectedCity());
    window.addEventListener('city-changed', handler);
    return () => window.removeEventListener('city-changed', handler);
  }, []);

  const cities = region === 'kz' ? offlineCitiesKz : offlineCitiesRu;

  const regionDeals = deals.filter(deal => !deal.region || deal.region === region);

  // Nearby offline deals
  const nearbyDeals = userCity
    ? regionDeals.filter(deal => deal.isOffline && deal.city === userCity)
    : [];

  const filteredDeals = (selectedCity
    ? regionDeals.filter(deal => !deal.location || deal.location === selectedCity)
    : regionDeals
  )
    .filter(deal => getStoredTemp(deal.id, deal.temperature) >= minTemp)
    .filter(deal => {
      if (dealTypeFilter === 'online') return !deal.isOffline;
      if (dealTypeFilter === 'offline') return !!deal.isOffline;
      return true;
    });

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
      <CityPickerModal />
      
      <main className="flex-1 container mx-auto px-4">
        <FeaturedDeals deals={regionDeals.filter(deal => deal.isFeatured)} />

        {/* Nearby offline deals section */}
        {nearbyDeals.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-deal-success" />
              <h2 className="text-xl font-bold text-foreground">📍 Рядом со мной</h2>
              <Badge variant="secondary" className="text-xs">
                {cities.find(c => c.id === userCity)?.name}
              </Badge>
            </div>
            <ScrollArea className="w-full">
              <div className="flex gap-4 pb-4">
                {nearbyDeals.map(deal => (
                  <div key={deal.id} className="min-w-[320px] max-w-[360px] shrink-0">
                    <DealCard deal={deal} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}
        
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

          {/* Deal type filter */}
          <div className="flex items-center gap-1 bg-card rounded-lg border px-2 py-1">
            {([
              { value: 'all' as DealTypeFilter, label: 'Все', icon: LayoutGrid },
              { value: 'online' as DealTypeFilter, label: 'Онлайн', icon: Wifi },
              { value: 'offline' as DealTypeFilter, label: 'Офлайн', icon: Store },
            ]).map(opt => (
              <Button
                key={opt.value}
                variant={dealTypeFilter === opt.value ? 'default' : 'ghost'}
                size="sm"
                className={`h-7 text-xs gap-1 ${dealTypeFilter === opt.value ? 'gradient-primary text-primary-foreground' : ''}`}
                onClick={() => setDealTypeFilter(opt.value)}
              >
                <opt.icon className="w-3 h-3" />
                {opt.label}
              </Button>
            ))}
          </div>

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
