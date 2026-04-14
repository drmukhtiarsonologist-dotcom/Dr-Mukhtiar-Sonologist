import { Link } from 'react-router-dom';
import allProducts from '../data/products.json';
import type { Product } from '../types';
import ServiceCard from './ServiceCard';

const featured = (allProducts as Product[]).filter((p) => p.featured);

export default function FeaturedServices() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Featured Services</h2>
          <Link
            to="/services"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            View All Services →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ServiceCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
