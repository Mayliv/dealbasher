
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DealCard from '@/components/DealCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { deals } from '@/utils/data';
import {
  UserPlus,
  UserCheck,
  Calendar,
  Flame,
  MessageSquare,
  Award,
  TrendingUp,
  Star,
  Target,
  Zap,
  Bug,
  Heart,
  Trophy,
  Shield,
  Gift,
  ThumbsUp,
} from 'lucide-react';

// ─── Level system ──────────────────────────────────────────
interface Level {
  icon: string;
  name: string;
  min: number;
  max: number;
  color: string;
  gradient: string;
}

const LEVELS: Level[] = [
  { icon: '🌱', name: 'Новичок', min: 0, max: 100, color: 'text-green-500', gradient: 'from-green-500 to-emerald-400' },
  { icon: '🔥', name: 'Охотник', min: 100, max: 500, color: 'text-orange-500', gradient: 'from-orange-500 to-amber-400' },
  { icon: '⚡', name: 'Снайпер', min: 500, max: 2000, color: 'text-blue-500', gradient: 'from-blue-500 to-cyan-400' },
  { icon: '💎', name: 'Легенда', min: 2000, max: Infinity, color: 'text-purple-500', gradient: 'from-purple-500 to-pink-400' },
];

function getLevel(temp: number): Level {
  return LEVELS.find(l => temp >= l.min && temp < l.max) || LEVELS[0];
}

function getLevelProgress(temp: number, level: Level): number {
  if (level.max === Infinity) return 100;
  return Math.min(100, Math.round(((temp - level.min) / (level.max - level.min)) * 100));
}

// ─── Achievements ──────────────────────────────────────────
interface Achievement {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  earned: boolean;
}

const createAchievements = (stats: { deals: number; temp: number; comments: number; hasBug: boolean }): Achievement[] => [
  { id: 'first_deal', icon: <Star className="w-6 h-6" />, title: 'Первая сделка', description: 'Опубликуйте первую сделку', earned: stats.deals >= 1 },
  { id: 'five_deals', icon: <Target className="w-6 h-6" />, title: '5 сделок', description: 'Опубликуйте 5 сделок', earned: stats.deals >= 5 },
  { id: 'temp_100', icon: <Flame className="w-6 h-6" />, title: '100 градусов', description: 'Наберите 100° суммарной температуры', earned: stats.temp >= 100 },
  { id: 'temp_500', icon: <Zap className="w-6 h-6" />, title: '500 градусов', description: 'Наберите 500° суммарной температуры', earned: stats.temp >= 500 },
  { id: 'temp_2000', icon: <Trophy className="w-6 h-6" />, title: 'Легенда', description: 'Наберите 2000° суммарной температуры', earned: stats.temp >= 2000 },
  { id: 'bug_hunter', icon: <Bug className="w-6 h-6" />, title: 'Баг-хантер', description: 'Найдите баг цены', earned: stats.hasBug },
  { id: 'commentator', icon: <MessageSquare className="w-6 h-6" />, title: 'Комментатор', description: 'Оставьте 10 комментариев', earned: stats.comments >= 10 },
  { id: 'generous', icon: <Heart className="w-6 h-6" />, title: 'Щедрый', description: 'Поделитесь 3 бесплатными предложениями', earned: false },
  { id: 'veteran', icon: <Shield className="w-6 h-6" />, title: 'Ветеран', description: 'Будьте на сайте более 1 года', earned: false },
  { id: 'influencer', icon: <ThumbsUp className="w-6 h-6" />, title: 'Инфлюенсер', description: 'Получите 50 подписчиков', earned: false },
  { id: 'hot_streak', icon: <TrendingUp className="w-6 h-6" />, title: 'Горячая серия', description: '3 сделки подряд с 200°+', earned: stats.temp >= 600 },
  { id: 'santa', icon: <Gift className="w-6 h-6" />, title: 'Санта', description: 'Опубликуйте сделку в Новый год', earned: false },
];

// ─── Mock comments ─────────────────────────────────────────
const mockUserComments = [
  { id: 1, dealTitle: 'Samsung 75" 4K Smart TV', text: 'Отличная сделка! Уже заказал, доставка через 2 дня.', postedAt: '3 часа назад', likes: 12 },
  { id: 2, dealTitle: 'Nike Air Max - скидка 40%', text: 'Проверил историю цен — это реально самая низкая за последний год.', postedAt: '5 часов назад', likes: 24 },
  { id: 3, dealTitle: 'PlayStation 5 Slim Console', text: 'Промокод SAVE10 дает ещё 10% сверху! Проверено лично.', postedAt: '1 день назад', likes: 38 },
  { id: 4, dealTitle: 'Apple AirPods Pro', text: 'Взял себе и в подарок — качество звука топ.', postedAt: '2 дня назад', likes: 8 },
];

// ─── Mock user data ────────────────────────────────────────
const getMockUser = (username: string) => {
  const userDeals = deals.filter(d => d.postedBy.toLowerCase() === username.toLowerCase());
  const totalTemp = userDeals.reduce((sum, d) => sum + d.temperature, 0);
  const totalComments = userDeals.reduce((sum, d) => sum + d.comments, 0);

  return {
    username: username,
    avatarUrl: `https://placehold.co/200x200/e9e9e9/999?text=${username.charAt(0).toUpperCase()}`,
    coverUrl: 'https://placehold.co/1200x300/1a1a2e/fff?text=',
    joinedDate: 'Март 2024',
    bio: 'Охотник за скидками. Делюсь лучшими находками с сообществом! 🔥',
    followers: 142,
    following: 38,
    stats: {
      deals: userDeals.length || 3,
      temp: totalTemp || 876,
      comments: totalComments || 45,
      hasBug: userDeals.some(d => d.isPriceBug),
    },
    deals: userDeals.length > 0 ? userDeals : deals.slice(0, 3),
  };
};

// ─── Page ──────────────────────────────────────────────────
const UserProfile = () => {
  const { username } = useParams();
  const { toast } = useToast();
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('deals');

  const user = useMemo(() => getMockUser(username || 'dealfinder42'), [username]);
  const level = getLevel(user.stats.temp);
  const levelProgress = getLevelProgress(user.stats.temp, level);
  const achievements = useMemo(() => createAchievements(user.stats), [user.stats]);
  const earnedCount = achievements.filter(a => a.earned).length;

  const handleFollow = () => {
    setFollowing(f => !f);
    toast({
      title: following ? 'Отписались' : '✅ Подписались',
      description: following ? `Вы отписались от ${user.username}` : `Вы подписались на ${user.username}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Cover + Avatar */}
      <div className="relative">
        <div className="h-36 sm:h-48 w-full gradient-primary" />

        <div className="container mx-auto px-4">
          <div className="relative -mt-16 sm:-mt-20 flex flex-col sm:flex-row items-start sm:items-end gap-4 pb-4">
            {/* Avatar with level badge */}
            <div className="relative shrink-0">
              <Avatar className="w-28 h-28 sm:w-36 sm:h-36 border-4 border-background shadow-xl">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback className="text-4xl bg-muted">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* Level badge overlay */}
              <div className={`absolute -bottom-1 -right-1 px-2.5 py-1 rounded-full bg-gradient-to-r ${level.gradient} text-white text-xs font-bold shadow-lg border-2 border-background`}>
                {level.icon} {level.name}
              </div>
            </div>

            {/* Name + follow */}
            <div className="flex-1 min-w-0 sm:pb-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-foreground">{user.username}</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">{user.bio}</p>
                </div>
                <div className="flex items-center gap-2 sm:ml-auto shrink-0">
                  <Button
                    variant={following ? 'outline' : 'default'}
                    className={following ? '' : 'gradient-primary text-primary-foreground'}
                    onClick={handleFollow}
                  >
                    {following ? (
                      <><UserCheck className="w-4 h-4 mr-1.5" /> Подписаны</>
                    ) : (
                      <><UserPlus className="w-4 h-4 mr-1.5" /> Подписаться</>
                    )}
                  </Button>
                </div>
              </div>

              {/* Followers */}
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span><strong className="text-foreground">{user.followers}</strong> подписчиков</span>
                <span><strong className="text-foreground">{user.following}</strong> подписок</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: <Award className="w-5 h-5" />, label: 'Сделок', value: user.stats.deals, color: 'text-primary' },
            { icon: <Flame className="w-5 h-5" />, label: 'Температура', value: `${user.stats.temp}°`, color: 'text-orange-500' },
            { icon: <MessageSquare className="w-5 h-5" />, label: 'Комментарии', value: user.stats.comments, color: 'text-blue-500' },
            { icon: <Calendar className="w-5 h-5" />, label: 'На сайте с', value: user.joinedDate, color: 'text-muted-foreground' },
          ].map((stat, i) => (
            <div key={i} className="bg-card rounded-xl border p-4 text-center">
              <div className={`${stat.color} flex justify-center mb-1.5`}>{stat.icon}</div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Level progress */}
        <div className="bg-card rounded-xl border p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{level.icon}</span>
              <span className="font-semibold text-foreground">{level.name}</span>
            </div>
            {level.max !== Infinity && (
              <span className="text-xs text-muted-foreground">
                {user.stats.temp} / {level.max}°
              </span>
            )}
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${level.gradient} transition-all duration-1000`}
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          {level.max !== Infinity && (
            <p className="text-xs text-muted-foreground mt-1.5">
              До следующего уровня: {level.max - user.stats.temp}°
            </p>
          )}
          {/* All levels */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
            {LEVELS.map((l, i) => (
              <div key={i} className={`flex items-center gap-1 text-xs ${user.stats.temp >= l.min ? 'text-foreground' : 'text-muted-foreground/40'}`}>
                <span>{l.icon}</span>
                <span className="hidden sm:inline">{l.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full sm:w-auto">
            <TabsTrigger value="deals" className="gap-1.5">
              <Award className="w-4 h-4" /> Сделки
            </TabsTrigger>
            <TabsTrigger value="comments" className="gap-1.5">
              <MessageSquare className="w-4 h-4" /> Комментарии
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-1.5">
              <Trophy className="w-4 h-4" /> Достижения
            </TabsTrigger>
          </TabsList>

          {/* Deals tab */}
          <TabsContent value="deals" className="mt-4 space-y-4">
            {user.deals.length > 0 ? (
              user.deals.map(deal => <DealCard key={deal.id} deal={deal} />)
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border">
                <Award className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
                <p className="text-muted-foreground">Пока нет сделок</p>
              </div>
            )}
          </TabsContent>

          {/* Comments tab */}
          <TabsContent value="comments" className="mt-4 space-y-3">
            {mockUserComments.map(comment => (
              <div key={comment.id} className="bg-card rounded-xl border p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">
                    к сделке <span className="text-foreground font-medium">{comment.dealTitle}</span>
                  </p>
                  <span className="text-xs text-muted-foreground">{comment.postedAt}</span>
                </div>
                <p className="text-sm text-foreground/90">{comment.text}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <ThumbsUp className="w-3 h-3" /> {comment.likes}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Achievements tab */}
          <TabsContent value="achievements" className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="font-semibold text-foreground">Достижения</span>
              <Badge variant="secondary" className="text-xs">{earnedCount}/{achievements.length}</Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {achievements.map(a => (
                <div
                  key={a.id}
                  className={`bg-card rounded-xl border p-4 text-center transition-all ${
                    a.earned
                      ? 'border-primary/30 shadow-sm'
                      : 'opacity-40 grayscale'
                  }`}
                >
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    a.earned ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {a.icon}
                  </div>
                  <p className="text-xs font-semibold text-foreground">{a.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{a.description}</p>
                  {a.earned && (
                    <Badge className="mt-2 bg-deal-success text-primary-foreground border-0 text-[10px]">✅ Получено</Badge>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;
