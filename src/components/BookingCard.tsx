import type { Booking } from '../types';

interface BookingCardProps {
  booking: Booking;
}

const statusConfig = {
  confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-700' },
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700' },
};

export default function BookingCard({ booking }: BookingCardProps) {
  const status = statusConfig[booking.status] ?? statusConfig.pending;
  const date = new Date(booking.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-xs text-slate-500 font-medium">Booking ID</p>
          <p className="text-slate-900 font-semibold text-sm">#{booking.id}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.className}`}>
          {status.label}
        </span>
      </div>

      <p className="text-slate-500 text-xs mb-3">{date}</p>

      <ul className="space-y-1 mb-4">
        {booking.items.map((item) => (
          <li key={item.product.id} className="flex justify-between text-sm text-slate-700">
            <span>
              {item.product.name}
              {item.quantity > 1 && (
                <span className="text-slate-400 ml-1">×{item.quantity}</span>
              )}
            </span>
            <span className="font-medium">
              ₹{((item.product.discountPrice ?? item.product.price) * item.quantity).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-slate-900 text-sm">
        <span>Total</span>
        <span>₹{booking.totalAmount.toLocaleString()}</span>
      </div>
    </div>
  );
}
