import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Phone } from 'lucide-react';

const slides = [
  {
    image: '/images/hero-ultrasound-screen.jpg',
    alt: 'Ultrasound scan on monitor at Dr. Mukhtiar Ultrasounds Larkana',
  },
  {
    image: '/images/hero-pregnant-scans.jpg',
    alt: 'Pregnant woman holding ultrasound scan prints',
  },
  {
    image: '/images/hero-machine-room.jpg',
    alt: 'Modern ultrasound machine at Dr. Mukhtiar clinic Larkana',
  },
  {
    image: '/images/hero-doctor-machine.jpg',
    alt: 'Doctor performing ultrasound procedure',
  },
  {
    image: '/images/hero-scan-strips.jpg',
    alt: '3D ultrasound scan printouts',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-slate-950">
      {/* Background image slider */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-950/40" />
        </div>
      ))}

      {/* 3D floating card effect — decorative blur orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-32 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Larkana's Premier Ultrasound Centre
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 drop-shadow-lg">
            Precision Imaging.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Prioritizing Your Time.
            </span>
          </h1>
          <p className="text-blue-200 text-lg font-medium mb-4 drop-shadow">
            درست تصویر کشی۔ آپ کا وقت ہماری ترجیح۔
          </p>

          {/* Sub-headline */}
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mb-2 leading-relaxed">
            Advanced 2D/3D ultrasound scans by experienced sonologists. Book your appointment online and get results fast.
          </p>
          <p className="text-slate-400 text-sm mb-10">
            آن لائن اپوائنٹمنٹ بک کریں اور تجربہ کار سونولوجسٹ سے الٹراساؤنڈ کروائیں۔
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/cart"
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:shadow-blue-500/40"
            >
              <Calendar className="w-5 h-5" />
              Secure My Slot / اپنی باری محفوظ کریں
            </Link>
            <a
              href="tel:+923163618120"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all hover:border-white/60"
            >
              <Phone className="w-5 h-5" />
              Call Now / ابھی کال کریں
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-12">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '10,000+', label: 'Patients Served' },
              { value: '20+', label: 'Scan Types' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="text-slate-400 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all ${
              i === current ? 'w-6 h-2 bg-blue-400' : 'w-2 h-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
