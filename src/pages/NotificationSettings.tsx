import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Bell, MessageCircle, Tag, Flame, Send, ExternalLink, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

interface NotificationPref {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

const NotificationSettings = () => {
  const { toast } = useToast();
  const [prefs, setPrefs] = useState<NotificationPref[]>([
    {
      id: 'deal_temperature',
      label: 'Температура сделки',
      description: 'Когда ваша сделка набирает 50°, 100°, 500°',
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      enabled: true,
    },
    {
      id: 'comments',
      label: 'Комментарии',
      description: 'Новые комментарии к вашим сделкам и ответы',
      icon: <MessageCircle className="h-5 w-5 text-blue-500" />,
      enabled: true,
    },
    {
      id: 'category_deals',
      label: 'Сделки по категориям',
      description: 'Новые горячие сделки в подписанных категориях',
      icon: <Tag className="h-5 w-5 text-green-500" />,
      enabled: true,
    },
    {
      id: 'store_deals',
      label: 'Сделки по магазинам',
      description: 'Новые предложения от подписанных магазинов',
      icon: <Tag className="h-5 w-5 text-purple-500" />,
      enabled: false,
    },
    {
      id: 'price_alerts',
      label: 'Снижение цен',
      description: 'Уведомления о снижении цен на отслеживаемые товары',
      icon: <Bell className="h-5 w-5 text-red-500" />,
      enabled: true,
    },
    {
      id: 'weekly_digest',
      label: 'Еженедельный дайджест',
      description: 'Лучшие сделки за неделю — каждый понедельник',
      icon: <Send className="h-5 w-5 text-muted-foreground" />,
      enabled: false,
    },
  ]);

  const [telegramConnected, setTelegramConnected] = useState(false);

  const togglePref = (id: string) => {
    setPrefs(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const handleSave = () => {
    toast({ title: 'Настройки сохранены', description: 'Ваши настройки уведомлений обновлены.' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground">Настройки уведомлений</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-1">Уведомления</h1>
        <p className="text-muted-foreground mb-6">Настройте какие уведомления вы хотите получать</p>

        {/* Telegram */}
        <div className="bg-card border rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(200,80%,50%)]/10 flex items-center justify-center">
                <Send className="h-5 w-5 text-[hsl(200,80%,50%)]" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Получать в Telegram</h3>
                <p className="text-sm text-muted-foreground">
                  {telegramConnected ? 'Telegram бот подключён' : 'Мгновенные уведомления в Telegram'}
                </p>
              </div>
            </div>
            {telegramConnected ? (
              <Button variant="outline" size="sm" onClick={() => setTelegramConnected(false)}>
                Отключить
              </Button>
            ) : (
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  setTelegramConnected(true);
                  toast({ title: 'Telegram подключён', description: 'Теперь вы будете получать уведомления в Telegram.' });
                }}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Подключить бот
              </Button>
            )}
          </div>
        </div>

        {/* Notification types */}
        <div className="bg-card border rounded-xl divide-y">
          {prefs.map(pref => (
            <div key={pref.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="shrink-0">{pref.icon}</div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{pref.label}</h4>
                  <p className="text-xs text-muted-foreground">{pref.description}</p>
                </div>
              </div>
              <Switch checked={pref.enabled} onCheckedChange={() => togglePref(pref.id)} />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>Сохранить настройки</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotificationSettings;
