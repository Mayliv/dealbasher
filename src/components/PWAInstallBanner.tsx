
import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallBanner: React.FC = () => {
  const isMobile = useIsMobile();
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Don't show if already dismissed or in standalone mode
    if (localStorage.getItem('pwa_banner_dismissed') || window.matchMedia('(display-mode: standalone)').matches) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Show after 30 seconds on mobile
    const timer = setTimeout(() => {
      if (isMobile) setShow(true);
    }, 30000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, [isMobile]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setShow(false);
      setDeferredPrompt(null);
    } else {
      // Fallback: show instructions for iOS
      setShow(false);
    }
    localStorage.setItem('pwa_banner_dismissed', 'true');
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('pwa_banner_dismissed', 'true');
  };

  if (!show || !isMobile) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-fade-in">
      <div className="bg-card border-2 border-primary/30 rounded-2xl p-4 shadow-xl">
        <button onClick={handleDismiss} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-3">
          <span className="text-3xl">📱</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">Добавьте DealBasher на экран телефона</p>
            <p className="text-xs text-muted-foreground mt-0.5">Для быстрого доступа к скидкам!</p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" className="gradient-primary text-primary-foreground text-xs gap-1.5" onClick={handleInstall}>
                <Download className="w-3.5 h-3.5" />
                Установить
              </Button>
              <Button size="sm" variant="ghost" className="text-xs text-muted-foreground" onClick={handleDismiss}>
                Не сейчас
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallBanner;
