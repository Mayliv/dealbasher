
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories, offlineCitiesRu, offlineCitiesKz } from '@/utils/data';
import { useToast } from '@/components/ui/use-toast';
import { useLocalization } from '@/contexts/LocalizationContext';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Wifi,
  Store,
  Bug,
  Upload,
  ArrowLeft,
  ArrowRight,
  Send,
  Loader2,
  Check,
  Bold,
  Italic,
  Smile,
  X,
  CalendarIcon,
  Tag,
  Image as ImageIcon,
  Clock,
  MessageSquare,
  MapPin,
  ExternalLink,
  Share2,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// ─── Types ─────────────────────────────────────────────────
type DealType = 'online' | 'offline' | 'pricebug';

interface FormData {
  title: string;
  url: string;
  dealPrice: string;
  originalPrice: string;
  store: string;
  description: string;
  category: string;
  tags: string[];
  dealType: DealType;
  city: string;
  storeAddress: string;
  expiryDate: Date | undefined;
  imageUrl: string;
}

const defaultForm: FormData = {
  title: '',
  url: '',
  dealPrice: '',
  originalPrice: '',
  store: '',
  description: '',
  category: '',
  tags: [],
  dealType: 'online',
  city: '',
  storeAddress: '',
  expiryDate: undefined,
  imageUrl: '',
};

const STEPS = [
  { id: 1, title: 'Основное', icon: '📝' },
  { id: 2, title: 'Детали', icon: '✏️' },
  { id: 3, title: 'Тип', icon: '⚙️' },
];

const MAX_DESC = 1000;

const storeOptions = [
  'Ozon', 'Wildberries', 'Яндекс Маркет', 'AliExpress', 'М.Видео',
  'DNS', 'Lamoda', 'Kaspi', 'Sulpak', 'Другой',
];

// ─── Progress Bar ──────────────────────────────────────────
const ProgressBar = ({ step }: { step: number }) => (
  <div className="flex items-center gap-2 mb-8">
    {STEPS.map((s, i) => (
      <React.Fragment key={s.id}>
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shrink-0',
              step > s.id
                ? 'gradient-primary text-primary-foreground shadow-md'
                : step === s.id
                  ? 'gradient-primary text-primary-foreground shadow-lg scale-110'
                  : 'bg-muted text-muted-foreground'
            )}
          >
            {step > s.id ? <Check className="w-4 h-4" /> : s.icon}
          </div>
          <span
            className={cn(
              'text-sm font-medium hidden sm:inline transition-colors',
              step >= s.id ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            {s.title}
          </span>
        </div>
        {i < STEPS.length - 1 && (
          <div className="flex-1 h-0.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full gradient-primary transition-all duration-500"
              style={{ width: step > s.id ? '100%' : '0%' }}
            />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
);

// ─── Description Toolbar ───────────────────────────────────
const DescriptionEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const wrap = (before: string, after: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.substring(start, end);
    const newVal = value.substring(0, start) + before + selected + after + value.substring(end);
    onChange(newVal);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const insertEmoji = (emoji: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    onChange(value.substring(0, pos) + emoji + value.substring(pos));
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(pos + emoji.length, pos + emoji.length);
    }, 0);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label>Описание сделки *</Label>
        <span className={cn('text-xs', value.length > MAX_DESC ? 'text-destructive font-bold' : 'text-muted-foreground')}>
          {value.length}/{MAX_DESC}
        </span>
      </div>
      <div className="border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background">
        <div className="flex items-center gap-0.5 px-2 py-1.5 bg-muted/50 border-b border-border">
          <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => wrap('**', '**')} title="Жирный">
            <Bold className="w-3.5 h-3.5" />
          </Button>
          <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => wrap('*', '*')} title="Курсив">
            <Italic className="w-3.5 h-3.5" />
          </Button>
          <div className="w-px h-4 bg-border mx-1" />
          {['🔥', '⚡', '💰', '🎁', '✅'].map(e => (
            <Button key={e} type="button" variant="ghost" size="sm" className="h-7 w-7 p-0 text-sm" onClick={() => insertEmoji(e)}>
              {e}
            </Button>
          ))}
        </div>
        <Textarea
          ref={textareaRef}
          placeholder="Расскажите подробнее о сделке... Поддерживается **жирный** и *курсив*"
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[140px] rounded-none"
          value={value}
          onChange={e => onChange(e.target.value.slice(0, MAX_DESC))}
        />
      </div>
    </div>
  );
};

// ─── Tag Input ─────────────────────────────────────────────
const TagInput = ({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) => {
  const [input, setInput] = useState('');

  const add = () => {
    const tag = input.trim().toLowerCase();
    if (tag && !tags.includes(tag) && tags.length < 5) {
      onChange([...tags, tag]);
      setInput('');
    }
  };

  return (
    <div className="space-y-1.5">
      <Label>Теги (до 5)</Label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map(tag => (
          <Badge key={tag} variant="secondary" className="gap-1 text-xs pr-1">
            #{tag}
            <button type="button" onClick={() => onChange(tags.filter(t => t !== tag))} className="ml-0.5 hover:text-destructive">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Добавить тег..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          className="flex-1"
        />
        <Button type="button" variant="outline" size="sm" onClick={add} disabled={!input.trim() || tags.length >= 5}>
          <Tag className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};

// ─── Live Preview Card ─────────────────────────────────────
const LivePreview = ({ form }: { form: FormData }) => {
  const { formatPrice } = useLocalization();
  const discount = form.originalPrice && form.dealPrice
    ? Math.round((1 - parseFloat(form.dealPrice) / parseFloat(form.originalPrice)) * 100)
    : null;

  return (
    <div className="bg-card rounded-xl border overflow-hidden">
      <div className="px-4 py-2.5 border-b border-border bg-muted/30">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">👁️ Предпросмотр</p>
      </div>
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative sm:w-44 shrink-0">
          <AspectRatio ratio={16 / 9} className="sm:h-full">
            {form.imageUrl ? (
              <img src={form.imageUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
              </div>
            )}
          </AspectRatio>
          {form.store && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-0 text-[10px]">{form.store}</Badge>
            </div>
          )}
          {form.dealType === 'pricebug' && (
            <div className="absolute top-2 left-2">
              <Badge variant="outline" className="bg-background/90 border-destructive text-destructive text-[10px] font-bold">🐛 Price Bug</Badge>
            </div>
          )}
          {form.dealType === 'offline' && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-deal-success text-primary-foreground border-0 text-[10px]"><Store className="w-3 h-3 mr-0.5" /> Офлайн</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-3 min-w-0">
          <div className="flex items-start gap-2">
            <div className="flex flex-col items-center gap-0.5 shrink-0">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">🔥</div>
              <div className="px-1.5 py-0.5 rounded-full bg-gradient-to-r from-gray-500 to-gray-300 text-white text-[10px] font-bold">+0°</div>
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">❄️</div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-snug line-clamp-2 text-foreground">
                {form.title || 'Название сделки'}
              </p>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {form.description || 'Описание сделки появится здесь...'}
              </p>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-base font-bold text-deal-success">
                  {form.dealPrice ? formatPrice(parseFloat(form.dealPrice), 'USD') : '—'}
                </span>
                {form.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(parseFloat(form.originalPrice), 'USD')}
                  </span>
                )}
                {discount && discount > 0 && discount <= 100 && (
                  <Badge className="bg-deal-success text-primary-foreground border-0 text-[10px] font-bold">-{discount}%</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <Avatar className="h-4 w-4">
                <AvatarFallback className="text-[8px] bg-muted">Я</AvatarFallback>
              </Avatar>
              <span>Вы</span>
              <Clock className="w-2.5 h-2.5" />
              <span>Только что</span>
              {form.category && (
                <Badge variant="secondary" className="text-[8px] px-1 py-0 h-3.5">
                  <Tag className="w-2 h-2 mr-0.5" />{form.category}
                </Badge>
              )}
              {form.dealType === 'offline' && form.storeAddress && (
                <>
                  <MapPin className="w-2.5 h-2.5 text-deal-success" />
                  <span className="truncate max-w-[80px]">{form.storeAddress}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">0</span>
              <Share2 className="w-3 h-3 text-muted-foreground ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────
const SubmitDeal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { region } = useLocalization();
  const cities = region === 'kz' ? offlineCitiesKz : offlineCitiesRu;

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [fetching, setFetching] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const update = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  // Auto-fetch simulation on URL paste
  useEffect(() => {
    if (!form.url || form.url.length < 10 || !form.url.startsWith('http')) return;
    const timer = setTimeout(() => {
      if (form.title) return; // don't overwrite
      setFetching(true);
      setTimeout(() => {
        // Simulated fetch
        try {
          const host = new URL(form.url).hostname.replace('www.', '');
          const storeName = storeOptions.find(s => host.includes(s.toLowerCase().replace('.', ''))) || host;
          update('store', storeName);
          update('imageUrl', `https://placehold.co/400x300/e9e9e9/999?text=${encodeURIComponent(storeName)}`);
          if (!form.title) {
            update('title', `Выгодное предложение на ${storeName}`);
          }
        } catch {}
        setFetching(false);
      }, 1200);
    }, 800);
    return () => clearTimeout(timer);
  }, [form.url]);

  const discount = useMemo(() => {
    if (!form.originalPrice || !form.dealPrice) return null;
    const d = Math.round((1 - parseFloat(form.dealPrice) / parseFloat(form.originalPrice)) * 100);
    return d > 0 && d <= 100 ? d : null;
  }, [form.originalPrice, form.dealPrice]);

  const canProceed = useMemo(() => {
    if (step === 1) return !!(form.title && form.url && form.dealPrice);
    if (step === 2) return !!(form.description && form.category);
    return true;
  }, [step, form]);

  const canSubmit = useMemo(() => {
    const base = !!(form.title && form.url && form.dealPrice && form.description && form.category);
    if (form.dealType === 'offline') return base && !!(form.city && form.storeAddress);
    return base;
  }, [form]);

  const handleSubmit = () => {
    toast({
      title: '🎉 Сделка отправлена!',
      description: 'Ваша сделка успешно отправлена и находится на модерации',
    });
    setTimeout(() => navigate('/'), 1000);
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Simulate image upload
    update('imageUrl', 'https://placehold.co/400x300/e9e9e9/999?text=Uploaded+Image');
    toast({ title: '📷 Изображение загружено' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hide header on mobile for fullscreen feel */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile: sticky top bar */}
      <div className="md:hidden sticky top-0 z-40 gradient-primary px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-primary-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-base font-bold text-primary-foreground">Добавить сделку</h1>
        <div className="w-5" />
      </div>

      <main className="flex-1 container mx-auto px-4 py-4 md:py-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-extrabold text-foreground mb-2 hidden md:block">Добавить сделку</h1>
          <p className="text-sm text-muted-foreground mb-4 md:mb-6 hidden md:block">Поделитесь выгодным предложением с сообществом</p>

          <ProgressBar step={step} />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* ─── Form Panel ─────────────────── */}
            <div className="flex-1 min-w-0">
              <div className="bg-card rounded-xl border overflow-hidden">

                  {/* Step 1: Основное */}
                  {step === 1 && (
                    <>
                      <div className="space-y-1.5">
                        <Label>Ссылка на сделку *</Label>
                        <div className="relative">
                          <Input
                            placeholder="https://ozon.ru/product/..."
                            value={form.url}
                            onChange={e => update('url', e.target.value)}
                          />
                          {fetching && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            </div>
                          )}
                        </div>
                        {fetching && (
                          <p className="text-xs text-primary flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" /> Получаем информацию...
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label>Название сделки *</Label>
                        <Input
                          placeholder="Введите заголовок сделки"
                          value={form.title}
                          onChange={e => update('title', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label>Обычная цена</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={form.originalPrice}
                            onChange={e => update('originalPrice', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <Label>Цена со скидкой *</Label>
                            {discount && (
                              <Badge className="bg-deal-success text-primary-foreground border-0 text-xs font-bold">
                                -{discount}%
                              </Badge>
                            )}
                          </div>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={form.dealPrice}
                            onChange={e => update('dealPrice', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label>Магазин</Label>
                        <Select value={form.store} onValueChange={v => update('store', v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите магазин" />
                          </SelectTrigger>
                          <SelectContent>
                            {storeOptions.map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {/* Step 2: Детали */}
                  {step === 2 && (
                    <>
                      <DescriptionEditor
                        value={form.description}
                        onChange={v => update('description', v)}
                      />

                      {/* Image upload */}
                      <div className="space-y-1.5">
                        <Label>Изображение</Label>
                        <div
                          className={cn(
                            'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
                            dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
                            form.imageUrl && 'p-2'
                          )}
                          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={handleImageDrop}
                          onClick={() => {
                            if (!form.imageUrl) {
                              update('imageUrl', 'https://placehold.co/400x300/e9e9e9/999?text=User+Image');
                              toast({ title: '📷 Изображение загружено' });
                            }
                          }}
                        >
                          {form.imageUrl ? (
                            <div className="relative">
                              <img src={form.imageUrl} alt="" className="rounded-lg max-h-48 mx-auto object-contain" />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2 h-7 w-7 p-0"
                                onClick={e => { e.stopPropagation(); update('imageUrl', ''); }}
                              >
                                <X className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">Перетащите или нажмите для загрузки</p>
                              <p className="text-xs text-muted-foreground mt-1">PNG, JPG до 5MB</p>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label>Категория *</Label>
                        <Select value={form.category} onValueChange={v => update('category', v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.filter(c => c.id !== 'all').map(c => (
                              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <TagInput tags={form.tags} onChange={t => update('tags', t)} />
                    </>
                  )}

                  {/* Step 3: Тип */}
                  {step === 3 && (
                    <>
                      <div className="space-y-2">
                        <Label>Тип сделки</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {([
                            { value: 'online' as DealType, label: 'Онлайн', icon: Wifi, color: 'gradient-primary text-primary-foreground' },
                            { value: 'offline' as DealType, label: 'Офлайн', icon: Store, color: 'bg-deal-success text-primary-foreground' },
                            { value: 'pricebug' as DealType, label: 'Баг цены', icon: Bug, color: 'bg-destructive text-destructive-foreground' },
                          ]).map(opt => (
                            <Button
                              key={opt.value}
                              type="button"
                              variant={form.dealType === opt.value ? 'default' : 'outline'}
                              className={cn(
                                'h-14 flex-col gap-1',
                                form.dealType === opt.value && opt.color
                              )}
                              onClick={() => update('dealType', opt.value)}
                            >
                              <opt.icon className="w-5 h-5" />
                              <span className="text-xs">{opt.label}</span>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {form.dealType === 'offline' && (
                        <div className="space-y-4 p-4 rounded-lg bg-deal-success/5 border border-deal-success/20">
                          <div className="flex items-center gap-2 text-sm font-medium text-deal-success">
                            <Store className="w-4 h-4" /> Детали офлайн-сделки
                          </div>
                          <div className="space-y-1.5">
                            <Label>Город *</Label>
                            <Select value={form.city} onValueChange={v => update('city', v)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите город" />
                              </SelectTrigger>
                              <SelectContent>
                                {cities.map(c => (
                                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1.5">
                            <Label>Адрес магазина *</Label>
                            <Input
                              placeholder="ул. Примерная, 10"
                              value={form.storeAddress}
                              onChange={e => update('storeAddress', e.target.value)}
                            />
                          </div>
                        </div>
                      )}

                      {form.dealType === 'pricebug' && (
                        <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                          <p className="text-xs text-destructive font-medium flex items-center gap-2">
                            <Bug className="w-4 h-4 shrink-0" />
                            Баги цен исчезают очень быстро! Укажите дату истечения.
                          </p>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <Label>Дата истечения</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !form.expiryDate && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              {form.expiryDate ? format(form.expiryDate, 'dd.MM.yyyy') : 'Выберите дату'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={form.expiryDate}
                              onSelect={d => update('expiryDate', d)}
                              disabled={date => date < new Date()}
                              initialFocus
                              className={cn('p-3 pointer-events-auto')}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </>
                  )}
                </div>

                {/* Navigation buttons */}
                <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/30">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(s => Math.max(1, s - 1))}
                    disabled={step === 1}
                    className="gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Назад
                  </Button>

                  {step < 3 ? (
                    <Button
                      type="button"
                      className="gradient-primary text-primary-foreground gap-1"
                      onClick={() => setStep(s => Math.min(3, s + 1))}
                      disabled={!canProceed}
                    >
                      Далее <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="gradient-primary text-primary-foreground gap-1 font-bold"
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                    >
                      <Send className="w-4 h-4" /> Отправить сделку
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* ─── Live Preview Panel ─────────── */}
            <div className="lg:w-80 shrink-0">
              <div className="sticky top-20 space-y-3">
                <LivePreview form={form} />

                {/* Quick tips */}
                <div className="bg-card rounded-xl border p-4 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">💡 Советы</p>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-deal-success mt-0.5 shrink-0" />
                      Укажите точную цену со скидкой
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-deal-success mt-0.5 shrink-0" />
                      Добавьте скриншот или изображение товара
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-deal-success mt-0.5 shrink-0" />
                      Подробно опишите условия и ограничения
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-deal-success mt-0.5 shrink-0" />
                      Используйте теги для лучшего поиска
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubmitDeal;
