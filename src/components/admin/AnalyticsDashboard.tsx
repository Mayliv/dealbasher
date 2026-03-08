
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tag, ShoppingBag, Users, ThumbsUp, MessageSquare, Flame, TrendingUp, MapPin
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

// --- Realistic mock data ---

const overviewStats = {
  dealsToday: 47,
  newUsers: 18,
  votes: 312,
  comments: 89,
};

const last30Days = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - 29 + i);
  const base = 30 + Math.round(Math.sin(i / 4) * 15 + Math.random() * 12);
  return {
    date: `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}`,
    deals: Math.max(8, base),
  };
});

const categoryBreakdown = [
  { name: 'Электроника', value: 142, color: 'hsl(0, 72%, 65%)' },
  { name: 'Одежда', value: 98, color: 'hsl(210, 90%, 65%)' },
  { name: 'Продукты', value: 76, color: 'hsl(135, 60%, 55%)' },
  { name: 'Путешествия', value: 54, color: 'hsl(270, 60%, 65%)' },
  { name: 'Дом и сад', value: 41, color: 'hsl(40, 90%, 60%)' },
  { name: 'Красота', value: 37, color: 'hsl(330, 70%, 65%)' },
  { name: 'Игры', value: 33, color: 'hsl(180, 60%, 50%)' },
];

const topStores = [
  { store: 'Ozon', deals: 87 },
  { store: 'Wildberries', deals: 74 },
  { store: 'Яндекс Маркет', deals: 56 },
  { store: 'DNS', deals: 43 },
  { store: 'М.Видео', deals: 38 },
  { store: 'Lamoda', deals: 31 },
  { store: 'СберМегаМаркет', deals: 27 },
  { store: 'AliExpress', deals: 24 },
  { store: 'Ситилинк', deals: 19 },
  { store: 'Золотое Яблоко', deals: 14 },
];

const hotDeals = [
  { title: 'AirPods Pro 2 за 14 990₽', temp: 487, store: 'Ozon' },
  { title: 'Nike Air Max 90 за 5 490₽', temp: 342, store: 'Lamoda' },
  { title: 'Xiaomi Robot Vacuum за 9 990₽', temp: 298, store: 'Wildberries' },
  { title: 'PlayStation 5 Slim за 39 990₽', temp: 256, store: 'М.Видео' },
];

const cityActivity = [
  { city: 'Москва', deals: 312, pct: 28 },
  { city: 'Санкт-Петербург', deals: 187, pct: 17 },
  { city: 'Новосибирск', deals: 89, pct: 8 },
  { city: 'Екатеринбург', deals: 76, pct: 7 },
  { city: 'Казань', deals: 64, pct: 6 },
  { city: 'Нижний Новгород', deals: 58, pct: 5 },
  { city: 'Краснодар', deals: 52, pct: 5 },
  { city: 'Самара', deals: 43, pct: 4 },
  { city: 'Ростов-на-Дону', deals: 39, pct: 3 },
  { city: 'Воронеж', deals: 31, pct: 3 },
];

const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode; trend: string; positive?: boolean }> = ({ title, value, icon, trend, positive = true }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{value.toLocaleString('ru-RU')}</p>
          <p className={`text-xs mt-1 font-medium ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
            {trend}
          </p>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const AnalyticsDashboard: React.FC = () => {
  const [liveCount, setLiveCount] = useState(127);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Сделок сегодня" value={overviewStats.dealsToday} icon={<ShoppingBag className="h-6 w-6 text-primary" />} trend="+12% к вчера" />
        <StatCard title="Новых пользователей" value={overviewStats.newUsers} icon={<Users className="h-6 w-6 text-primary" />} trend="+5% к вчера" />
        <StatCard title="Голосований" value={overviewStats.votes} icon={<ThumbsUp className="h-6 w-6 text-primary" />} trend="+23% к вчера" />
        <StatCard title="Комментариев" value={overviewStats.comments} icon={<MessageSquare className="h-6 w-6 text-primary" />} trend="-3% к вчера" positive={false} />
      </div>

      {/* Live Counter */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Flame className="h-6 w-6 text-destructive animate-pulse" />
            <div>
              <span className="text-lg font-bold">Горячие прямо сейчас:</span>
              <span className="text-2xl font-bold text-primary ml-2">{liveCount}</span>
              <span className="text-muted-foreground ml-1">пользователей онлайн</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            {hotDeals.map((deal, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md border bg-background p-3">
                <Badge variant="destructive" className="shrink-0">{deal.temp}°</Badge>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{deal.title}</p>
                  <p className="text-xs text-muted-foreground">{deal.store}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Line Chart - 30 days */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Активность за 30 дней</CardTitle>
          <CardDescription>Количество опубликованных сделок в день</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={last30Days}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={4} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))' }} />
                <Line type="monotone" dataKey="deals" name="Сделки" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Tag className="h-5 w-5" /> Сделки по категориям</CardTitle>
            <CardDescription>Распределение за текущий месяц</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryBreakdown} cx="50%" cy="50%" outerRadius={100} innerRadius={50} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                    {categoryBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart - Top Stores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShoppingBag className="h-5 w-5" /> Топ-10 магазинов</CardTitle>
            <CardDescription>По количеству сделок</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topStores} layout="vertical" margin={{ left: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="store" type="category" tick={{ fontSize: 11 }} width={75} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))' }} />
                  <Bar dataKey="deals" name="Сделки" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> География активности</CardTitle>
          <CardDescription>Города с наибольшим количеством сделок</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cityActivity.map((city, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm font-medium w-40 shrink-0">{city.city}</span>
                <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${city.pct * 3.5}%`,
                      background: `hsl(${Math.max(0, 200 - i * 20)}, 70%, ${55 + i * 2}%)`,
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-20 text-right">{city.deals} сделок</span>
                <Badge variant="outline" className="w-12 justify-center">{city.pct}%</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
