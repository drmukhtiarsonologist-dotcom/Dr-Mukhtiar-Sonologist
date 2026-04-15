import { Link } from 'react-router-dom';
import allProducts from '../data/products.json';
import type { Product } from '../types';
import ServiceCard from './ServiceCard';

// Only ultrasound and packages — no lab tests
const featured = (allProducts as Product[]).filter(
  (p) => p.featured && (p.category === 'ultrasound' || p.category === 'package')
);

export default function FeaturedServices() {
  return (
    <section className="py-20 px-4 bg-slate-50" aria-label="Featured ultrasound services">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            Our Ultrasound Services
          </h2>
          <p className="text-slate-500 text-base mb-1">ہماری الٹراساؤنڈ خدمات</p>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Advanced diagnostic imaging for accurate, timely results.
          </p>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ServiceCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-sm transition-all hover:scale-105"
          >
            View All Services / تمام خدمات دیکھیں →
          </Link>
        </div>
      </div>
    </section>
  );
}
