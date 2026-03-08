
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { categories, offlineCitiesRu, offlineCitiesKz } from '@/utils/data';
import { useToast } from '@/components/ui/use-toast';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Wifi, Store } from 'lucide-react';

const SubmitDeal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { region } = useLocalization();
  
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    dealPrice: '',
    originalPrice: '',
    category: '',
    description: '',
    store: '',
    isOffline: false,
    storeAddress: '',
    city: '',
  });

  const cities = region === 'kz' ? offlineCitiesKz : offlineCitiesRu;

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['title', 'url', 'dealPrice', 'category', 'description'];
    if (formData.isOffline) {
      requiredFields.push('storeAddress', 'city');
    }
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Пожалуйста, заполните все обязательные поля",
        description: "Некоторые обязательные поля не заполнены",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Сделка отправлена!",
      description: "Ваша сделка успешно отправлена и находится на модерации",
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-foreground">Добавить новую сделку</h1>
          
          <div className="bg-card rounded-xl border overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Online / Offline toggle */}
              <div className="space-y-2">
                <Label>Тип сделки</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={!formData.isOffline ? 'default' : 'outline'}
                    className={`flex-1 h-11 gap-2 ${!formData.isOffline ? 'gradient-primary text-primary-foreground' : ''}`}
                    onClick={() => updateFormData('isOffline', false)}
                  >
                    <Wifi className="w-4 h-4" /> Онлайн
                  </Button>
                  <Button
                    type="button"
                    variant={formData.isOffline ? 'default' : 'outline'}
                    className={`flex-1 h-11 gap-2 ${formData.isOffline ? 'bg-deal-success text-primary-foreground hover:bg-deal-success/90' : ''}`}
                    onClick={() => updateFormData('isOffline', true)}
                  >
                    <Store className="w-4 h-4" /> Офлайн в магазине
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Название сделки *</Label>
                <Input 
                  id="title" 
                  placeholder="Введите заголовок сделки" 
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">Ссылка на сделку *</Label>
                <Input 
                  id="url" 
                  type="url" 
                  placeholder="https://" 
                  value={formData.url}
                  onChange={(e) => updateFormData('url', e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dealPrice">Цена со скидкой *</Label>
                  <Input 
                    id="dealPrice" 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="0.00" 
                    value={formData.dealPrice}
                    onChange={(e) => updateFormData('dealPrice', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Обычная цена</Label>
                  <Input 
                    id="originalPrice" 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="0.00" 
                    value={formData.originalPrice}
                    onChange={(e) => updateFormData('originalPrice', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Категория *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => updateFormData('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat.id !== 'all').map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store">Магазин</Label>
                <Input 
                  id="store" 
                  placeholder="Название магазина" 
                  value={formData.store}
                  onChange={(e) => updateFormData('store', e.target.value)}
                />
              </div>

              {/* Offline-specific fields */}
              {formData.isOffline && (
                <div className="space-y-4 p-4 rounded-lg bg-deal-success/5 border border-deal-success/20">
                  <div className="flex items-center gap-2 text-sm font-medium text-deal-success">
                    <Store className="w-4 h-4" /> Детали офлайн-сделки
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Город *</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => updateFormData('city', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите город" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map(city => (
                          <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Адрес магазина *</Label>
                    <Input
                      id="storeAddress"
                      placeholder="ул. Примерная, 10"
                      value={formData.storeAddress}
                      onChange={(e) => updateFormData('storeAddress', e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="description">Описание сделки *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Расскажите подробнее о сделке..." 
                  className="min-h-[120px]" 
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  required
                />
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full gradient-primary text-primary-foreground font-bold">
                  Отправить сделку
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubmitDeal;
