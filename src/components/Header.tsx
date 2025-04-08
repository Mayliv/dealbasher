
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from '@/contexts/LocalizationContext';
import LanguageSwitcher from './LanguageSwitcher';
import RegionSwitcher from './RegionSwitcher';
import LocationSelector from './LocationSelector';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, region } = useLocalization();

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

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Region Switcher */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-deal-red">DealBasher</span>
              <span className="text-xs ml-1 bg-gray-200 dark:bg-gray-700 px-1 rounded">
                {region.toUpperCase()}
              </span>
            </Link>
            <RegionSwitcher />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-deal-red px-3 py-2 text-sm font-medium">
              {t('nav.home')}
            </Link>
            <Link to="/categories" className="text-gray-700 dark:text-gray-300 hover:text-deal-red px-3 py-2 text-sm font-medium">
              {t('nav.categories')}
            </Link>
            <Link to="/deals" className="text-gray-700 dark:text-gray-300 hover:text-deal-red px-3 py-2 text-sm font-medium">
              {t('nav.deals')}
            </Link>
            <Link to="/promocodes" className="text-gray-700 dark:text-gray-300 hover:text-deal-red px-3 py-2 text-sm font-medium">
              {t('nav.promocodes')}
            </Link>
            <Link to="/freebies" className="text-gray-700 dark:text-gray-300 hover:text-deal-red px-3 py-2 text-sm font-medium">
              {t('nav.freebies')}
            </Link>
          </div>
          
          {/* Search Bar & Account */}
          <div className="flex items-center space-x-2">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Поиск предложений..."
                className="w-64 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-0 top-0 bottom-0 px-2 text-gray-500 hover:text-deal-red"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
            
            <div className="flex items-center space-x-2">
              <LocationSelector />
              <LanguageSwitcher />
              
              <Link to="/login">
                <Button variant="outline" size="sm" className="h-8">
                  Войти
                </Button>
              </Link>
              
              <button 
                className="md:hidden text-gray-700 dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 space-y-2">
            <Link 
              to="/" 
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-deal-red hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/categories" 
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-deal-red hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.categories')}
            </Link>
            <Link 
              to="/deals" 
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-deal-red hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.deals')}
            </Link>
            <Link 
              to="/promocodes" 
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-deal-red hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.promocodes')}
            </Link>
            <Link 
              to="/freebies" 
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-deal-red hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.freebies')}
            </Link>
            <form 
              onSubmit={(e) => {
                handleSearch(e);
                setIsMobileMenuOpen(false);
              }} 
              className="px-3 py-2"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск предложений..."
                  className="w-full pr-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute right-0 top-0 bottom-0 px-2 text-gray-500 hover:text-deal-red"
                >
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
