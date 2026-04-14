import { Trash2, Plus, Minus } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateCartItem, removeFromCart } = useBooking();
  const { product, quantity } = item;
  const effectivePrice = product.discountPrice ?? product.price;

  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex items-center gap-4">
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-slate-900 font-semibold text-sm leading-snug truncate">
          {product.name}
        </p>
        <p className="text-blue-600 font-bold mt-1">
          ₹{effectivePrice.toLocaleString()}
          {product.discountPrice && (
            <span className="text-slate-400 font-normal text-xs line-through ml-2">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </p>
      </div>

      {/* Quantity stepper */}
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            quantity > 1
              ? updateCartItem(product.id, { quantity: quantity - 1 })
              : removeFromCart(product.id)
          }
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-6 text-center text-slate-900 font-medium text-sm">{quantity}</span>
        <button
          onClick={() => updateCartItem(product.id, { quantity: quantity + 1 })}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Line total */}
      <p className="text-slate-900 font-bold text-sm w-20 text-right">
        ₹{(effectivePrice * quantity).toLocaleString()}
      </p>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(product.id)}
        className="text-slate-400 hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
