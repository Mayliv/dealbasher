
import React from 'react';
import { Link } from 'react-router-dom';
import dealbasherLogo from '@/assets/dealbasher-logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card mt-12 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/">
              <img src={dealbasherLogo} alt="DealBasher" className="h-8 w-auto max-w-[192px] object-contain mb-3" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Найдите лучшие скидки, акции и промокоды от интернет-магазинов, которыми делятся наши пользователи.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Категории</h3>
            <ul className="space-y-2">
              <li><Link to="/category/electronics" className="text-sm text-muted-foreground hover:text-primary">Электроника</Link></li>
              <li><Link to="/category/fashion" className="text-sm text-muted-foreground hover:text-primary">Мода</Link></li>
              <li><Link to="/category/home" className="text-sm text-muted-foreground hover:text-primary">Дом и сад</Link></li>
              <li><Link to="/category/gaming" className="text-sm text-muted-foreground hover:text-primary">Игры</Link></li>
              <li><Link to="/category/beauty" className="text-sm text-muted-foreground hover:text-primary">Красота</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Помощь</h3>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary">Как это работает</Link></li>
              <li><Link to="/guidelines" className="text-sm text-muted-foreground hover:text-primary">Правила публикации</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">Связаться с нами</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary">Вопросы и ответы</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Присоединяйтесь</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Facebook</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Twitter</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Instagram</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Telegram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DealBasher. Все права защищены.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Конфиденциальность</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Условия</Link>
            <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-primary">Карта сайта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
