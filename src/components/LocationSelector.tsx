
import React, { useState, useEffect } from 'react';
import { kazCities, ruCities } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLocalization } from '@/contexts/LocalizationContext';

const LocationSelector = () => {
  const { region } = useLocalization();
  const [selectedCity, setSelectedCity] = useState<string | null>(
    localStorage.getItem(`dealbasher_city_${region}`) || null
  );
  const { toast } = useToast();

  // Get the cities based on the current region
  const cities = region === 'kz' ? kazCities : ruCities;

  useEffect(() => {
    // When region changes, update the selected city based on that region's saved preference
    const savedCity = localStorage.getItem(`dealbasher_city_${region}`);
    setSelectedCity(savedCity);
  }, [region]);

  const handleSelectCity = (cityId: string) => {
    setSelectedCity(cityId);
    localStorage.setItem(`dealbasher_city_${region}`, cityId);
    
    toast({
      title: "Локация обновлена",
      description: `Теперь вы видите предложения для ${cities.find(c => c.id === cityId)?.name}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <MapPin className="h-4 w-4" />
          <span>
            {selectedCity 
              ? cities.find(city => city.id === selectedCity)?.name 
              : 'Выберите город'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {cities.map((city) => (
          <DropdownMenuItem
            key={city.id}
            className={selectedCity === city.id ? "bg-muted font-medium" : ""}
            onClick={() => handleSelectCity(city.id)}
          >
            {city.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocationSelector;
