
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  // Complete list of categories from pepper.ru/groups
  const categories = [
    {
      type: "Автомобили",
      items: [
        { name: "Автомобили", slug: "cars" },
        { name: "Транспортные средства", slug: "vehicles" },
        { name: "Шины", slug: "tires" },
        { name: "Топливо", slug: "fuel" },
        { name: "Автоаксессуары", slug: "car-accessories" },
        { name: "Обслуживание авто", slug: "car-service" }
      ]
    },
    {
      type: "Бесплатно",
      items: [
        { name: "Бесплатно", slug: "free" }
      ]
    },
    {
      type: "Дом и Квартира",
      items: [
        { name: "Дом и Квартира", slug: "home" },
        { name: "Кухонные приборы", slug: "kitchen-appliances" },
        { name: "Освещение", slug: "lighting" },
        { name: "Мебель", slug: "furniture" },
        { name: "Аксессуары для дома", slug: "home-accessories" },
        { name: "Канцтовары", slug: "stationery" },
        { name: "Бытовая техника", slug: "appliances" }
      ]
    },
    {
      type: "Здоровье и Красота",
      items: [
        { name: "Здоровье и Красота", slug: "health-beauty" },
        { name: "Товары для взрослых", slug: "adult-products" },
        { name: "Красота", slug: "beauty" },
        { name: "Здоровье", slug: "health" },
        { name: "Оптика", slug: "optics" },
        { name: "Парфюм", slug: "perfume" },
        { name: "Личный уход и гигиена", slug: "personal-care" }
      ]
    },
    {
      type: "Интернет и Мобильная связь",
      items: [
        { name: "Интернет и Мобильная связь", slug: "internet-mobile" },
        { name: "Интернет", slug: "internet" },
        { name: "Мобильная связь", slug: "mobile" }
      ]
    },
    {
      type: "Консоли и Видеоигры",
      items: [
        { name: "Консоли и Видеоигры", slug: "consoles-games" },
        { name: "Видеоигры", slug: "video-games" },
        { name: "Nintendo Switch Lite", slug: "nintendo-switch-lite" },
        { name: "Игровые ПК и Ноутбуки", slug: "gaming-pc-laptops" },
        { name: "Игровые Консоли", slug: "gaming-consoles" },
        { name: "Игровые аксессуары", slug: "gaming-accessories" },
        { name: "Nintendo Switch", slug: "nintendo-switch" }
      ]
    },
    {
      type: "Культура и Отдых",
      items: [
        { name: "Культура и Отдых", slug: "culture-leisure" },
        { name: "Музыка", slug: "music" },
        { name: "Кино и Сериалы", slug: "movies-series" },
        { name: "Хобби и Творчество", slug: "hobbies-creativity" },
        { name: "Книги и Журналы", slug: "books-magazines" },
        { name: "Игры и Лотереи", slug: "games-lotteries" },
        { name: "Билеты и Концерты", slug: "tickets-concerts" }
      ]
    },
    {
      type: "Мода",
      items: [
        { name: "Мода", slug: "fashion" },
        { name: "Одежда", slug: "clothing" },
        { name: "Аксессуары", slug: "accessories" },
        { name: "Обувь", slug: "footwear" }
      ]
    },
    {
      type: "Продукты питания и Бытовая химия",
      items: [
        { name: "Продукты питания и Бытовая химия", slug: "food-household" },
        { name: "Товары для животных", slug: "pet-supplies" },
        { name: "Еда", slug: "food" },
        { name: "Напитки", slug: "drinks" },
        { name: "Бытовая химия", slug: "household-chemicals" }
      ]
    },
    {
      type: "Путешествия",
      items: [
        { name: "Путешествия", slug: "travel" },
        { name: "Аренда автомобилей", slug: "car-rental" },
        { name: "Круизы", slug: "cruises" },
        { name: "Туры", slug: "tours" },
        { name: "Гостиницы и Проживание", slug: "hotels-accommodation" },
        { name: "Поезда и Автобусы", slug: "trains-buses" },
        { name: "Авиаперелеты", slug: "flights" }
      ]
    },
    {
      type: "Ремонт и Строительство",
      items: [
        { name: "Ремонт и Строительство", slug: "repair-construction" },
        { name: "Инструменты", slug: "tools" },
        { name: "Сантехника", slug: "plumbing" },
        { name: "Электрика", slug: "electrical" }
      ]
    },
    {
      type: "Семья и Дети",
      items: [
        { name: "Семья и Дети", slug: "family-children" },
        { name: "Игрушки", slug: "toys" },
        { name: "Школьные принадлежности", slug: "school-supplies" },
        { name: "Уход за детьми", slug: "child-care" },
        { name: "Материнство и Беременность", slug: "maternity-pregnancy" }
      ]
    },
    {
      type: "Спорт и Активный отдых",
      items: [
        { name: "Спорт и Активный отдых", slug: "sports-recreation" },
        { name: "Зимний спорт", slug: "winter-sports" },
        { name: "Велоспорт", slug: "cycling" },
        { name: "Командный спорт", slug: "team-sports" },
        { name: "Отдых на природе и Туризм", slug: "outdoor-tourism" },
        { name: "Самокаты", slug: "scooters" },
        { name: "Фитнес и Бег", slug: "fitness-running" },
        { name: "Спортивное питание", slug: "sports-nutrition" }
      ]
    },
    {
      type: "Услуги и Подписки",
      items: [
        { name: "Услуги и Подписки", slug: "services-subscriptions" },
        { name: "Здоровье и Велнес", slug: "health-wellness" },
        { name: "Подписки", slug: "subscriptions" },
        { name: "Почтовые и курьерские услуги", slug: "postal-courier" },
        { name: "Курсы и Тренинги", slug: "courses-training" },
        { name: "Городской транспорт", slug: "public-transport" },
        { name: "Рестораны и Доставка", slug: "restaurants-delivery" }
      ]
    },
    {
      type: "Финансы и Страхование",
      items: [
        { name: "Финансы и Страхование", slug: "finance-insurance" },
        { name: "Банковские счета и Кредитные карты", slug: "bank-accounts-credit-cards" },
        { name: "Страхование", slug: "insurance" }
      ]
    },
    {
      type: "Электроника",
      items: [
        { name: "Электроника", slug: "electronics" },
        { name: "Носимая электроника", slug: "wearable-tech" },
        { name: "Компьютеры и Планшеты", slug: "computers-tablets" },
        { name: "Аудио и Hi-Fi", slug: "audio-hifi" },
        { name: "Телефоны и Аксессуары", slug: "phones-accessories" },
        { name: "ТВ и Видео", slug: "tv-video" },
        { name: "Умная техника и Гаджеты", slug: "smart-tech-gadgets" },
        { name: "Программы и Приложения", slug: "software-apps" },
        { name: "Фото и Видеокамеры", slug: "photo-video-cameras" },
        { name: "Умный дом", slug: "smart-home" },
        { name: "Электронные аксессуары", slug: "electronic-accessories" }
      ]
    }
  ];

  // Create a "Popular" category that includes items from various categories
  const popularCategories = {
    type: "Популярные",
    items: [
      { name: "Электроника", count: "19.4K", slug: "electronics" },
      { name: "Кэшбэк", count: "4.2K", slug: "cashback" },
      { name: "Смартфоны", count: "3.5K", slug: "smartphones" },
      { name: "Игры", count: "3.2K", slug: "games" },
      { name: "Бытовая техника", count: "2.7K", slug: "appliances" },
      { name: "Одежда", count: "2.8K", slug: "clothes" },
      { name: "Путешествия", count: "2.3K", slug: "travel" },
      { name: "Продукты", count: "3.6K", slug: "groceries" },
      { name: "Аксессуары", count: "3.0K", slug: "accessories" },
      { name: "Компьютеры", count: "2.9K", slug: "computers" }
    ]
  };

  // Add counts to categories (simulated data)
  const categoriesWithCounts = categories.map(category => {
    return {
      ...category,
      items: category.items.map(item => ({
        ...item,
        count: Math.floor(Math.random() * 2000 + 300).toString()
      }))
    };
  });

  // Create final array with popular category first
  const allCategories = [popularCategories, ...categoriesWithCounts];

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
            {categoriesWithCounts.map((category, index) => (
              <TabsTrigger 
                key={index} 
                value={category.type.toLowerCase().replace(/\s+/g, '-')} 
                className="rounded-sm whitespace-nowrap"
              >
                {category.type}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {allCategories.map((category, index) => (
            <TabsContent 
              key={index} 
              value={index === 0 ? "popular" : category.type.toLowerCase().replace(/\s+/g, '-')} 
              className="mt-0"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.items.map((item, idx) => (
                  <Link 
                    key={idx} 
                    to={`/category/${item.slug}`}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-deal-red dark:hover:border-deal-red transition-colors"
                  >
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="outline" className="ml-2 bg-gray-100 dark:bg-gray-700">
                      {item.count}
                    </Badge>
                  </Link>
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
