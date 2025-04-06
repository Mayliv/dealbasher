
import React, { useState } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import DealCard from '@/components/DealCard';
import FeaturedDeals from '@/components/FeaturedDeals';
import Footer from '@/components/Footer';
import SortingTabs from '@/components/SortingTabs';
import TimePeriodSelector from '@/components/TimePeriodSelector';
import { deals } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';

const Index = () => {
  const [sortTab, setSortTab] = useState('hot');
  const [timePeriod, setTimePeriod] = useState('week');

  // Сортировка сделок в зависимости от выбранной вкладки
  const sortedDeals = [...deals].sort((a, b) => {
    if (sortTab === 'hot') {
      return b.temperature - a.temperature;
    } else if (sortTab === 'new') {
      // Предполагаем, что более новые сделки имеют больший ID
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
      
      <main className="flex-1 container mx-auto px-4">
        <FeaturedDeals deals={deals} />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <Flame className="text-deal-red mr-2" />
            <h2 className="text-xl font-bold">Все предложения</h2>
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
