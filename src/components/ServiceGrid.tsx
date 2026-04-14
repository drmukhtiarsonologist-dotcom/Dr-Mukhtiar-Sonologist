import type { Product } from '../types';
import ServiceCard from './ServiceCard';

interface ServiceGridProps {
  products: Product[];
}

export default function ServiceGrid({ products }: ServiceGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <p className="text-lg font-medium">No results found</p>
        <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ServiceCard key={product.id} product={product} />
      ))}
    </div>
  );
}
