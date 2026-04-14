import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useBooking } from '../context/BookingContext';
import products from '../data/products.json';
import type { Product } from '../types';

const categoryBadgeClass: Record<string, string> = {
  ultrasound: 'bg-blue-100 text-blue-700',
  'lab-test': 'bg-green-100 text-green-700',
  package: 'bg-purple-100 text-purple-700',
};

const categoryLabel: Record<string, string> = {
  ultrasound: 'Ultrasound',
  'lab-test': 'Lab Test',
  package: 'Package',
};

export default function TestDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useBooking();
  const [added, setAdded] = useState(false);

  const product = (products as Product[]).find((p) => p.slug === slug);

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">404 – Test Not Found</h1>
          <p className="text-slate-500 mb-8">
            We couldn't find the test you're looking for.
          </p>
          <Link
            to="/services"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse All Services
          </Link>
        </div>
      </Layout>
    );
  }

  function handleAddToCart() {
    addToCart(product!);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6">
          <Link to="/services" className="hover:text-blue-600 transition-colors">
            Services
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
          {/* Image */}
          <div className="bg-slate-100 h-56 flex items-center justify-center">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-slate-400">No image available</span>
            )}
          </div>

          <div className="p-6 md:p-8">
            {/* Category badge */}
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
                categoryBadgeClass[product.category] ?? 'bg-slate-100 text-slate-600'
              }`}
            >
              {categoryLabel[product.category] ?? product.category}
            </span>

            <h1 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h1>

            {product.duration && (
              <p className="text-slate-500 text-sm mb-4">Duration: {product.duration}</p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-blue-600">
                ₹{(product.discountPrice ?? product.price).toLocaleString()}
              </span>
              {product.discountPrice && (
                <span className="text-slate-400 text-lg line-through">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
              {product.discountPrice && (
                <span className="text-green-600 text-sm font-medium">
                  Save ₹{(product.price - product.discountPrice).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">About this test</h2>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Prep instructions */}
            {product.prepInstructions && (
              <div className="mb-8 bg-blue-50 rounded-xl p-5">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">
                  Preparation Instructions
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 text-sm">
                  {product.prepInstructions
                    .split('. ')
                    .filter(Boolean)
                    .map((step, i) => (
                      <li key={i}>{step.replace(/\.$/, '')}.</li>
                    ))}
                </ol>
              </div>
            )}

            {/* Add to cart */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Add to Cart
              </button>

              {added && (
                <span className="text-green-600 font-medium text-sm bg-green-50 px-4 py-2 rounded-lg">
                  ✓ Added to cart successfully!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
