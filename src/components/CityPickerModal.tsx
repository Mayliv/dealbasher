import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';
import { useLocalization } from '@/contexts/LocalizationContext';
import { offlineCitiesRu, offlineCitiesKz } from '@/utils/data';

const STORAGE_KEY = 'dealbasher_selected_city';

export function getSelectedCity(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

export function setSelectedCity(cityId: string) {
  localStorage.setItem(STORAGE_KEY, cityId);
}

const CityPickerModal = () => {
  const { region } = useLocalization();
  const [open, setOpen] = useState(false);
  const cities = region === 'kz' ? offlineCitiesKz : offlineCitiesRu;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const dismissed = localStorage.getItem('dealbasher_city_dismissed');
    if (!saved && !dismissed) {
      const t = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleSelect = (cityId: string) => {
    setSelectedCity(cityId);
    setOpen(false);
    window.dispatchEvent(new Event('city-changed'));
  };

  const handleDismiss = () => {
    localStorage.setItem('dealbasher_city_dismissed', 'true');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            Выберите ваш город
          </DialogTitle>
          <DialogDescription>
            Мы покажем офлайн-сделки рядом с вами
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {cities.map(city => (
            <Button
              key={city.id}
              variant="outline"
              className="h-12 text-sm font-medium hover:bg-primary/10 hover:border-primary hover:text-primary transition-colors"
              onClick={() => handleSelect(city.id)}
            >
              <MapPin className="w-4 h-4 mr-2 shrink-0" />
              {city.name}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={handleDismiss}>
            Пропустить
          </Button>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Navigation className="w-3 h-3" /> Можно изменить в настройках
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CityPickerModal;
