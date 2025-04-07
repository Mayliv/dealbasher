
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Hammer } from "lucide-react";

const AdminHeader: React.FC = () => {
  return (
    <header className="bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/owner" className="flex items-center">
              <span className="text-2xl font-bold text-white">Deal</span>
              <Hammer className="h-6 w-6 mx-1 text-white" />
              <span className="text-2xl font-bold text-white">Basher</span>
              <span className="ml-2 text-xs bg-white/20 rounded px-2 py-1 text-white font-medium">АДМИН</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" target="_blank">
              <Button variant="secondary" size="sm">
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
