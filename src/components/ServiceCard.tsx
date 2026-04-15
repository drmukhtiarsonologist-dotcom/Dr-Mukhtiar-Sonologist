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

// Professional SVG illustrations per category
function CategoryIllustration({ category }: { category: string }) {
  if (category === 'ultrasound') {
    return (
      <svg viewBox="0 0 120 80" className="w-28 h-20 opacity-80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="15" width="60" height="50" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2"/>
        <rect x="18" y="23" width="44" height="34" rx="3" fill="#EFF6FF"/>
        {/* Ultrasound wave lines */}
        <path d="M22 40 Q40 28 62 40" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
        <path d="M22 45 Q40 33 62 45" stroke="#60A5FA" strokeWidth="1.5" fill="none"/>
        <path d="M22 50 Q40 38 62 50" stroke="#93C5FD" strokeWidth="1.5" fill="none"/>
        {/* Probe */}
        <rect x="72" y="30" width="10" height="28" rx="5" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1.5"/>
        <line x1="72" y1="44" x2="80" y2="44" stroke="#93C5FD" strokeWidth="1"/>
        {/* Screen dot */}
        <circle cx="40" cy="37" r="4" fill="#3B82F6" opacity="0.6"/>
      </svg>
    );
  }
  if (category === 'lab-test') {
    return (
      <svg viewBox="0 0 120 80" className="w-28 h-20 opacity-80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Test tube left */}
        <rect x="20" y="15" width="14" height="38" rx="7" fill="#D1FAE5" stroke="#10B981" strokeWidth="2"/>
        <ellipse cx="27" cy="53" rx="7" ry="5" fill="#6EE7B7"/>
        <line x1="20" y1="30" x2="34" y2="30" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2"/>
        {/* Test tube right */}
        <rect x="50" y="10" width="14" height="44" rx="7" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
        <ellipse cx="57" cy="54" rx="7" ry="5" fill="#FCD34D"/>
        {/* Microscope hint */}
        <circle cx="90" cy="40" r="14" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2"/>
        <circle cx="90" cy="40" r="7" fill="#DDD6FE"/>
        <line x1="90" y1="26" x2="90" y2="20" stroke="#7C3AED" strokeWidth="2"/>
        <line x1="84" y1="54" x2="96" y2="54" stroke="#7C3AED" strokeWidth="2"/>
      </svg>
    );
  }
  // package
  return (
    <svg viewBox="0 0 120 80" className="w-28 h-20 opacity-80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Package box */}
      <rect x="15" y="25" width="55" height="40" rx="5" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2"/>
      <line x1="42" y1="25" x2="42" y2="65" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="3 2"/>
      <line x1="15" y1="42" x2="70" y2="42" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="3 2"/>
      {/* Ribbon */}
      <path d="M30 25 Q42 18 54 25" stroke="#A78BFA" strokeWidth="2" fill="none"/>
      {/* Star / premium badge */}
      <circle cx="90" cy="35" r="16" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
      <text x="90" y="40" textAnchor="middle" fontSize="14" fill="#D97706" fontWeight="bold">★</text>
      <text x="90" y="52" textAnchor="middle" fontSize="7" fill="#92400E">PREMIUM</text>
    </svg>
  );
}

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

  const bgClass: Record<string, string> = {
    ultrasound: 'bg-blue-50',
    'lab-test': 'bg-green-50',
    package: 'bg-purple-50',
  };

  return (
    <div className="bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Illustration placeholder */}
      <div className={`relative h-40 flex items-center justify-center ${bgClass[product.category] ?? 'bg-slate-50'}`}>
        <CategoryIllustration category={product.category} />
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
            Rs. {(product.discountPrice ?? product.price).toLocaleString()}
          </span>
          {product.discountPrice && (
            <span className="text-slate-400 text-sm line-through">
              Rs. {product.price.toLocaleString()}
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
