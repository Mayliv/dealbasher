
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, MessageSquare, Tag, Bookmark } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContentModeration: React.FC = () => {
  const { toast } = useToast();
  const [pendingDeals, setPendingDeals] = useState([
    { id: 1, title: "Скидка 50% на новую коллекцию зимней одежды", user: "user123", date: "2025-04-06" },
    { id: 2, title: "Бесплатная доставка при заказе от 2000 рублей", user: "shopper42", date: "2025-04-07" },
    { id: 3, title: "Промокод на 10% скидку в онлайн-магазине", user: "dealfinder", date: "2025-04-07" }
  ]);
  
  const [pendingComments, setPendingComments] = useState([
    { id: 1, text: "Это действительно хорошая скидка?", dealId: 101, user: "skeptic123", date: "2025-04-07" },
    { id: 2, text: "Использовал промокод, всё работает!", dealId: 102, user: "verifier42", date: "2025-04-07" },
    { id: 3, text: "Магазин не принимает этот промокод больше", dealId: 103, user: "reporter33", date: "2025-04-07" }
  ]);

  const handleModerateContent = (type: string, id: number, action: 'approve' | 'reject') => {
    // В реальном приложении тут был бы API-запрос
    if (type === 'deal') {
      setPendingDeals(pendingDeals.filter(deal => deal.id !== id));
    } else if (type === 'comment') {
      setPendingComments(pendingComments.filter(comment => comment.id !== id));
    }
    
    toast({
      title: `Контент ${action === 'approve' ? 'одобрен' : 'отклонен'}`,
      description: `${type === 'deal' ? 'Предложение' : 'Комментарий'} ID: ${id}`,
      variant: action === 'approve' ? 'default' : 'destructive'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Модерация контента</CardTitle>
        <CardDescription>
          Управление предложениями и комментариями пользователей
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending" className="flex gap-2 items-center">
              <AlertTriangle className="h-4 w-4" />
              Ожидающие
              <Badge variant="destructive" className="ml-1">{pendingDeals.length + pendingComments.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="deals" className="flex gap-2 items-center">
              <Tag className="h-4 w-4" />
              Предложения
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex gap-2 items-center">
              <MessageSquare className="h-4 w-4" />
              Комментарии
            </TabsTrigger>
            <TabsTrigger value="reported" className="flex gap-2 items-center">
              <Bookmark className="h-4 w-4" />
              Отмеченные
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Предложения на модерацию ({pendingDeals.length})</h3>
              <div className="border rounded-md divide-y">
                {pendingDeals.length > 0 ? (
                  pendingDeals.map((deal) => (
                    <div key={deal.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{deal.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Пользователь: {deal.user} | Добавлено: {deal.date}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleModerateContent('deal', deal.id, 'approve')}
                          className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" /> Одобрить
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleModerateContent('deal', deal.id, 'reject')}
                          className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <XCircle className="h-4 w-4 mr-1" /> Отклонить
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-center text-muted-foreground">Нет ожидающих предложений</p>
                )}
              </div>
              
              <h3 className="text-lg font-medium mt-6">Комментарии на модерацию ({pendingComments.length})</h3>
              <div className="border rounded-md divide-y">
                {pendingComments.length > 0 ? (
                  pendingComments.map((comment) => (
                    <div key={comment.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">"{comment.text}"</p>
                        <p className="text-sm text-muted-foreground">
                          Пользователь: {comment.user} | Добавлено: {comment.date} | ID предложения: {comment.dealId}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleModerateContent('comment', comment.id, 'approve')}
                          className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" /> Одобрить
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleModerateContent('comment', comment.id, 'reject')}
                          className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <XCircle className="h-4 w-4 mr-1" /> Отклонить
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-center text-muted-foreground">Нет ожидающих комментариев</p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="deals">
            <div className="border rounded-md p-6 text-center">
              <p className="text-muted-foreground">Список всех предложений будет доступен после подключения к базе данных</p>
            </div>
          </TabsContent>
          
          <TabsContent value="comments">
            <div className="border rounded-md p-6 text-center">
              <p className="text-muted-foreground">Список всех комментариев будет доступен после подключения к базе данных</p>
            </div>
          </TabsContent>
          
          <TabsContent value="reported">
            <div className="border rounded-md p-6 text-center">
              <p className="text-muted-foreground">Отмеченный пользователями контент будет отображаться здесь</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentModeration;
