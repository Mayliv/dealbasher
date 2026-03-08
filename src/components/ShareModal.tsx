import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Deal } from '@/utils/data';
import { useLocalization } from '@/contexts/LocalizationContext';
import { toast } from '@/hooks/use-toast';
import { Copy, Check } from 'lucide-react';

interface ShareModalProps {
  deal: Deal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shareCount: number;
  onShare: () => void;
}

const generateShortId = (id: number) => {
  return id.toString(36).padStart(4, '0');
};

const ShareModal = ({ deal, open, onOpenChange, shareCount, onShare }: ShareModalProps) => {
  const { formatPrice, region } = useLocalization();
  const [copied, setCopied] = useState(false);
  const currency = region === 'kz' ? 'KZT' : region === 'ru' ? 'RUB' : 'USD';

  const shortUrl = `dealbasher.com/d/${generateShortId(deal.id)}`;
  const fullUrl = `https://${shortUrl}`;
  const shareText = `🔥 ${deal.title} — ${formatPrice(deal.dealPrice, currency)}${deal.discount ? ` (-${deal.discount}%)` : ''} → ${fullUrl}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    onShare();
    toast({ title: '✅ Скопировано!', description: 'Ссылка скопирована в буфер обмена' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTelegram = () => {
    onShare();
    window.open(`https://t.me/share/url?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleVK = () => {
    onShare();
    window.open(`https://vk.com/share.php?url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(deal.title)}`, '_blank');
  };

  const handleWhatsApp = () => {
    onShare();
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Поделиться сделкой</DialogTitle>
        </DialogHeader>

        {/* Share preview card */}
        <div className="rounded-xl border-2 border-primary/20 overflow-hidden bg-card">
          <div className="bg-gradient-to-r from-primary to-secondary p-3 flex items-center gap-2">
            <img src="/dealbasher-logo (1).png" alt="DealBasher" className="h-5 w-auto brightness-0 invert" />
            <span className="text-primary-foreground font-bold text-sm">DealBasher</span>
          </div>
          <div className="p-3 flex gap-3">
            <img
              src={deal.imageUrl}
              alt={deal.title}
              className="w-20 h-20 rounded-lg object-cover shrink-0"
            />
            <div className="min-w-0 flex flex-col justify-between">
              <p className="text-sm font-bold line-clamp-2 text-foreground">{deal.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-extrabold text-[hsl(var(--deal-success))]">
                  {formatPrice(deal.dealPrice, currency)}
                </span>
                {deal.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(deal.originalPrice, currency)}
                  </span>
                )}
              </div>
              {deal.discount && (
                <Badge className="bg-[hsl(var(--deal-success))] text-primary-foreground border-0 text-[10px] font-bold px-1.5 py-0 h-4 self-start mt-1">
                  -{deal.discount}%
                </Badge>
              )}
            </div>
          </div>
          <div className="px-3 pb-2">
            <p className="text-[10px] text-muted-foreground font-mono">{shortUrl}</p>
          </div>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleTelegram}
            className="bg-[#229ED9] hover:bg-[#229ED9]/90 text-white"
          >
            ✈️ Telegram
          </Button>
          <Button
            onClick={handleVK}
            className="bg-[#4C75A3] hover:bg-[#4C75A3]/90 text-white"
          >
            🔵 VK
          </Button>
          <Button
            onClick={handleWhatsApp}
            className="bg-[#25D366] hover:bg-[#25D366]/90 text-white"
          >
            💬 WhatsApp
          </Button>
          <Button
            variant="outline"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Скопировано!' : 'Ссылку'}
          </Button>
        </div>

        {shareCount > 0 && (
          <p className="text-center text-xs text-muted-foreground">
            Поделились {shareCount} раз
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
