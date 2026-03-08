
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DealCard from '@/components/DealCard';
import SortingTabs from '@/components/SortingTabs';
import TimePeriodSelector from '@/components/TimePeriodSelector';
import { deals, categories } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Flame, LayoutGrid, ChevronRight, Thermometer } from 'lucide-react';
import SubscribeButton from '@/components/SubscribeButton';
import { useParams, Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { getStoredTemp } from '@/hooks/useTemperatureVote';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [sortTab, setSortTab] = useState('hot');
  const [timePeriod, setTimePeriod] = useState('week');
  const [minTemp, setMinTemp] = useState(0);

  const currentCategory = categories.find(cat => cat.id === categoryId) || categories[0];

  const filteredDeals = (categoryId === 'all'
    ? deals
    : deals.filter(deal => deal.category === categoryId)
  ).filter(deal => getStoredTemp(deal.id, deal.temperature) >= minTemp);

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortTab === 'hot') return getStoredTemp(b.id, b.temperature) - getStoredTemp(a.id, a.temperature);
    if (sortTab === 'new') return b.id - a.id;
    if (sortTab === 'discussed') return b.comments - a.comments;
    return 0;
  });

  const relatedCategories = categories.filter(cat => cat.id !== categoryId).slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/categories" className="hover:text-primary transition-colors">Категории</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground">{currentCategory.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl border p-4 sticky top-20 space-y-5">
              <div>
                <h3 className="font-bold text-base mb-3 text-foreground">Другие категории</h3>
                <ul className="space-y-1.5">
                  {relatedCategories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/category/${category.id}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block py-0.5"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to="/categories" className="text-primary hover:underline text-sm flex items-center mt-3">
                  <LayoutGrid className="h-4 w-4 mr-1" />
                  Все категории
                </Link>
              </div>

              <Separator />

              <div>
                <h3 className="font-bold text-base mb-3 text-foreground">Период времени</h3>
                <TimePeriodSelector activePeriod={timePeriod} onChangePeriod={setTimePeriod} />
              </div>

              <Separator />

              {/* Temperature filter */}
              <div>
                <h3 className="font-bold text-base mb-3 text-foreground flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-primary" />
                  Минимальная температура
                </h3>
                <Slider
                  value={[minTemp]}
                  onValueChange={([v]) => setMinTemp(v)}
                  min={-50}
                  max={500}
                  step={10}
                  className="mb-2"
                />
                <p className="text-xs text-muted-foreground text-center">
                  Показать сделки от <span className="font-bold text-foreground">{minTemp}°</span> и выше
                </p>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            <div className="bg-card rounded-xl border p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                  <div className="flex items-center">
                    <Flame className="text-primary mr-2" />
                    <h2 className="text-xl font-bold text-foreground">{currentCategory.name}</h2>
                  </div>
                  <SubscribeButton type="category" name={currentCategory.name} />
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
                  <p className="text-muted-foreground">
                    {minTemp > 0
                      ? `Нет сделок с температурой выше ${minTemp}°`
                      : 'Нет предложений в этой категории'}
                  </p>
                  <Link to="/" className="text-primary hover:underline mt-2 inline-block">
                    Вернуться на главную
                  </Link>
                </div>
              )}

              {sortedDeals.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Button className="gradient-primary text-primary-foreground">
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
