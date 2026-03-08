
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getAllReports } from '@/components/ReportDealModal';
import { deals } from '@/utils/data';

const ReportsQueue: React.FC = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState(getAllReports());

  useEffect(() => {
    setReports(getAllReports());
  }, []);

  const entries = Object.entries(reports)
    .map(([id, data]) => ({
      dealId: Number(id),
      deal: deals.find(d => d.id === Number(id)),
      ...data,
    }))
    .sort((a, b) => b.count - a.count);

  const handleDismiss = (dealId: number) => {
    const updated = { ...reports };
    delete updated[dealId];
    localStorage.setItem('deal_reports', JSON.stringify(updated));
    setReports(updated);
    toast({ title: 'Жалоба снята', description: `Жалобы на сделку #${dealId} удалены` });
  };

  const reasonLabels: Record<string, string> = {
    expired: 'Устарела',
    wrong_price: 'Неверная цена',
    spam: 'Спам',
    duplicate: 'Дубликат',
    other: 'Другое',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Жалобы пользователей
        </CardTitle>
        <CardDescription>Сделки с жалобами от сообщества</CardDescription>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">Нет активных жалоб</p>
        ) : (
          <div className="border rounded-md divide-y">
            {entries.map(entry => (
              <div key={entry.dealId} className="p-4 flex justify-between items-start gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">{entry.deal?.title || `Сделка #${entry.dealId}`}</p>
                    <Badge variant={entry.count >= 3 ? 'destructive' : 'secondary'}>
                      {entry.count} {entry.count === 1 ? 'жалоба' : entry.count < 5 ? 'жалобы' : 'жалоб'}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {[...new Set(entry.reports.flatMap(r => r.reasons))].map(r => (
                      <Badge key={r} variant="outline" className="text-[10px]">
                        {reasonLabels[r] || r}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Последняя: {new Date(entry.reports[entry.reports.length - 1].date).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" className="text-green-600 border-green-600" onClick={() => handleDismiss(entry.dealId)}>
                    <CheckCircle className="h-4 w-4 mr-1" /> Снять
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-600" onClick={() => handleDismiss(entry.dealId)}>
                    <XCircle className="h-4 w-4 mr-1" /> Удалить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportsQueue;
