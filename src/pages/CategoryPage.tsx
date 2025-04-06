
import React, { useState } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import DealCard from '@/components/DealCard';
import Footer from '@/components/Footer';
import SortingTabs from '@/components/SortingTabs';
import TimePeriodSelector from '@/components/TimePeriodSelector';
import { deals, categories } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [sortTab, setSortTab] = useState('hot');
  const [timePeriod, setTimePeriod] = useState('week');
  
  // Найти текущую категорию по ID
  const currentCategory = categories.find(cat => cat.id === categoryId) || categories[0];
  
  // Фильтрация сделок по категории (или показать все, если категория "all")
  const filteredDeals = categoryId === 'all' 
    ? deals 
    : deals.filter(deal => deal.category === categoryId);

  // Сортировка сделок в зависимости от выбранной вкладки
  const sortedDeals = [...filteredDeals].sort((a, b) => {
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
      <CategoryBar activeCategoryId={categoryId} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <Flame className="text-deal-red mr-2" />
            <h2 className="text-xl font-bold">{currentCategory.name}</h2>
          </div>
          
          <SortingTabs activeTab={sortTab} onChangeTab={setSortTab} />
        </div>
        
        <TimePeriodSelector activePeriod={timePeriod} onChangePeriod={setTimePeriod} />
        
        {sortedDeals.length > 0 ? (
          <div className="space-y-4">
            {sortedDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-500">Нет предложений в этой категории</h3>
            <Link to="/" className="text-deal-red hover:underline mt-2 inline-block">
              Вернуться на главную
            </Link>
          </div>
        )}
        
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

export default CategoryPage;
