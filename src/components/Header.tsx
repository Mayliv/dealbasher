
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dealbasherLogo from '@/assets/dealbasher-logo.png';
import { Search, Menu, X, LogOut, Moon, Sun, Clock, TrendingUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/providers/ThemeProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import RegionSwitcher from './RegionSwitcher';
import LocationSelector from './LocationSelector';
import NotificationBell from './NotificationBell';
import { usePulseSubmit } from './HintsSystem';

const RECENT_SEARCHES_KEY = 'dealbasher_recent_searches';
const MAX_RECENT = 6;

const TRENDING_SEARCHES = ['iPhone', 'Nike', 'Dyson', 'PlayStation', 'Samsung', 'AirPods', 'Xiaomi', 'Adidas'];

function getRecentSearches(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
  } catch { return []; }
}

function addRecentSearch(query: string) {
  const recent = getRecentSearches().filter(s => s !== query);
  recent.unshift(query);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

function removeRecentSearch(query: string) {
  const recent = getRecentSearches().filter(s => s !== query);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent));
}

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(getRecentSearches());
  const searchRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, region } = useLocalization();
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery.trim());
      setRecentSearches(getRecentSearches());
      setIsSearchFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchOpen(false);
    } else {
      toast({ title: "Поле поиска пусто", description: "Пожалуйста, введите поисковый запрос", variant: "destructive" });
    }
  };

  const handleRecentClick = (q: string) => {
    setSearchQuery(q);
    setIsSearchFocused(false);
    addRecentSearch(q);
    setRecentSearches(getRecentSearches());
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setIsMobileSearchOpen(false);
  };

  const handleRemoveRecent = (e: React.MouseEvent, q: string) => {
    e.stopPropagation();
    removeRecentSearch(q);
    setRecentSearches(getRecentSearches());
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'dark' : 'light');
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const showDropdown = isSearchFocused && (recentSearches.length > 0 || searchQuery === '');

  // Search dropdown content
  const SearchDropdown = () => (
    <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-xl z-50 overflow-hidden animate-fade-in">
      {/* Recent searches */}
      {recentSearches.length > 0 && (
        <div className="p-3 border-b border-border">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Недавние
          </p>
          <div className="flex flex-wrap gap-1.5">
            {recentSearches.map(q => (
              <Badge
                key={q}
                variant="secondary"
                className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors text-xs pr-1 gap-1"
                onClick={() => handleRecentClick(q)}
              >
                {q}
                <button
                  onClick={(e) => handleRemoveRecent(e, q)}
                  className="ml-0.5 hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Trending searches */}
      <div className="p-3">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> 🔥 Популярные запросы
        </p>
        <div className="flex flex-wrap gap-1.5">
          {TRENDING_SEARCHES.map(q => (
            <Badge
              key={q}
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors text-xs"
              onClick={() => handleRecentClick(q)}
            >
              {q}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full gradient-primary backdrop-blur supports-[backdrop-filter]:bg-primary/80 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <img src={dealbasherLogo} alt="DealBasher" className="h-8 md:h-10 w-auto max-w-[192px] md:max-w-[216px] object-contain" />
              {!isMobile && (
                <span className="text-[10px] ml-1.5 bg-white/20 rounded px-1.5 py-0.5 text-primary-foreground font-medium uppercase">
                  {region}
                </span>
              )}
            </Link>
            {!isMobile && <span data-onboarding="region"><RegionSwitcher /></span>}
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
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
          )}
          
          {/* Search & Actions */}
          <div className="flex items-center space-x-2">
            {/* Desktop search with expand animation */}
            {!isMobile && (
              <div ref={searchRef} className="relative hidden md:block">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="Поиск предложений..."
                    className={cn(
                      'pr-8 bg-white/15 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 transition-all duration-300 ease-out',
                      isSearchFocused ? 'w-80 bg-white/25 shadow-lg' : 'w-56'
                    )}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                  />
                  <button type="submit" className="absolute right-0 top-0 bottom-0 px-2 text-primary-foreground/60 hover:text-primary-foreground">
                    <Search className="h-4 w-4" />
                  </button>
                </form>
                {showDropdown && <SearchDropdown />}
              </div>
            )}
            
            <div className="flex items-center space-x-1">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
                  onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}

              {!isMobile && <LocationSelector />}
              {!isMobile && <LanguageSwitcher />}
              <NotificationBell />
              
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
                  onClick={toggleTheme}
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              )}
              
              {!isMobile && (
                <>
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
                </>
              )}
              
              {isMobile && (
                <button className="text-primary-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {isMobile && isMobileSearchOpen && (
          <div className="py-2 border-t border-white/10" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Поиск предложений..."
                className="w-full pr-8 bg-white/15 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                autoFocus
              />
              <button type="submit" className="absolute right-0 top-0 bottom-0 px-2 text-primary-foreground/60 hover:text-primary-foreground">
                <Search className="h-4 w-4" />
              </button>
            </form>
            {showDropdown && <SearchDropdown />}
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobile && isMobileMenuOpen && (
          <div className="py-3 space-y-1 border-t border-white/10">
            <div className="flex items-center gap-2 px-3 py-2">
              <RegionSwitcher />
              <LocationSelector />
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
                onClick={toggleTheme}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>

            {[
              { to: '/', label: t('nav.home') },
              { to: '/categories', label: t('nav.categories') },
              { to: '/deals', label: t('nav.deals') },
              { to: '/promocodes', label: t('nav.promocodes') },
              { to: '/freebies', label: t('nav.freebies') },
              { to: '/discussions', label: t('nav.discussions') || 'Обсуждения' },
              { to: '/settings/notifications', label: 'Настройки уведомлений' },
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
            
            <div className="px-3 pt-2 border-t border-white/10">
              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
                  onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Выйти ({user.user_metadata?.username || user.email})
                </Button>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full bg-white/20 text-primary-foreground hover:bg-white/30 border-0">
                    Войти
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
