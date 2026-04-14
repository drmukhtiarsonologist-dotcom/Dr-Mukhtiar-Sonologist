import { createContext, useContext, useEffect, useState } from 'react';
import type { CartItem, Booking, Product } from '../types';

const CART_KEY = 'mu_cart';
const BOOKINGS_KEY = 'mu_bookings';

interface PatientInfo {
  name: string;
  phone: string;
  email: string;
}

interface BookingContextValue {
  cart: CartItem[];
  bookings: Booking[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, updates: Partial<Omit<CartItem, 'product'>>) => void;
  clearCart: () => void;
  placeBooking: (patientInfo: PatientInfo) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage<CartItem[]>(CART_KEY, []));
  const [bookings, setBookings] = useState<Booking[]>(() =>
    loadFromStorage<Booking[]>(BOOKINGS_KEY, [])
  );

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }, [bookings]);

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function updateCartItem(productId: string, updates: Partial<Omit<CartItem, 'product'>>) {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, ...updates } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  function placeBooking(patientInfo: PatientInfo) {
    const totalAmount = cart.reduce((sum, item) => {
      const price = item.product.discountPrice ?? item.product.price;
      return sum + price * item.quantity;
    }, 0);

    const booking: Booking = {
      id: Date.now().toString(),
      items: [...cart],
      totalAmount,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      patientInfo,
    };

    setBookings((prev) => [...prev, booking]);
    clearCart();
  }

  return (
    <BookingContext.Provider
      value={{ cart, bookings, addToCart, removeFromCart, updateCartItem, clearCart, placeBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider');
  return ctx;
}
