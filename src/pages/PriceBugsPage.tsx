import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { ExternalLink, Upload, Clock, Trophy, AlertTriangle, Send } from 'lucide-react';
import { deals } from '@/utils/data';
import { useLocalization } from '@/contexts/LocalizationContext';
import { cn } from '@/lib/utils';

// ─── Countdown timer ───────────────────────────────────────
const CountdownTimer = ({ hoursLeft }: { hoursLeft: number }) => {
  const [seconds, setSeconds] = useState(hoursLeft * 3600);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <span className="font-mono text-sm font-bold text-destructive">
      {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
    </span>
  );
};

// ─── Mock price bugs ───────────────────────────────────────
const mockBugs = [
  { id: 'b1', store: 'Ozon', title: 'MacBook Air M2 за 29 990₽ вместо 129 990₽', originalPrice: 129990, bugPrice: 29990, discount: 77, imageUrl: 'https://placehold.co/400x300/e9e9e9/999?text=MacBook+Bug', postedBy: 'bug_sniper', postedAt: '45 мин назад', hoursLeft: 2.5, isActive: true },
  { id: 'b2', store: 'Wildberries', title: 'Sony WH-1000XM5 за 990₽', originalPrice: 32990, bugPrice: 990, discount: 97, imageUrl: 'https://placehold.co/400x300/e9e9e9/999?text=Sony+XM5+Bug', postedBy: 'price_error_kz', postedAt: '1 час назад', hoursLeft: 5, isActive: true },
  { id: 'b3', store: 'DNS', title: 'RTX 4070 за 4 999₽ — ошибка цены!', originalPrice: 79990, bugPrice: 4999, discount: 94, imageUrl: 'https://placehold.co/400x300/e9e9e9/999?text=RTX+4070+Bug', postedBy: 'gpu_hunter', postedAt: '2 часа назад', hoursLeft: 1, isActive: true },
  { id: 'b4', store: 'Яндекс Маркет', title: 'iPad Pro 12.9 за 7 990₽', originalPrice: 109990, bugPrice: 7990, discount: 93, imageUrl: 'https://placehold.co/400x300/e9e9e9/999?text=iPad+Bug', postedBy: 'apple_deals', postedAt: '30 мин назад', hoursLeft: 8, isActive: true },
];

const hallOfFame = [
  { title: 'Tesla Model 3 за 3 500₽', store: 'Avito', discount: 99.9, date: '12.01.2025' },
  { title: 'iPhone 15 Pro Max за 150₽', store: 'Ozon', discount: 99.8, date: '03.11.2024' },
  { title: 'PS5 за 499₽ — ошибка каталога', store: 'М.Видео', discount: 99, date: '28.09.2024' },
  { title: 'Dyson V15 за 990₽', store: 'Wildberries', discount: 98.5, date: '15.07.2024' },
  { title: 'Samsung S24 Ultra за 2 990₽', store: 'DNS', discount: 97.5, date: '02.05.2024' },
];

const PriceBugsPage = () => {
  const { toast } = useToast();
  const { formatPrice } = useLocalization();

  const [formData, setFormData] = useState({
    storeUrl: '',
    originalPrice: '',
    bugPrice: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: '🐛 Баг отправлен!',
      description: 'Мы проверим и опубликуем его в ближайшее время.',
    });
    setFormData({ storeUrl: '', originalPrice: '', bugPrice: '', description: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CategoryBar />

      {/* Sticky banner */}
      <div className="sticky top-16 z-30 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white py-2.5 px-4 text-center shadow-md">
        <p className="text-sm font-bold flex items-center justify-center gap-2">
          🐛 Нашёл баг цены? Делись! Это законно!
          <Button size="sm" variant="secondary" className="ml-2 h-7 text-xs font-bold" onClick={() => document.getElementById('submit-bug')?.scrollIntoView({ behavior: 'smooth' })}>
            Сообщить о баге
          </Button>
        </p>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-extrabold text-foreground">🐛 Баги цен</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ошибка цены на сайте магазина — <strong className="text-foreground">не нарушение закона!</strong> Покупатель не несёт ответственности. Магазин обязан продать товар по указанной цене или отменить заказ с возвратом средств.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Баги исчезают быстро — действуйте немедленно!
          </div>
        </div>

        {/* Active bugs */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            ⚡ Активные баги <Badge className="bg-destructive text-destructive-foreground border-0 animate-pulse">{mockBugs.length} live</Badge>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {mockBugs.map(bug => (
              <div key={bug.id} className="bg-card rounded-xl border-2 border-destructive/50 overflow-hidden relative animate-bug-pulse">
                {/* Urgent badge */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-destructive text-destructive-foreground border-0 text-xs font-bold shadow-lg">
                    ⚡ СРОЧНО
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <Clock className="w-3 h-3 text-destructive" />
                  <CountdownTimer hoursLeft={bug.hoursLeft} />
                </div>

                <div className="aspect-[16/9] bg-muted">
                  <img src={bug.imageUrl} alt={bug.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-foreground leading-tight">{bug.title}</h3>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-extrabold text-destructive">
                      {bug.bugPrice.toLocaleString()}₽
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {bug.originalPrice.toLocaleString()}₽
                    </span>
                    <Badge className="bg-destructive text-destructive-foreground border-0 text-xs font-bold">
                      -{bug.discount}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-[10px]">{bug.store}</Badge>
                      <span>{bug.postedAt}</span>
                      <span>от {bug.postedBy}</span>
                    </div>
                    <Button size="sm" className="gradient-primary text-primary-foreground font-bold text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" /> Купить
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hall of Fame */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" /> Зал славы — лучшие баги
          </h2>
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="divide-y divide-border">
              {hallOfFame.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-extrabold text-muted-foreground/30 w-8 text-center">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.store} · {item.date}</p>
                    </div>
                  </div>
                  <Badge className="bg-destructive text-destructive-foreground border-0 text-sm font-bold">
                    -{item.discount}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit bug form */}
        <div id="submit-bug" className="scroll-mt-32">
          <h2 className="text-xl font-bold text-foreground mb-4">📝 Сообщить о баге цены</h2>
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Баги цен исчезают очень быстро! Отправляйте как можно скорее, пока магазин не исправил ошибку.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Ссылка на товар в магазине *</label>
                <Input
                  placeholder="https://ozon.ru/product/..."
                  value={formData.storeUrl}
                  onChange={e => setFormData(f => ({ ...f, storeUrl: e.target.value }))}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Обычная цена *</label>
                  <Input
                    type="number"
                    placeholder="129 990"
                    value={formData.originalPrice}
                    onChange={e => setFormData(f => ({ ...f, originalPrice: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Цена с багом *</label>
                  <Input
                    type="number"
                    placeholder="990"
                    value={formData.bugPrice}
                    onChange={e => setFormData(f => ({ ...f, bugPrice: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Описание (необязательно)</label>
                <Textarea
                  placeholder="Дополнительная информация о баге..."
                  value={formData.description}
                  onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Скриншот</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Нажмите или перетащите скриншот сюда</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG до 5MB</p>
                </div>
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground font-bold h-11">
                <Send className="w-4 h-4 mr-2" /> Отправить баг
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PriceBugsPage;
