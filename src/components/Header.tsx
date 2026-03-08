
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, LogOut, Moon, Sun } from 'lucide-react';
import NotificationBell from './NotificationBell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/providers/ThemeProvider';
import LanguageSwitcher from './LanguageSwitcher';
import RegionSwitcher from './RegionSwitcher';
import LocationSelector from './LocationSelector';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, region } = useLocalization();
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      toast({
        title: "Поле поиска пусто",
        description: "Пожалуйста, введите поисковый запрос",
        variant: "destructive",
      });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <header className="sticky top-0 z-50 w-full gradient-primary backdrop-blur supports-[backdrop-filter]:bg-primary/80 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center gap-0.5">
              <span className="text-xl font-extrabold text-primary-foreground tracking-tight">Deal</span>
              <span className="text-xl">⚡</span>
              <span className="text-xl font-extrabold text-primary-foreground tracking-tight">Basher</span>
              <span className="text-[10px] ml-1.5 bg-white/20 rounded px-1.5 py-0.5 text-primary-foreground font-medium uppercase">
                {region}
              </span>
            </Link>
            <RegionSwitcher />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { to: '/', label: t('nav.home') },
              { to: '/categories', label: t('nav.categories') },
              { to: '/deals', label: t('nav.deals') },
              { to: '/promocodes', label: t('nav.promocodes') },
              { to: '/freebies', label: t('nav.freebies') },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Search & Actions */}
          <div className="flex items-center space-x-2">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Поиск предложений..."
                className="w-56 pr-8 bg-white/15 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:bg-white/25"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-0 top-0 bottom-0 px-2 text-primary-foreground/60 hover:text-primary-foreground">
                <Search className="h-4 w-4" />
              </button>
            </form>
            
            <div className="flex items-center space-x-1">
              <LocationSelector />
              <LanguageSwitcher />
              
              {/* Dark mode toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
                onClick={toggleTheme}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-primary-foreground/70 hidden lg:inline">
                    {user.user_metadata?.username || user.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
                    onClick={() => signOut()}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button size="sm" className="h-8 bg-white/20 text-primary-foreground hover:bg-white/30 border-0">
                    Войти
                  </Button>
                </Link>
              )}
              
              <button 
                className="md:hidden text-primary-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 space-y-1 border-t border-white/10">
            {[
              { to: '/', label: t('nav.home') },
              { to: '/categories', label: t('nav.categories') },
              { to: '/deals', label: t('nav.deals') },
              { to: '/promocodes', label: t('nav.promocodes') },
              { to: '/freebies', label: t('nav.freebies') },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 rounded-md text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <form 
              onSubmit={(e) => { handleSearch(e); setIsMobileMenuOpen(false); }} 
              className="px-3 py-2"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск предложений..."
                  className="w-full pr-8 bg-white/15 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-0 top-0 bottom-0 px-2 text-primary-foreground/60 hover:text-primary-foreground">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
