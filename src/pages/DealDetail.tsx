
import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import Footer from '@/components/Footer';
import { deals, Deal } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ExternalLink,
  Share2,
  Flag,
  ArrowLeft,
  Clock,
  Copy,
  Send,
  ChevronRight,
  Reply,
  Bell,
  BellOff,
  TrendingDown,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from 'recharts';
import DealCard from '@/components/DealCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { isDealOfTheDay, wasDealOfTheDay } from '@/components/DealOfTheDay';
import { addTrackedDeal, isTracked, removeTrackedDeal } from '@/pages/TrackingPage';

// ─── Temperature color helper ──────────────────────────────────
const getTemperatureStyle = (temp: number) => {
  if (temp < 0) return { gradient: 'from-blue-600 to-blue-400', text: 'text-blue-500' };
  if (temp <= 50) return { gradient: 'from-gray-500 to-gray-300', text: 'text-muted-foreground' };
  if (temp <= 200) return { gradient: 'from-orange-600 to-orange-400', text: 'text-orange-500' };
  return { gradient: 'from-red-700 to-red-500', text: 'text-destructive' };
};

// ─── Mock price history ────────────────────────────────────────
const generatePriceHistory = (deal: Deal) => {
  const points = 12;
  const data = [];
  const basePrice = deal.originalPrice || deal.dealPrice * 1.3;
  for (let i = 0; i < points; i++) {
    const daysAgo = points - 1 - i;
    const label = daysAgo === 0 ? 'Сегодня' : `${daysAgo}д`;
    const variance = Math.random() * 0.15;
    const price =
      i === points - 1
        ? deal.dealPrice
        : basePrice * (1 - variance * (i / points));
    data.push({ date: label, price: Math.round(price * 100) / 100 });
  }
  return data;
};

// ─── Mock comments ─────────────────────────────────────────────
interface Comment {
  id: number;
  author: string;
  avatarUrl?: string;
  text: string;
  postedAt: string;
  likes: number;
  replies?: Comment[];
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: 'bargain_hero',
    text: 'Отличная сделка! Уже заказал, доставка через 2 дня.',
    postedAt: '3 часа назад',
    likes: 12,
    replies: [
      {
        id: 11,
        author: 'wise_shopper',
        text: 'Подтверждаю, тоже получил — качество отличное!',
        postedAt: '2 часа назад',
        likes: 5,
      },
      {
        id: 12,
        author: 'newbie2024',
        text: 'А как долго доставка в регионы?',
        postedAt: '1 час назад',
        likes: 1,
      },
    ],
  },
  {
    id: 2,
    author: 'price_checker',
    text: 'Проверил историю цен — это реально самая низкая за последний год. Берите пока не подняли!',
    postedAt: '5 часов назад',
    likes: 24,
    replies: [
      {
        id: 21,
        author: 'skeptic_99',
        text: 'На другом маркетплейсе было дешевле на 5%, но сейчас уже нет.',
        postedAt: '4 часа назад',
        likes: 3,
      },
    ],
  },
  {
    id: 3,
    author: 'dealfinder42',
    text: 'Промокод SAVE10 дает ещё 10% сверху! Проверено лично.',
    postedAt: '1 день назад',
    likes: 38,
  },
];

// ─── Comment Component ─────────────────────────────────────────
const CommentItem = ({
  comment,
  depth = 0,
}: {
  comment: Comment;
  depth?: number;
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <div className={`${depth > 0 ? 'ml-8 border-l-2 border-border pl-4' : ''}`}>
      <div className="py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Avatar className="h-6 w-6">
            <AvatarImage src={comment.avatarUrl} />
            <AvatarFallback className="text-[10px] bg-muted">
              {comment.author.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">{comment.author}</span>
          <span className="text-xs text-muted-foreground">{comment.postedAt}</span>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">{comment.text}</p>
        <div className="flex items-center gap-3 mt-2">
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ThumbsUp className="w-3 h-3" /> {comment.likes}
          </button>
          {depth < 1 && (
            <button
              onClick={() => setShowReplyBox(!showReplyBox)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Reply className="w-3 h-3" /> Ответить
            </button>
          )}
        </div>
        {showReplyBox && (
          <div className="mt-2 flex gap-2">
            <Textarea placeholder="Напишите ответ..." className="min-h-[60px] text-sm" />
            <Button size="sm" className="gradient-primary text-primary-foreground self-end">
              <Send className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────
const DealDetail = () => {
  const { dealId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formatPrice } = useLocalization();
  const { user } = useAuth();

  const deal = deals.find((d) => d.id === parseInt(dealId || '0'));

  const priceHistory = useMemo(() => (deal ? generatePriceHistory(deal) : []), [deal]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [temperature, setTemperature] = useState(deal?.temperature || 0);

  const similarDeals = useMemo(
    () =>
      deal
        ? deals
            .filter((d) => d.category === deal.category && d.id !== deal.id)
            .slice(0, 8)
        : [],
    [deal]
  );

  // Thumbnail images (mock — repeat deal image with slight variation text)
  const images = deal
    ? [
        deal.imageUrl,
        deal.imageUrl.replace('400x300', '400x301'),
        deal.imageUrl.replace('400x300', '401x300'),
      ]
    : [];

  if (!deal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Сделка не найдена</h1>
        <Button onClick={() => navigate('/')} variant="outline">
          Вернуться на главную
        </Button>
      </div>
    );
  }

  const tempStyle = getTemperatureStyle(temperature);

  const handleVote = (type: 'up' | 'down') => {
    setTemperature((prev) => (type === 'up' ? prev + 1 : prev - 1));
    toast({
      title: type === 'up' ? '🔥 Голос засчитан!' : '❄️ Голос засчитан!',
      description: type === 'up' ? 'Вы повысили температуру сделки' : 'Вы понизили температуру сделки',
    });
  };

  const handleShare = (platform: 'telegram' | 'vk' | 'copy') => {
    const url = window.location.href;
    const text = `${deal.title} — ${formatPrice(deal.dealPrice, 'USD')}`;
    switch (platform) {
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'vk':
        window.open(`https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({ title: 'Ссылка скопирована', description: 'Ссылка скопирована в буфер обмена' });
        break;
    }
  };

  const handleReport = () => {
    toast({
      title: '🚩 Жалоба отправлена',
      description: 'Мы проверим актуальность этой сделки',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CategoryBar />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/category/${deal.category}`} className="hover:text-foreground transition-colors capitalize">{deal.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate max-w-[200px]">{deal.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ─── Main Content ─────────────────── */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Deal header card */}
            <div className="bg-card rounded-xl border overflow-hidden">
              {/* Title bar */}
              <div className="p-5 border-b border-border">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h1 className="text-xl font-bold text-foreground leading-tight">{deal.title}</h1>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">{deal.store}</Badge>
                      {isDealOfTheDay(deal.id, deals) && (
                        <Badge className="bg-yellow-500 text-white border-0 text-xs font-bold">
                          👑 Сделка дня
                        </Badge>
                      )}
                      {wasDealOfTheDay(deal.id, deals) && !isDealOfTheDay(deal.id, deals) && (
                        <Badge variant="outline" className="border-yellow-400 text-yellow-600 dark:text-yellow-400 text-xs font-bold">
                          👑 Была сделкой дня
                        </Badge>
                      )}
                      {deal.isPriceBug && (
                        <Badge variant="outline" className="border-destructive text-destructive text-xs font-bold">
                          🐛 Price Bug
                        </Badge>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {deal.postedAt}
                      </div>
                    </div>
                  </div>

                  {/* Temperature widget */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full border-deal-success text-deal-success hover:bg-deal-success hover:text-primary-foreground"
                      onClick={() => handleVote('up')}
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                    <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r ${tempStyle.gradient} text-white text-sm font-bold shadow-md`}>
                      🔥 {temperature > 0 ? '+' : ''}{temperature}°
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white"
                      onClick={() => handleVote('down')}
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Image gallery + Description */}
              <div className="p-5">
                <div className="flex flex-col md:flex-row gap-5">
                  {/* Image gallery */}
                  <div className="md:w-1/2 space-y-3">
                    <div className="rounded-lg overflow-hidden bg-muted aspect-[16/10]">
                      <img
                        src={images[selectedImage]}
                        alt={deal.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex gap-2">
                      {images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={`w-16 h-12 rounded-md overflow-hidden border-2 transition-colors ${
                            selectedImage === i ? 'border-primary' : 'border-border hover:border-muted-foreground'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description + Price */}
                  <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {deal.description}
                      </p>

                      {/* Price block */}
                      <div className="mt-5 p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-extrabold text-deal-success">
                            {formatPrice(deal.dealPrice, 'USD')}
                          </span>
                          {deal.originalPrice && (
                            <span className="text-lg text-muted-foreground line-through">
                              {formatPrice(deal.originalPrice, 'USD')}
                            </span>
                          )}
                        </div>
                        {deal.discount && (
                          <Badge className="mt-2 bg-deal-success text-primary-foreground border-0 text-sm font-bold">
                            Скидка {deal.discount}%
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button
                      className="mt-5 w-full h-12 text-base font-bold gradient-primary text-primary-foreground rounded-lg shadow-lg animate-pulse hover:animate-none hover:opacity-90 transition-opacity"
                      onClick={() => window.open(deal.url, '_blank')}
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Перейти к сделке
                    </Button>
                  </div>
                </div>
              </div>

              {/* Author & actions bar */}
              <div className="px-5 py-3 border-t border-border flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={deal.avatarUrl} />
                    <AvatarFallback className="text-[10px] bg-muted">
                      {deal.postedBy.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">{deal.postedBy}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-foreground" onClick={() => handleShare('telegram')}>
                    <Send className="w-3.5 h-3.5 mr-1" /> Telegram
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-foreground" onClick={() => handleShare('vk')}>
                    <Share2 className="w-3.5 h-3.5 mr-1" /> VK
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-foreground" onClick={() => handleShare('copy')}>
                    <Copy className="w-3.5 h-3.5 mr-1" /> Копировать
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-destructive hover:text-destructive" onClick={handleReport}>
                    <Flag className="w-3.5 h-3.5 mr-1" /> Истёк
                  </Button>
                </div>
              </div>
            </div>

            {/* ─── Price History Chart ──────────── */}
            <div className="bg-card rounded-xl border p-5">
              <h2 className="text-lg font-semibold text-foreground mb-4">📈 История цен</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                      activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ─── Comments ─────────────────────── */}
            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="p-5 border-b border-border flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold text-foreground">Комментарии ({deal.comments})</h2>
              </div>
              <div className="p-5">
                {user ? (
                  <div className="flex gap-3 mb-6">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-muted text-xs">
                        {(user.user_metadata?.username || user.email || 'U').charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea placeholder="Напишите комментарий..." className="min-h-[80px]" />
                      <div className="flex justify-end">
                        <Button className="gradient-primary text-primary-foreground">
                          <Send className="w-4 h-4 mr-1" /> Отправить
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 mb-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-3">
                      Войдите, чтобы оставить комментарий
                    </p>
                    <Link to="/login">
                      <Button size="sm" className="gradient-primary text-primary-foreground">
                        Войти
                      </Button>
                    </Link>
                  </div>
                )}

                <div className="divide-y divide-border">
                  {mockComments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            </div>

            {/* ─── Similar Deals ────────────────── */}
            {similarDeals.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Похожие сделки</h2>
                <ScrollArea className="w-full">
                  <div className="flex gap-4 pb-4">
                    {similarDeals.map((d) => (
                      <div key={d.id} className="min-w-[320px] max-w-[360px] shrink-0">
                        <DealCard deal={d} />
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            )}
          </div>

          {/* ─── Sticky Sidebar (desktop) ─────── */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-20 space-y-4">
              {/* Deal summary card */}
              <div className="bg-card rounded-xl border p-5 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-deal-success">
                    {formatPrice(deal.dealPrice, 'USD')}
                  </span>
                  {deal.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(deal.originalPrice, 'USD')}
                    </span>
                  )}
                </div>
                {deal.discount && (
                  <Badge className="bg-deal-success text-primary-foreground border-0 font-bold">
                    -{deal.discount}%
                  </Badge>
                )}

                <div className="text-sm text-muted-foreground">
                  Магазин: <span className="text-foreground font-medium">{deal.store}</span>
                </div>

                {/* Temperature */}
                <div className="flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-deal-success text-deal-success hover:bg-deal-success hover:text-primary-foreground"
                    onClick={() => handleVote('up')}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" /> Hot
                  </Button>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${tempStyle.gradient} text-white text-sm font-bold`}>
                    🔥 {temperature > 0 ? '+' : ''}{temperature}°
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white"
                    onClick={() => handleVote('down')}
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" /> Cold
                  </Button>
                </div>

                <Button
                  className="w-full h-11 font-bold gradient-primary text-primary-foreground rounded-lg shadow-lg animate-pulse hover:animate-none hover:opacity-90"
                  onClick={() => window.open(deal.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Перейти к сделке
                </Button>

                {/* Share buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => handleShare('telegram')}>
                    <Send className="w-3 h-3 mr-1" /> TG
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => handleShare('vk')}>
                    <Share2 className="w-3 h-3 mr-1" /> VK
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => handleShare('copy')}>
                    <Copy className="w-3 h-3 mr-1" /> Копия
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-destructive hover:text-destructive"
                  onClick={handleReport}
                >
                  <Flag className="w-3 h-3 mr-1" /> Сообщить что сделка истекла
                </Button>
              </div>

              {/* Posted by */}
              <div className="bg-card rounded-xl border p-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={deal.avatarUrl} />
                    <AvatarFallback className="text-xs bg-muted">
                      {deal.postedBy.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{deal.postedBy}</p>
                    <p className="text-xs text-muted-foreground">{deal.postedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DealDetail;
