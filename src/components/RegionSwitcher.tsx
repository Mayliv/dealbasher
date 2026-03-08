
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/contexts/LocalizationContext';

const RegionSwitcher: React.FC = () => {
  const { region } = useLocalization();
  
  const handleSwitchRegion = (newRegion: 'kz' | 'ru') => {
    localStorage.setItem('dealbasher_region', newRegion);
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
      <Button 
        variant="ghost"
        size="sm" 
        className={`h-7 px-2 gap-1 text-xs font-bold rounded-md transition-all ${
          region === 'kz' 
            ? 'bg-white/20 text-primary-foreground shadow-sm' 
            : 'text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/10'
        }`}
        onClick={() => handleSwitchRegion('kz')}
        title="Казахстан"
      >
        <span className="text-sm">🇰🇿</span>
        <span>KZ</span>
      </Button>
      <Button 
        variant="ghost"
        size="sm" 
        className={`h-7 px-2 gap-1 text-xs font-bold rounded-md transition-all ${
          region === 'ru' 
            ? 'bg-white/20 text-primary-foreground shadow-sm' 
            : 'text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/10'
        }`}
        onClick={() => handleSwitchRegion('ru')}
        title="Россия"
      >
        <span className="text-sm">🇷🇺</span>
        <span>RU</span>
      </Button>
    </div>
  );
};

export default RegionSwitcher;
