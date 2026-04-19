import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const navLinks = [
  { label: 'Home', urdu: 'ہوم', to: '/' },
  { label: 'Services', urdu: 'خدمات', to: '/services' },
  { label: 'About', urdu: 'ہمارے بارے میں', to: '/about' },
  { label: 'FAQ', urdu: 'سوالات', to: '/faq' },
  { label: 'Contact', urdu: 'رابطہ', to: '/contact' },
];

export default function Header() {
  const { cart } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar — phone number */}
      <div className="bg-blue-700 text-white text-xs py-1.5 px-4 flex justify-between items-center">
        <span>Karachi Medical & Diagnostic Centre, Larkana</span>
        <a href="tel:07440420020" className="flex items-center gap-1 hover:text-blue-200">
          <Phone className="w-3 h-3" /> 074-4042020
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo — bigger and more visible */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Mukhtiar Ultrasounds - Larkana"
              className="h-16 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-slate-900 font-bold text-base leading-tight">Mukhtiar Ultrasounds</p>
              <p className="text-blue-600 text-xs">Larkana, Sindh</p>
            </div>
          </Link>

          {/* Desktop nav — clean labels only */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-sm px-3 py-2 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/cart"
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              Book Now
              {itemCount > 0 && (
                <span className="bg-white text-blue-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile: cart + hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link to="/cart" className="relative text-slate-700 hover:text-blue-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="text-slate-700 hover:text-blue-600 transition-colors p-1"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — full screen overlay style */}
      {menuOpen && (
        <nav className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-between text-slate-800 hover:text-blue-600 hover:bg-blue-50 font-medium text-base px-4 py-3 rounded-xl transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.label}</span>
                <span className="text-slate-400 text-sm">{link.urdu}</span>
              </Link>
            ))}
            <Link
              to="/cart"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-4 py-3 rounded-xl transition-colors mt-2"
              onClick={() => setMenuOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" />
              Book Appointment
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
