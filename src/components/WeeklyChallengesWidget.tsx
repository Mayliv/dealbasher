
import React, { useState, useEffect, useCallback } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Zap, Gift, ChevronRight } from 'lucide-react';

// ─── Challenge Types & Storage ───────────────────────────
export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  points: number;
  category: 'weekly' | 'achievement';
}

export interface ChallengeProgress {
  current: number;
  completed: boolean;
  completedAt?: string;
}

const WEEKLY_CHALLENGES: Challenge[] = [
  { id: 'post_3_deals', title: 'Добавь 3 сделки', description: 'Опубликуй 3 новых предложения', icon: '📝', target: 3, points: 150, category: 'weekly' },
  { id: 'earn_50_temp', title: 'Получи 50° на своей сделке', description: 'Набери суммарно 50° температуры', icon: '🔥', target: 50, points: 200, category: 'weekly' },
  { id: 'comment_5', title: 'Прокомментируй 5 сделок', description: 'Оставь 5 полезных комментариев', icon: '💬', target: 5, points: 100, category: 'weekly' },
];

export const ALL_ACHIEVEMENTS: Challenge[] = [
  ...WEEKLY_CHALLENGES,
  { id: 'first_deal', title: 'Первая сделка', description: 'Опубликуй свою первую сделку', icon: '🎯', target: 1, points: 50, category: 'achievement' },
  { id: 'bug_hunter', title: 'Баг-хантер', description: 'Найди 3 бага цен', icon: '🐛', target: 3, points: 300, category: 'achievement' },
  { id: 'hot_streak', title: 'Горячая серия', description: 'Получи 3 сделки с 100°+ подряд', icon: '🔥', target: 3, points: 500, category: 'achievement' },
  { id: 'social_butterfly', title: 'Душа компании', description: 'Оставь 50 комментариев', icon: '🦋', target: 50, points: 200, category: 'achievement' },
  { id: 'price_sniper', title: 'Снайпер цен', description: 'Найди сделку со скидкой 70%+', icon: '🎯', target: 1, points: 250, category: 'achievement' },
  { id: 'community_helper', title: 'Помощник сообщества', description: 'Получи 10 "спасибо" за комментарии', icon: '🤝', target: 10, points: 150, category: 'achievement' },
  { id: 'night_owl', title: 'Ночная сова', description: 'Добавь сделку между 00:00 и 05:00', icon: '🦉', target: 1, points: 100, category: 'achievement' },
  { id: 'deal_legend', title: 'Легенда скидок', description: 'Набери 5000° суммарной температуры', icon: '💎', target: 5000, points: 1000, category: 'achievement' },
  { id: 'streak_7', title: '7 дней подряд', description: 'Заходи 7 дней подряд', icon: '📅', target: 7, points: 200, category: 'achievement' },
];

function getWeekKey(): string {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  return `week_${monday.toISOString().slice(0, 10)}`;
}

const STORAGE_KEY = 'dealbasher_challenges';

function getStoredProgress(): Record<string, ChallengeProgress> {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (data._weekKey !== getWeekKey()) {
      // Reset weekly challenges
      const kept: Record<string, ChallengeProgress> = { _weekKey: getWeekKey() } as any;
      ALL_ACHIEVEMENTS.filter(c => c.category === 'achievement').forEach(c => {
        if (data[c.id]) kept[c.id] = data[c.id];
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(kept));
      return kept;
    }
    return data;
  } catch { return {}; }
}

function saveProgress(progress: Record<string, ChallengeProgress>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...progress, _weekKey: getWeekKey() }));
}

export function getChallengeProgress(id: string): ChallengeProgress {
  const stored = getStoredProgress();
  return stored[id] || { current: 0, completed: false };
}

export function incrementChallenge(id: string, amount: number = 1): { completed: boolean; challenge?: Challenge } {
  const progress = getStoredProgress();
  const challenge = ALL_ACHIEVEMENTS.find(c => c.id === id);
  if (!challenge) return { completed: false };

  const current = progress[id] || { current: 0, completed: false };
  if (current.completed) return { completed: false };

  current.current = Math.min(current.current + amount, challenge.target);
  if (current.current >= challenge.target) {
    current.completed = true;
    current.completedAt = new Date().toISOString();
  }
  progress[id] = current;
  saveProgress(progress);

  return { completed: current.completed, challenge };
}

// ─── Confetti ────────────────────────────────────────────
const Confetti = ({ active }: { active: boolean }) => {
  if (!active) return null;
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ['#FF4B2B', '#FF416C', '#FFD700', '#00C853', '#2196F3', '#9C27B0'][i % 6],
    size: 4 + Math.random() * 6,
  }));

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            top: '-10px',
            animationDelay: `${p.delay}s`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
};

// ─── Sidebar Widget ──────────────────────────────────────
const WeeklyChallengesWidget = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useState<Record<string, ChallengeProgress>>(getStoredProgress);
  const [confetti, setConfetti] = useState(false);

  // Demo: simulate progress on click
  const handleSimulate = useCallback((challenge: Challenge) => {
    const result = incrementChallenge(challenge.id, 1);
    setProgress({ ...getStoredProgress() });

    if (result.completed) {
      setConfetti(true);
      toast({
        title: `Задание выполнено! +${challenge.points} очков 🎉`,
        description: challenge.title,
      });
      setTimeout(() => setConfetti(false), 2500);
    }
  }, [toast]);

  return (
    <>
      <Confetti active={confetti} />
      <div className="bg-card border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-yellow-500" />
            Задания недели
          </h3>
          <Link to="/challenges" className="text-[10px] text-primary hover:underline flex items-center gap-0.5">
            Все <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3">
          {WEEKLY_CHALLENGES.map(challenge => {
            const p = progress[challenge.id] || { current: 0, completed: false };
            const pct = Math.round((p.current / challenge.target) * 100);

            return (
              <button
                key={challenge.id}
                onClick={() => handleSimulate(challenge)}
                className={cn(
                  'w-full text-left rounded-lg p-2.5 transition-all duration-150 border',
                  p.completed
                    ? 'bg-primary/5 border-primary/20 opacity-75'
                    : 'bg-muted/30 border-transparent hover:border-primary/20 hover:bg-muted/50 active:scale-[0.98]'
                )}
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg">{challenge.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={cn('text-xs font-semibold', p.completed ? 'line-through text-muted-foreground' : 'text-foreground')}>
                        {challenge.title}
                      </span>
                      <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 shrink-0 ml-1">
                        <Gift className="w-2.5 h-2.5 mr-0.5" />+{challenge.points}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Progress value={pct} className="h-1.5 flex-1" />
                      <span className="text-[10px] text-muted-foreground font-medium whitespace-nowrap">
                        {p.current}/{challenge.target}
                      </span>
                    </div>
                    {p.completed && (
                      <span className="text-[10px] text-primary font-bold mt-0.5 block">✅ Выполнено!</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-[10px] text-muted-foreground mt-3 text-center">Обновляется каждый понедельник</p>
      </div>
    </>
  );
};

export default WeeklyChallengesWidget;
