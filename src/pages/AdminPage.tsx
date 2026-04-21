import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LogOut, RefreshCw, Calendar, Phone, Mail, Clock, Package, TrendingUp } from 'lucide-react';

const ADMIN_PASSWORD = 'Mukhtiar123@';

interface BookingRow {
  id: string;
  patient_name: string;
  phone: string;
  email: string | null;
  preferred_date: string;
  preferred_time: string;
  services: { id: string; name: string; quantity: number; price: number }[];
  total_amount: number;
  status: string;
  created_at: string;
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1');
      onLogin();
    } else {
      setError('Incorrect password. Try again.');
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Mukhtiar Ultrasounds" className="h-16 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm">Mukhtiar Ultrasounds</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] ?? 'bg-slate-100 text-slate-700'}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// Build WhatsApp confirmation message
function buildWhatsAppMsg(booking: BookingRow, status: string): string {
  const serviceList = booking.services.map((s) => `• ${s.name}`).join('\n');
  if (status === 'confirmed') {
    return encodeURIComponent(
      `السلام علیکم ${booking.patient_name}،\n\nآپ کی اپوائنٹمنٹ کنفرم ہو گئی ہے۔\n\n` +
      `Dear ${booking.patient_name},\nYour appointment has been CONFIRMED.\n\n` +
      `📅 Date: ${booking.preferred_date}\n⏰ Time: ${booking.preferred_time}\n\n` +
      `Services:\n${serviceList}\n\n` +
      `💰 Total: Rs. ${booking.total_amount.toLocaleString()}\n\n` +
      `📍 Karachi Medical & Diagnostic Centre\nNear Ghinti Phatak, Larkana\n📞 074-4042020\n\n` +
      `مختیار الٹراساؤنڈ - لاڑکانہ`
    );
  }
  if (status === 'cancelled') {
    return encodeURIComponent(
      `السلام علیکم ${booking.patient_name}،\n\nافسوس کے ساتھ آپ کی اپوائنٹمنٹ منسوخ کر دی گئی ہے۔\n\n` +
      `Dear ${booking.patient_name},\nYour appointment has been cancelled.\n` +
      `Please call 074-4042020 to reschedule.\n\nمختیار الٹراساؤنڈ - لاڑکانہ`
    );
  }
  return encodeURIComponent(`السلام علیکم ${booking.patient_name}، آپ کی اپوائنٹمنٹ مکمل ہو گئی۔ شکریہ!\nDear ${booking.patient_name}, your appointment is completed. Thank you!\nمختیار الٹراساؤنڈ - لاڑکانہ`);
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');
  const [search, setSearch] = useState('');
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

  async function fetchBookings() {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setBookings(data as BookingRow[]);
    setLoading(false);
  }

  async function updateStatus(booking: BookingRow, status: string) {
    const { error } = await supabase.from('bookings').update({ status }).eq('id', booking.id);
    if (error) {
      setUpdateMsg('❌ Failed to update. Check Supabase RLS policy.');
      return;
    }
    setBookings((prev) => prev.map((b) => b.id === booking.id ? { ...b, status } : b));
    setUpdateMsg(`✅ Status updated to ${status}`);
    setTimeout(() => setUpdateMsg(null), 3000);

    // Open WhatsApp with pre-filled message
    const phone = booking.phone.replace(/[^0-9]/g, '');
    const msg = buildWhatsAppMsg(booking, status);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  }

  useEffect(() => {
    if (authed) fetchBookings();
  }, [authed]);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const filtered = bookings.filter((b) => {
    const matchFilter = filter === 'all' || b.status === filter;
    const matchSearch = search === '' ||
      b.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search);
    return matchFilter && matchSearch;
  });

  // Revenue calculations
  const today = new Date().toISOString().split('T')[0];
  const thisMonth = new Date().toISOString().slice(0, 7);

  const todayRevenue = bookings
    .filter((b) => b.status !== 'cancelled' && b.created_at.startsWith(today))
    .reduce((s, b) => s + b.total_amount, 0);

  const monthRevenue = bookings
    .filter((b) => b.status !== 'cancelled' && b.created_at.startsWith(thisMonth))
    .reduce((s, b) => s + b.total_amount, 0);

  const totalRevenue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((s, b) => s + b.total_amount, 0);

  const stats = [
    { label: 'Total Bookings', value: bookings.length, color: 'text-slate-900' },
    { label: 'Pending', value: bookings.filter((b) => b.status === 'pending').length, color: 'text-yellow-600' },
    { label: 'Confirmed', value: bookings.filter((b) => b.status === 'confirmed').length, color: 'text-green-600' },
    { label: "Today's Revenue", value: `Rs. ${todayRevenue.toLocaleString()}`, color: 'text-blue-600' },
    { label: 'This Month', value: `Rs. ${monthRevenue.toLocaleString()}`, color: 'text-indigo-600' },
    { label: 'Total Revenue', value: `Rs. ${totalRevenue.toLocaleString()}`, color: 'text-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <div>
            <h1 className="font-bold text-slate-900 text-lg">Admin Dashboard</h1>
            <p className="text-slate-500 text-xs">Mukhtiar Ultrasounds — Bookings</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchBookings} className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button onClick={() => { sessionStorage.removeItem('admin_auth'); setAuthed(false); }} className="flex items-center gap-1.5 text-slate-600 hover:text-red-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Update message */}
        {updateMsg && (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-blue-800 text-sm font-medium">
            {updateMsg}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
              <p className="text-slate-500 text-xs mb-1">{stat.label}</p>
              <p className={`text-xl font-extrabold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Revenue chart hint */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 mb-6 flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <p className="text-slate-600 text-sm">
            Today: <strong>Rs. {todayRevenue.toLocaleString()}</strong> &nbsp;|&nbsp;
            This Month: <strong>Rs. {monthRevenue.toLocaleString()}</strong> &nbsp;|&nbsp;
            All Time: <strong>Rs. {totalRevenue.toLocaleString()}</strong>
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
          <div className="flex gap-2 flex-wrap">
            {(['all', 'pending', 'confirmed', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings list */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading bookings...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">No bookings found.</div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                        {booking.patient_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{booking.patient_name}</h3>
                        <p className="text-slate-400 text-xs">
                          {new Date(booking.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                        <Phone className="w-3.5 h-3.5 text-blue-500" />
                        <a href={`tel:${booking.phone}`} className="hover:text-blue-600">{booking.phone}</a>
                      </div>
                      {booking.email && (
                        <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                          <Mail className="w-3.5 h-3.5 text-blue-500" />
                          <span className="truncate">{booking.email}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        {booking.preferred_date}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        {booking.preferred_time}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {booking.services.map((s, i) => (
                        <span key={i} className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full">
                          <Package className="w-3 h-3" />
                          {s.name} × {s.quantity}
                        </span>
                      ))}
                    </div>

                    <p className="text-slate-900 font-bold text-sm">Total: Rs. {booking.total_amount.toLocaleString()}</p>
                  </div>

                  {/* Actions — clicking Confirm/Complete/Cancel also opens WhatsApp with message */}
                  <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateStatus(booking, 'confirmed')}
                      disabled={booking.status === 'confirmed'}
                      className="px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-800 text-xs font-semibold rounded-lg transition-colors disabled:opacity-40"
                    >
                      ✓ Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(booking, 'completed')}
                      disabled={booking.status === 'completed'}
                      className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold rounded-lg transition-colors disabled:opacity-40"
                    >
                      ✓ Complete
                    </button>
                    <button
                      onClick={() => updateStatus(booking, 'cancelled')}
                      disabled={booking.status === 'cancelled'}
                      className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-semibold rounded-lg transition-colors disabled:opacity-40"
                    >
                      ✗ Cancel
                    </button>
                    <a
                      href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg transition-colors text-center"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
