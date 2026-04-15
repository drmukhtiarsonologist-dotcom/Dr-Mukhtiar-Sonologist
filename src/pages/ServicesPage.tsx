import { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import FilterBar from '../components/FilterBar';
import ServiceGrid from '../components/ServiceGrid';
import Pagination from '../components/Pagination';
import type { Category, Product } from '../types';
import type { SortOption } from '../components/FilterBar';
import productsRaw from '../data/products.json';

// Only ultrasound and packages — lab tests removed
const products = (productsRaw as Product[]).filter(
  (p) => p.category === 'ultrasound' || p.category === 'package'
);

const PAGE_SIZE = 9;

export default function ServicesPage() {
  const [category, setCategory] = useState<Category>('all');
  const [sort, setSort] = useState<SortOption>('price-asc');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sort === 'price-asc') {
      list.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
    } else if (sort === 'price-desc') {
      list.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [category, sort, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleCategoryChange(cat: Category) {
    setCategory(cat);
    setPage(1);
  }

  function handleSearchChange(q: string) {
    setSearch(q);
    setPage(1);
  }

  function handleSortChange(s: SortOption) {
    setSort(s);
    setPage(1);
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Our Ultrasound Services</h1>
        <p className="text-slate-500 text-sm mb-6">ہماری الٹراساؤنڈ اور پیکج خدمات</p>

        <FilterBar
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
          sortOption={sort}
          onSortChange={handleSortChange}
          searchQuery={search}
          onSearchChange={handleSearchChange}
        />

        <div className="mt-8">
          <ServiceGrid products={paginated} />
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </Layout>
  );
}
