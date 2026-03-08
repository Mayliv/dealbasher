import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Flame, Plus, Bug, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { to: '/', icon: Home, label: 'Главная', emoji: '🏠' },
  { to: '/deals', icon: Flame, label: 'Горячее', emoji: '🔥' },
  { to: '/submit-deal', icon: Plus, label: 'Добавить', emoji: '➕', isAction: true },
  { to: '/bugs', icon: Bug, label: 'Баги', emoji: '🐛' },
  { to: '/user/me', icon: User, label: 'Профиль', emoji: '👤' },
];

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border backdrop-blur-lg bg-card/95 safe-area-bottom">
      <div className="flex items-center justify-around h-14 px-1">
        {navItems.map(item => {
          const isActive = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to);

          if (item.isAction) {
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex flex-col items-center justify-center -mt-4"
              >
                <div className="h-11 w-11 rounded-full gradient-primary flex items-center justify-center shadow-lg">
                  <Plus className="h-5 w-5 text-primary-foreground" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <span className="text-lg leading-none">{item.emoji}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
