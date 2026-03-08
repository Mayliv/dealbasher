import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Send, Check, Users, Flame, Zap, Tag, MessageCircle, ExternalLink } from 'lucide-react';

const DIGEST_OPTIONS = [
  {
    id: 'hot',
    icon: '🔥',
    title: 'Горячее за день',
    description: 'Топ-5 лучших сделок ежедневно в 10:00',
    frequency: 'Каждый день',
    color: 'from-orange-500 to-red-500',
    bgLight: 'bg-orange-50 dark:bg-orange-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800',
  },
  {
    id: 'bugs',
    icon: '⚡',
    title: 'Баги цен',
    description: 'Мгновенное уведомление при появлении нового бага цены',
    frequency: 'Мгновенно',
    color: 'from-yellow-400 to-amber-500',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
  {
    id: 'category',
    icon: '🏷️',
    title: 'Моя категория',
    description: 'Только интересные вам категории: электроника, мода и др.',
    frequency: 'По мере появления',
    color: 'from-blue-500 to-indigo-500',
    bgLight: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
];

const CATEGORIES = ['Электроника', 'Мода и одежда', 'Дом и сад', 'Игры', 'Красота и здоровье', 'Спорт', 'Авто', 'Еда и рестораны', 'Детям', 'Путешествия'];

const MOCK_MESSAGES = [
  { time: '10:00', text: '🔥 Горячее за день — 15 марта', bold: true },
  { time: '', text: '' },
  { time: '', text: '1️⃣ AirPods Pro 2 — 8 990₽ (было 19 990₽)', link: true },
  { time: '', text: '🏪 Wildberries · -55% · 🌡️ +342°' },
  { time: '', text: '' },
  { time: '', text: '2️⃣ Nike Air Max 90 — 4 200₽ (было 12 990₽)', link: true },
  { time: '', text: '🏪 Lamoda · -68% · 🌡️ +289°' },
  { time: '', text: '' },
  { time: '', text: '3️⃣ Dyson V8 — 15 900₽ (было 34 990₽)', link: true },
  { time: '', text: '🏪 Ozon · -55% · 🌡️ +256°' },
  { time: '', text: '' },
  { time: '', text: '👉 Все сделки на DealBasher.ru', link: true },
];

const DigestPage = () => {
  const { toast } = useToast();
  const [emails, setEmails] = useState<Record<string, string>>({});
  const [subscribed, setSubscribed] = useState<Record<string, boolean>>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleTelegram = (id: string) => {
    setSubscribed(prev => ({ ...prev, [id]: true }));
    toast({
      title: '✅ Подписка оформлена!',
      description: 'Бот @DealBasherBot отправит вам первый дайджест уже сегодня',
    });
  };

  const handleEmail = (id: string) => {
    const email = emails[id];
    if (!email || !email.includes('@')) {
      toast({ title: 'Введите корректный email', variant: 'destructive' });
      return;
    }
    setSubscribed(prev => ({ ...prev, [id]: true }));
    toast({
      title: '📬 Подписка оформлена!',
      description: `Дайджест будет приходить на ${email}`,
    });
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            📬 Лучшие скидки — прямо в Telegram
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Выберите формат дайджеста и получайте только нужные предложения. Никакого спама.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Уже 12 400 охотников за скидками подписаны
            </span>
          </div>
        </div>

        {/* Digest Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {DIGEST_OPTIONS.map(opt => (
            <Card
              key={opt.id}
              className={`relative overflow-hidden transition-all hover:shadow-lg ${opt.borderColor} ${opt.bgLight}`}
            >
              <div className={`h-1.5 bg-gradient-to-r ${opt.color}`} />
              <CardContent className="p-5 space-y-4">
                <div>
                  <span className="text-3xl">{opt.icon}</span>
                  <h2 className="text-lg font-bold text-foreground mt-2">{opt.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {opt.frequency}
                  </Badge>
                </div>

                {opt.id === 'category' && (
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map(cat => (
                      <Badge
                        key={cat}
                        variant={selectedCategories.includes(cat) ? 'default' : 'outline'}
                        className="cursor-pointer text-xs transition-colors"
                        onClick={() => toggleCategory(cat)}
                      >
                        {selectedCategories.includes(cat) && <Check className="w-3 h-3 mr-0.5" />}
                        {cat}
                      </Badge>
                    ))}
                  </div>
                )}

                {subscribed[opt.id] ? (
                  <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 rounded-lg p-3">
                    <Check className="w-4 h-4" />
                    Подписка оформлена!
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white"
                      onClick={() => handleTelegram(opt.id)}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Подписаться в Telegram
                    </Button>
                    <div className="flex gap-1.5">
                      <Input
                        type="email"
                        placeholder="или ваш email"
                        className="text-sm h-9"
                        value={emails[opt.id] || ''}
                        onChange={e => setEmails(prev => ({ ...prev, [opt.id]: e.target.value }))}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-3 shrink-0"
                        onClick={() => handleEmail(opt.id)}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mock Telegram Preview */}
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold text-foreground text-center mb-4">
            Так выглядит дайджест в Telegram 👇
          </h2>
          <div className="bg-[#1b2836] rounded-2xl p-4 shadow-2xl border border-white/5">
            {/* Chat header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-destructive flex items-center justify-center text-white font-bold text-sm">
                DB
              </div>
              <div>
                <p className="text-white font-semibold text-sm">DealBasher Bot</p>
                <p className="text-[11px] text-gray-400">бот · онлайн</p>
              </div>
            </div>
            {/* Messages */}
            <div className="space-y-0.5">
              {MOCK_MESSAGES.map((msg, i) => {
                if (!msg.text) return <div key={i} className="h-1.5" />;
                return (
                  <div key={i} className="flex">
                    <div
                      className={`rounded-lg px-3 py-1 max-w-[85%] ${
                        msg.bold
                          ? 'bg-[#2b5278] text-white font-semibold text-sm'
                          : msg.link
                          ? 'bg-[#1e3a52] text-[#6ab3f3] text-sm cursor-pointer hover:underline'
                          : 'bg-[#1e3a52] text-gray-300 text-xs'
                      }`}
                    >
                      {msg.text}
                      {msg.link && <ExternalLink className="w-3 h-3 inline ml-1 opacity-50" />}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-gray-500 mt-3 text-right">10:00</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DigestPage;
