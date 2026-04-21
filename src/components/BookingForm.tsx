import { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { supabase } from '../lib/supabase';

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

interface FormState {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
}

const EMPTY_FORM: FormState = { name: '', phone: '', email: '', date: '', time: '' };

export default function BookingForm() {
  const { placeBooking, cart } = useBooking();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  const total = cart.reduce(
    (sum, item) => sum + (item.product.discountPrice ?? item.product.price) * item.quantity,
    0
  );

  function validate(): boolean {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = 'Patient name is required.';
    if (!form.phone.trim()) errs.phone = 'Phone number is required.';
    if (!form.date) errs.date = 'Preferred date is required.';
    if (!form.time) errs.time = 'Preferred time is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setDbError(null);

    // Save to Supabase
    const { error } = await supabase.from('bookings').insert({
      patient_name: form.name,
      phone: form.phone,
      email: form.email || null,
      preferred_date: form.date,
      preferred_time: form.time,
      services: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.discountPrice ?? item.product.price,
      })),
      total_amount: total,
      status: 'pending',
    });

    setLoading(false);

    if (error) {
      console.error('Supabase error:', error);
      setDbError('Something went wrong. Please call us at 074-4042020.');
      return;
    }

    // Also save locally
    placeBooking({ name: form.name, phone: form.phone, email: form.email });
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <p className="text-4xl mb-3">✅</p>
        <h3 className="text-xl font-bold text-green-800 mb-2">Booking Confirmed!</h3>
        <p className="text-green-700 text-sm mb-1">
          Your appointment request has been received.
        </p>
        <p className="text-green-600 text-sm mb-4">
          We'll call you at <strong>{form.phone || 'your number'}</strong> to confirm.
        </p>
        <p className="text-slate-500 text-xs">
          For urgent queries: <a href="tel:07440420020" className="text-blue-600 hover:underline">074-4042020</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 space-y-4">
      <h2 className="text-lg font-bold text-slate-900">Patient Details / مریض کی تفصیل</h2>

      {dbError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
          {dbError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Patient Name / نام <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Phone / فون <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+92-300-0000000"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email (optional) / ای میل
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Preferred Date / تاریخ <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={form.date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Preferred Time / وقت <span className="text-red-500">*</span>
          </label>
          <select
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a time slot</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={cart.length === 0 || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Saving...
          </>
        ) : (
          'Confirm Booking / بکنگ کنفرم کریں'
        )}
      </button>
    </form>
  );
}
