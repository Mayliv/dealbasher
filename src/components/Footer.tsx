
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">DealSeeker</h3>
            <p className="text-sm text-muted-foreground">
              Найдите лучшие скидки, акции и промокоды от интернет-магазинов, которыми делятся наши пользователи.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Категории</h3>
            <ul className="space-y-2">
              <li><Link to="/category/electronics" className="text-sm text-muted-foreground hover:text-deal-red">Электроника</Link></li>
              <li><Link to="/category/fashion" className="text-sm text-muted-foreground hover:text-deal-red">Мода</Link></li>
              <li><Link to="/category/home" className="text-sm text-muted-foreground hover:text-deal-red">Дом и сад</Link></li>
              <li><Link to="/category/gaming" className="text-sm text-muted-foreground hover:text-deal-red">Игры</Link></li>
              <li><Link to="/category/beauty" className="text-sm text-muted-foreground hover:text-deal-red">Красота</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Помощь</h3>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-deal-red">Как это работает</Link></li>
              <li><Link to="/guidelines" className="text-sm text-muted-foreground hover:text-deal-red">Правила публикации</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-deal-red">Связаться с нами</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-deal-red">Вопросы и ответы</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Присоединяйтесь</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Facebook</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Twitter</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Instagram</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Telegram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DealSeeker. Все права защищены.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-deal-red">Политика конфиденциальности</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-deal-red">Условия использования</Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-deal-red">Политика в отношении файлов cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
