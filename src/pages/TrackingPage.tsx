import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { deals } from '@/utils/data';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Bell, BellOff, Trash2, ChevronRight, TrendingDown, CheckCircle2 } from 'lucide-react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';

export interface TrackedDeal {
  dealId: number;
  targetPrice: number;
  addedAt: string;
}

const STORAGE_KEY = 'tracked_deals';

export const getTrackedDeals = (): TrackedDeal[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
};

export const addTrackedDeal = (item: TrackedDeal) => {
  const list = getTrackedDeals().filter(t => t.dealId !== item.dealId);
  list.unshift(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const removeTrackedDeal = (dealId: number) => {
  const list = getTrackedDeals().filter(t => t.dealId !== dealId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const isTracked = (dealId: number) => getTrackedDeals().some(t => t.dealId === dealId);

const generateSparkline = (currentPrice: number) => {
  const points = 15;
  const data = [];
  for (let i = 0; i < points; i++) {
    const variance = (Math.random() - 0.3) * currentPrice * 0.15;
    data.push({ v: Math.round(currentPrice * 1.2 - (i / points) * currentPrice * 0.3 + variance) });
  }
  data.push({ v: currentPrice });
  return data;
};

const TrackingPage = () => {
  const { formatPrice, region } = useLocalization();
  const currency = region === 'kz' ? 'KZT' : region === 'ru' ? 'RUB' : 'USD';
  const [tracked, setTracked] = useState(getTrackedDeals);

  const items = useMemo(() =>
    tracked.map(t => {
      const deal = deals.find(d => d.id === t.dealId);
      if (!deal) return null;
      const reached = deal.dealPrice <= t.targetPrice;
      return { ...t, deal, reached, sparkline: generateSparkline(deal.dealPrice) };
    }).filter(Boolean) as Array<TrackedDeal & { deal: typeof deals[0]; reached: boolean; sparkline: { v: number }[] }>,
    [tracked]
  );

  const handleRemove = (dealId: number) => {
    removeTrackedDeal(dealId);
    setTracked(getTrackedDeals());
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">Отслеживаемые товары</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Bell className="w-6 h-6 text-primary" />
          Мои отслеживаемые товары
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border">
            <BellOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Пока ничего не отслеживается</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Нажмите «🔔 Отслеживать цену» на странице любой сделки
            </p>
            <Link to="/">
              <Button className="gradient-primary text-primary-foreground">К сделкам</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <Link
                key={item.dealId}
                to={`/deal/${item.dealId}`}
                className="block bg-card rounded-xl border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 p-4">
                  {/* Image */}
                  <img
                    src={item.deal.imageUrl}
                    alt={item.deal.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground line-clamp-1">{item.deal.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-extrabold text-[hsl(var(--deal-success))]">
                        {formatPrice(item.deal.dealPrice, currency)}
                      </span>
                      <span className="text-xs text-muted-foreground">→</span>
                      <span className="text-sm font-bold text-primary">
                        {formatPrice(item.targetPrice, currency)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {item.reached ? (
                        <Badge className="bg-[hsl(var(--deal-success))] text-primary-foreground border-0 text-[10px]">
                          <CheckCircle2 className="w-3 h-3 mr-0.5" /> Цена достигнута!
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">
                          <TrendingDown className="w-3 h-3 mr-0.5" /> Ждём снижения
                        </Badge>
                      )}
                      <span className="text-[10px] text-muted-foreground">{item.addedAt}</span>
                    </div>
                  </div>

                  {/* Sparkline */}
                  <div className="w-20 h-10 shrink-0 hidden sm:block">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={item.sparkline}>
                        <Line
                          type="monotone"
                          dataKey="v"
                          stroke={item.reached ? 'hsl(var(--deal-success))' : 'hsl(var(--primary))'}
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Remove */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRemove(item.dealId); }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TrackingPage;
