import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm = () => {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast({ title: "Ошибка", description: "Заполните все поля", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await signIn(data.email, data.password);
    setLoading(false);
    if (error) {
      toast({ title: "Ошибка входа", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Вход выполнен!", description: "Вы успешно вошли в систему" });
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="user@example.com" value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })} required />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Пароль</Label>
          <Link to="#" className="text-xs text-deal-red hover:underline">Забыли пароль?</Link>
        </div>
        <Input id="password" type="password" placeholder="••••••••" value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })} required />
      </div>
      <Button type="submit" className="w-full bg-deal-red hover:bg-deal-red/90" disabled={loading}>
        {loading ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  );
};

const RegisterForm = () => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '', confirmPassword: '', username: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.email || !data.password || !data.confirmPassword || !data.username) {
      toast({ title: "Ошибка", description: "Заполните все поля", variant: "destructive" });
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast({ title: "Ошибка", description: "Пароли не совпадают", variant: "destructive" });
      return;
    }
    if (data.password.length < 6) {
      toast({ title: "Ошибка", description: "Пароль должен быть не менее 6 символов", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await signUp(data.email, data.password, data.username);
    setLoading(false);
    if (error) {
      toast({ title: "Ошибка регистрации", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Регистрация выполнена!", description: "Проверьте почту для подтверждения" });
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reg-username">Имя пользователя</Label>
        <Input id="reg-username" placeholder="username123" value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-email">Email</Label>
        <Input id="reg-email" type="email" placeholder="user@example.com" value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-password">Пароль</Label>
        <Input id="reg-password" type="password" placeholder="••••••••" value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-confirm-password">Подтвердите пароль</Label>
        <Input id="reg-confirm-password" type="password" placeholder="••••••••" value={data.confirmPassword}
          onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} required />
      </div>
      <Button type="submit" className="w-full bg-deal-red hover:bg-deal-red/90" disabled={loading}>
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
};

const Login = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('register') ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState(defaultTab);

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
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <LoginForm />
              </div>
            </TabsContent>
            <TabsContent value="register">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <RegisterForm />
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
