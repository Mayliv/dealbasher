
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { categories, kazCities, ruCities } from '@/utils/data';

const ONBOARDING_KEY = 'dealbasher_onboarding_done';
const ONBOARDING_PREFS_KEY = 'dealbasher_onboarding_prefs';

export interface OnboardingPrefs {
  region: 'kz' | 'ru';
  city: string | null;
  categories: string[];
}

export function getOnboardingPrefs(): OnboardingPrefs | null {
  try {
    const raw = localStorage.getItem(ONBOARDING_PREFS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function isOnboardingDone(): boolean {
  return localStorage.getItem(ONBOARDING_KEY) === 'true';
}

interface OnboardingModalProps {
  onComplete: (prefs: OnboardingPrefs) => void;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  electronics: '📱', fashion: '👗', home: '🏠', gaming: '🎮',
  beauty: '💄', food: '🍕', travel: '✈️', local: '📍',
};

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [region, setRegion] = useState<'kz' | 'ru' | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  const totalSteps = 4;

  const goNext = () => {
    setDirection('forward');
    setStep(s => Math.min(s + 1, totalSteps - 1));
  };

  const goBack = () => {
    setDirection('back');
    setStep(s => Math.max(s - 1, 0));
  };

  const handleComplete = () => {
    const prefs: OnboardingPrefs = {
      region: region || 'ru',
      city,
      categories: selectedCats,
    };
    localStorage.setItem(ONBOARDING_KEY, 'true');
    localStorage.setItem(ONBOARDING_PREFS_KEY, JSON.stringify(prefs));
    onComplete(prefs);
  };

  const toggleCat = (id: string) => {
    setSelectedCats(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const cities = region === 'kz' ? kazCities : ruCities;
  const selectableCategories = categories.filter(c => c.id !== 'all');

  const slideClass = cn(
    'w-full transition-all duration-300 ease-out',
    direction === 'forward' ? 'animate-fade-in' : 'animate-fade-in'
  );

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md mx-auto px-6 flex flex-col items-center min-h-0 max-h-[90vh]">
        {/* Step 0: Region */}
        {step === 0 && (
          <div className={slideClass}>
            <div className="text-center mb-8">
              <span className="text-5xl mb-4 block">🌍</span>
              <h1 className="text-2xl font-extrabold text-foreground">Добро пожаловать!</h1>
              <p className="text-muted-foreground mt-2">Выбери свой регион</p>
            </div>
            <div className="flex flex-col gap-3">
              {([
                { id: 'kz' as const, flag: '🇰🇿', name: 'Казахстан', desc: 'Kaspi, Wildberries, Mechta и другие' },
                { id: 'ru' as const, flag: '🇷🇺', name: 'Россия', desc: 'Ozon, Wildberries, Яндекс Маркет и другие' },
              ]).map(r => (
                <button
                  key={r.id}
                  onClick={() => { setRegion(r.id); goNext(); }}
                  className={cn(
                    'flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200',
                    'hover:border-primary hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
                    region === r.id ? 'border-primary bg-primary/5' : 'border-border bg-card'
                  )}
                >
                  <span className="text-4xl">{r.flag}</span>
                  <div>
                    <p className="text-lg font-bold text-foreground">{r.name}</p>
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: City */}
        {step === 1 && (
          <div className={slideClass}>
            <div className="text-center mb-6">
              <span className="text-5xl mb-4 block">🏙️</span>
              <h1 className="text-2xl font-extrabold text-foreground">Выбери город</h1>
              <p className="text-muted-foreground mt-2">Для локальных предложений</p>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-[45vh] overflow-y-auto pr-1">
              {cities.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setCity(c.id); goNext(); }}
                  className={cn(
                    'p-3 rounded-xl border text-left transition-all duration-150 text-sm font-medium',
                    'hover:border-primary hover:bg-primary/5 active:scale-[0.97]',
                    city === c.id ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-card text-foreground'
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6">
              <button onClick={goBack} className="text-sm text-muted-foreground hover:text-foreground">← Назад</button>
              <button onClick={() => { setCity(null); goNext(); }} className="text-xs text-muted-foreground hover:text-foreground underline">Пропустить</button>
            </div>
          </div>
        )}

        {/* Step 2: Categories */}
        {step === 2 && (
          <div className={slideClass}>
            <div className="text-center mb-6">
              <span className="text-5xl mb-4 block">🏷️</span>
              <h1 className="text-2xl font-extrabold text-foreground">Что тебя интересует?</h1>
              <p className="text-muted-foreground mt-2">Выбери несколько категорий</p>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-[40vh] overflow-y-auto pr-1">
              {selectableCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => toggleCat(cat.id)}
                  className={cn(
                    'flex items-center gap-2.5 p-3.5 rounded-xl border text-left transition-all duration-150',
                    'hover:border-primary active:scale-[0.97]',
                    selectedCats.includes(cat.id)
                      ? 'border-primary bg-primary/10 text-primary font-semibold'
                      : 'border-border bg-card text-foreground'
                  )}
                >
                  <span className="text-xl">{CATEGORY_EMOJIS[cat.id] || '📦'}</span>
                  <span className="text-sm">{cat.name}</span>
                  {selectedCats.includes(cat.id) && <span className="ml-auto text-primary">✓</span>}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6">
              <button onClick={goBack} className="text-sm text-muted-foreground hover:text-foreground">← Назад</button>
              <div className="flex items-center gap-3">
                <button onClick={() => { setSelectedCats([]); goNext(); }} className="text-xs text-muted-foreground hover:text-foreground underline">Пропустить</button>
                {selectedCats.length > 0 && (
                  <Button size="sm" className="gradient-primary text-primary-foreground" onClick={goNext}>
                    Далее ({selectedCats.length})
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Done */}
        {step === 3 && (
          <div className={cn(slideClass, 'text-center')}>
            <span className="text-6xl mb-6 block animate-scale-in">🎉</span>
            <h1 className="text-2xl font-extrabold text-foreground mb-2">Готово!</h1>
            <p className="text-muted-foreground mb-2">Лента настроена под тебя</p>
            <div className="flex flex-wrap justify-center gap-2 my-6">
              {region && (
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                  {region === 'kz' ? '🇰🇿 Казахстан' : '🇷🇺 Россия'}
                </span>
              )}
              {city && (
                <span className="bg-secondary/10 text-secondary text-xs font-bold px-3 py-1.5 rounded-full">
                  🏙️ {cities.find(c => c.id === city)?.name}
                </span>
              )}
              {selectedCats.map(catId => {
                const cat = selectableCategories.find(c => c.id === catId);
                return cat ? (
                  <span key={catId} className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                    {CATEGORY_EMOJIS[catId] || '📦'} {cat.name}
                  </span>
                ) : null;
              })}
            </div>
            <Button size="lg" className="gradient-primary text-primary-foreground w-full text-base font-bold" onClick={handleComplete}>
              🔥 Начать охоту за скидками!
            </Button>
          </div>
        )}

        {/* Progress dots */}
        <div className="flex items-center gap-2 mt-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === step ? 'w-8 bg-primary' : i < step ? 'w-2 bg-primary/50' : 'w-2 bg-muted-foreground/30'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
