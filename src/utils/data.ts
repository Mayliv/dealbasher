
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
  { id: 'all', name: 'All Deals' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home & Garden' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'food', name: 'Food & Drinks' },
  { id: 'travel', name: 'Travel' },
];

export const deals: Deal[] = [
  {
    id: 1,
    title: "Samsung 75\" 4K Smart TV",
    description: "Last year's model on clearance. Great price for a 75-inch TV!",
    originalPrice: 1299.99,
    dealPrice: 799.99,
    discount: 38,
    store: "BestBuy",
    category: "electronics",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=Samsung+TV",
    postedBy: "dealfinder42",
    postedAt: "2 hours ago",
    temperature: 452,
    comments: 32,
    url: "#",
    isFeatured: true
  },
  {
    id: 2,
    title: "Nike Air Max - 40% Off",
    description: "Flash sale on all Nike Air Max models. Limited sizes available.",
    originalPrice: 159.99,
    dealPrice: 95.99,
    discount: 40,
    store: "Nike",
    category: "fashion",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=Nike+Shoes",
    postedBy: "sneakerhead",
    postedAt: "5 hours ago",
    temperature: 312,
    comments: 18,
    url: "#",
    isFeatured: true
  },
  {
    id: 3,
    title: "PlayStation 5 Slim Console",
    description: "Back in stock! PS5 Slim with Spider-Man 2 bundle.",
    originalPrice: 549.99,
    dealPrice: 499.99,
    discount: 9,
    store: "GameStop",
    category: "gaming",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=PS5+Console",
    postedBy: "gamerpro99",
    postedAt: "1 day ago",
    temperature: 842,
    comments: 67,
    url: "#",
    isFeatured: true
  },
  {
    id: 4,
    title: "Dyson V11 Cordless Vacuum",
    description: "Refurbished Dyson V11 with 2-year warranty. Like new!",
    originalPrice: 599.99,
    dealPrice: 349.99,
    discount: 42,
    store: "Dyson Outlet",
    category: "home",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=Dyson+Vacuum",
    postedBy: "cleanfreak",
    postedAt: "3 days ago",
    temperature: 215,
    comments: 24,
    url: "#"
  },
  {
    id: 5,
    title: "Apple AirPods Pro (2nd Gen)",
    description: "Lowest price ever on AirPods Pro with noise cancellation.",
    originalPrice: 249.99,
    dealPrice: 189.99,
    discount: 24,
    store: "Amazon",
    category: "electronics",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=AirPods+Pro",
    postedBy: "techdeals",
    postedAt: "12 hours ago",
    temperature: 567,
    comments: 41,
    url: "#"
  },
  {
    id: 6,
    title: "Instant Pot 8-Quart Pressure Cooker",
    description: "Lightning deal! 8-quart model with all accessories included.",
    originalPrice: 149.99,
    dealPrice: 89.99,
    discount: 40,
    store: "Target",
    category: "home",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=Instant+Pot",
    postedBy: "chefathome",
    postedAt: "8 hours ago",
    temperature: 328,
    comments: 29,
    url: "#"
  },
  {
    id: 7,
    title: "3-Month Xbox Game Pass Ultimate",
    description: "Digital code delivered instantly. New subscribers only.",
    originalPrice: 44.99,
    dealPrice: 26.99,
    discount: 40,
    store: "CDKeys",
    category: "gaming",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=Xbox+Game+Pass",
    postedBy: "xboxfan22",
    postedAt: "4 hours ago",
    temperature: 183,
    comments: 12,
    url: "#"
  },
  {
    id: 8,
    title: "KitchenAid Stand Mixer",
    description: "Professional 5qt model in red. Perfect for holiday baking!",
    originalPrice: 399.99,
    dealPrice: 249.99,
    discount: 38,
    store: "Kohl's",
    category: "home",
    imageUrl: "https://placehold.co/400x300/e9e9e9/999?text=KitchenAid+Mixer",
    postedBy: "bakingqueen",
    postedAt: "2 days ago",
    temperature: 402,
    comments: 35,
    url: "#"
  }
];
