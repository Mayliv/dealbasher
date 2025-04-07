
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Star } from 'lucide-react';

const CategoriesPage = () => {
  // Категории с сайта pepper.ru/groups
  const categories = [
    {
      type: "Популярные",
      items: [
        { name: "Электроника", count: "19.4K", slug: "electronics" },
        { name: "Кэшбэк", count: "4.2K", slug: "cashback" },
        { name: "Продукты", count: "3.6K", slug: "groceries" },
        { name: "Смартфоны", count: "3.5K", slug: "smartphones" },
        { name: "Игры", count: "3.2K", slug: "games" },
        { name: "Аксессуары", count: "3.0K", slug: "accessories" },
        { name: "Компьютеры", count: "2.9K", slug: "computers" },
        { name: "Одежда", count: "2.8K", slug: "clothes" },
        { name: "Бытовая техника", count: "2.7K", slug: "appliances" },
        { name: "Скидки на AliExpress", count: "2.5K", slug: "aliexpress" }
      ]
    },
    {
      type: "Магазины",
      items: [
        { name: "Яндекс Маркет", count: "1.8K", slug: "yandex-market" },
        { name: "AliExpress", count: "1.6K", slug: "aliexpress" },
        { name: "Ozon", count: "1.5K", slug: "ozon" },
        { name: "Wildberries", count: "1.3K", slug: "wildberries" },
        { name: "DNS", count: "1.2K", slug: "dns" },
        { name: "М.Видео", count: "1.1K", slug: "mvideo" },
        { name: "Связной", count: "950", slug: "svyaznoy" },
        { name: "Ситилинк", count: "920", slug: "citilink" },
        { name: "Эльдорадо", count: "850", slug: "eldorado" },
        { name: "Lamoda", count: "820", slug: "lamoda" }
      ]
    },
    {
      type: "Электроника",
      items: [
        { name: "Смартфоны", count: "3.5K", slug: "smartphones" },
        { name: "Наушники", count: "1.8K", slug: "headphones" },
        { name: "Компьютеры", count: "1.7K", slug: "computers" },
        { name: "Ноутбуки", count: "1.6K", slug: "laptops" },
        { name: "Телевизоры", count: "1.5K", slug: "tvs" },
        { name: "Планшеты", count: "1.3K", slug: "tablets" },
        { name: "Умные часы", count: "1.2K", slug: "smartwatches" },
        { name: "Фотоаппараты", count: "950", slug: "cameras" },
        { name: "Мониторы", count: "920", slug: "monitors" },
        { name: "Игровые консоли", count: "900", slug: "consoles" }
      ]
    },
    {
      type: "Дом и жилье",
      items: [
        { name: "Мебель", count: "1.5K", slug: "furniture" },
        { name: "Бытовая техника", count: "1.4K", slug: "appliances" },
        { name: "Кухонные принадлежности", count: "1.2K", slug: "kitchen" },
        { name: "Постельное белье", count: "950", slug: "bedding" },
        { name: "Освещение", count: "920", slug: "lighting" },
        { name: "Ремонт", count: "900", slug: "renovation" },
        { name: "Декор", count: "850", slug: "decor" },
        { name: "Товары для ванной", count: "820", slug: "bathroom" },
        { name: "Умный дом", count: "780", slug: "smart-home" },
        { name: "Садовые товары", count: "750", slug: "garden" }
      ]
    },
    {
      type: "Еда и напитки",
      items: [
        { name: "Продукты питания", count: "2.2K", slug: "food" },
        { name: "Кофе и чай", count: "1.1K", slug: "coffee-tea" },
        { name: "Сладости", count: "950", slug: "sweets" },
        { name: "Алкоголь", count: "900", slug: "alcohol" },
        { name: "Снеки", count: "820", slug: "snacks" },
        { name: "Доставка еды", count: "780", slug: "delivery" },
        { name: "Напитки", count: "750", slug: "drinks" },
        { name: "Здоровое питание", count: "720", slug: "healthy-food" },
        { name: "Заморозка", count: "650", slug: "frozen" },
        { name: "Детское питание", count: "580", slug: "baby-food" }
      ]
    },
    {
      type: "Одежда и аксессуары",
      items: [
        { name: "Мужская одежда", count: "1.5K", slug: "men-clothes" },
        { name: "Женская одежда", count: "1.8K", slug: "women-clothes" },
        { name: "Обувь", count: "1.3K", slug: "shoes" },
        { name: "Аксессуары", count: "1.1K", slug: "accessories" },
        { name: "Спортивная одежда", count: "950", slug: "sport-clothes" },
        { name: "Детская одежда", count: "920", slug: "kids-clothes" },
        { name: "Часы", count: "750", slug: "watches" },
        { name: "Сумки", count: "730", slug: "bags" },
        { name: "Украшения", count: "680", slug: "jewelry" },
        { name: "Нижнее белье", count: "650", slug: "underwear" }
      ]
    },
    {
      type: "Красота и здоровье",
      items: [
        { name: "Косметика", count: "1.5K", slug: "cosmetics" },
        { name: "Уход за кожей", count: "1.3K", slug: "skin-care" },
        { name: "Парфюмерия", count: "1.1K", slug: "perfume" },
        { name: "Уход за волосами", count: "950", slug: "hair-care" },
        { name: "Средства гигиены", count: "920", slug: "hygiene" },
        { name: "Аптека", count: "900", slug: "pharmacy" },
        { name: "Товары для здоровья", count: "750", slug: "health" },
        { name: "Спортивное питание", count: "720", slug: "sport-nutrition" },
        { name: "Витамины", count: "680", slug: "vitamins" },
        { name: "Оборудование для красоты", count: "650", slug: "beauty-equipment" }
      ]
    },
    {
      type: "Развлечения",
      items: [
        { name: "Игры", count: "1.9K", slug: "games" },
        { name: "Подписки", count: "1.5K", slug: "subscriptions" },
        { name: "Кино", count: "1.3K", slug: "cinema" },
        { name: "Музыка", count: "1.1K", slug: "music" },
        { name: "Книги", count: "950", slug: "books" },
        { name: "Настольные игры", count: "920", slug: "board-games" },
        { name: "Билеты на мероприятия", count: "850", slug: "tickets" },
        { name: "Хобби", count: "820", slug: "hobbies" },
        { name: "Игрушки", count: "780", slug: "toys" },
        { name: "Спорт", count: "750", slug: "sport" }
      ]
    },
    {
      type: "Путешествия",
      items: [
        { name: "Авиабилеты", count: "1.5K", slug: "flights" },
        { name: "Отели", count: "1.3K", slug: "hotels" },
        { name: "Туры", count: "1.1K", slug: "tours" },
        { name: "Ж/Д билеты", count: "950", slug: "train" },
        { name: "Аренда авто", count: "850", slug: "car-rental" },
        { name: "Страховки", count: "780", slug: "insurance" },
        { name: "Экскурсии", count: "750", slug: "excursions" },
        { name: "Багаж", count: "720", slug: "luggage" },
        { name: "Кемпинг", count: "650", slug: "camping" },
        { name: "Круизы", count: "580", slug: "cruises" }
      ]
    },
    {
      type: "Финансы",
      items: [
        { name: "Кредитные карты", count: "1.2K", slug: "credit-cards" },
        { name: "Дебетовые карты", count: "1.1K", slug: "debit-cards" },
        { name: "Кэшбэк сервисы", count: "950", slug: "cashback-services" },
        { name: "Банковские вклады", count: "850", slug: "deposits" },
        { name: "Кредиты", count: "820", slug: "loans" },
        { name: "Страхование", count: "780", slug: "insurance" },
        { name: "Инвестиции", count: "750", slug: "investments" },
        { name: "Ипотека", count: "650", slug: "mortgage" },
        { name: "Мобильные банки", count: "620", slug: "mobile-banks" },
        { name: "Финансовые сервисы", count: "580", slug: "financial-services" }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <LayoutGrid className="text-deal-red mr-2" />
          <h1 className="text-2xl font-bold">Категории</h1>
        </div>
        
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-1 overflow-x-auto flex flex-nowrap">
            <TabsTrigger value="popular" className="rounded-sm">
              <Star className="w-4 h-4 mr-2" />
              Популярные
            </TabsTrigger>
            {categories.map((category, index) => (
              <TabsTrigger key={index} value={category.type.toLowerCase().replace(/\s+/g, '-')} className="rounded-sm whitespace-nowrap">
                {category.type}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="popular" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories[0].items.map((item, index) => (
                <a 
                  key={index} 
                  href={`/category/${item.slug}`}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-deal-red dark:hover:border-deal-red transition-colors"
                >
                  <span className="font-medium">{item.name}</span>
                  <Badge variant="outline" className="ml-2 bg-gray-100 dark:bg-gray-700">
                    {item.count}
                  </Badge>
                </a>
              ))}
            </div>
          </TabsContent>
          
          {categories.map((category, index) => (
            <TabsContent key={index} value={category.type.toLowerCase().replace(/\s+/g, '-')} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.items.map((item, index) => (
                  <a 
                    key={index} 
                    href={`/category/${item.slug}`}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-deal-red dark:hover:border-deal-red transition-colors"
                  >
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="outline" className="ml-2 bg-gray-100 dark:bg-gray-700">
                      {item.count}
                    </Badge>
                  </a>
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

export default CategoriesPage;
