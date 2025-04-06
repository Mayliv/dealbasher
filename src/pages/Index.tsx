
import React from 'react';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import DealCard from '@/components/DealCard';
import FeaturedDeals from '@/components/FeaturedDeals';
import Footer from '@/components/Footer';
import { deals } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Flame, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      
      <main className="flex-1 container mx-auto px-4">
        <FeaturedDeals deals={deals} />
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Flame className="text-deal-red mr-2" />
            <h2 className="text-xl font-bold">Hot Deals</h2>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <TrendingUp className="mr-1 h-4 w-4" />
              Newest
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Flame className="mr-1 h-4 w-4" />
              Hottest
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Button className="bg-deal-red hover:bg-deal-red/90">
            Load More Deals
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
