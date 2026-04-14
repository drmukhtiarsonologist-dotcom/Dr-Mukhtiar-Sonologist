import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import type { Product } from '../types';

const categoryBadgeClass: Record<string, string> = {
  ultrasound: 'bg-blue-100 text-blue-700',
  'lab-test': 'bg-green-100 text-green-700',
  package: 'bg-purple-100 text-purple-700',
};

const categoryLabel: Record<string, string> = {
  ultrasound: 'Ultrasound',
  'lab-test': 'Lab Test',
  package: 'Package',
};

interface ServiceCardProps {
  product: Product;
}

export default function ServiceCard({ product }: ServiceCardProps) {
  const { addToCart } = useBooking();
  const navigate = useNavigate();

  function handleAddToBooking() {
    addToCart(product);
    navigate('/cart');
  }

  return (
    <div className="bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Image / placeholder */}
      <div className="relative bg-slate-100 h-40 flex items-center justify-center">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-slate-400 text-sm">No image</span>
        )}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full ${
            categoryBadgeClass[product.category] ?? 'bg-slate-100 text-slate-600'
          }`}
        >
          {categoryLabel[product.category] ?? product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="text-slate-900 font-semibold text-sm leading-snug">{product.name}</h3>
        {product.duration && (
          <p className="text-slate-500 text-xs">{product.duration}</p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="text-blue-600 font-bold text-base">
            ₹{(product.discountPrice ?? product.price).toLocaleString()}
          </span>
          {product.discountPrice && (
            <span className="text-slate-400 text-sm line-through">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToBooking}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
        >
          Add to Booking
        </button>
      </div>
    </div>
  );
}
