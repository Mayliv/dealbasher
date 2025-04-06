
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { categories } from '@/utils/data';
import { useToast } from '@/components/ui/use-toast';

const SubmitDeal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    dealPrice: '',
    originalPrice: '',
    category: '',
    description: '',
    store: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка на заполнение обязательных полей
    const requiredFields = ['title', 'url', 'dealPrice', 'category', 'description'];
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
    
    // Перенаправление на главную страницу после 1 секунды
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Добавить новую сделку</h1>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                  required
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
                <Button type="submit" className="w-full bg-deal-red hover:bg-deal-red/90">
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
