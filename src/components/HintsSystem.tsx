
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

const HINTS_KEY = 'dealbasher_hints_seen';
const ONBOARDING_KEY = 'dealbasher_onboarding_tooltips_done';
const VISIT_COUNT_KEY = 'dealbasher_visit_count';

// ─── Hint storage ──────────────────────────────────────────
function getSeenHints(): string[] {
  try { return JSON.parse(localStorage.getItem(HINTS_KEY) || '[]'); } catch { return []; }
}

function markHintSeen(id: string) {
  const seen = getSeenHints();
  if (!seen.includes(id)) {
    seen.push(id);
    localStorage.setItem(HINTS_KEY, JSON.stringify(seen));
  }
}

function isHintSeen(id: string): boolean {
  return getSeenHints().includes(id);
}

function getVisitCount(): number {
  const count = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0', 10);
  return count;
}

function incrementVisitCount(): number {
  const count = getVisitCount() + 1;
  localStorage.setItem(VISIT_COUNT_KEY, String(count));
  return count;
}

function isOnboardingDone(): boolean {
  return localStorage.getItem(ONBOARDING_KEY) === 'true';
}

function markOnboardingDone() {
  localStorage.setItem(ONBOARDING_KEY, 'true');
}

// ─── First-time hint bubble ────────────────────────────────
export const FirstTimeHint = ({
  id,
  children,
  position = 'top',
}: {
  id: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isHintSeen(id)) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [id]);

  const dismiss = () => {
    setVisible(false);
    markHintSeen(id);
  };

  if (!visible) return null;

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-[hsl(0,0%,10%)] border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[hsl(0,0%,10%)] border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-[hsl(0,0%,10%)] border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-[hsl(0,0%,10%)] border-y-transparent border-l-transparent',
  };

  return (
    <div
      className={cn(
        'absolute z-50 animate-fade-in',
        positionClasses[position]
      )}
    >
      <div
        className="bg-[hsl(0,0%,10%)] text-white text-xs rounded-lg px-3 py-2 shadow-lg max-w-[220px] leading-relaxed cursor-pointer whitespace-normal"
        onClick={dismiss}
      >
        {children}
        <div className="text-[10px] text-white/50 mt-1">Нажми чтобы закрыть</div>
      </div>
      <div className={cn('absolute w-0 h-0 border-[6px]', arrowClasses[position])} />
    </div>
  );
};

// ─── Pulse animation for submit button ─────────────────────
export const usePulseSubmit = () => {
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    const count = incrementVisitCount();
    setShouldPulse(count <= 3);
  }, []);

  return shouldPulse;
};

// ─── Onboarding tooltip sequence ───────────────────────────
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

const ONBOARDING_STEPS: { target: string; text: string; position: TooltipPosition }[] = [
  {
    target: '[data-onboarding="feed"]',
    text: '👋 Это лента сделок. Голосуй стрелками — горячие поднимутся выше!',
    position: 'right',
  },
  {
    target: '[data-onboarding="submit"]',
    text: '🔥 Нашёл скидку? Добавь её сюда и помоги другим сэкономить!',
    position: 'bottom',
  },
  {
    target: '[data-onboarding="region"]',
    text: '🌍 Выбери свой регион чтобы видеть релевантные сделки',
    position: 'bottom',
  },
];

export const OnboardingTooltips = () => {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (isOnboardingDone()) return;
    // Wait for page to settle
    const t = setTimeout(() => {
      setDone(false);
      setVisible(true);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (done || !visible) return;
    const currentStep = ONBOARDING_STEPS[step];
    if (!currentStep) return;

    const el = document.querySelector(currentStep.target);
    if (!el) {
      // Skip to next or finish
      if (step < ONBOARDING_STEPS.length - 1) {
        setStep(s => s + 1);
      } else {
        finish();
      }
      return;
    }

    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let top = 0;
    let left = 0;

    switch (currentStep.position) {
      case 'bottom':
        top = rect.bottom + scrollY + 12;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case 'right':
        top = rect.top + scrollY + rect.height / 2;
        left = rect.right + scrollX + 12;
        break;
      case 'top':
        top = rect.top + scrollY - 12;
        left = rect.left + scrollX + rect.width / 2;
        break;
      case 'left':
        top = rect.top + scrollY + rect.height / 2;
        left = rect.left + scrollX - 12;
        break;
    }

    setPos({ top, left });
  }, [step, visible, done]);

  const finish = useCallback(() => {
    markOnboardingDone();
    setVisible(false);
    setDone(true);
  }, []);

  const next = () => {
    if (step < ONBOARDING_STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      finish();
    }
  };

  if (done || !visible) return null;

  const currentStep = ONBOARDING_STEPS[step];

  return (
    <>
      {/* Dim overlay */}
      <div className="fixed inset-0 bg-black/30 z-[9998]" onClick={finish} />

      {/* Tooltip */}
      <div
        className="absolute z-[9999] animate-fade-in"
        style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, 0)' }}
      >
        <div className="bg-[hsl(0,0%,10%)] text-white rounded-xl px-4 py-3 shadow-2xl max-w-[280px]">
          <p className="text-sm leading-relaxed mb-3">{currentStep.text}</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {ONBOARDING_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-colors',
                    i === step ? 'bg-primary' : 'bg-white/30'
                  )}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
            >
              {step < ONBOARDING_STEPS.length - 1 ? 'Далее →' : 'Понятно, начать! →'}
            </button>
          </div>
        </div>
        {/* Arrow */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-[hsl(0,0%,10%)]" />
      </div>
    </>
  );
};

export { isHintSeen, markHintSeen, getVisitCount };
