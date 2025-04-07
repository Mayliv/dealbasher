
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Save, RefreshCw } from "lucide-react";

const SiteSettings: React.FC = () => {
  const { toast } = useToast();
  const [siteName, setSiteName] = useState('DealBasher');
  const [siteDescription, setSiteDescription] = useState('Агрегатор скидок и выгодных предложений');
  const [enableRegistration, setEnableRegistration] = useState(true);
  const [enableComments, setEnableComments] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableModeration, setEnableModeration] = useState(true);
  
  const handleSaveSettings = () => {
    // В реальном приложении здесь был бы API-запрос
    toast({
      title: "Настройки сохранены",
      description: "Изменения применены успешно",
    });
  };
  
  const handleClearCache = () => {
    // В реальном приложении здесь была бы очистка кэша
    toast({
      title: "Кэш очищен",
      description: "Кэш сайта был успешно очищен",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Основные настройки</CardTitle>
          <CardDescription>
            Настройки сайта и его функциональности
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site-name">Название сайта</Label>
            <Input
              id="site-name"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="site-description">Описание сайта</Label>
            <Textarea
              id="site-description"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="registration">Регистрация пользователей</Label>
                <p className="text-sm text-muted-foreground">
                  Разрешить новым пользователям регистрироваться
                </p>
              </div>
              <Switch
                id="registration"
                checked={enableRegistration}
                onCheckedChange={setEnableRegistration}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="comments">Комментарии</Label>
                <p className="text-sm text-muted-foreground">
                  Разрешить пользователям оставлять комментарии
                </p>
              </div>
              <Switch
                id="comments"
                checked={enableComments}
                onCheckedChange={setEnableComments}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Уведомления</Label>
                <p className="text-sm text-muted-foreground">
                  Отправлять уведомления о новом контенте
                </p>
              </div>
              <Switch
                id="notifications"
                checked={enableNotifications}
                onCheckedChange={setEnableNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="moderation">Премодерация контента</Label>
                <p className="text-sm text-muted-foreground">
                  Проверять весь контент перед публикацией
                </p>
              </div>
              <Switch
                id="moderation"
                checked={enableModeration}
                onCheckedChange={setEnableModeration}
              />
            </div>
          </div>
          
          <Button onClick={handleSaveSettings} className="mt-6">
            <Save className="mr-2 h-4 w-4" /> Сохранить настройки
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Обслуживание сайта</CardTitle>
          <CardDescription>
            Инструменты для технического обслуживания сайта
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleClearCache}>
              <RefreshCw className="mr-2 h-4 w-4" /> Очистить кэш
            </Button>
            
            <Button variant="outline" disabled>
              Резервное копирование
            </Button>
            
            <Button variant="outline" disabled>
              Проверить обновления
            </Button>
            
            <Button variant="outline" disabled>
              Режим обслуживания
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettings;
