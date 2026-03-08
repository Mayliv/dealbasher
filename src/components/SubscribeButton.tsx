import React, { useState } from 'react';
import { Bell, BellOff, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface SubscribeButtonProps {
  type: 'category' | 'store';
  name: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ type, name, className, variant = 'outline', size = 'sm' }) => {
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const toggle = () => {
    setSubscribed(!subscribed);
    toast({
      title: subscribed ? 'Подписка отменена' : 'Вы подписались!',
      description: subscribed
        ? `Вы отписались от ${type === 'category' ? 'категории' : 'магазина'} "${name}"`
        : `Вы будете получать уведомления о новых сделках ${type === 'category' ? 'в категории' : 'от магазина'} "${name}"`,
    });
  };

  return (
    <Button
      variant={subscribed ? 'default' : variant}
      size={size}
      className={cn('gap-1.5 transition-all', className)}
      onClick={toggle}
    >
      {subscribed ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Подписка
        </>
      ) : (
        <>
          <Bell className="h-3.5 w-3.5" />
          Подписаться
        </>
      )}
    </Button>
  );
};

export default SubscribeButton;
