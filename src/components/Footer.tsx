
import React from 'react';
import { Link } from 'react-router-dom';
import { Send, MessageCircle, Instagram } from 'lucide-react';
import dealbasherLogo from '@/assets/dealbasher-logo.png';
import { useLocalization } from '@/contexts/LocalizationContext';

const Footer: React.FC = () => {
  const { region, setRegion } = useLocalization();

  return (
    <footer className="mt-12 bg-[hsl(0,0%,10%)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <Link to="/">
              <img
                src={dealbasherLogo}
                alt="DealBasher"
                className="h-8 w-auto max-w-[192px] object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/60">Охотники за скидками 🔥</p>

            <div className="flex items-center gap-2 text-xs text-white/50">
              <span>🇷🇺 Россия</span>
              <span>·</span>
              <span>🇰🇿 Казахстан</span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title="Telegram">
                <Send className="w-4 h-4 text-white/80" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title="VK">
                <MessageCircle className="w-4 h-4 text-white/80" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title="Instagram">
                <Instagram className="w-4 h-4 text-white/80" />
              </a>
            </div>

            <p className="text-xs text-white/40">12 400+ охотников уже с нами</p>
          </div>

          {/* Column 2 — Навигация */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">Навигация</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Главная' },
                { to: '/?sort=hot', label: 'Горячее' },
                { to: '/bugs', label: 'Баги цен' },
                { to: '/promocodes', label: 'Промокоды' },
                { to: '/leaderboard', label: 'Лидерборд' },
                { to: '/submit', label: 'Добавить сделку' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Помощь */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">Помощь</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/how-it-works', label: 'Как это работает' },
                { to: '/guidelines', label: 'Правила публикации' },
                { to: '/faq', label: 'Вопросы и ответы' },
                { to: '/contact', label: 'Связаться с нами' },
                { to: '/contact', label: 'Сообщить об ошибке' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Партнёрам */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">Партнёрам</h3>
            <ul className="space-y-2.5">
              {[
                'Реклама на сайте (нативная)',
                'Верификация магазина',
                'API для магазинов',
                'Программа амбассадоров',
              ].map(label => (
                <li key={label}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} DealBasher. Все права защищены.
          </p>

          {/* Region switcher */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setRegion('ru')}
              className={`px-2 py-1 rounded transition-colors ${region === 'ru' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'}`}
            >
              🇷🇺 RU
            </button>
            <span className="text-white/20">·</span>
            <button
              onClick={() => setRegion('kz')}
              className={`px-2 py-1 rounded transition-colors ${region === 'kz' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'}`}
            >
              🇰🇿 KZ
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link to="/privacy" className="hover:text-white/70 transition-colors">Конфиденциальность</Link>
            <span className="text-white/20">·</span>
            <Link to="/terms" className="hover:text-white/70 transition-colors">Условия использования</Link>
            <span className="text-white/20">·</span>
            <Link to="/sitemap" className="hover:text-white/70 transition-colors">Карта сайта</Link>
          </div>
        </div>
      </div>

      {/* Legal note */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-3">
          <p className="text-[11px] text-white/25 text-center leading-relaxed">
            DealBasher является независимым агрегатором скидок. Мы можем получать комиссию по партнёрским ссылкам. Это не влияет на цену для покупателя.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
