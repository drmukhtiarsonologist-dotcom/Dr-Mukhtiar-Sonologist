import type { Category } from '../types';

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc';

interface FilterBarProps {
  selectedCategory: Category;
  onCategoryChange: (cat: Category) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const categories: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Ultrasound', value: 'ultrasound' },
  { label: 'Lab Tests', value: 'lab-test' },
  { label: 'Packages', value: 'package' },
];

export default function FilterBar({
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat.value
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search tests..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-52"
        />

        {/* Sort */}
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
        </select>
      </div>
    </div>
  );
}
