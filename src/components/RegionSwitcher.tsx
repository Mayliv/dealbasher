
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Flag } from 'lucide-react';

const RegionSwitcher: React.FC = () => {
  const { region } = useLocalization();
  
  // In a real-world scenario, these would redirect to the actual subdomains
  // For this demo, we'll just use different routes
  const handleSwitchRegion = (newRegion: 'kz' | 'ru') => {
    // In a real implementation, this would redirect to different subdomains
    // window.location.href = `https://${newRegion}.dealbasher.com`;
    
    // For demonstration purposes, we'll store the region preference in localStorage
    localStorage.setItem('dealbasher_region', newRegion);
    window.location.reload(); // Reload to apply region changes
  };

  return (
    <div className="flex items-center space-x-1">
      <Button 
        variant={region === 'kz' ? 'default' : 'outline'} 
        size="sm" 
        className={`h-7 w-8 p-0 ${region === 'kz' ? 'bg-deal-red hover:bg-deal-red/90' : ''}`}
        onClick={() => handleSwitchRegion('kz')}
        title="Казахстан - DealBasher KZ"
      >
        <span className="text-xs font-bold">KZ</span>
      </Button>
      <Button 
        variant={region === 'ru' ? 'default' : 'outline'}
        size="sm" 
        className={`h-7 w-8 p-0 ${region === 'ru' ? 'bg-deal-red hover:bg-deal-red/90' : ''}`}
        onClick={() => handleSwitchRegion('ru')}
        title="Россия - DealBasher RU"
      >
        <span className="text-xs font-bold">RU</span>
      </Button>
    </div>
  );
};

export default RegionSwitcher;
