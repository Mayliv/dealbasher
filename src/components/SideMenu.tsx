
import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { 
  Home, 
  Tag, 
  Ticket, 
  LayoutGrid, 
  Gift, 
  MessageSquare, 
  BookOpen,
  LogIn,
  Palette,
  Egg
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface SideMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] sm:w-[350px]">
        <SheetHeader className="text-left">
          <SheetTitle>Меню</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col space-y-3 mt-6">
          <button 
            onClick={() => handleNavigation('/')}
            className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md"
          >
            <Home className="h-5 w-5 text-deal-red" />
            <span>Главная</span>
          </button>
          
          <button 
            onClick={() => handleNavigation('/deals')}
            className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md"
          >
            <Tag className="h-5 w-5 text-deal-red" />
            <span>Предложения</span>
          </button>
          
          <div className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md">
            <Ticket className="h-5 w-5 text-deal-red" />
            <span>Промокоды</span>
            <span className="ml-auto">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
          
          <div className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md">
            <LayoutGrid className="h-5 w-5 text-deal-red" />
            <span>Категории</span>
            <span className="ml-auto">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
          
          <button 
            onClick={() => handleNavigation('/freebies')}
            className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md"
          >
            <Gift className="h-5 w-5 text-deal-red" />
            <span>Бесплатное</span>
          </button>
          
          <button 
            onClick={() => handleNavigation('/discussions')}
            className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md"
          >
            <MessageSquare className="h-5 w-5 text-deal-red" />
            <span>Обсуждения</span>
          </button>
          
          <button 
            onClick={() => handleNavigation('/magazine')}
            className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md"
          >
            <BookOpen className="h-5 w-5 text-deal-red" />
            <span>Журнал</span>
          </button>
        </div>
        
        <div className="mt-10">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">Интересное</h3>
          <button 
            onClick={() => handleNavigation('/easter-deals')}
            className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md w-full"
          >
            <Egg className="h-5 w-5 text-deal-red" />
            <span>Пасхальные акции 2025</span>
          </button>
        </div>
        
        <div className="mt-10">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">Аккаунт</h3>
          <button 
            onClick={() => handleNavigation('/login')}
            className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md w-full"
          >
            <LogIn className="h-5 w-5 text-deal-red" />
            <span>Войти</span>
            <span className="ml-auto">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
          
          <div className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md mt-2">
            <Palette className="h-5 w-5 text-deal-red" />
            <span>Оформление</span>
            <div className="ml-auto flex space-x-2">
              <button className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center">
                <span className="text-xs">С</span>
              </button>
              <button className="w-6 h-6 rounded-full bg-gray-900 border border-gray-300 flex items-center justify-center">
                <span className="text-xs text-white">Т</span>
              </button>
              <button className="w-6 h-6 rounded-full bg-orange-100 border border-gray-300 flex items-center justify-center">
                <span className="text-xs">А</span>
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
