import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import DealCard from '@/components/DealCard';
import Footer from '@/components/Footer';
import SortingTabs from '@/components/SortingTabs';
import TimePeriodSelector from '@/components/TimePeriodSelector';
import MarketplaceBar from '@/components/MarketplaceBar';
import CityPickerModal from '@/components/CityPickerModal';
import { getSelectedCity } from '@/components/CityPickerModal';
import { deals, offlineCitiesRu, offlineCitiesKz, categories } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, MapPin, Thermometer, Store, Wifi, LayoutGrid, ChevronLeft, ChevronRight, Bug, Crown, TrendingUp, ExternalLink, Clock } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useLocalization } from '@/contexts/LocalizationContext';
import { getStoredTemp } from '@/hooks/useTemperatureVote';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileSidebarDrawer from '@/components/MobileSidebarDrawer';

type DealTypeFilter = 'all' | 'online' | 'offline';

// ─── Hero Banner ────────────────────────────────────────
const HeroBanner = ({ deals: heroDeals }: { deals: typeof deals }) => {
  const [current, setCurrent] = useState(0);
  const { formatPrice, region } = useLocalization();

  const next = useCallback(() => setCurrent(i => (i + 1) % heroDeals.length), [heroDeals.length]);
  const prev = useCallback(() => setCurrent(i => (i - 1 + heroDeals.length) % heroDeals.length), [heroDeals.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (heroDeals.length === 0) return null;
  const deal = heroDeals[current];
  const currency = region === 'kz' ? 'KZT' : region === 'ru' ? 'RUB' : 'USD';

  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 group">
      <Link to={`/deal/${deal.id}`} className="block">
        <div className="relative h-[280px] sm:h-[340px] md:h-[400px] bg-gradient-to-r from-card to-muted">
          <img
            src={deal.imageUrl}
            alt={deal.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-primary text-primary-foreground font-bold text-xs">
                🔥 {getStoredTemp(deal.id, deal.temperature)}°
              </Badge>
              <Badge variant="secondary" className="text-xs">{deal.store}</Badge>
              {deal.discount && (
                <Badge className="bg-[hsl(var(--deal-success))] text-white text-xs">
                  -{deal.discount}%
                </Badge>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 line-clamp-2">
              {deal.title}
            </h2>
            <p className="text-white/70 text-sm sm:text-base mb-4 line-clamp-2 max-w-2xl">
              {deal.description}
            </p>
            <div className="flex items-center gap-4">
              {deal.originalPrice && (
                <span className="text-white/50 line-through text-sm">
                  {formatPrice(deal.originalPrice, currency)}
                </span>
              )}
              <span className="text-white text-2xl font-extrabold">
                {formatPrice(deal.dealPrice, currency)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Nav arrows */}
      <button
        onClick={(e) => { e.preventDefault(); prev(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => { e.preventDefault(); next(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {heroDeals.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              i === current ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            )}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Price Bug Card ─────────────────────────────────────
const PriceBugCard = ({ deal }: { deal: typeof deals[0] }) => {
  const { formatPrice, region } = useLocalization();
  const currency = region === 'kz' ? 'KZT' : region === 'ru' ? 'RUB' : 'USD';
  const [timeLeft, setTimeLeft] = useState({ h: Math.floor(Math.random() * 4) + 1, m: Math.floor(Math.random() * 59), s: Math.floor(Math.random() * 59) });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Link to={`/deal/${deal.id}`} className="block">
      <div className="bg-card border-2 border-destructive/30 rounded-xl p-4 hover:border-destructive/60 transition-all hover:shadow-lg animate-bug-pulse group">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-destructive text-destructive-foreground text-xs font-bold">🐛 Баг цены!</Badge>
          <div className="ml-auto flex items-center gap-1 text-xs text-destructive font-mono font-bold">
            <Clock className="h-3 w-3" />
            {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
            <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">{deal.title}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{deal.store}</p>
            <div className="flex items-center gap-2 mt-2">
              {deal.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">{formatPrice(deal.originalPrice, currency)}</span>
              )}
              <span className="text-base font-extrabold text-destructive">{formatPrice(deal.dealPrice, currency)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─── Sidebar Widgets ────────────────────────────────────
const TopStoresWidget = () => {
  const stores = [
    { name: 'Kaspi', deals: 42 },
    { name: 'Wildberries', deals: 38 },
    { name: 'Ozon', deals: 31 },
    { name: 'DNS', deals: 27 },
    { name: 'М.Видео', deals: 19 },
  ];

  return (
    <div className="bg-card border rounded-xl p-4">
      <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-3">
        <Store className="h-4 w-4 text-primary" />
        Топ магазины недели
      </h3>
      <div className="space-y-2">
        {stores.map((store, i) => (
          <div key={store.name} className="flex items-center gap-3">
            <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
              {store.name.slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{store.name}</p>
              <p className="text-xs text-muted-foreground">{store.deals} сделок</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TopHuntersWidget = () => {
  const hunters = [
    { name: 'dealfinder42', temp: 2450, level: '💎' },
    { name: 'kaspi_hunter', temp: 1820, level: '⚡' },
    { name: 'techexpert', temp: 1340, level: '⚡' },
    { name: 'sneaker_hunter', temp: 890, level: '🔥' },
    { name: 'smart_home', temp: 670, level: '🔥' },
  ];

  return (
    <div className="bg-card border rounded-xl p-4">
      <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-3">
        <Crown className="h-4 w-4 text-yellow-500" />
        Самые активные охотники
      </h3>
      <div className="space-y-2">
        {hunters.map((hunter, i) => (
          <Link key={hunter.name} to={`/user/${hunter.name}`} className="flex items-center gap-3 group">
            <span className={cn(
              'text-xs font-bold w-4',
              i === 0 ? 'text-yellow-500' : i === 1 ? 'text-muted-foreground' : i === 2 ? 'text-orange-400' : 'text-muted-foreground'
            )}>{i + 1}</span>
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">{hunter.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                {hunter.level} {hunter.name}
              </p>
            </div>
            <span className="text-xs font-bold text-primary">{hunter.temp}°</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const HotCategoriesWidget = () => {
  const hotCats = [
    { name: 'Электроника', slug: 'electronics', count: 86 },
    { name: 'Мода', slug: 'fashion', count: 54 },
    { name: 'Игры', slug: 'gaming', count: 42 },
    { name: 'Дом и сад', slug: 'home', count: 38 },
    { name: 'Красота', slug: 'beauty', count: 29 },
    { name: 'Еда', slug: 'food', count: 23 },
    { name: 'Путешествия', slug: 'travel', count: 17 },
    { name: 'Локальные', slug: 'local', count: 12 },
  ];

  return (
    <div className="bg-card border rounded-xl p-4">
      <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-3">
        <TrendingUp className="h-4 w-4 text-primary" />
        Горячие категории
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {hotCats.map(cat => (
          <Link
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-xs font-medium text-muted-foreground transition-colors"
          >
            {cat.name}
            <span className="text-[10px] opacity-60">{cat.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

// ─── Main Page ──────────────────────────────────────────
const Index = () => {
  const [sortTab, setSortTab] = useState('hot');
  const [timePeriod, setTimePeriod] = useState('week');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [minTemp, setMinTemp] = useState(0);
  const [dealTypeFilter, setDealTypeFilter] = useState<DealTypeFilter>('all');
  const [userCity, setUserCity] = useState<string | null>(getSelectedCity());
  const { t, region, formatPrice } = useLocalization();

  useEffect(() => {
    const savedCity = localStorage.getItem(`dealbasher_city_${region}`);
    if (savedCity) setSelectedCity(savedCity);
  }, [region]);

  useEffect(() => {
    const handler = () => setUserCity(getSelectedCity());
    window.addEventListener('city-changed', handler);
    return () => window.removeEventListener('city-changed', handler);
  }, []);

  const cities = region === 'kz' ? offlineCitiesKz : offlineCitiesRu;
  const regionDeals = deals.filter(deal => !deal.region || deal.region === region);

  // Hero: top 3 by temperature
  const heroDeals = [...regionDeals]
    .sort((a, b) => getStoredTemp(b.id, b.temperature) - getStoredTemp(a.id, a.temperature))
    .slice(0, 3);

  // Hot right now: top 5
  const hotDeals = [...regionDeals]
    .sort((a, b) => getStoredTemp(b.id, b.temperature) - getStoredTemp(a.id, a.temperature))
    .slice(0, 5);

  // Price bugs: deals with high discount (simulate)
  const priceBugs = [...regionDeals]
    .filter(d => (d.discount || 0) >= 35)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 3);

  // Nearby offline deals
  const nearbyDeals = userCity
    ? regionDeals.filter(deal => deal.isOffline && deal.city === userCity).slice(0, 4)
    : regionDeals.filter(deal => deal.isOffline).slice(0, 4);

  // Main feed
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

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Hero Banner */}
        <HeroBanner deals={heroDeals} />

        {/* 🔴 Kaspi RED section — KZ only */}
        {region === 'kz' && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                {t('section.kaspi_red')}
              </h2>
              <Badge className="bg-secondary text-secondary-foreground text-xs font-bold">Kaspi</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 901, title: 'iPhone 15 Pro — Kaspi RED 12 мес', description: 'Рассрочка 0% на 12 месяцев через Kaspi RED. Без переплаты!', originalPrice: 599990, dealPrice: 599990, store: 'Kaspi Shop', category: 'electronics', imageUrl: 'https://placehold.co/400x300/00A651/fff?text=iPhone+15+RED', postedBy: 'kaspi_deals', postedAt: '1 час назад', temperature: 389, comments: 24, url: '#', region: 'kz' as const, discount: 0 },
                { id: 902, title: 'Samsung Galaxy S24 — RED 0-0-24', description: 'Без первого взноса, без переплаты на 24 месяца', originalPrice: 449990, dealPrice: 449990, store: 'Kaspi Shop', category: 'electronics', imageUrl: 'https://placehold.co/400x300/00A651/fff?text=Galaxy+S24+RED', postedBy: 'kz_tech', postedAt: '3 часа назад', temperature: 267, comments: 18, url: '#', region: 'kz' as const, discount: 0 },
                { id: 903, title: 'Dyson V15 — RED рассрочка + кэшбэк', description: 'Kaspi RED на 6 месяцев + кэшбэк 5% бонусами', originalPrice: 329990, dealPrice: 329990, store: 'Kaspi Shop', category: 'home', imageUrl: 'https://placehold.co/400x300/00A651/fff?text=Dyson+RED', postedBy: 'smart_shopper', postedAt: '5 часов назад', temperature: 198, comments: 11, url: '#', region: 'kz' as const, discount: 0 },
              ].map(deal => (
                <Link key={deal.id} to={`/deal/${deal.id}`} className="block">
                  <div className="bg-card border-2 border-secondary/30 rounded-xl p-4 hover:border-secondary/60 transition-all hover:shadow-lg group">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-secondary text-secondary-foreground text-xs font-bold">🔴 Kaspi RED</Badge>
                      <span className="text-xs text-muted-foreground">0% рассрочка</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                        <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">{deal.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{deal.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-base font-extrabold text-secondary">{formatPrice(deal.dealPrice, 'KZT')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 🔥 Hot Right Now */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            {t('section.hot_now')}
          </h2>
          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
              {hotDeals.map(deal => (
                <div key={deal.id} className="min-w-[300px] max-w-[340px] shrink-0">
                  <DealCard deal={deal} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* 🐛 Price Bugs */}
        {priceBugs.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                🐛 Свежие баги цен
              </h2>
              <Link to="/bugs" className="text-sm text-primary hover:underline flex items-center gap-1">
                Все баги <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {priceBugs.map(deal => (
                <PriceBugCard key={deal.id} deal={deal} />
              ))}
            </div>
          </section>
        )}

        {/* 📍 In Your City */}
        {nearbyDeals.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                📍 В вашем городе
              </h2>
              {userCity && (
                <Badge variant="secondary" className="text-xs">
                  {cities.find(c => c.id === userCity)?.name || 'Все города'}
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {nearbyDeals.map(deal => (
                <div key={deal.id}>
                  <DealCard deal={deal} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Main Feed + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Main feed */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div className="flex items-center mb-4 sm:mb-0">
                <Flame className="text-primary mr-2" />
                <h2 className="text-xl font-bold text-foreground">{t('nav.deals')}</h2>
              </div>
              <SortingTabs activeTab={sortTab} onChangeTab={setSortTab} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <TimePeriodSelector activePeriod={timePeriod} onChangePeriod={setTimePeriod} />

              <div className="flex items-center gap-1 bg-card rounded-lg border px-2 py-1">
                {([
                  { value: 'all' as DealTypeFilter, label: 'Все', icon: LayoutGrid },
                  { value: 'online' as DealTypeFilter, label: 'Онлайн', icon: Wifi },
                  { value: 'offline' as DealTypeFilter, label: 'Офлайн', icon: Store },
                ] as const).map(opt => (
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

              <div className="flex items-center gap-3 bg-card rounded-lg border px-4 py-2 min-w-[240px]">
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
                <span className="text-xs font-bold text-foreground min-w-[40px] text-right">{minTemp}°</span>
              </div>
            </div>

            <div className="space-y-4">
              {sortedDeals.length > 0 ? (
                sortedDeals.map(deal => <DealCard key={deal.id} deal={deal} />)
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
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 hidden lg:block">
            <TopStoresWidget />
            <TopHuntersWidget />
            <HotCategoriesWidget />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
