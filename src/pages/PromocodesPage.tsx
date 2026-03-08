
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Copy,
  Search,
  Ticket,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  Clock,
  Users,
  Plus,
  Send,
  Check,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// ─── Data ──────────────────────────────────────────────────
const categories = [
  { id: 'all', name: 'Все', icon: '🏷️' },
  { id: 'food', name: 'Еда', icon: '🍔' },
  { id: 'fashion', name: 'Одежда', icon: '👕' },
  { id: 'electronics', name: 'Электроника', icon: '📱' },
  { id: 'travel', name: 'Путешествия', icon: '✈️' },
];

const topStores = [
  { name: 'Ozon', logo: 'https://placehold.co/80x80/2962FF/fff?text=Ozon' },
  { name: 'Wildberries', logo: 'https://placehold.co/80x80/A020F0/fff?text=WB' },
  { name: 'Яндекс Маркет', logo: 'https://placehold.co/80x80/FFCC00/000?text=ЯМ' },
  { name: 'AliExpress', logo: 'https://placehold.co/80x80/E53935/fff?text=Ali' },
  { name: 'М.Видео', logo: 'https://placehold.co/80x80/E91E63/fff?text=МВ' },
  { name: 'Lamoda', logo: 'https://placehold.co/80x80/000/fff?text=Lamoda' },
  { name: 'DNS', logo: 'https://placehold.co/80x80/FF6F00/fff?text=DNS' },
  { name: 'СберМаркет', logo: 'https://placehold.co/80x80/21A038/fff?text=СМ' },
  { name: 'Delivery Club', logo: 'https://placehold.co/80x80/2DB84B/fff?text=DC' },
  { name: 'Aviasales', logo: 'https://placehold.co/80x80/00BCD4/fff?text=Avia' },
];

interface Promo {
  id: number;
  store: string;
  storeLogo: string;
  code: string;
  discount: string;
  description: string;
  expiryDate: Date;
  category: string;
  verified: boolean;
  usageCount: number;
}

const promocodes: Promo[] = [
  {
    id: 1, store: 'Ozon', storeLogo: 'https://placehold.co/48x48/2962FF/fff?text=Oz',
    code: 'OZON2025', discount: '15% на первый заказ', description: 'Скидка 15% на первый заказ от 1500₽. Работает на все категории.',
    expiryDate: new Date(Date.now() + 2 * 86400000), category: 'electronics', verified: true, usageCount: 1247,
  },
  {
    id: 2, store: 'Яндекс Еда', storeLogo: 'https://placehold.co/48x48/FFCC00/000?text=ЯЕ',
    code: 'YEDA500', discount: '500₽ на заказ от 1200₽', description: 'Промокод на первые 3 заказа. Минимальная сумма 1200₽.',
    expiryDate: new Date(Date.now() + 14 * 86400000), category: 'food', verified: true, usageCount: 3891,
  },
  {
    id: 3, store: 'Lamoda', storeLogo: 'https://placehold.co/48x48/000/fff?text=La',
    code: 'STYLE20', discount: '20% на новую коллекцию', description: 'Скидка 20% на весеннюю коллекцию 2025. Не суммируется с другими скидками.',
    expiryDate: new Date(Date.now() + 7 * 86400000), category: 'fashion', verified: true, usageCount: 567,
  },
  {
    id: 4, store: 'AliExpress', storeLogo: 'https://placehold.co/48x48/E53935/fff?text=Ali',
    code: 'NEWUSER10', discount: '10$ на первый заказ', description: 'Скидка 10$ при покупке от 15$. Только для новых пользователей.',
    expiryDate: new Date(Date.now() + 60 * 86400000), category: 'electronics', verified: true, usageCount: 12450,
  },
  {
    id: 5, store: 'М.Видео', storeLogo: 'https://placehold.co/48x48/E91E63/fff?text=МВ',
    code: 'MVIDEO5000', discount: '5000₽ от 30000₽', description: 'Скидка 5000₽ при покупке бытовой техники от 30000₽.',
    expiryDate: new Date(Date.now() + 1 * 86400000), category: 'electronics', verified: false, usageCount: 89,
  },
  {
    id: 6, store: 'Aviasales', storeLogo: 'https://placehold.co/48x48/00BCD4/fff?text=Av',
    code: 'FLY2025', discount: '7% на авиабилеты', description: 'Кэшбэк 7% на все авиабилеты. Максимум 3000₽.',
    expiryDate: new Date(Date.now() + 30 * 86400000), category: 'travel', verified: true, usageCount: 2034,
  },
  {
    id: 7, store: 'Delivery Club', storeLogo: 'https://placehold.co/48x48/2DB84B/fff?text=DC',
    code: 'DCFREE', discount: 'Бесплатная доставка', description: 'Бесплатная доставка при заказе от 800₽. Работает 3 раза.',
    expiryDate: new Date(Date.now() + 5 * 86400000), category: 'food', verified: true, usageCount: 6723,
  },
  {
    id: 8, store: 'Wildberries', storeLogo: 'https://placehold.co/48x48/A020F0/fff?text=WB',
    code: 'WB10SALE', discount: '10% на одежду', description: 'Скидка 10% на категорию «Одежда». Максимум 2000₽.',
    expiryDate: new Date(Date.now() + 10 * 86400000), category: 'fashion', verified: false, usageCount: 345,
  },
];

// ─── Helpers ───────────────────────────────────────────────
function getDaysLeft(date: Date): number {
  return Math.max(0, Math.ceil((date.getTime() - Date.now()) / 86400000));
}

function formatExpiry(date: Date): string {
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ─── Promo Card ────────────────────────────────────────────
const PromoCard = ({ promo }: { promo: Promo }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const daysLeft = getDaysLeft(promo.expiryDate);
  const isUrgent = daysLeft <= 3;

  const handleCopy = () => {
    navigator.clipboard.writeText(promo.code);
    setCopied(true);
    toast({ title: '✓ Промокод скопирован!', description: promo.code });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-xl border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b border-border">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
          <img src={promo.storeLogo} alt={promo.store} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm truncate">{promo.store}</h3>
          <p className="text-xs text-muted-foreground truncate">{promo.discount}</p>
        </div>
        {promo.verified ? (
          <Badge className="bg-deal-success text-primary-foreground border-0 text-[10px] shrink-0 gap-1">
            <CheckCircle2 className="w-3 h-3" /> Проверено
          </Badge>
        ) : (
          <Badge variant="secondary" className="text-[10px] shrink-0 gap-1">
            <HelpCircle className="w-3 h-3" /> Не проверен
          </Badge>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-sm text-foreground/90 leading-relaxed mb-4 flex-1">
          {promo.description}
        </p>

        {/* Code + Copy */}
        <div className="flex rounded-lg border border-border overflow-hidden mb-3">
          <div className="flex-1 bg-muted/50 px-3 py-2.5 flex items-center">
            <code className="font-mono text-sm font-bold text-foreground tracking-wider">
              {promo.code}
            </code>
          </div>
          <Button
            variant="ghost"
            className={`rounded-none border-l border-border px-4 text-xs font-medium transition-all ${
              copied
                ? 'bg-deal-success text-primary-foreground hover:bg-deal-success'
                : 'hover:bg-primary/10 hover:text-primary'
            }`}
            onClick={handleCopy}
          >
            {copied ? (
              <><Check className="w-3.5 h-3.5 mr-1" /> Copied!</>
            ) : (
              <><Copy className="w-3.5 h-3.5 mr-1" /> Copy</>
            )}
          </Button>
        </div>

        {/* Footer meta */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>Использовали {promo.usageCount.toLocaleString()} раз</span>
          </div>
          <div className={`flex items-center gap-1 font-medium ${isUrgent ? 'text-destructive' : 'text-muted-foreground'}`}>
            <Clock className="w-3 h-3" />
            <span>
              {daysLeft === 0
                ? 'Истекает сегодня!'
                : daysLeft <= 3
                  ? `${daysLeft} дн. осталось!`
                  : `до ${formatExpiry(promo.expiryDate)}`}
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <Button variant="outline" size="sm" className="w-full text-xs hover:bg-primary/5 hover:text-primary hover:border-primary transition-colors">
          <ExternalLink className="w-3.5 h-3.5 mr-1" /> Перейти в магазин
        </Button>
      </div>
    </div>
  );
};

// ─── Submit Modal ──────────────────────────────────────────
const SubmitPromoModal = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: '🎉 Промокод отправлен!', description: 'Мы проверим и опубликуем его.' });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-primary text-primary-foreground font-bold gap-2">
          <Plus className="w-4 h-4" /> Добавить промокод
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Добавить промокод</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label>Магазин *</Label>
            <Input placeholder="Название магазина" required />
          </div>
          <div className="space-y-1.5">
            <Label>Промокод *</Label>
            <Input placeholder="PROMO2025" className="font-mono" required />
          </div>
          <div className="space-y-1.5">
            <Label>Скидка *</Label>
            <Input placeholder="15% или 500₽" required />
          </div>
          <div className="space-y-1.5">
            <Label>Категория</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Выберите" /></SelectTrigger>
              <SelectContent>
                {categories.filter(c => c.id !== 'all').map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.icon} {c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Описание</Label>
            <Textarea placeholder="Условия использования..." />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground font-bold">
            <Send className="w-4 h-4 mr-2" /> Отправить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// ─── Main Page ─────────────────────────────────────────────
const PromocodesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return promocodes.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = !searchQuery ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CategoryBar />

      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Ticket className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-extrabold text-foreground">Промокоды</h1>
            <Badge variant="secondary" className="text-xs">{promocodes.length} активных</Badge>
          </div>
          <SubmitPromoModal />
        </div>

        {/* Top stores */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Популярные магазины</h2>
          <ScrollArea className="w-full">
            <div className="flex gap-3 pb-2">
              {topStores.map(store => (
                <button
                  key={store.name}
                  className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
                  onClick={() => setSearchQuery(store.name)}
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-border group-hover:border-primary transition-colors shadow-sm">
                    <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors font-medium max-w-[60px] truncate">
                    {store.name}
                  </span>
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Поиск промокода или магазина..."
            className="pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              className={`shrink-0 gap-1.5 text-xs ${activeCategory === cat.id ? 'gradient-primary text-primary-foreground' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.icon}</span> {cat.name}
            </Button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(promo => (
              <PromoCard key={promo.id} promo={promo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-xl border">
            <Ticket className="w-10 h-10 mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">Промокоды не найдены</p>
            <p className="text-xs text-muted-foreground mt-1">Попробуйте другой поиск или категорию</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PromocodesPage;
