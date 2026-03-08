
import React, { useState, useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, children }) => {
  const isMobile = useIsMobile();
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const THRESHOLD = 80;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isMobile || isRefreshing) return;
    const scrollTop = containerRef.current?.closest('[data-pull-scroll]')?.scrollTop ?? window.scrollY;
    if (scrollTop <= 0) {
      touchStartY.current = e.touches[0].clientY;
    }
  }, [isMobile, isRefreshing]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isMobile || isRefreshing || touchStartY.current === null) return;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (dy > 0) {
      setPullDistance(Math.min(dy * 0.5, 120));
    }
  }, [isMobile, isRefreshing]);

  const handleTouchEnd = useCallback(async () => {
    if (!isMobile || isRefreshing) return;
    if (pullDistance >= THRESHOLD) {
      setIsRefreshing(true);
      setPullDistance(50);
      await onRefresh();
      setIsRefreshing(false);
    }
    setPullDistance(0);
    touchStartY.current = null;
  }, [isMobile, isRefreshing, pullDistance, onRefresh]);

  if (!isMobile) return <>{children}</>;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className={cn(
          'flex items-center justify-center overflow-hidden transition-all duration-200',
          isRefreshing && 'animate-pulse'
        )}
        style={{ height: pullDistance > 10 ? pullDistance : 0, opacity: pullDistance / THRESHOLD }}
      >
        <span
          className="text-2xl transition-transform duration-200"
          style={{
            transform: `rotate(${(pullDistance / THRESHOLD) * 360}deg) scale(${0.5 + (pullDistance / THRESHOLD) * 0.5})`,
          }}
        >
          🔥
        </span>
        {pullDistance >= THRESHOLD && !isRefreshing && (
          <span className="text-xs text-muted-foreground ml-2">Отпустите для обновления</span>
        )}
        {isRefreshing && (
          <span className="text-xs text-muted-foreground ml-2">Обновление...</span>
        )}
      </div>
      {children}
    </div>
  );
};

export default PullToRefresh;
