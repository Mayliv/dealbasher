
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Search, MessageSquare, Store, Clock, HeartHandshake, Coins, Users, Globe, Megaphone } from "lucide-react";
import Header from '../components/Header';
import Footer from '../components/Footer';

const discussionCategories = [
  {
    title: "Вопросы",
    icon: <MessageSquare className="w-6 h-6 text-gray-800" />,
    topics: "237704",
    messages: "1705284"
  },
  {
    title: "Предложения ритейлеров",
    icon: <Store className="w-6 h-6 text-gray-800" />,
    topics: "12214",
    messages: "136401"
  },
  {
    title: "Советы по экономии",
    icon: <Coins className="w-6 h-6 text-gray-800" />,
    topics: "1494",
    messages: "36852"
  },
  {
    title: "Мегатема",
    icon: <Users className="w-6 h-6 text-gray-800" />,
    topics: "266",
    messages: "86609"
  },
  {
    title: "Разное",
    icon: <MessageSquare className="w-6 h-6 text-gray-800" />,
    topics: "229586",
    messages: "6163988"
  },
  {
    title: "Постоянные предложения",
    icon: <HeartHandshake className="w-6 h-6 text-gray-800" />,
    topics: "2100",
    messages: "13557"
  },
  {
    title: "Покупки из-за границы",
    icon: <Globe className="w-6 h-6 text-gray-800" />,
    topics: "522",
    messages: "27173"
  },
  {
    title: "Официальные объявления",
    icon: <Megaphone className="w-6 h-6 text-gray-800" />,
    topics: "127",
    messages: "324175"
  }
];

const discussionTopics = [
  {
    category: "Вопросы",
    title: "Бюджетный ноутбук для студента",
    author: "anthony212",
    time: "10 м назад",
    content: "Привет, не подскажет ли кто-нибудь, пожалуйста. Я ищу бюджетный, восстановленный ноутбук для моей дочери. Она учится в университете, так что он будет использоваться в основном для просмотра страниц и обучения...",
    replies: 0
  },
  {
    category: "Вопросы",
    title: "Space Grey Macbook",
    author: "RJ777",
    time: "56 м назад",
    content: "Привет всем, я хочу купить MacBook в основном для случайных задач и для диджеинга (скачивания песен и т.д.). Это не будет чем-то, что я использую очень часто. Мне нравится цвет космический серый...",
    replies: 0
  }
];

const Discussions: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Обсуждения</h1>
          <Button className="bg-deal-red hover:bg-deal-red/90">
            <Plus className="mr-2 h-4 w-4" /> Добавить обсуждение
          </Button>
        </div>
        
        <p className="text-gray-500 mb-8">626,582 обсуждений</p>
        
        {/* Категории обсуждений */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">Все категории обсуждений</h2>
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {discussionCategories.map((category, index) => (
              <div key={index} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                {category.icon}
                <div>
                  <h3 className="font-medium">{category.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" /> {category.topics}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" /> {category.messages}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center p-4 border-t">
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-md">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 rounded-md bg-deal-red text-white hover:bg-deal-red/90">1</Button>
              <Button variant="outline" size="sm" className="h-8 w-8 rounded-md">2</Button>
              <Button variant="outline" size="sm" className="h-8 w-8 rounded-md">3</Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-md">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.1584 3.13514C5.95694 3.32401 5.94673 3.64042 6.13559 3.84188L9.565 7.49991L6.13559 11.1579C5.94673 11.3594 5.95694 11.6758 6.1584 11.8647C6.35986 12.0535 6.67627 12.0433 6.86514 11.8419L10.6151 7.84188C10.7954 7.64955 10.7954 7.35027 10.6151 7.15794L6.86514 3.15794C6.67627 2.95648 6.35986 2.94628 6.1584 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Фильтр */}
        <div className="flex justify-between items-center mb-6">
          <div className="border-b border-deal-red">
            <Button variant="ghost" className="px-4 py-2 rounded-none border-b-2 border-deal-red text-deal-red font-medium">Все</Button>
            <Button variant="ghost" className="px-4 py-2 rounded-none">Обсуждаемые</Button>
          </div>
          <Button variant="outline" className="text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
            Фильтр
            <span className="ml-2 bg-deal-red text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">2</span>
          </Button>
        </div>
        
        {/* Обсуждения */}
        {discussionTopics.map((topic, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border mb-4 p-6">
            <div className="flex justify-between">
              <div>
                <span className="text-sm text-gray-500">{topic.category}</span>
                <h3 className="text-xl font-semibold mt-1 mb-3">{topic.title}</h3>
                <p className="text-gray-700 mb-4">{topic.content}</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium mr-2">
                    {topic.author.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{topic.author}</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{topic.time}</span>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </Button>
                  <div className="flex items-center text-gray-500">
                    <MessageSquare className="h-5 w-5 mr-1" />
                    <span>{topic.replies}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      
      <Footer />
    </div>
  );
};

export default Discussions;
