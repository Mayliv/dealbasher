
import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
  Home, 
  Tag, 
  Ticket, 
  LayoutGrid, 
  Gift, 
  MessageSquare,
  LogIn,
  Palette,
  SunMedium,
  Moon,
  MonitorSmartphone
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/providers/ThemeProvider';

interface SideMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleNavigation = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
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
            className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md dark:hover:bg-gray-800"
          >
            <Home className="h-5 w-5 text-deal-red" />
            <span>Главная</span>
          </button>
          
          <button 
            onClick={() => handleNavigation('/deals')}
            className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md dark:hover:bg-gray-800"
          >
            <Tag className="h-5 w-5 text-deal-red" />
            <span>Предложения</span>
          </button>
          
          <div className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md dark:hover:bg-gray-800">
            <Ticket className="h-5 w-5 text-deal-red" />
            <span>Промокоды</span>
            <span className="ml-auto">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
          
          <div className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md dark:hover:bg-gray-800">
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
            className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md dark:hover:bg-gray-800"
          >
            <Gift className="h-5 w-5 text-deal-red" />
            <span>Бесплатное</span>
          </button>
          
          <button 
            onClick={() => handleNavigation('/discussions')}
            className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md dark:hover:bg-gray-800"
          >
            <MessageSquare className="h-5 w-5 text-deal-red" />
            <span>Обсуждения</span>
          </button>
        </div>
        
        <div className="mt-10">
          <h3 className="text-sm font-semibold text-gray-500 mb-3 dark:text-gray-400">Аккаунт</h3>
          <button 
            onClick={() => handleNavigation('/login')}
            className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md w-full dark:hover:bg-gray-800"
          >
            <LogIn className="h-5 w-5 text-deal-red" />
            <span>Войти</span>
            <span className="ml-auto">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
          
          <div className="flex items-center space-x-3 text-left hover:bg-gray-100 py-2 px-3 rounded-md mt-2 dark:hover:bg-gray-800">
            <Palette className="h-5 w-5 text-deal-red" />
            <span>Оформление</span>
            <div className="ml-auto flex space-x-2">
              <button 
                onClick={() => handleThemeChange('light')} 
                className={`w-6 h-6 rounded-full ${theme === 'light' ? 'bg-deal-red text-white' : 'bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600'} flex items-center justify-center`}
                aria-label="Светлая тема"
              >
                <SunMedium className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => handleThemeChange('dark')} 
                className={`w-6 h-6 rounded-full ${theme === 'dark' ? 'bg-deal-red text-white' : 'bg-gray-900 border border-gray-300 text-white dark:border-gray-600'} flex items-center justify-center`}
                aria-label="Темная тема"
              >
                <Moon className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => handleThemeChange('system')} 
                className={`w-6 h-6 rounded-full ${theme === 'system' ? 'bg-deal-red text-white' : 'bg-orange-100 border border-gray-300 dark:bg-gray-600 dark:border-gray-500'} flex items-center justify-center`}
                aria-label="Системная тема"
              >
                <MonitorSmartphone className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
