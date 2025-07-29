export interface Product {
    slug: string;
    title: string;
    description: string;
    price: string;
    originalPrice?: string;
    discount?: string;
    image: string;
    category: string;
    featured: boolean;
    content: string;
    buyingLinks: BuyingLink[];
  }
  
  export interface Blog {
    slug: string;
    title: string;
    description: string;
    date: string;
    image: string;
    category: string;
    content: string;
    products?: Product[];
  }
  
  export interface BuyingLink {
    platform: string;
    url: string;
    price?: string;
  }
  
  export interface FrontMatter {
    title: string;
    description: string;
    price?: string;
    originalPrice?: string;
    discount?: string;
    image: string;
    category: string;
    featured?: boolean;
    date?: string;
    buyingLinks?: BuyingLink[];
  }