
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DealCard from '@/components/DealCard';
import SortingTabs from '@/components/SortingTabs';
import TimePeriodSelector from '@/components/TimePeriodSelector';
import { deals, categories } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Flame, LayoutGrid, ChevronRight } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

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

  // Related categories (for the sidebar)
  const relatedCategories = categories.filter(cat => cat.id !== categoryId).slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Breadcrumb navigation */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link to="/" className="hover:text-deal-red">Главная</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/categories" className="hover:text-deal-red">Категории</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 dark:text-gray-300">{currentCategory.name}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sticky top-4">
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Другие категории</h3>
                <ul className="space-y-2">
                  {relatedCategories.map((category) => (
                    <li key={category.id}>
                      <Link 
                        to={`/category/${category.id}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-deal-red hover:underline block py-1"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/categories" 
                  className="text-deal-red hover:underline text-sm flex items-center mt-3"
                >
                  <LayoutGrid className="h-4 w-4 mr-1" />
                  Все категории
                </Link>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="font-bold text-lg mb-3">Период времени</h3>
                <TimePeriodSelector activePeriod={timePeriod} onChangePeriod={setTimePeriod} />
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div className="flex items-center mb-4 sm:mb-0">
                  <Flame className="text-deal-red mr-2" />
                  <h2 className="text-xl font-bold">{currentCategory.name}</h2>
                </div>
                
                <SortingTabs activeTab={sortTab} onChangeTab={setSortTab} />
              </div>
              
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
              
              {sortedDeals.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Button className="bg-deal-red hover:bg-deal-red/90">
                    Загрузить ещё предложения
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
