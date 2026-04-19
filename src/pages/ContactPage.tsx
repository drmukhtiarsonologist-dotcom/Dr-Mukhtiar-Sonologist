import { useState } from 'react';
import Layout from '../components/Layout';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Contact Us / رابطہ کریں</h1>
          <p className="text-slate-500 text-sm">We're here to help. Reach out anytime.</p>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Contact info + map */}
          <div className="space-y-6">
            {/* Info cards */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
              <h2 className="font-bold text-slate-900 text-lg">Clinic Information / کلینک کی معلومات</h2>

              <div className="flex gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Address / پتہ</p>
                  <p className="text-slate-600 text-sm">Karachi Medical & Diagnostic Centre</p>
                  <p className="text-slate-600 text-sm">Near Ghinti Phatak, Larkana, Sindh, Pakistan</p>
                  <p className="text-slate-400 text-xs mt-0.5">کراچی میڈیکل اینڈ ڈائیگنوسٹک سینٹر، نزد گھنٹی پھاٹک، لاڑکانہ</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Phone / فون</p>
                  <a href="tel:07440420020" className="text-blue-600 text-sm hover:underline block">074-4042020 (Main Line)</a>
                  <a href="tel:+923163618120" className="text-blue-600 text-sm hover:underline block">+92-316-3618120 (WhatsApp)</a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Email / ای میل</p>
                  <a href="mailto:drmukhtiarsonologist@gmail.com" className="text-blue-600 text-sm hover:underline">
                    drmukhtiarsonologist@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Hours / اوقات</p>
                  <p className="text-slate-600 text-sm">Monday – Saturday: 9:00 AM – 6:00 PM</p>
                  <p className="text-slate-400 text-xs">پیر تا ہفتہ: صبح ۹ بجے تا شام ۶ بجے</p>
                </div>
              </div>

              <a
                href="https://wa.me/923163618120"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp / واٹس ایپ
              </a>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 h-64">
              <iframe
                title="Karachi Medical & Diagnostic Centre - Near Ghinti Phatak Larkana"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.5!2d68.2154!3d27.5574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGhinti+Phatak%2C+Larkana%2C+Sindh!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h2 className="font-bold text-slate-900 text-lg mb-6">Send a Message / پیغام بھیجیں</h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500 text-sm">We'll get back to you shortly.</p>
                <p className="text-slate-400 text-xs mt-1">ہم جلد آپ سے رابطہ کریں گے۔</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-blue-600 text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name / پورا نام <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number / فون نمبر <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+92-300-0000000"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email / ای میل
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message / پیغام <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Send Message / پیغام بھیجیں
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
