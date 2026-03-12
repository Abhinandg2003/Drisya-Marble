import { useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { productCategories, productItems } from '../data'

function FilterCarousel({ label, items, activeKey, onSelect, getKey, getLabel }) {
  const scrollRef = useRef(null)
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 200, behavior: 'smooth' })

  return (
    <div className="row items-center gap-2 mb-12 pb-6 border-b border-[#D4B896]/30">
      <span className="text-[15px] tracking-wide text-[#782423] flex-shrink-0 mr-2">{label}</span>
      <div className='flex'>
      <button onClick={() => scroll(-1)} className="flex-shrink-0 w-9 h-9 m-2 flex items-center justify-center border border-[#D4B896]/60 text-[#5A4E44] hover:border-[#782423] hover:text-[#782423] transition-colors rounded-md">‹</button>
      <div ref={scrollRef} className="flex items-center gap-2 overflow-x-auto flex-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <button onClick={() => onSelect('all')} className={`flex-shrink-0 px-5 py-2 text-[12px] tracking-wide transition-colors border rounded-md ${activeKey === 'all' ? 'border rounded-md bg-gradient-to-r from-[#711a19] via-[#7e2e1e]  to-[#711a19] text-[#fff6e2] transition-all duration-200' : 'border-[#D4B896]/60 text-[#5A4E44] hover:border-[#711a19] rounded-md hover:text-[#782423]'}`}>All</button>
        {items.map(item => (
          <button key={getKey(item)} onClick={() => onSelect(getKey(item))} className={`flex-shrink-0 px-5 py-2 text-[12px] tracking-wide transition-colors border rounded-md ${activeKey === getKey(item) ? 'border rounded-md bg-gradient-to-r from-[#711a19] via-[#7e2e1e] to-[#711a19] text-[#fff6e2] transition-all duration-200' : 'border-[#D4B896]/60 text-[#5A4E44] hover:border-[#711a19] hover:text-[#782423] rounded-md'}`}>{getLabel(item)}</button>
        ))}
      </div>
      
      <button onClick={() => scroll(1)} className="flex-shrink-0 w-9 h-9 m-2 flex items-center justify-center rounded-md border border-[#D4B896]/60 text-[#5A4E44] hover:border-[#782423] hover:text-[#782423] transition-colors">›</button>
    </div>
    </div>
  )
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  const setCategory = (slug) => {
    if (slug === 'all') setSearchParams({})
    else setSearchParams({ category: slug })
  }

  const filtered = activeCategory === 'all'
    ? productItems
    : productItems.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase())

  return (
    <main className="pt-20 bg-[#fdfaef]">
      <div className="relative h-[30vh] md:h-[50vh] overflow-hidden">
        <picture>
          <source srcSet="/images/collection.avif" type="image/avif" />
          <img src="/images/collection.jpg" alt="Products" className="absolute inset-0 w-full h-full object-cover" />
        </picture>
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
          <h1 className="font-display text-[35px] md:text-[70px] text-white">Our Collections</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <FilterCarousel
          label="Filter by Collections"
          items={productCategories}
          activeKey={activeCategory}
          onSelect={setCategory}
          getKey={cat => cat.slug}
          getLabel={cat => cat.name}
        />

        <p className="text-[15px] tracking-wide text-[#8B7A6A] mb-8">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item, idx) => (
            <Link key={item.slug ? `${item.slug}-${idx}` : idx} to={item.slug ? `/products/${item.slug}` : '#'} className="group">
              <div className="aspect-square rounded-sm overflow-hidden mb-4 bg-[#E8DDD4] relative">
                <picture>
                  <source srcSet={item.image} type="image/avif" />
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                </picture>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60">
                  <p className="text-white text-xs tracking-widest">View Details</p>
                </div>
              </div>
              <p className="text-[12px] tracking-wide text-[#782423] mb-1">{item.brand}</p>
              <h3 className="text-[15px] tracking-wide font-medium text-[#1A1A1A] mb-1 group-hover:text-[#782423] transition-colors">{item.name}</h3>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[#8B7A6A] tracking-widest text-sm">No products found in this category.</p>
          </div>
        )}
      </div>

      <div className='mb-10'>
        <h3 className='flex text-3xl font-medium font-display justify-center text-center mx-10 '>
          Can't Find What You are Looking for?
        </h3>
        <div className='justify-center flex'>
          <Link to="/brands">
            <button className='w-auto bg-gradient-to-r  from-[#711a19] via-[#7e2e1e] to-[#711a19] m-5 text-white text-[14px] tracking-wide py-3 px-5 rounded-md flex items-center justify-center gap-3 '> Explore Brands</button>
          </Link>
        </div>
      </div>


    </main>
  )
}