import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products, productCategories } from '../data'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === activeCategory)

  const setCategory = (slug) => {
    if (slug === 'all') setSearchParams({})
    else setSearchParams({ category: slug })
  }

  return (
    <main className="pt-20">
      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-[50vh] overflow-hidden">
        <img
          src="/images/products.jpg"
          alt="Products"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
          <h1 className="font-display text-[25px] md:text-[70px] text-white">Our Products</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filter Bar */}
        <div className="flex items-center gap-2 flex-wrap mb-12 pb-6 border-b border-[#D4B896]/30">
          <span className="text-[15px] tracking-wide  text-[#782423] mr-4">Filter by</span>
          <button
            onClick={() => setCategory('all')}
            className={`px-5 py-2 text-[12px] tracking-wide  transition-colors border ${
              activeCategory === 'all'
                ? 'bg-[#782423] text-white border-[#782423]'
                : 'border-[#D4B896]/60 text-[#5A4E44] hover:border-[#782423] hover:text-[#782423]'
            }`}
          >
            All
          </button>
          {productCategories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setCategory(cat.slug)}
              className={`px-5 py-2 text-[12px] tracking-wide  transition-colors border ${
                activeCategory === cat.slug
                  ? 'bg-[#782423] text-white border-[#782423]'
                  : 'border-[#D4B896]/60 text-[#5A4E44] hover:border-[#782423] hover:text-[#782423]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <p className="text-[15px] tracking-wide text-[#8B7A6A]   mb-8">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <Link key={product.slug} to={`/products/${product.slug}`} className="group">
              <div className="aspect-square overflow-hidden mb-4 bg-[#E8DDD4] relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60">
                  <p className="text-white text-xs tracking-widest ">View Details</p>
                </div>
              </div>
              <p className="text-[12px] tracking-wide  text-[#782423] mb-1">{product.category}</p>
              <h3 className="text-[15px] tracking-wide font-medium text-[#1A1A1A]  mb-1 group-hover:text-[#782423] transition-colors">{product.name}</h3>
              {/* <p className="text-sm text-[#5A4E44]">{product.price}</p> */}
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[#8B7A6A] tracking-widest  text-sm">No products found in this category.</p>
          </div>
        )}
      </div>
    </main>
  )
}
