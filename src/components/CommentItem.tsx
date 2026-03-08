
import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ThumbsUp, ThumbsDown, Laugh, Flag, Reply, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export interface Comment {
  id: number;
  author: string;
  avatarUrl?: string;
  text: string;
  postedAt: string;
  likes: number;
  replies?: Comment[];
}

type ReactionType = 'useful' | 'funny' | 'useless';

interface StoredReaction {
  type: ReactionType;
}

const REACTION_CONFIG: { type: ReactionType; icon: typeof ThumbsUp; label: string; activeClass: string }[] = [
  { type: 'useful', icon: ThumbsUp, label: 'Полезно', activeClass: 'text-[hsl(var(--deal-success))] bg-[hsl(var(--deal-success)/0.1)]' },
  { type: 'funny', icon: Laugh, label: 'Смешно', activeClass: 'text-yellow-500 bg-yellow-500/10' },
  { type: 'useless', icon: ThumbsDown, label: 'Бесполезно', activeClass: 'text-muted-foreground bg-muted' },
];

const REPORT_REASONS = [
  'Спам или реклама',
  'Оскорбление или грубость',
  'Недостоверная информация',
  'Другое',
];

// ─── Animated count ────────────────────────────────────────
const AnimatedCount = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const from = prev.current;
    if (from === value) return;
    prev.current = value;
    const steps = 6;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplay(Math.round(from + ((value - from) * i) / steps));
      if (i >= steps) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  if (display === 0) return null;
  return <span className="text-[11px] tabular-nums">{display}</span>;
};

// ─── Reaction storage helpers ──────────────────────────────
const getReaction = (commentId: number): ReactionType | null => {
  const stored = localStorage.getItem(`comment_reaction_${commentId}`);
  if (!stored) return null;
  try {
    return (JSON.parse(stored) as StoredReaction).type;
  } catch {
    return null;
  }
};

const setReaction = (commentId: number, type: ReactionType | null) => {
  const key = `comment_reaction_${commentId}`;
  if (type === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify({ type }));
  }
};

const getReactionCounts = (commentId: number, baseLikes: number): Record<ReactionType, number> => {
  const key = `comment_reaction_counts_${commentId}`;
  const stored = localStorage.getItem(key);
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }
  // Initialize with base likes as "useful"
  return { useful: baseLikes, funny: 0, useless: 0 };
};

const saveReactionCounts = (commentId: number, counts: Record<ReactionType, number>) => {
  localStorage.setItem(`comment_reaction_counts_${commentId}`, JSON.stringify(counts));
};

const isCommentReported = (commentId: number): boolean => {
  return localStorage.getItem(`comment_reported_${commentId}`) === 'true';
};

const markCommentReported = (commentId: number) => {
  localStorage.setItem(`comment_reported_${commentId}`, 'true');
};

// ─── Comment Component ─────────────────────────────────────
const CommentItem = ({
  comment,
  depth = 0,
}: {
  comment: Comment;
  depth?: number;
}) => {
  const isMobile = useIsMobile();
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [userReaction, setUserReaction] = useState<ReactionType | null>(() => getReaction(comment.id));
  const [counts, setCounts] = useState<Record<ReactionType, number>>(() => getReactionCounts(comment.id, comment.likes));
  const [reported, setReported] = useState(() => isCommentReported(comment.id));
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleReaction = (type: ReactionType) => {
    const newCounts = { ...counts };

    if (userReaction === type) {
      // Toggle off
      newCounts[type] = Math.max(0, newCounts[type] - 1);
      setUserReaction(null);
      setReaction(comment.id, null);
    } else {
      // Remove previous
      if (userReaction) {
        newCounts[userReaction] = Math.max(0, newCounts[userReaction] - 1);
      }
      // Add new
      newCounts[type] = newCounts[type] + 1;
      setUserReaction(type);
      setReaction(comment.id, type);
    }

    setCounts(newCounts);
    saveReactionCounts(comment.id, newCounts);
  };

  const handleReport = () => {
    if (!selectedReason) return;
    markCommentReported(comment.id);
    setReported(true);
    setReportOpen(false);
    setSelectedReason(null);
  };

  return (
    <div className={cn(depth > 0 && 'ml-8 border-l-2 border-border pl-4')}>
      <div className="py-3 group/comment">
        {/* Header row */}
        <div className="flex items-center gap-2 mb-1.5">
          <Avatar className="h-6 w-6">
            <AvatarImage src={comment.avatarUrl} />
            <AvatarFallback className="text-[10px] bg-muted">
              {comment.author.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">{comment.author}</span>
          <span className="text-xs text-muted-foreground">{comment.postedAt}</span>

          {/* Report flag */}
          <div className={cn('ml-auto', !isMobile && 'opacity-0 group-hover/comment:opacity-100 transition-opacity')}>
            {reported ? (
              <span className="text-destructive" title="Жалоба отправлена">
                <Flag className="w-3.5 h-3.5 fill-current" />
              </span>
            ) : (
              <Popover open={reportOpen} onOpenChange={setReportOpen}>
                <PopoverTrigger asChild>
                  <button
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    title="Пожаловаться"
                  >
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-64 p-3">
                  <p className="text-sm font-semibold text-foreground mb-2">Причина жалобы</p>
                  <div className="space-y-1.5 mb-3">
                    {REPORT_REASONS.map(reason => (
                      <label
                        key={reason}
                        className={cn(
                          'flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm transition-colors',
                          selectedReason === reason
                            ? 'bg-destructive/10 text-destructive'
                            : 'hover:bg-muted text-foreground'
                        )}
                      >
                        <input
                          type="radio"
                          name={`report-${comment.id}`}
                          className="sr-only"
                          checked={selectedReason === reason}
                          onChange={() => setSelectedReason(reason)}
                        />
                        <div className={cn(
                          'w-3.5 h-3.5 rounded-full border-2 shrink-0 flex items-center justify-center',
                          selectedReason === reason ? 'border-destructive' : 'border-muted-foreground/40'
                        )}>
                          {selectedReason === reason && (
                            <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                          )}
                        </div>
                        {reason}
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 text-xs"
                      disabled={!selectedReason}
                      onClick={handleReport}
                    >
                      Пожаловаться
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => { setReportOpen(false); setSelectedReason(null); }}
                    >
                      Отмена
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        {/* Comment text */}
        <p className="text-sm text-foreground/90 leading-relaxed">{comment.text}</p>

        {/* Reactions + Reply row */}
        <div className="flex items-center gap-1.5 mt-2">
          {/* Reactions */}
          {REACTION_CONFIG.map(({ type, icon: Icon, label, activeClass }) => {
            const isActive = userReaction === type;
            const count = counts[type];
            return (
              <button
                key={type}
                onClick={() => handleReaction(type)}
                title={label}
                className={cn(
                  'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-sm transition-all',
                  isActive
                    ? activeClass
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="w-4 h-4" />
                <AnimatedCount value={count} />
              </button>
            );
          })}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Reply button */}
          {depth < 1 && (
            <button
              onClick={() => setShowReplyBox(!showReplyBox)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              <Reply className="w-3 h-3" /> Ответить
            </button>
          )}
        </div>

        {/* Reply box */}
        {showReplyBox && (
          <div className="mt-2 flex gap-2">
            <Textarea placeholder="Напишите ответ..." className="min-h-[60px] text-sm" />
            <Button size="sm" className="gradient-primary text-primary-foreground self-end">
              <Send className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Nested replies */}
      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
};

export default CommentItem;
