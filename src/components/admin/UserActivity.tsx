
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, ArrowUpRight, ArrowRight, ArrowDown, Tag } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserActivity: React.FC = () => {
  // Данные для графика
  const data = [
    { name: '01.04', visits: 240, users: 120, deals: 45 },
    { name: '02.04', visits: 300, users: 150, deals: 68 },
    { name: '03.04', visits: 280, users: 140, deals: 52 },
    { name: '04.04', visits: 320, users: 180, deals: 74 },
    { name: '05.04', visits: 400, users: 210, deals: 86 },
    { name: '06.04', visits: 380, users: 195, deals: 79 },
    { name: '07.04', visits: 420, users: 230, deals: 93 },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Посетители сегодня</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">420</div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +12%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">По сравнению со вчерашним днем</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Активные пользователи</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">230</div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +5%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">По сравнению со вчерашним днем</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Новые предложения</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">26</div>
              <div className="flex items-center text-red-600 text-sm font-medium">
                <ArrowDown className="h-4 w-4 mr-1" />
                -3%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">По сравнению со вчерашним днем</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Активность за неделю</CardTitle>
          <CardDescription>
            Статистика посещений, активных пользователей и новых предложений
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visits" name="Посещения" fill="#ff6b6b" />
                <Bar dataKey="users" name="Пользователи" fill="#4dabf7" />
                <Bar dataKey="deals" name="Предложения" fill="#51cf66" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Последние действия</CardTitle>
            <CardDescription>
              Недавние действия пользователей на сайте
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <p className="font-medium">Добавлено новое предложение</p>
                <p className="text-sm text-muted-foreground">user123 • 10 минут назад</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <p className="font-medium">Добавлен комментарий</p>
                <p className="text-sm text-muted-foreground">shopper42 • 25 минут назад</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4 py-1">
                <p className="font-medium">Пользователь зарегистрировался</p>
                <p className="text-sm text-muted-foreground">newuser777 • 42 минуты назад</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-1">
                <p className="font-medium">Проголосовал за предложение</p>
                <p className="text-sm text-muted-foreground">dealfinder • 1 час назад</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm text-primary inline-flex items-center">
                Показать все <ArrowRight className="ml-1 h-3 w-3" />
              </button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Популярные категории</CardTitle>
            <CardDescription>
              Наиболее активные категории предложений
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-red-100 p-2 rounded mr-3 dark:bg-red-900/20">
                    <Tag className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium">Электроника</p>
                    <p className="text-sm text-muted-foreground">142 предложения</p>
                  </div>
                </div>
                <p className="text-sm font-medium">32%</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded mr-3 dark:bg-blue-900/20">
                    <Tag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">Одежда</p>
                    <p className="text-sm text-muted-foreground">98 предложений</p>
                  </div>
                </div>
                <p className="text-sm font-medium">24%</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded mr-3 dark:bg-green-900/20">
                    <Tag className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">Продукты</p>
                    <p className="text-sm text-muted-foreground">76 предложений</p>
                  </div>
                </div>
                <p className="text-sm font-medium">18%</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded mr-3 dark:bg-purple-900/20">
                    <Tag className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Путешествия</p>
                    <p className="text-sm text-muted-foreground">54 предложения</p>
                  </div>
                </div>
                <p className="text-sm font-medium">12%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserActivity;
