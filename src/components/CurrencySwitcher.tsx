
import React from 'react';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreditCard } from 'lucide-react';

const CurrencySwitcher: React.FC = () => {
  const { currency, setCurrency, t } = useLocalization();

  const currencies = [
    { code: 'KZT', name: 'Тенге (₸)' },
    { code: 'RUB', name: 'Рубль (₽)' },
    { code: 'USD', name: 'Доллар ($)' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <CreditCard className="h-4 w-4" />
          <span className="hidden md:inline-block">
            {currencies.find(c => c.code === currency)?.name.split(' ')[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            className={currency === curr.code ? "bg-muted font-medium" : ""}
            onClick={() => setCurrency(curr.code as any)}
          >
            {curr.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySwitcher;
