
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const AdminHeader: React.FC = () => {
  return (
    <header className="gradient-primary sticky top-0 z-50 w-full border-b border-white/10 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-primary/80">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/owner" className="flex items-center gap-0.5">
              <span className="text-2xl font-extrabold text-primary-foreground">Deal</span>
              <span className="text-2xl">⚡</span>
              <span className="text-2xl font-extrabold text-primary-foreground">Basher</span>
              <span className="ml-2 text-xs bg-white/20 rounded px-2 py-1 text-primary-foreground font-medium">АДМИН</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" target="_blank">
              <Button size="sm" className="bg-white/20 text-primary-foreground hover:bg-white/30 border-0">
                Просмотр сайта
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
