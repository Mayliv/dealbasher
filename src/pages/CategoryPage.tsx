
import React from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import DealCard from '@/components/DealCard';
import Footer from '@/components/Footer';
import { deals, categories } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Flame, TrendingUp } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryId } = useParams();
  
  // Найти текущую категорию по ID
  const currentCategory = categories.find(cat => cat.id === categoryId) || categories[0];
  
  // Фильтрация сделок по категории (или показать все, если категория "all")
  const filteredDeals = categoryId === 'all' 
    ? deals 
    : deals.filter(deal => deal.category === categoryId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar activeCategoryId={categoryId} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Flame className="text-deal-red mr-2" />
            <h2 className="text-xl font-bold">{currentCategory.name}</h2>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <TrendingUp className="mr-1 h-4 w-4" />
              Newest
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Flame className="mr-1 h-4 w-4" />
              Hottest
            </Button>
          </div>
        </div>
        
        {filteredDeals.length > 0 ? (
          <div className="space-y-4">
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-500">Нет сделок в этой категории</h3>
            <Link to="/" className="text-deal-red hover:underline mt-2 inline-block">
              Вернуться на главную
            </Link>
          </div>
        )}
        
        <div className="flex justify-center mt-8">
          <Button className="bg-deal-red hover:bg-deal-red/90">
            Загрузить еще сделки
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
