
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import Footer from '@/components/Footer';
import { deals } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, MessageSquare, ExternalLink, Share2, Flag, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const DealDetail = () => {
  const { dealId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Находим сделку по ID
  const deal = deals.find(d => d.id === parseInt(dealId || '0'));
  
  // Если сделка не найдена, перенаправляем на 404
  if (!deal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Сделка не найдена</h1>
        <Button onClick={() => navigate('/')} variant="outline">Вернуться на главную</Button>
      </div>
    );
  }

  const handleVote = (type: 'up' | 'down') => {
    toast({
      title: type === 'up' ? "Спасибо за голос!" : "Спасибо за ваше мнение",
      description: type === 'up' 
        ? "Вы проголосовали за эту сделку" 
        : "Вы проголосовали против этой сделки",
    });
  };

  const handleGoToStore = () => {
    toast({
      title: "Переход в магазин",
      description: "Открываем страницу магазина в новой вкладке",
    });
    window.open(deal.url, '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Ссылка скопирована",
      description: "Ссылка на эту сделку скопирована в буфер обмена",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryBar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Назад
        </Button>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">{deal.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">{deal.store}</span>
                  {deal.discount && (
                    <Badge variant="outline" className="bg-deal-red text-white border-0">
                      {deal.discount}% OFF
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                {deal.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${deal.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xl font-bold text-deal-red">
                  ${deal.dealPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-4 md:flex gap-6">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <div className="aspect-square bg-muted rounded-md overflow-hidden">
                <img 
                  src={deal.imageUrl} 
                  alt={deal.title} 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <p className="text-base text-muted-foreground mb-4">
                {deal.description}
              </p>
              
              <div className="space-y-4">
                <Button 
                  className="w-full bg-deal-red hover:bg-deal-red/90 flex items-center justify-center"
                  onClick={handleGoToStore}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Перейти к сделке
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 flex items-center justify-center"
                    onClick={() => handleVote('up')}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Голосовать за ({deal.temperature})
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 flex items-center justify-center"
                    onClick={() => handleVote('down')}
                  >
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Голосовать против
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 flex items-center justify-center"
                    onClick={handleShare}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Поделиться
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 flex items-center justify-center"
                    onClick={() => toast({
                      title: "Спасибо за сообщение",
                      description: "Мы рассмотрим ваше обращение",
                    })}
                  >
                    <Flag className="mr-2 h-4 w-4" />
                    Пожаловаться
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <span className="text-base font-medium">{deal.comments} комментариев</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Опубликовано <span className="font-medium">{deal.postedBy}</span> • {deal.postedAt}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Комментарии</h2>
          </div>
          <div className="p-6">
            <p className="text-center text-muted-foreground py-4">
              Для того чтобы оставить комментарий, вам необходимо войти или зарегистрироваться
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link to="/login">
                <Button variant="outline">Войти</Button>
              </Link>
              <Link to="/login?register=true">
                <Button className="bg-deal-red hover:bg-deal-red/90">Зарегистрироваться</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DealDetail;
