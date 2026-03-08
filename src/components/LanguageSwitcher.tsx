
import React from 'react';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLocalization();

  const languages = [
    { code: 'ru' as const, name: 'Русский', short: 'RU' },
    { code: 'kk' as const, name: 'Қазақша', short: 'KZ' },
    { code: 'en' as const, name: 'English', short: 'EN' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-1 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 px-2"
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="text-xs font-bold">{languages.find(l => l.code === language)?.short}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={language === lang.code ? "bg-muted font-medium" : ""}
            onClick={() => setLanguage(lang.code)}
          >
            <span className="mr-2 font-bold text-xs text-muted-foreground">{lang.short}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
