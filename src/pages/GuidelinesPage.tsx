
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, XCircle, Pencil, Bug, Scale, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Hero ──────────────────────────────────────────────────
const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
    <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]" />
    <div className="relative container mx-auto px-4 py-16 sm:py-24 text-center">
      <Badge className="bg-white/10 text-white/80 border-white/20 mb-6 text-sm">📋 Гайд для участников</Badge>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
        Правила публикации
      </h1>
      <p className="text-lg text-gray-400 max-w-lg mx-auto">
        Соблюдай правила — и твои сделки будут жить долго
      </p>
    </div>
  </section>
);

// ─── What To Post ──────────────────────────────────────────
const goodItems = [
  'Скидки от 10% и выше на реальную цену',
  'Промокоды с подтверждённым сроком действия',
  'Баги цен — ошибочно низкая цена на сайте магазина (это законно!)',
  'Офлайн-акции в магазинах вашего города',
  'Бесплатные товары и услуги (freebies)',
  'Скидки для студентов, пенсионеров, именинников',
  'Кешбэк-акции и специальные предложения банков',
];

const WhatToPost = () => (
  <section className="py-16 sm:py-20 bg-background">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground">Что публиковать</h2>
      </div>
      <div className="grid gap-3">
        {goodItems.map((item, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-4 hover:border-green-500/40 transition-colors">
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span className="text-foreground">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── What Not To Post ──────────────────────────────────────
const badItems = [
  'Реклама и платные размещения — строго запрещено',
  'Дубликаты — проверяй поиском перед публикацией',
  'Неактуальные сделки — не публикуй истёкшие акции',
  'Реферальные ссылки без пометки',
  'Вводящие в заблуждение заголовки (кликбейт)',
  'Сделки без прямой ссылки на источник',
  'Оскорбления в комментариях',
];

const WhatNotToPost = () => (
  <section className="py-16 sm:py-20 bg-muted/50">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center">
          <XCircle className="h-6 w-6 text-red-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground">Что запрещено</h2>
      </div>
      <div className="grid gap-3">
        {badItems.map((item, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 hover:border-red-500/40 transition-colors">
            <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <span className="text-foreground">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Tips ──────────────────────────────────────────────────
const tips = [
  { title: 'Заголовок — конкретно и по делу', good: 'AirPods Pro 2 за 8 990₽ (-35%) на Wildberries', bad: 'Крутые наушники дёшево!!!' },
  { title: 'Укажи оригинальную цену', desc: 'Без неё непонятна выгода — сообщество не сможет оценить сделку' },
  { title: 'Добавь срок действия', desc: 'Если знаешь, когда заканчивается акция — укажи. Это спасёт людей от разочарования' },
  { title: 'Для офлайн-сделок укажи город', desc: 'Название магазина + адрес — чтобы другие могли найти' },
  { title: 'Фото — загрузи нормальное фото товара', desc: 'Не скриншот с водяным знаком. Чем качественнее фото — тем больше доверия' },
];

const TipsSection = () => (
  <section className="py-16 sm:py-20 bg-background">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Pencil className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground">Как написать хороший пост</h2>
      </div>
      <div className="space-y-4">
        {tips.map((tip, i) => (
          <div key={i} className="bg-card border rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground mb-1">{tip.title}</h3>
                {tip.good ? (
                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 shrink-0">Хорошо</Badge>
                      <span className="text-muted-foreground">{tip.good}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500/10 text-red-500 border-red-500/20 shrink-0">Плохо</Badge>
                      <span className="text-muted-foreground">{tip.bad}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">{tip.desc}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Price Bugs Rules ──────────────────────────────────────
const PriceBugsRules = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500" />
    <div className="relative container mx-auto px-4 py-16 sm:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Bug className="h-8 w-8 text-white" />
          <h2 className="text-2xl sm:text-3xl font-black text-white">Особые правила для багов цен</h2>
        </div>
        <div className="bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-white/90 leading-relaxed text-lg">
          <p>
            Баг цены — это ошибка магазина, а не мошенничество с вашей стороны. 
            Публикуй сразу — баги живут часы, иногда минуты!
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1">📸</span>
              <span>Обязательно приложи скриншот как доказательство</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">⏰</span>
              <span>Если баг закрыли — отметь сделку как истёкшую</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1">🔗</span>
              <span>Укажи прямую ссылку на страницу товара</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// ─── Moderation ────────────────────────────────────────────
const ModerationSection = () => (
  <section className="py-16 sm:py-20 bg-muted/50">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Scale className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground">Модерация</h2>
      </div>
      <div className="bg-card border rounded-xl p-6 space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Сообщество само модерирует контент через голосование. 
          Администраторы следят за грубыми нарушениями.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <span className="text-3xl block mb-2">🗳️</span>
            <p className="text-sm font-medium text-foreground">Голосование</p>
            <p className="text-xs text-muted-foreground mt-1">Сообщество решает что горячо</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <span className="text-3xl block mb-2">⚠️</span>
            <p className="text-sm font-medium text-foreground">3+ жалобы</p>
            <p className="text-xs text-muted-foreground mt-1">Сделка уходит на проверку</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <span className="text-3xl block mb-2">🚫</span>
            <p className="text-sm font-medium text-foreground">Систематические нарушения</p>
            <p className="text-xs text-muted-foreground mt-1">Бан аккаунта</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── CTA ───────────────────────────────────────────────────
const BottomCTA = () => (
  <section className="py-16 sm:py-20 bg-background">
    <div className="container mx-auto px-4 text-center">
      <Lightbulb className="h-10 w-10 text-primary mx-auto mb-4" />
      <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3">Готов?</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Теперь ты знаешь все правила. Самое время поделиться первой сделкой!
      </p>
      <Button asChild size="lg" className="gradient-primary text-primary-foreground font-bold text-base px-10 shadow-xl">
        <Link to="/submit-deal">Добавь свою первую сделку <ArrowRight className="ml-2 h-5 w-5" /></Link>
      </Button>
    </div>
  </section>
);

// ─── Main ──────────────────────────────────────────────────
const GuidelinesPage = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">
      <Hero />
      <WhatToPost />
      <WhatNotToPost />
      <TipsSection />
      <PriceBugsRules />
      <ModerationSection />
      <BottomCTA />
    </main>
    <Footer />
  </div>
);

export default GuidelinesPage;
