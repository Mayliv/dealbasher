
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { categories, deals } from '@/utils/data';
import { usePageSEO } from '@/hooks/usePageSEO';
import { ChevronRight, Map } from 'lucide-react';

const SitemapPage = () => {
  usePageSEO({
    title: 'Карта сайта | DealBasher',
    description: 'Полная карта сайта DealBasher — все страницы, категории и разделы',
    canonical: `${window.location.origin}/sitemap`,
  });

  const selectableCategories = categories.filter(c => c.id !== 'all');
  const recentDeals = deals.slice(0, 20);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl font-extrabold text-foreground mb-6 flex items-center gap-2">
          <Map className="w-6 h-6 text-primary" />
          Карта сайта
        </h1>

        <div className="space-y-8">
          {/* Main pages */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">Основные страницы</h2>
            <ul className="space-y-1.5">
              {[
                { path: '/', name: 'Главная' },
                { path: '/categories', name: 'Все категории' },
                { path: '/promocodes', name: 'Промокоды' },
                { path: '/bugs', name: 'Баги цен' },
                { path: '/discussions', name: 'Обсуждения' },
                { path: '/leaderboard', name: 'Таблица лидеров' },
                { path: '/challenges', name: 'Задания и достижения' },
                { path: '/digest', name: 'Дайджест подписки' },
                { path: '/tracking', name: 'Отслеживание цен' },
                { path: '/submit-deal', name: 'Добавить сделку' },
              ].map(p => (
                <li key={p.path}>
                  <Link to={p.path} className="text-sm text-primary hover:underline flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" />{p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Categories */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">Категории</h2>
            <ul className="grid grid-cols-2 gap-1.5">
              {selectableCategories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.id}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" />{cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Recent deals */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">Последние сделки</h2>
            <ul className="space-y-1">
              {recentDeals.map(deal => (
                <li key={deal.id}>
                  <Link to={`/deal/${deal.id}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" />
                    <span className="truncate">{deal.title}</span>
                    <span className="text-muted-foreground text-xs ml-1">({deal.store})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Info pages */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">Информация</h2>
            <ul className="space-y-1.5">
              {[
                { path: '/how-it-works', name: 'Как это работает' },
                { path: '/guidelines', name: 'Правила публикации' },
                { path: '/faq', name: 'Вопросы и ответы' },
                { path: '/contact', name: 'Связаться с нами' },
                { path: '/privacy', name: 'Политика конфиденциальности' },
                { path: '/terms', name: 'Условия использования' },
              ].map(p => (
                <li key={p.path}>
                  <Link to={p.path} className="text-sm text-primary hover:underline flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" />{p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SitemapPage;
