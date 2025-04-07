
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Search, Ticket, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PromocodesPage = () => {
  const { toast } = useToast();
  
  // Примеры категорий промокодов
  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'electronics', name: 'Электроника' },
    { id: 'fashion', name: 'Одежда' },
    { id: 'food', name: 'Питание' },
    { id: 'home', name: 'Дом' },
    { id: 'beauty', name: 'Красота' },
    { id: 'travel', name: 'Путешествия' },
    { id: 'entertainment', name: 'Развлечения' }
  ];
  
  // Примеры промокодов
  const promocodes = [
    { 
      id: 1,
      store: 'Яндекс Маркет',
      logo: 'https://avatars.mds.yandex.net/get-market_logos/1041739/2a000001819b097cca12c4a33ef2cf31a3bf/orig',
      code: 'MARKET15',
      discount: '15%',
      description: 'Скидка 15% на первый заказ от 1500₽',
      validUntil: '30 мая 2025',
      category: 'all',
      verified: true
    },
    { 
      id: 2,
      store: 'AliExpress',
      logo: 'https://logos-download.com/wp-content/uploads/2016/06/Aliexpress_logo-700x199.png',
      code: 'NEWUSER10',
      discount: '10$',
      description: 'Скидка 10$ на первый заказ от 15$',
      validUntil: '31 декабря 2025',
      category: 'all',
      verified: true
    },
    { 
      id: 3,
      store: 'Ozon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Ozon-logo.png',
      code: 'TECHWEEK25',
      discount: 'до 25%',
      description: 'Неделя техники: скидки до 25% на электронику',
      validUntil: '15 июня 2025',
      category: 'electronics',
      verified: true
    },
    { 
      id: 4,
      store: 'М.Видео',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/M.video_logo_with_tagline.jpg/1200px-M.video_logo_with_tagline.jpg',
      code: 'MVIDEO5000',
      discount: '5000₽',
      description: 'Скидка 5000₽ при покупке от 30000₽',
      validUntil: '10 мая 2025',
      category: 'electronics',
      verified: true
    },
    { 
      id: 5,
      store: 'Lamoda',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Lamoda_logo.jpg',
      code: 'FASHION20',
      discount: '20%',
      description: 'Скидка 20% на новую коллекцию',
      validUntil: '20 июня 2025',
      category: 'fashion',
      verified: false
    }
  ];
  
  const handleCopyPromocode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Промокод скопирован",
      description: `Промокод ${code} скопирован в буфер обмена`,
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Ticket className="text-deal-red mr-2" />
          <h1 className="text-2xl font-bold">Промокоды</h1>
        </div>
        
        <div className="relative mb-8">
          <Input 
            placeholder="Найти промокод или магазин" 
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-1 overflow-x-auto flex flex-nowrap">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="rounded-sm whitespace-nowrap"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promocodes
                  .filter(promo => promo.category === category.id || category.id === 'all')
                  .map(promo => (
                    <Card key={promo.id} className="border border-gray-200 dark:border-gray-700">
                      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                        <div className="w-12 h-12 mr-4 overflow-hidden">
                          <img 
                            src={promo.logo} 
                            alt={promo.store} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base font-medium">{promo.store}</CardTitle>
                          <CardDescription>Действует до {promo.validUntil}</CardDescription>
                        </div>
                        {promo.verified && (
                          <Badge className="ml-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            Проверено
                          </Badge>
                        )}
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm">{promo.description}</p>
                        <div className="mt-4 flex items-center">
                          <div className="flex-1 rounded-l-md border border-r-0 border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Промокод:</span>
                            <div className="font-medium">{promo.code}</div>
                          </div>
                          <Button 
                            variant="outline" 
                            className="rounded-l-none border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => handleCopyPromocode(promo.code)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" className="w-full mt-2 text-deal-red border-deal-red hover:bg-red-50 dark:hover:bg-red-950">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Перейти в магазин
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default PromocodesPage;
