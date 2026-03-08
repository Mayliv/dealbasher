
import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import DealCard from '@/components/DealCard';
import Footer from '@/components/Footer';
import { deals } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, SlidersHorizontal, Thermometer, X, TrendingUp, Flame } from 'lucide-react';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { getStoredTemp } from '@/hooks/useTemperatureVote';
import { cn } from '@/lib/utils';

type DateFilter = 'all' | 'today' | 'week' | 'month';

const SUGGESTED_SEARCHES = ['iPhone 15', 'Nike Air Max', 'Dyson V15', 'PlayStation 5', 'Samsung Galaxy', 'AirPods Pro', 'Xiaomi', 'Adidas'];

// Highlight matching text helper
const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-primary/20 text-foreground rounded-sm px-0.5">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { region, formatPrice } = useLocalization();
  const isMobile = useIsMobile();
  const currency = region === 'kz' ? 'KZT' : region === 'ru' ? 'RUB' : 'USD';

  // Filter states
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [minTemp, setMinTemp] = useState(-50);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [onlineOnly, setOnlineOnly] = useState(false);

  // Get unique stores from deals
  const allStores = useMemo(() => {
    const regionDeals = deals.filter(d => !d.region || d.region === region);
    return [...new Set(regionDeals.map(d => d.store))].sort();
  }, [region]);

  const toggleStore = (store: string) => {
    setSelectedStores(prev =>
      prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]
    );
  };

  // Filter deals
  const filteredDeals = useMemo(() => {
    const regionDeals = deals.filter(d => !d.region || d.region === region);

    return regionDeals.filter(deal => {
      // Text match
      const q = query.toLowerCase();
      const textMatch = !q ||
        deal.title.toLowerCase().includes(q) ||
        deal.description.toLowerCase().includes(q) ||
        deal.store.toLowerCase().includes(q);
      if (!textMatch) return false;

      // Price range
      if (deal.dealPrice < priceRange[0] || deal.dealPrice > priceRange[1]) return false;

      // Temperature
      if (getStoredTemp(deal.id, deal.temperature) < minTemp) return false;

      // Store filter
      if (selectedStores.length > 0 && !selectedStores.includes(deal.store)) return false;

      // Online/offline
      if (onlineOnly && deal.isOffline) return false;

      return true;
    });
  }, [query, region, priceRange, dateFilter, minTemp, selectedStores, onlineOnly]);

  const resetFilters = () => {
    setPriceRange([0, 100000]);
    setDateFilter('all');
    setMinTemp(-50);
    setSelectedStores([]);
    setOnlineOnly(false);
  };

  const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < 100000 || dateFilter !== 'all' || minTemp > -50 || selectedStores.length > 0 || onlineOnly;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CategoryBar />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 min-w-0">
            <Search className="h-5 w-5 text-primary shrink-0" />
            <h1 className="text-xl font-bold text-foreground truncate">
              {query ? <>Результаты: «{query}»</> : 'Поиск'}
            </h1>
            {filteredDeals.length > 0 && (
              <Badge variant="secondary" className="text-xs shrink-0">{filteredDeals.length}</Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 shrink-0"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {isMobile ? '' : 'Фильтры'}
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-primary" />
            )}
          </Button>
        </div>

        <div className={cn('grid gap-6', showFilters ? 'grid-cols-1 lg:grid-cols-[280px_1fr]' : 'grid-cols-1')}>
          {/* Filters Panel */}
          {showFilters && (
            <aside className={cn(
              'bg-card border rounded-xl p-4 space-y-5 h-fit',
              isMobile ? 'order-first' : 'sticky top-20'
            )}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">Фильтры</h3>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground" onClick={resetFilters}>
                    Сбросить
                  </Button>
                )}
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Цена
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={(v) => setPriceRange(v as [number, number])}
                  min={0}
                  max={100000}
                  step={500}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatPrice(priceRange[0], currency)}</span>
                  <span>{formatPrice(priceRange[1], currency)}</span>
                </div>
              </div>

              {/* Date Posted */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Дата публикации
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {([
                    { value: 'all', label: 'Все' },
                    { value: 'today', label: 'Сегодня' },
                    { value: 'week', label: 'Неделя' },
                    { value: 'month', label: 'Месяц' },
                  ] as const).map(opt => (
                    <Badge
                      key={opt.value}
                      variant={dateFilter === opt.value ? 'default' : 'outline'}
                      className={cn(
                        'cursor-pointer text-xs transition-colors',
                        dateFilter === opt.value && 'gradient-primary text-primary-foreground border-0'
                      )}
                      onClick={() => setDateFilter(opt.value)}
                    >
                      {opt.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Min Temperature */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                  <Thermometer className="w-3 h-3" /> Мин. температура
                </Label>
                <Slider
                  value={[minTemp]}
                  onValueChange={([v]) => setMinTemp(v)}
                  min={-50}
                  max={500}
                  step={10}
                />
                <div className="text-xs font-bold text-foreground text-center">{minTemp}°</div>
              </div>

              {/* Stores */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Магазины
                </Label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {allStores.map(store => (
                    <div key={store} className="flex items-center gap-2">
                      <Checkbox
                        id={`store-${store}`}
                        checked={selectedStores.includes(store)}
                        onCheckedChange={() => toggleStore(store)}
                      />
                      <label htmlFor={`store-${store}`} className="text-sm text-foreground cursor-pointer">
                        {store}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Online/Offline */}
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Только онлайн
                </Label>
                <Switch checked={onlineOnly} onCheckedChange={setOnlineOnly} />
              </div>
            </aside>
          )}

          {/* Results */}
          <div>
            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {priceRange[0] > 0 && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    От {formatPrice(priceRange[0], currency)}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange([0, priceRange[1]])} />
                  </Badge>
                )}
                {priceRange[1] < 100000 && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    До {formatPrice(priceRange[1], currency)}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange([priceRange[0], 100000])} />
                  </Badge>
                )}
                {minTemp > -50 && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    🔥 ≥ {minTemp}°
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setMinTemp(-50)} />
                  </Badge>
                )}
                {selectedStores.map(s => (
                  <Badge key={s} variant="secondary" className="gap-1 text-xs">
                    {s}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => toggleStore(s)} />
                  </Badge>
                ))}
                {onlineOnly && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    Онлайн
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlineOnly(false)} />
                  </Badge>
                )}
              </div>
            )}

            {filteredDeals.length > 0 ? (
              <div className="space-y-4">
                {filteredDeals.map(deal => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="text-center py-16 bg-card rounded-xl border">
                <Search className="h-14 w-14 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">Нет результатов</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  {query
                    ? <>По запросу «<span className="font-semibold text-foreground">{query}</span>» ничего не найдено. Попробуйте другой запрос или измените фильтры.</>
                    : 'Измените параметры фильтров, чтобы увидеть результаты.'
                  }
                </p>

                {hasActiveFilters && (
                  <Button variant="outline" size="sm" className="mb-6" onClick={resetFilters}>
                    Сбросить фильтры
                  </Button>
                )}

                {/* Suggestions */}
                <div className="max-w-sm mx-auto">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center justify-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Попробуйте найти
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTED_SEARCHES.map(q => (
                      <Link
                        key={q}
                        to={`/search?q=${encodeURIComponent(q)}`}
                        className="inline-flex items-center gap-1"
                      >
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors text-xs"
                        >
                          <Flame className="w-3 h-3 mr-0.5" />
                          {q}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
