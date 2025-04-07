
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  MessageSquare,
  FileCode,
  Activity,
  AlertTriangle,
  Settings,
  Eye,
  EyeOff,
  BarChart3,
  AlertCircle,
  Bell,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminLogin from "@/components/admin/AdminLogin";
import ContentModeration from "@/components/admin/ContentModeration";
import UserActivity from "@/components/admin/UserActivity";
import SiteSettings from "@/components/admin/SiteSettings";
import CodeEditor from "@/components/admin/CodeEditor";
import { useToast } from "@/components/ui/use-toast";

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  
  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      toast({
        title: "Успешный вход",
        description: "Вы вошли в панель администратора",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: "Неверный логин или пароль",
      });
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Панель администратора</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>
              Выйти
            </Button>
          </div>
        </div>
        
        <Alert className="mb-6 border-amber-500/50 bg-amber-500/10">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertTitle>Внимание</AlertTitle>
          <AlertDescription>
            В системе обнаружено 3 новых сообщения требующих модерации.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList className="grid grid-cols-5 gap-2">
            <TabsTrigger value="activity" className="flex gap-2 items-center">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Активность</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex gap-2 items-center">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Пользователи</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex gap-2 items-center">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Контент</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex gap-2 items-center">
              <FileCode className="h-4 w-4" />
              <span className="hidden sm:inline">Код</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex gap-2 items-center">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Настройки</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="space-y-4">
            <UserActivity />
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Управление пользователями</CardTitle>
                <CardDescription>
                  Просмотр и управление учетными записями пользователей
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <Input 
                      placeholder="Поиск пользователей..." 
                      className="max-w-sm" 
                    />
                    <Button variant="outline">Экспорт данных</Button>
                  </div>
                  <div className="border rounded-md p-4">
                    <p className="text-center text-muted-foreground">
                      Функция будет доступна после подключения к базе данных
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <ContentModeration />
          </TabsContent>
          
          <TabsContent value="code" className="space-y-4">
            <CodeEditor />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <SiteSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
