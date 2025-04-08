
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, ChevronRight, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const CategoriesPage = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  // Categorized data structure to match slickdeals hierarchy
  const categoryData = [
    {
      name: "Автомобили",
      slug: "cars",
      subcategories: [
        {
          name: "Автомобили",
          slug: "automobiles",
          children: []
        },
        {
          name: "Транспортные средства",
          slug: "vehicles",
          children: []
        },
        {
          name: "Шины",
          slug: "tires",
          children: []
        },
        {
          name: "Топливо",
          slug: "fuel",
          children: []
        },
        {
          name: "Автоаксессуары",
          slug: "car-accessories",
          children: []
        },
        {
          name: "Обслуживание авто",
          slug: "car-service",
          children: []
        }
      ]
    },
    {
      name: "Бесплатное",
      slug: "free",
      subcategories: [
        {
          name: "Бесплатно",
          slug: "freebies",
          children: []
        }
      ]
    },
    {
      name: "Дом и Квартира",
      slug: "home",
      subcategories: [
        {
          name: "Дом и Квартира",
          slug: "home-apartment",
          children: []
        },
        {
          name: "Кухонные приборы",
          slug: "kitchen-appliances",
          children: []
        },
        {
          name: "Освещение",
          slug: "lighting",
          children: []
        },
        {
          name: "Мебель",
          slug: "furniture",
          children: []
        },
        {
          name: "Аксессуары для дома",
          slug: "home-accessories",
          children: []
        },
        {
          name: "Канцтовары",
          slug: "stationery",
          children: []
        },
        {
          name: "Бытовая техника",
          slug: "appliances",
          children: []
        }
      ]
    },
    {
      name: "Здоровье и Красота",
      slug: "health-beauty",
      subcategories: [
        {
          name: "Здоровье и Красота",
          slug: "health-beauty-general",
          children: []
        },
        {
          name: "Товары для взрослых",
          slug: "adult-products",
          children: []
        },
        {
          name: "Красота",
          slug: "beauty",
          children: []
        },
        {
          name: "Здоровье",
          slug: "health",
          children: []
        },
        {
          name: "Оптика",
          slug: "optics",
          children: []
        },
        {
          name: "Парфюм",
          slug: "perfume",
          children: []
        },
        {
          name: "Личный уход и гигиена",
          slug: "personal-care",
          children: []
        }
      ]
    },
    {
      name: "Интернет и Мобильная связь",
      slug: "internet-mobile",
      subcategories: [
        {
          name: "Интернет и Мобильная связь",
          slug: "internet-mobile-general",
          children: []
        },
        {
          name: "Интернет",
          slug: "internet",
          children: []
        },
        {
          name: "Мобильная связь",
          slug: "mobile",
          children: []
        }
      ]
    },
    {
      name: "Консоли и Видеоигры",
      slug: "consoles-games",
      subcategories: [
        {
          name: "Консоли и Видеоигры",
          slug: "consoles-games-general",
          children: []
        },
        {
          name: "Видеоигры",
          slug: "video-games",
          children: []
        },
        {
          name: "Nintendo Switch Lite",
          slug: "nintendo-switch-lite",
          children: []
        },
        {
          name: "Игровые ПК и Ноутбуки",
          slug: "gaming-pc-laptops",
          children: []
        },
        {
          name: "Игровые Консоли",
          slug: "gaming-consoles",
          children: []
        },
        {
          name: "Игровые аксессуары",
          slug: "gaming-accessories",
          children: []
        },
        {
          name: "Nintendo Switch",
          slug: "nintendo-switch",
          children: []
        }
      ]
    },
    {
      name: "Культура и Отдых",
      slug: "culture-leisure",
      subcategories: [
        {
          name: "Культура и Отдых",
          slug: "culture-leisure-general",
          children: []
        },
        {
          name: "Музыка",
          slug: "music",
          children: []
        },
        {
          name: "Кино и Сериалы",
          slug: "movies-series",
          children: []
        },
        {
          name: "Хобби и Творчество",
          slug: "hobbies-creativity",
          children: []
        },
        {
          name: "Книги и Журналы",
          slug: "books-magazines",
          children: []
        },
        {
          name: "Игры и Лотереи",
          slug: "games-lotteries",
          children: []
        },
        {
          name: "Билеты и Концерты",
          slug: "tickets-concerts",
          children: []
        }
      ]
    },
    {
      name: "Мода",
      slug: "fashion",
      subcategories: [
        {
          name: "Мода",
          slug: "fashion-general",
          children: []
        },
        {
          name: "Одежда",
          slug: "clothing",
          children: []
        },
        {
          name: "Аксессуары",
          slug: "accessories",
          children: []
        },
        {
          name: "Обувь",
          slug: "footwear",
          children: []
        }
      ]
    },
    {
      name: "Продукты питания и Бытовая химия",
      slug: "food-household",
      subcategories: [
        {
          name: "Продукты питания и Бытовая химия",
          slug: "food-household-general",
          children: []
        },
        {
          name: "Товары для животных",
          slug: "pet-supplies",
          children: []
        },
        {
          name: "Еда",
          slug: "food",
          children: []
        },
        {
          name: "Напитки",
          slug: "drinks",
          children: []
        },
        {
          name: "Бытовая химия",
          slug: "household-chemicals",
          children: []
        }
      ]
    },
    {
      name: "Путешествия",
      slug: "travel",
      subcategories: [
        {
          name: "Путешествия",
          slug: "travel-general",
          children: []
        },
        {
          name: "Аренда автомобилей",
          slug: "car-rental",
          children: []
        },
        {
          name: "Круизы",
          slug: "cruises",
          children: []
        },
        {
          name: "Туры",
          slug: "tours",
          children: []
        },
        {
          name: "Гостиницы и Проживание",
          slug: "hotels-accommodation",
          children: []
        },
        {
          name: "Поезда и Автобусы",
          slug: "trains-buses",
          children: []
        },
        {
          name: "Авиаперелеты",
          slug: "flights",
          children: []
        }
      ]
    },
    {
      name: "Ремонт и Строительство",
      slug: "repair-construction",
      subcategories: [
        {
          name: "Ремонт и Строительство",
          slug: "repair-construction-general",
          children: []
        },
        {
          name: "Инструменты",
          slug: "tools",
          children: []
        },
        {
          name: "Сантехника",
          slug: "plumbing",
          children: []
        },
        {
          name: "Электрика",
          slug: "electrical",
          children: []
        }
      ]
    },
    {
      name: "Семья и Дети",
      slug: "family-children",
      subcategories: [
        {
          name: "Семья и Дети",
          slug: "family-children-general",
          children: []
        },
        {
          name: "Игрушки",
          slug: "toys",
          children: []
        },
        {
          name: "Школьные принадлежности",
          slug: "school-supplies",
          children: []
        },
        {
          name: "Уход за детьми",
          slug: "child-care",
          children: []
        },
        {
          name: "Материнство и Беременность",
          slug: "maternity-pregnancy",
          children: []
        }
      ]
    },
    {
      name: "Спорт и Активный отдых",
      slug: "sports-recreation",
      subcategories: [
        {
          name: "Спорт и Активный отдых",
          slug: "sports-recreation-general",
          children: []
        },
        {
          name: "Зимний спорт",
          slug: "winter-sports",
          children: []
        },
        {
          name: "Велоспорт",
          slug: "cycling",
          children: []
        },
        {
          name: "Командный спорт",
          slug: "team-sports",
          children: []
        },
        {
          name: "Отдых на природе и Туризм",
          slug: "outdoor-tourism",
          children: []
        },
        {
          name: "Самокаты",
          slug: "scooters",
          children: []
        },
        {
          name: "Фитнес и Бег",
          slug: "fitness-running",
          children: []
        },
        {
          name: "Спортивное питание",
          slug: "sports-nutrition",
          children: []
        }
      ]
    },
    {
      name: "Услуги и Подписки",
      slug: "services-subscriptions",
      subcategories: [
        {
          name: "Услуги и Подписки",
          slug: "services-subscriptions-general",
          children: []
        },
        {
          name: "Здоровье и Велнес",
          slug: "health-wellness",
          children: []
        },
        {
          name: "Подписки",
          slug: "subscriptions",
          children: []
        },
        {
          name: "Почтовые и курьерские услуги",
          slug: "postal-courier",
          children: []
        },
        {
          name: "Курсы и Тренинги",
          slug: "courses-training",
          children: []
        },
        {
          name: "Городской транспорт",
          slug: "public-transport",
          children: []
        },
        {
          name: "Рестораны и Доставка",
          slug: "restaurants-delivery",
          children: []
        }
      ]
    },
    {
      name: "Финансы и Страхование",
      slug: "finance-insurance",
      subcategories: [
        {
          name: "Финансы и Страхование",
          slug: "finance-insurance-general",
          children: []
        },
        {
          name: "Банковские счета и Кредитные карты",
          slug: "bank-accounts-credit-cards",
          children: []
        },
        {
          name: "Страхование",
          slug: "insurance",
          children: []
        }
      ]
    },
    {
      name: "Электроника",
      slug: "electronics",
      subcategories: [
        {
          name: "Электроника",
          slug: "electronics-general",
          children: []
        },
        {
          name: "Носимая электроника",
          slug: "wearable-tech",
          children: []
        },
        {
          name: "Компьютеры и Планшеты",
          slug: "computers-tablets",
          children: []
        },
        {
          name: "Аудио и Hi-Fi",
          slug: "audio-hifi",
          children: []
        },
        {
          name: "Телефоны и Аксессуары",
          slug: "phones-accessories",
          children: []
        },
        {
          name: "ТВ и Видео",
          slug: "tv-video",
          children: []
        },
        {
          name: "Умная техника и Гаджеты",
          slug: "smart-tech-gadgets",
          children: []
        },
        {
          name: "Программы и Приложения",
          slug: "software-apps",
          children: []
        },
        {
          name: "Фото и Видеокамеры",
          slug: "photo-video-cameras",
          children: []
        },
        {
          name: "Умный дом",
          slug: "smart-home",
          children: []
        },
        {
          name: "Электронные аксессуары",
          slug: "electronic-accessories",
          children: []
        }
      ]
    }
  ];

  // Popular Categories (similar to Most Popular on slickdeals)
  const popularCategories = [
    { name: "Электроника", slug: "electronics", count: "19,473" },
    { name: "Смартфоны", slug: "phones", count: "4,321" },
    { name: "Бытовая техника", slug: "appliances", count: "3,892" },
    { name: "Компьютеры", slug: "computers", count: "3,546" },
    { name: "Мода", slug: "fashion", count: "2,975" },
    { name: "Путешествия", slug: "travel", count: "2,684" },
    { name: "Продукты питания", slug: "food", count: "2,543" },
    { name: "Дом и сад", slug: "home-garden", count: "2,345" },
    { name: "Игры", slug: "games", count: "2,218" },
    { name: "Здоровье", slug: "health", count: "1,987" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <LayoutGrid className="text-deal-red mr-2" />
          <h1 className="text-2xl font-bold">Категории</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left sidebar with categories (similar to slickdeals) */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h2 className="font-bold text-lg mb-4">Все категории</h2>
              
              <Accordion type="single" collapsible className="w-full">
                {categoryData.map((category, index) => (
                  <AccordionItem key={index} value={category.slug}>
                    <AccordionTrigger className="text-left font-medium hover:text-deal-red py-2">
                      {category.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="pl-4 space-y-2">
                        {category.subcategories.map((subcat, idx) => (
                          <li key={idx}>
                            <Link 
                              to={`/category/${subcat.slug}`} 
                              className="text-gray-700 dark:text-gray-300 hover:text-deal-red hover:underline block py-1"
                            >
                              {subcat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-3">
            {/* Popular Categories (similar to slickdeals Most Popular) */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
              <h2 className="font-bold text-xl mb-4">Популярные категории</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularCategories.map((cat, index) => (
                  <Link 
                    key={index} 
                    to={`/category/${cat.slug}`}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({cat.count})</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Explore All Categories Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="font-bold text-xl mb-6">Исследуйте все категории</h2>
              
              {categoryData.map((category, index) => (
                <div key={index} className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <Link 
                      to={`/category/${category.slug}`}
                      className="text-deal-red hover:underline text-sm"
                    >
                      Смотреть все
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.subcategories.map((subcat, idx) => (
                      <Link 
                        key={idx} 
                        to={`/category/${subcat.slug}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-deal-red hover:underline py-1"
                      >
                        {subcat.name}
                      </Link>
                    ))}
                  </div>
                  
                  {index < categoryData.length - 1 && (
                    <Separator className="my-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
