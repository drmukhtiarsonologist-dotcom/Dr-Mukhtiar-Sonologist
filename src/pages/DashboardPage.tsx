import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BookingCard from '../components/BookingCard';
import { useBooking } from '../context/BookingContext';
import { ClipboardList } from 'lucide-react';

export default function DashboardPage() {
  const { bookings } = useBooking();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <ClipboardList className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-slate-700 mb-2">No bookings yet.</p>
            <p className="text-slate-500 mb-8">Book your first test to get started.</p>
            <Link
              to="/services"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {[...bookings].reverse().map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
