
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Проверяем, открыть ли вкладку регистрации по умолчанию
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('register') ? 'register' : 'login';
  
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '',
    username: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка на заполнение полей
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Ошибка входа",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Вход выполнен!",
      description: "Вы успешно вошли в систему",
    });
    
    // Перенаправление на главную страницу после успешного входа
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка на заполнение полей
    const { email, password, confirmPassword, username } = registerData;
    if (!email || !password || !confirmPassword || !username) {
      toast({
        title: "Ошибка регистрации",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }
    
    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      toast({
        title: "Ошибка регистрации",
        description: "Пароли не совпадают",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Регистрация выполнена!",
      description: "Вы успешно зарегистрировались",
    });
    
    // Перенаправление на главную страницу после успешной регистрации
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <form onSubmit={handleLogin} className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="user@example.com" 
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Пароль</Label>
                      <Link to="#" className="text-xs text-deal-red hover:underline">
                        Забыли пароль?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-deal-red hover:bg-deal-red/90">
                    Войти
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <form onSubmit={handleRegister} className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-username">Имя пользователя</Label>
                    <Input 
                      id="reg-username" 
                      placeholder="username123" 
                      value={registerData.username}
                      onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input 
                      id="reg-email" 
                      type="email" 
                      placeholder="user@example.com" 
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Пароль</Label>
                    <Input 
                      id="reg-password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-confirm-password">Подтвердите пароль</Label>
                    <Input 
                      id="reg-confirm-password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-deal-red hover:bg-deal-red/90">
                    Зарегистрироваться
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
