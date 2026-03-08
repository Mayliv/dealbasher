
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ALL_ACHIEVEMENTS, getChallengeProgress, Challenge, ChallengeProgress } from '@/components/WeeklyChallengesWidget';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Gift, Zap, Trophy, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const p = getChallengeProgress(challenge.id);
  const pct = Math.round((p.current / challenge.target) * 100);

  return (
    <Card className={cn(
      'transition-all duration-200',
      p.completed ? 'border-primary/30 bg-primary/5' : 'hover:shadow-md'
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0',
            p.completed ? 'bg-primary/10' : 'bg-muted'
          )}>
            {challenge.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={cn('font-bold text-sm', p.completed && 'text-primary')}>
                {challenge.title}
              </h3>
              <Badge variant={p.completed ? 'default' : 'secondary'} className={cn(
                'text-[10px] px-2 py-0.5',
                p.completed && 'gradient-primary text-primary-foreground border-0'
              )}>
                <Gift className="w-3 h-3 mr-1" />+{challenge.points}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
            <div className="flex items-center gap-2">
              <Progress value={pct} className="h-2 flex-1" />
              <span className="text-xs font-bold text-muted-foreground">{p.current}/{challenge.target}</span>
            </div>
            {p.completed && p.completedAt && (
              <p className="text-[10px] text-primary font-medium mt-1.5">
                ✅ Выполнено {new Date(p.completedAt).toLocaleDateString('ru-RU')}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ChallengesPage = () => {
  const weeklyChallenges = ALL_ACHIEVEMENTS.filter(c => c.category === 'weekly');
  const achievements = ALL_ACHIEVEMENTS.filter(c => c.category === 'achievement');

  const weeklyCompleted = weeklyChallenges.filter(c => getChallengeProgress(c.id).completed).length;
  const achievementsCompleted = achievements.filter(c => getChallengeProgress(c.id).completed).length;
  const totalPoints = ALL_ACHIEVEMENTS.reduce((sum, c) => {
    const p = getChallengeProgress(c.id);
    return sum + (p.completed ? c.points : 0);
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
        {/* Stats banner */}
        <div className="mb-6 rounded-2xl gradient-primary p-5 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
          <div className="relative text-center">
            <Trophy className="w-10 h-10 mx-auto mb-2 text-yellow-300" />
            <p className="text-2xl font-extrabold">{totalPoints} очков</p>
            <p className="text-sm opacity-90 mt-1">{weeklyCompleted + achievementsCompleted} из {ALL_ACHIEVEMENTS.length} заданий выполнено</p>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-foreground mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          Задания и достижения
        </h1>

        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="weekly" className="gap-1.5">
              <Zap className="w-4 h-4" />
              Задания недели
              <Badge variant="secondary" className="ml-1 text-[10px]">{weeklyCompleted}/{weeklyChallenges.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-1.5">
              <Trophy className="w-4 h-4" />
              Достижения
              <Badge variant="secondary" className="ml-1 text-[10px]">{achievementsCompleted}/{achievements.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-3">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-center mb-2">
              <p className="text-sm font-bold text-foreground">🏆 Выполни все задания недели и получи бонус <span className="text-primary">+200 очков</span></p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Обновляется каждый понедельник</p>
            </div>
            {weeklyChallenges.map(c => <ChallengeCard key={c.id} challenge={c} />)}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-3">
            {achievements.map(c => <ChallengeCard key={c.id} challenge={c} />)}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default ChallengesPage;
