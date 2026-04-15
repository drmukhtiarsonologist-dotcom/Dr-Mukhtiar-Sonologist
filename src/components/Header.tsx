import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const navLinks = [
  { label: 'Home / ہوم', to: '/' },
  { label: 'Services / خدمات', to: '/services' },
  { label: 'Dashboard / ڈیش بورڈ', to: '/dashboard' },
];

export default function Header() {
  const { cart } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Mukhtiar Ultrasounds Logo" className="h-16 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart + hamburger */}
          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative text-slate-700 hover:text-blue-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-down nav */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-slate-100 px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
