import { Link, useSearchParams, } from 'react-router-dom'
import { products, productItems, productCategories } from '../data'
import { useRef } from 'react'

// Unique brand names from productItems
const brandNames = [...new Set(productItems.map(item => item.brand))]

function FilterCarousel({ label, items, activeKey, onSelect, getKey, getLabel }) {
    const scrollRef = useRef(null)

    const scroll = (dir) => {
        scrollRef.current?.scrollBy({ left: dir * 200, behavior: 'smooth' })
    }

    return (
        <div className="row items-center gap-2 mb-6 pb-6 border-b border-[#D4B896]/30">
            <span className="text-[15px] tracking-wide text-[#782423] flex-shrink-0 mr-2">{label}</span>
            <div className='flex'>

                {/* Left arrow */}
                <button
                    onClick={() => scroll(-1)}
                    className="flex-shrink-0 w-9 h-9 m-2 flex items-center justify-center border border-[#D4B896]/60 text-[#5A4E44] hover:border-[#782423] hover:text-[#782423] transition-colors"
                >
                    ‹
                </button>

                {/* Scrollable row */}
                <div
                    ref={scrollRef}
                    className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <button
                        onClick={() => onSelect('all')}
                        className={`flex-shrink-0 px-5 py-2 text-[12px] rounded-sm tracking-wide transition-colors border ${activeKey === 'all'
                                ? 'border rounded-md bg-gradient-to-r from-[#711a19] via-[#7e2e1e] to-[#711a19] text-[#fff6e2] transition-all duration-200'
                                : 'border-[#D4B896]/60 text-[#5A4E44] hover:border-[#711a19] hover:text-[#782423]'
                            }`}
                    >
                        All
                    </button>
                    {items.map(item => (
                        <button
                            key={getKey(item)}
                            onClick={() => onSelect(getKey(item))}
                            className={`flex-shrink-0 px-5 py-2 text-[12px] rounded-sm tracking-wide transition-colors border ${activeKey === getKey(item)
                                    ? 'border rounded-md bg-gradient-to-r from-[#711a19] via-[#7e2e1e] to-[#711a19] text-[#fff6e2] transition-all duration-200'
                                    : 'border-[#D4B896]/60 text-[#5A4E44] hover:border-[#711a19] hover:text-[#782423]'
                                }`}
                        >
                            {getLabel(item)}
                        </button>
                    ))}
                </div>

                {/* Right arrow */}
                <button
                    onClick={() => scroll(1)}
                    className="flex-shrink-0 w-9 h-9 m-2 flex items-center justify-center border border-[#D4B896]/60 text-[#5A4E44] hover:border-[#782423] hover:text-[#782423] transition-colors"
                >
                    ›
                </button>
            </div>
        </div>
    )
}

export default function BrandsPageNew() {
    const [searchParams, setSearchParams] = useSearchParams()
    const activeBrand = searchParams.get('name') || 'all'
    const activeCategory = searchParams.get('category') || 'all'

    const setBrand = (name) => {
        const params = {}
        if (name !== 'all') params.name = name
        if (activeCategory !== 'all') params.category = activeCategory
        setSearchParams(params)
    }

    const setCategory = (slug) => {
        const params = {}
        if (activeBrand !== 'all') params.name = activeBrand
        if (slug !== 'all') params.category = slug
        setSearchParams(params)
    }

    const filtered = productItems.filter(item => {
        const brandMatch = activeBrand === 'all' || item.brand === activeBrand
        const catMatch = activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase()
        return brandMatch && catMatch
    })

    const visibleCategories = activeBrand === 'all'
        ? productCategories
        : productCategories.filter(cat =>
            productItems.some(i => i.brand === activeBrand && i.category.toLowerCase() === cat.slug.toLowerCase())
        )

    return (
        <main className="pt-20 bg-[#fdfaef]">
            <div className="max-w-7xl mx-auto px-6 py-16">

                <FilterCarousel
                    label="Brands"
                    items={brandNames}
                    activeKey={activeBrand}
                    onSelect={setBrand}
                    getKey={name => name}
                    getLabel={name => name}
                />

                <FilterCarousel
                    label="Category"
                    items={visibleCategories}
                    activeKey={activeCategory}
                    onSelect={setCategory}
                    getKey={cat => cat.slug}
                    getLabel={cat => cat.name}
                />

                <p className="text-[15px] tracking-wide text-[#8B7A6A] mb-8">
                    {filtered.length} {filtered.length === 1 ? 'item' : 'items'} found
                </p>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map((item, idx) => (
                        <Link
                            key={item.slug ? `${item.slug}-${idx}` : idx}
                            to={item.slug ? `/products/${item.slug}` : '#'}
                            className="group"
                        >
                            <div className="aspect-square overflow-hidden mb-4 bg-[#E8DDD4] relative">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60">
                                    <p className="text-white text-xs tracking-widest">View Details</p>
                                </div>
                            </div>
                            <p className="text-[12px] tracking-wide text-[#782423] mb-1">{item.cat}</p>
                            <h3 className="text-[15px] tracking-wide font-medium text-[#1A1A1A] mb-1 group-hover:text-[#782423] transition-colors">
                                {item.name}
                            </h3>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-24">
                        <p className="text-[#8B7A6A] tracking-widest text-sm">No items found for this brand.</p>
                    </div>
                )}
            </div>
        </main>
    )
}