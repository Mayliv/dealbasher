
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-deal-red">DealSeeker</span>
            </a>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for deals..."
                className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-deal-red focus:border-transparent"
              />
              <Button size="icon" className="absolute right-1 top-1 rounded-full bg-deal-red hover:bg-deal-red/90">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden sm:inline-flex">
              Log In
            </Button>
            <Button className="bg-deal-red hover:bg-deal-red/90">
              Submit Deal
            </Button>
          </div>
        </div>
        
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for deals..."
              className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-deal-red focus:border-transparent"
            />
            <Button size="icon" className="absolute right-1 top-1 rounded-full bg-deal-red hover:bg-deal-red/90">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
