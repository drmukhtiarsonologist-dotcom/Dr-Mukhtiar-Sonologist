export type Category = 'ultrasound' | 'lab-test' | 'package' | 'all';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  price: number;
  discountPrice?: number;
  duration?: string;
  description: string;
  prepInstructions: string;
  tags: string[];
  featured: boolean;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  appointmentDate?: string;
  appointmentTime?: string;
  patientName?: string;
}

export interface Booking {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'confirmed' | 'pending';
  createdAt: string;
  patientInfo: {
    name: string;
    phone: string;
    email: string;
  };
}
