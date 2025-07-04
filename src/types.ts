export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Current display price (sale price if applicable)
  originalPrice?: number; // Original price before discount, if on sale
  isSale?: boolean; // Flag to indicate if the product is on sale
  imageUrl: string;
  category: string;
  subCategory?: string; // New field for toiletries sub-categories
  rating?: number;
  reviews?: number;
  details?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
  category: string;   // <-- Add this
  readTime: string;   // <-- And this
}

export interface Experience {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  priceRange: string;
}

export enum MessageSender {
  USER = 'user',
  AI = 'ai',
  SYSTEM = 'system',
}

export interface ChatMessage {
  id:string;
  sender: MessageSender;
  text: string;
  timestamp: number;
  metadata?: Record<string, any>; // For grounding chunks or product links
}

export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
  retrievedContext?: {
    uri?: string;
    title?: string;
  };
}

// User interface for AuthContext
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string; // Optional
}

// Notification interface for NotificationContext
export interface NotificationPayload {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info'; // Type of notification
}