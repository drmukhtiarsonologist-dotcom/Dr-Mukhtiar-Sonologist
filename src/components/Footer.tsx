import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home / ہوم', to: '/' },
  { label: 'Services / خدمات', to: '/services' },
  { label: 'About / ہمارے بارے میں', to: '/about' },
  { label: 'FAQ / سوالات', to: '/faq' },
  { label: 'Contact / رابطہ', to: '/contact' },
  { label: 'Book Appointment / اپوائنٹمنٹ', to: '/cart' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img src="/logo.png" alt="Mukhtiar Ultrasounds" className="h-14 w-auto mb-3" />
            <p className="text-slate-400 text-sm">Precision Imaging. Prioritizing Your Time.</p>
            <p className="text-slate-500 text-xs mt-1">درست تصویر کشی۔ آپ کا وقت ہماری ترجیح۔</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-1">Contact / رابطہ</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>📞 074-4042020 (Main) / +92-316-3618120 (WhatsApp)</li>
              <li>✉️ drmukhtiarsonologist@gmail.com</li>
              <li>📍 Karachi Medical & Diagnostic Centre</li>
              <li className="text-xs text-slate-500">Near Ghinti Phatak, Larkana, Sindh</li>
              <li className="text-xs text-slate-500">نزد گھنٹی پھاٹک، لاڑکانہ، سندھ</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm text-slate-500">
          © 2024 Mukhtiyar Ultrasounds. All rights reserved. | تمام حقوق محفوظ ہیں
        </div>
      </div>
    </footer>
  );
}
