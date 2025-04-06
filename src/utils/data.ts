
export interface Deal {
  id: number;
  title: string;
  description: string;
  originalPrice?: number;
  dealPrice: number;
  discount?: number;
  store: string;
  category: string;
  imageUrl: string;
  postedBy: string;
  postedAt: string;
  temperature: number;
  comments: number;
  url: string;
  isFeatured?: boolean;
}

export const categories = [
  { id: 'all', name: 'Все предложения' },
  { id: 'electronics', name: 'Электроника' },
  { id: 'fashion', name: 'Мода' },
  { id: 'home', name: 'Дом и сад' },
  { id: 'gaming', name: 'Игры' },
  { id: 'beauty', name: 'Красота' },
  { id: 'food', name: 'Еда и напитки' },
  { id: 'travel', name: 'Путешествия' },
];

export const deals: Deal[] = [
  {
    id: 1,
    title: "Samsung 75\" 4K Smart TV",
    description: "Модель прошлого года по сниженной цене. Отличное предложение для телевизора с диагональю 75 дюймов!",
    originalPrice: 1299.99,
    dealPrice: 799.99,
    discount: 38,
    store: "BestBuy",
    category: "electronics",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=Samsung+TV",
    postedBy: "dealfinder42",
    postedAt: "2 часа назад",
    temperature: 452,
    comments: 32,
    url: "https://example.com",
    isFeatured: true
  },
  {
    id: 2,
    title: "Nike Air Max - скидка 40%",
    description: "Распродажа всех моделей Nike Air Max. Ограниченное количество размеров в наличии.",
    originalPrice: 159.99,
    dealPrice: 95.99,
    discount: 40,
    store: "Nike",
    category: "fashion",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=Nike+Shoes",
    postedBy: "sneakerhead",
    postedAt: "5 часов назад",
    temperature: 312,
    comments: 18,
    url: "https://example.com",
    isFeatured: true
  },
  {
    id: 3,
    title: "PlayStation 5 Slim Console",
    description: "Снова в наличии! PS5 Slim в комплекте с игрой Spider-Man 2.",
    originalPrice: 549.99,
    dealPrice: 499.99,
    discount: 9,
    store: "GameStop",
    category: "gaming",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=PS5+Console",
    postedBy: "gamerpro99",
    postedAt: "1 день назад",
    temperature: 842,
    comments: 67,
    url: "https://example.com",
    isFeatured: true
  },
  {
    id: 4,
    title: "Dyson V11 беспроводной пылесос",
    description: "Восстановленный Dyson V11 с 2-летней гарантией. Как новый!",
    originalPrice: 599.99,
    dealPrice: 349.99,
    discount: 42,
    store: "Dyson Outlet",
    category: "home",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=Dyson+Vacuum",
    postedBy: "cleanfreak",
    postedAt: "3 дня назад",
    temperature: 215,
    comments: 24,
    url: "https://example.com"
  },
  {
    id: 5,
    title: "Apple AirPods Pro (2nd Gen)",
    description: "Самая низкая цена на AirPods Pro с шумоподавлением.",
    originalPrice: 249.99,
    dealPrice: 189.99,
    discount: 24,
    store: "Amazon",
    category: "electronics",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=AirPods+Pro",
    postedBy: "techdeals",
    postedAt: "12 часов назад",
    temperature: 567,
    comments: 41,
    url: "https://example.com"
  },
  {
    id: 6,
    title: "Instant Pot 8-Quart мультиварка",
    description: "Молниеносная скидка! 8-литровая модель со всеми аксессуарами в комплекте.",
    originalPrice: 149.99,
    dealPrice: 89.99,
    discount: 40,
    store: "Target",
    category: "home",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=Instant+Pot",
    postedBy: "chefathome",
    postedAt: "8 часов назад",
    temperature: 328,
    comments: 29,
    url: "https://example.com"
  },
  {
    id: 7,
    title: "3 месяца Xbox Game Pass Ultimate",
    description: "Цифровой код доставляется мгновенно. Только для новых подписчиков.",
    originalPrice: 44.99,
    dealPrice: 26.99,
    discount: 40,
    store: "CDKeys",
    category: "gaming",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=Xbox+Game+Pass",
    postedBy: "xboxfan22",
    postedAt: "4 часа назад",
    temperature: 183,
    comments: 12,
    url: "https://example.com"
  },
  {
    id: 8,
    title: "KitchenAid миксер",
    description: "Профессиональная модель 5Qt в красном цвете. Идеально для праздничной выпечки!",
    originalPrice: 399.99,
    dealPrice: 249.99,
    discount: 38,
    store: "Kohl's",
    category: "home",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=KitchenAid+Mixer",
    postedBy: "bakingqueen",
    postedAt: "2 дня назад",
    temperature: 402,
    comments: 35,
    url: "https://example.com"
  }
];
