
import React, { useState } from 'react';
import { kazCities } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LocationSelector = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(
    localStorage.getItem('dealbasher_city') || null
  );
  const { toast } = useToast();

  const handleSelectCity = (cityId: string) => {
    setSelectedCity(cityId);
    localStorage.setItem('dealbasher_city', cityId);
    
    toast({
      title: "Локация обновлена",
      description: `Теперь вы видите предложения для ${kazCities.find(c => c.id === cityId)?.name}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <MapPin className="h-4 w-4" />
          <span>
            {selectedCity 
              ? kazCities.find(city => city.id === selectedCity)?.name 
              : 'Выберите город'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {kazCities.map((city) => (
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
