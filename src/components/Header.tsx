
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, Hammer, Menu } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import SideMenu from './SideMenu';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <SideMenu open={sideMenuOpen} onOpenChange={setSideMenuOpen} />
      
      <header className="bg-white shadow-sm sticky top-0 z-50 dark:bg-gray-900 dark:border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 md:mr-4 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => setSideMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Меню</span>
              </Button>
              
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-deal-red">Deal</span>
                <Hammer className="h-6 w-6 mx-1 text-deal-red" />
                <span className="text-2xl font-bold text-deal-red">Basher</span>
              </Link>
            </div>
            
            <div className="hidden md:flex flex-1 max-w-xl mx-6">
              <form className="relative w-full" onSubmit={handleSearch}>
                <input
                  type="text"
                  name="search"
                  placeholder="Поиск предложений..."
                  className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-deal-red focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <Button type="submit" size="icon" className="absolute right-1 top-1 rounded-full bg-deal-red hover:bg-deal-red/90">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="hidden sm:inline-flex dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                  Войти
                </Button>
              </Link>
              <Link to="/submit-deal">
                <Button className="bg-deal-red hover:bg-deal-red/90">
                  Добавить предложение
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-3 md:hidden">
            <form className="relative w-full" onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                placeholder="Поиск предложений..."
                className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-deal-red focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              <Button type="submit" size="icon" className="absolute right-1 top-1 rounded-full bg-deal-red hover:bg-deal-red/90">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
