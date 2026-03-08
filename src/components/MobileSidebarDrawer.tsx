import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface MobileSidebarDrawerProps {
  children: React.ReactNode;
  triggerLabel?: string;
}

const MobileSidebarDrawer: React.FC<MobileSidebarDrawerProps> = ({ children, triggerLabel = 'Фильтры' }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) return <>{children}</>;

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 h-8"
        onClick={() => setOpen(true)}
      >
        <SlidersHorizontal className="h-3.5 w-3.5" />
        {triggerLabel}
      </Button>

      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 bg-card border-t rounded-t-2xl transition-transform duration-300 ease-out max-h-[85vh] overflow-y-auto',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-card z-10">
          <h3 className="font-semibold text-foreground">{triggerLabel}</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 pb-20">
          {children}
        </div>
      </div>
    </>
  );
};

export default MobileSidebarDrawer;
