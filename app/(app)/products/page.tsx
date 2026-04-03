'use client'

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useProducts, useCategories } from '@/hooks/queries'
import { ProductCard } from '@/components/app/products';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: products, isLoading } = useProducts({
    title: searchTerm,
    category_ids: selectedCategory ? [selectedCategory] : []
  });
  
  const { data: categories } = useCategories();

  return (
    <div className="flex flex-col gap-4 mx-auto">
      
      {/* Header: Buscador a la izquierda + Tags Minimalistas */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 border-b border-gray-50 pb-8">
        
        {/* Buscador Delgado y Minimalista (Izquierda) */}
        <div className="relative w-full max-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-full py-1.5 pl-9 pr-4 text-xs outline-none focus:ring-1 focus:ring-black/10 transition-all"
          />
        </div>

        {/* Tags de Categorías (Pequeñas) */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all ${
              !selectedCategory 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all ${
                selectedCategory === cat.id 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Productos - Solo Usuario Final */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-square w-full animate-pulse rounded-xl bg-gray-50" />
          ))
        ) : (
          products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      
      {/* Empty State */}
      {!isLoading && products?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 opacity-20">
          <p className="text-[10px] font-black uppercase tracking-widest">No products found</p>
        </div>
      )}
    </div>
  );
}