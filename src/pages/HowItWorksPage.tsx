
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, Flame, Trophy, Bug, Globe, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Hero ──────────────────────────────────────────────────
const Hero = () => (
  <section className="relative overflow-hidden">
    <div
      className="absolute inset-0 animate-gradient-shift"
      style={{
        background: 'linear-gradient(135deg, #FF4B2B 0%, #FF416C 50%, #FF4B2B 100%)',
        backgroundSize: '200% 200%',
      }}
    />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvc3ZnPg==')] opacity-50" />
    <div className="relative container mx-auto px-4 py-20 sm:py-28 md:py-36 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 max-w-4xl mx-auto">
        Охоться за скидками вместе с сообществом
      </h1>
      <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
        DealBasher — это место где тысячи охотников за скидками делятся лучшими находками каждый день
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="bg-white text-[#FF416C] hover:bg-white/90 font-bold text-base px-8 shadow-xl">
          <Link to="/">Начать охоту <ArrowRight className="ml-2 h-5 w-5" /></Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-bold text-base px-8">
          <Link to="/submit-deal">Добавить сделку</Link>
        </Button>
      </div>
    </div>
  </section>
);

// ─── Steps ─────────────────────────────────────────────────
const steps = [
  {
    num: 1,
    icon: '🔍',
    title: 'Находи',
    description: 'Нашёл крутую скидку в интернете или офлайн-магазине? Или обнаружил баг цены на сайте? Делись с сообществом — это займёт 2 минуты',
    accent: 'from-blue-500 to-cyan-400',
  },
  {
    num: 2,
    icon: '🔥',
    title: 'Голосуй',
    description: 'Сообщество голосует за лучшие сделки. Чем горячее сделка — тем выше она в ленте. Холодные и устаревшие уходят вниз автоматически',
    accent: 'from-orange-500 to-red-500',
  },
  {
    num: 3,
    icon: '🏆',
    title: 'Побеждай',
    description: 'Лучшие охотники получают статусы, значки и попадают в лидерборд. Стань легендой сообщества!',
    accent: 'from-yellow-500 to-amber-500',
  },
];

const StepsSection = () => (
  <section className="py-20 sm:py-28 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-foreground mb-4">
        Как это работает
      </h2>
      <p className="text-center text-muted-foreground mb-14 max-w-xl mx-auto">
        Три простых шага, чтобы стать частью крупнейшего сообщества охотников за скидками
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {steps.map((step) => (
          <div key={step.num} className="relative group">
            <div className="bg-card border rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
              {/* Number badge */}
              <div className={cn(
                'w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform',
                step.accent
              )}>
                <span className="text-2xl">{step.icon}</span>
              </div>
              <div className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">
                Шаг {step.num}
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
            {/* Connector arrow on desktop */}
            {step.num < 3 && (
              <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                <ChevronRight className="h-8 w-8 text-muted-foreground/30" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Temperature System ────────────────────────────────────
const tempLevels = [
  { icon: '❄️', label: 'Холодная', range: 'ниже 0°', desc: 'Сделка не понравилась сообществу', color: 'bg-blue-500', width: '15%', textColor: 'text-blue-500' },
  { icon: '⬜', label: 'Новая', range: '0–50°', desc: 'Только добавлена, ещё оценивается', color: 'bg-muted-foreground', width: '35%', textColor: 'text-muted-foreground' },
  { icon: '🔶', label: 'Тёплая', range: '50–200°', desc: 'Хорошая сделка, рекомендуем', color: 'bg-orange-500', width: '65%', textColor: 'text-orange-500' },
  { icon: '🔥', label: 'Горячая', range: '200+°', desc: 'Бомба! Берите пока не закончилась', color: 'bg-red-500', width: '100%', textColor: 'text-red-600' },
];

const TemperatureSection = () => (
  <section className="py-20 sm:py-28 bg-muted/50">
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-foreground mb-4">
        🌡️ Система температуры
      </h2>
      <p className="text-center text-muted-foreground mb-14 max-w-xl mx-auto">
        Температура показывает насколько сделка популярна у сообщества
      </p>

      <div className="space-y-6">
        {tempLevels.map((level, i) => (
          <div key={i} className="bg-card border rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-3xl">{level.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn('font-bold text-lg', level.textColor)}>{level.label}</span>
                  <Badge variant="outline" className="text-xs">{level.range}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{level.desc}</p>
              </div>
            </div>
            {/* Visual bar */}
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-700', level.color)}
                style={{ width: level.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Price Bugs Block ──────────────────────────────────────
const PriceBugsSection = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRleHQgeD0iMTAiIHk9IjI1IiBmb250LXNpemU9IjIwIj7wn5CBPC90ZXh0Pjwvc3ZnPg==')]" />
    <div className="relative container mx-auto px-4 py-20 sm:py-28">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-5 py-2 mb-8">
          <Bug className="h-5 w-5 text-red-400" />
          <span className="text-red-300 font-bold text-sm">Эксклюзивная фича</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
          🐛 Баги цен — наша суперсила
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
          В отличие от других сайтов скидок, мы не запрещаем делиться багами цен. 
          Ошибка на сайте магазина — это не ваша проблема. 
          Нашёл iPhone за 100₽? Публикуй немедленно!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-red-500 hover:bg-red-600 text-white font-bold">
            <Link to="/bugs">Смотреть баги цен <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// ─── Regions Block ─────────────────────────────────────────
const RegionsSection = () => (
  <section className="py-20 sm:py-28 bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <Globe className="h-12 w-12 text-primary mx-auto mb-6" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-6">
          🇷🇺 Россия и 🇰🇿 Казахстан
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
          Мы работаем в двух странах. Переключай регион в шапке сайта. 
          Офлайн-скидки привязаны к твоему городу — находи выгоду рядом с домом
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
          <div className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <span className="text-4xl mb-3 block">🇷🇺</span>
            <h3 className="font-bold text-foreground text-lg mb-1">Россия</h3>
            <p className="text-sm text-muted-foreground">Ozon, Wildberries, М.Видео, DNS и другие</p>
            <p className="text-xs text-muted-foreground mt-2">Цены в ₽</p>
          </div>
          <div className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <span className="text-4xl mb-3 block">🇰🇿</span>
            <h3 className="font-bold text-foreground text-lg mb-1">Казахстан</h3>
            <p className="text-sm text-muted-foreground">Kaspi, Sulpak, Mechta, Wildberries KZ</p>
            <p className="text-xs text-muted-foreground mt-2">Цены в ₸</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── User Levels ───────────────────────────────────────────
const levels = [
  {
    icon: '🌱',
    title: 'Новичок',
    xp: '0 XP',
    perks: ['Публикация сделок', 'Голосование', 'Комментарии'],
    border: 'border-green-500/30',
    bg: 'bg-green-500/5',
  },
  {
    icon: '🔥',
    title: 'Охотник',
    xp: '500 XP',
    perks: ['Значок «Охотник»', 'Приоритет в ленте', 'Ранний доступ к багам'],
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/5',
  },
  {
    icon: '⚡',
    title: 'Снайпер',
    xp: '2 000 XP',
    perks: ['Значок «Снайпер»', 'Модерация комментариев', 'Эксклюзивные челленджи'],
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/5',
  },
  {
    icon: '💎',
    title: 'Легенда',
    xp: '10 000 XP',
    perks: ['Значок «Легенда»', 'Именной профиль', 'VIP-канал в сообществе', 'Влияние на правила'],
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/5',
  },
];

const LevelsSection = () => (
  <section className="py-20 sm:py-28 bg-muted/50">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-foreground mb-4">
        🎖️ Уровни пользователей
      </h2>
      <p className="text-center text-muted-foreground mb-14 max-w-xl mx-auto">
        Зарабатывай очки опыта за активность и открывай новые привилегии
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {levels.map((level, i) => (
          <div
            key={i}
            className={cn(
              'rounded-2xl border-2 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
              level.border, level.bg
            )}
          >
            <span className="text-5xl mb-4 block">{level.icon}</span>
            <h3 className="text-xl font-black text-foreground mb-1">{level.title}</h3>
            <Badge variant="secondary" className="mb-4 font-mono text-xs">{level.xp}</Badge>
            <ul className="text-sm text-muted-foreground space-y-1.5 text-left">
              {level.perks.map((perk, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Level progression arrow */}
      <div className="flex items-center justify-center gap-2 mt-10 text-muted-foreground">
        {levels.map((level, i) => (
          <React.Fragment key={i}>
            <span className="text-2xl">{level.icon}</span>
            {i < levels.length - 1 && <ArrowRight className="h-5 w-5" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

// ─── Bottom CTA ────────────────────────────────────────────
const BottomCTA = () => (
  <section className="py-20 sm:py-28 bg-background">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-6">
        Готов экономить? 🎯
      </h2>
      <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
        Присоединяйся к тысячам охотников за скидками. Это бесплатно и займёт пару секунд.
      </p>
      <Button asChild size="lg" className="gradient-primary text-primary-foreground font-bold text-lg px-10 py-6 shadow-xl hover:shadow-2xl transition-shadow">
        <Link to="/">Начать охоту <ArrowRight className="ml-2 h-5 w-5" /></Link>
      </Button>
    </div>
  </section>
);

// ─── Main Page ─────────────────────────────────────────────
const HowItWorksPage = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">
      <Hero />
      <StepsSection />
      <TemperatureSection />
      <PriceBugsSection />
      <RegionsSection />
      <LevelsSection />
      <BottomCTA />
    </main>
    <Footer />
  </div>
);

export default HowItWorksPage;
