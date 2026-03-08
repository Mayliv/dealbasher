import React, { useState } from 'react';
import { Bell, Flame, MessageCircle, Tag, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Notification {
  id: number;
  type: 'temperature' | 'comment' | 'category';
  message: string;
  time: string;
  read: boolean;
  icon: React.ReactNode;
}

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'temperature',
      message: 'Ваша сделка набрала 100° 🔥',
      time: '5 мин назад',
      read: false,
      icon: <Flame className="h-4 w-4 text-orange-500" />,
    },
    {
      id: 2,
      type: 'comment',
      message: 'Новый комментарий к вашей сделке',
      time: '12 мин назад',
      read: false,
      icon: <MessageCircle className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 3,
      type: 'category',
      message: 'Сделка из вашей категории Электроника',
      time: '1 час назад',
      read: false,
      icon: <Tag className="h-4 w-4 text-green-500" />,
    },
    {
      id: 4,
      type: 'temperature',
      message: 'Ваш промокод использовали 50 раз!',
      time: '3 часа назад',
      read: true,
      icon: <Flame className="h-4 w-4 text-orange-500" />,
    },
  ]);

  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold text-sm text-foreground">Уведомления</h3>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground" onClick={markAllRead}>
                Прочитать все
              </Button>
            )}
            <Link to="/settings/notifications" onClick={() => setOpen(false)}>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                <Settings className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Нет уведомлений
            </div>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={cn(
                  'flex items-start gap-3 px-4 py-3 border-b last:border-b-0 transition-colors hover:bg-muted/50 group',
                  !notification.read && 'bg-primary/5'
                )}
              >
                <div className="mt-0.5 shrink-0">{notification.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm', !notification.read && 'font-medium')}>{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{notification.time}</p>
                </div>
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5"
                >
                  <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="border-t px-4 py-2">
          <Link
            to="/settings/notifications"
            className="text-xs text-primary hover:underline"
            onClick={() => setOpen(false)}
          >
            Настройки уведомлений
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
