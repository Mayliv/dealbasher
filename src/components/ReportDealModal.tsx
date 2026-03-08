
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const REPORT_REASONS = [
  { id: 'expired', label: 'Сделка устарела/закончилась' },
  { id: 'wrong_price', label: 'Неверная цена' },
  { id: 'spam', label: 'Спам/реклама' },
  { id: 'duplicate', label: 'Дубликат' },
];

interface ReportDealModalProps {
  dealId: number;
  dealTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function getReportCount(dealId: number): number {
  try {
    const reports = JSON.parse(localStorage.getItem('deal_reports') || '{}');
    return reports[dealId]?.count || 0;
  } catch { return 0; }
}

export function addReport(dealId: number, reasons: string[], otherText: string) {
  try {
    const reports = JSON.parse(localStorage.getItem('deal_reports') || '{}');
    const existing = reports[dealId] || { count: 0, reports: [] };
    existing.count += 1;
    existing.reports.push({ reasons, otherText, date: new Date().toISOString() });
    reports[dealId] = existing;
    localStorage.setItem('deal_reports', JSON.stringify(reports));
  } catch {}
}

export function getAllReports(): Record<number, { count: number; reports: { reasons: string[]; otherText: string; date: string }[] }> {
  try {
    return JSON.parse(localStorage.getItem('deal_reports') || '{}');
  } catch { return {}; }
}

export function reportExpired(dealId: number) {
  addReport(dealId, ['expired'], '');
}

const ReportDealModal: React.FC<ReportDealModalProps> = ({ dealId, dealTitle, open, onOpenChange }) => {
  const { toast } = useToast();
  const [selected, setSelected] = useState<string[]>([]);
  const [otherText, setOtherText] = useState('');
  const showOther = selected.includes('other');

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const handleSubmit = () => {
    if (selected.length === 0 && !otherText.trim()) return;
    addReport(dealId, selected, otherText);
    toast({ title: '📩 Жалоба отправлена', description: 'Спасибо! Мы проверим эту сделку.' });
    setSelected([]);
    setOtherText('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>🚩 Пожаловаться на сделку</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{dealTitle}</p>
        </DialogHeader>
        <div className="space-y-3 py-2">
          {REPORT_REASONS.map(reason => (
            <label key={reason.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selected.includes(reason.id)}
                onCheckedChange={() => toggle(reason.id)}
              />
              <span className="text-sm">{reason.label}</span>
            </label>
          ))}
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox
              checked={showOther}
              onCheckedChange={() => toggle('other')}
            />
            <span className="text-sm">Другое</span>
          </label>
          {showOther && (
            <Textarea
              placeholder="Опишите проблему..."
              value={otherText}
              onChange={e => setOtherText(e.target.value)}
              className="mt-2"
              rows={3}
            />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Отмена</Button>
          <Button variant="destructive" onClick={handleSubmit} disabled={selected.length === 0 && !otherText.trim()}>
            Отправить жалобу
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDealModal;
