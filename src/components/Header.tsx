
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-deal-red">DealSeeker</span>
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <form className="relative w-full" onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                placeholder="Поиск сделок..."
                className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-deal-red focus:border-transparent"
              />
              <Button type="submit" size="icon" className="absolute right-1 top-1 rounded-full bg-deal-red hover:bg-deal-red/90">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="hidden sm:inline-flex">
                Войти
              </Button>
            </Link>
            <Link to="/submit-deal">
              <Button className="bg-deal-red hover:bg-deal-red/90">
                Добавить сделку
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-3 md:hidden">
          <form className="relative w-full" onSubmit={handleSearch}>
            <input
              type="text"
              name="search"
              placeholder="Поиск сделок..."
              className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-deal-red focus:border-transparent"
            />
            <Button type="submit" size="icon" className="absolute right-1 top-1 rounded-full bg-deal-red hover:bg-deal-red/90">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
