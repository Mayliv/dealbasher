
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
  const { language, setLanguage, t } = useLocalization();

  const languages = [
    { code: 'ru', name: 'Русский' },
    { code: 'kk', name: 'Қазақша' },
    { code: 'en', name: 'English' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline-block">{languages.find(l => l.code === language)?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={language === lang.code ? "bg-muted font-medium" : ""}
            onClick={() => setLanguage(lang.code as any)}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
