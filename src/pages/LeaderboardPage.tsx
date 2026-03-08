
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, MessageSquare, TrendingUp, TrendingDown, Bug, Trophy, Crown, Medal, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// ─── Types & Data ────────────────────────────────────────
interface LeaderboardUser {
  rank: number;
  username: string;
  avatar: string;
  level: { icon: string; name: string; color: string };
  deals: number;
  temperature: number;
  comments: number;
  trend: number; // positive = up, negative = down
  bugFinds?: number;
}

const LEVELS = [
  { icon: '🌱', name: 'Новичок', color: 'text-green-500' },
  { icon: '🔥', name: 'Охотник', color: 'text-orange-500' },
  { icon: '⚡', name: 'Снайпер', color: 'text-blue-500' },
  { icon: '💎', name: 'Легенда', color: 'text-purple-500' },
];

function mockUsers(seed: number): LeaderboardUser[] {
  const names = [
    'deal_master', 'kaspi_hunter', 'promo_queen', 'bug_sniper', 'sale_ninja',
    'price_hawk', 'coupon_king', 'hot_finder', 'mega_saver', 'deal_shark',
    'flash_buyer', 'smart_shopper', 'bargain_pro', 'discount_guru', 'value_seeker',
  ];
  return names.slice(0, 10).map((name, i) => ({
    rank: i + 1,
    username: name,
    avatar: name.slice(0, 2).toUpperCase(),
    level: LEVELS[Math.min(3, Math.floor((10 - i) / 3))],
    deals: Math.max(1, Math.floor((50 - i * 4) * (1 + seed * 0.1))),
    temperature: Math.max(10, Math.floor((5000 - i * 450) * (1 + seed * 0.05))),
    comments: Math.max(0, Math.floor((120 - i * 10) * (1 + seed * 0.08))),
    trend: i < 3 ? Math.floor(Math.random() * 3) + 1 : i > 7 ? -(Math.floor(Math.random() * 3) + 1) : [1, -1, 0, 2, -2][i % 5],
    bugFinds: Math.max(0, Math.floor((20 - i * 2) * (1 + seed * 0.1))),
  }));
}

const weeklyUsers = mockUsers(0);
const monthlyUsers = mockUsers(1);
const allTimeUsers = mockUsers(2);

const bugHunters: LeaderboardUser[] = [
  { rank: 1, username: 'bug_sniper', avatar: 'BS', level: LEVELS[3], deals: 12, temperature: 3200, comments: 45, trend: 2, bugFinds: 28 },
  { rank: 2, username: 'price_hawk', avatar: 'PH', level: LEVELS[2], deals: 9, temperature: 2100, comments: 33, trend: 0, bugFinds: 21 },
  { rank: 3, username: 'glitch_finder', avatar: 'GF', level: LEVELS[2], deals: 7, temperature: 1800, comments: 28, trend: -1, bugFinds: 17 },
  { rank: 4, username: 'error_catcher', avatar: 'EC', level: LEVELS[1], deals: 5, temperature: 900, comments: 14, trend: 3, bugFinds: 12 },
  { rank: 5, username: 'deal_debugger', avatar: 'DD', level: LEVELS[1], deals: 4, temperature: 650, comments: 11, trend: 1, bugFinds: 9 },
];

// ─── Rank Badge ──────────────────────────────────────────
const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md">1</div>;
  if (rank === 2) return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-extrabold text-sm shadow-md">2</div>;
  if (rank === 3) return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center text-white font-extrabold text-sm shadow-md">3</div>;
  return <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-sm">{rank}</div>;
};

// ─── User Row ────────────────────────────────────────────
const UserRow = ({ user, showBugs }: { user: LeaderboardUser; showBugs?: boolean }) => (
  <Link
    to={`/user/${user.username}`}
    className={cn(
      'flex items-center gap-3 p-3 rounded-xl transition-all duration-150 hover:bg-muted/50',
      user.rank === 1 && 'bg-yellow-500/5 border border-yellow-500/20',
      user.rank === 2 && 'bg-gray-400/5 border border-gray-400/20',
      user.rank === 3 && 'bg-amber-600/5 border border-amber-600/20',
      user.rank > 3 && 'border border-transparent'
    )}
  >
    <RankBadge rank={user.rank} />

    <Avatar className="h-10 w-10 border-2 border-border">
      <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">{user.avatar}</AvatarFallback>
    </Avatar>

    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-sm text-foreground truncate">{user.username}</span>
        <span className={cn('text-sm', user.level.color)}>{user.level.icon}</span>
        <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4">{user.level.name}</Badge>
      </div>
      <div className="flex items-center gap-3 mt-0.5 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-0.5"><Flame className="w-3 h-3 text-orange-500" />{user.temperature}°</span>
        <span>{user.deals} сделок</span>
        <span className="flex items-center gap-0.5"><MessageSquare className="w-3 h-3" />{user.comments}</span>
        {showBugs && user.bugFinds && (
          <span className="flex items-center gap-0.5"><Bug className="w-3 h-3 text-destructive" />{user.bugFinds} багов</span>
        )}
      </div>
    </div>

    {/* Trend */}
    <div className={cn(
      'flex items-center gap-0.5 text-xs font-bold',
      user.trend > 0 ? 'text-green-500' : user.trend < 0 ? 'text-red-500' : 'text-muted-foreground'
    )}>
      {user.trend > 0 && <TrendingUp className="w-3.5 h-3.5" />}
      {user.trend < 0 && <TrendingDown className="w-3.5 h-3.5" />}
      {user.trend !== 0 && <span>{user.trend > 0 ? '+' : ''}{user.trend}</span>}
      {user.trend === 0 && <span className="text-muted-foreground">—</span>}
    </div>
  </Link>
);

// ─── Leaderboard List ────────────────────────────────────
const LeaderboardList = ({ users }: { users: LeaderboardUser[] }) => (
  <div className="space-y-1.5">
    {users.map(user => <UserRow key={user.username} user={user} />)}
  </div>
);

// ─── Main Page ───────────────────────────────────────────
const LeaderboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
        {/* Prize banner */}
        <div className="mb-6 rounded-2xl gradient-primary p-4 text-primary-foreground text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
          <div className="relative">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
            <p className="text-lg font-extrabold">🏆 Лидер недели получает Premium на месяц!</p>
            <p className="text-sm opacity-90 mt-1">Публикуй горячие сделки и зарабатывай очки</p>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-foreground mb-6 flex items-center gap-2">
          <Crown className="w-6 h-6 text-yellow-500" />
          Таблица лидеров
        </h1>

        {/* Main leaderboard */}
        <Tabs defaultValue="week" className="mb-8">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="week">За неделю</TabsTrigger>
            <TabsTrigger value="month">За месяц</TabsTrigger>
            <TabsTrigger value="alltime">За всё время</TabsTrigger>
          </TabsList>

          <TabsContent value="week"><LeaderboardList users={weeklyUsers} /></TabsContent>
          <TabsContent value="month"><LeaderboardList users={monthlyUsers} /></TabsContent>
          <TabsContent value="alltime"><LeaderboardList users={allTimeUsers} /></TabsContent>
        </Tabs>

        {/* Your position */}
        <Card className="mb-8 border-primary/30 bg-primary/5">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">Ваше место: <span className="text-primary">#47</span></p>
              <p className="text-xs text-muted-foreground">+12 позиций за неделю · 3 сделки до #46</p>
            </div>
            <Badge className="gradient-primary text-primary-foreground border-0">🌱 Новичок</Badge>
          </CardContent>
        </Card>

        {/* Bug hunters mini-leaderboard */}
        <div className="mb-8">
          <h2 className="text-lg font-extrabold text-foreground mb-4 flex items-center gap-2">
            <Bug className="w-5 h-5 text-destructive" />
            Топ баг-хантеры
          </h2>
          <Card>
            <CardContent className="p-3 space-y-1.5">
              {bugHunters.map(user => <UserRow key={user.username} user={user} showBugs />)}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
