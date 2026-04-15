import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import CartItem from '../components/CartItem';
import BookingForm from '../components/BookingForm';
import { useBooking } from '../context/BookingContext';
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cart } = useBooking();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountTotal = cart.reduce(
    (sum, item) =>
      sum + (item.product.discountPrice ? (item.product.price - item.product.discountPrice) * item.quantity : 0),
    0
  );
  const total = subtotal - discountTotal;

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
          <p className="text-slate-500 mb-8">Add some tests to get started.</p>
          <Link
            to="/services"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse Services
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Cart</h1>

        <div className="space-y-3 mb-6">
          {cart.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal / کل رقم</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            {discountTotal > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount / رعایت</span>
                <span>−Rs. {discountTotal.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-slate-900 text-base">
              <span>Total / کل</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <BookingForm />
      </div>
    </Layout>
  );
}
