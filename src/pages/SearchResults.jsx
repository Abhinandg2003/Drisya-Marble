import { Link, useSearchParams } from 'react-router-dom'
import { products, collections } from '../data'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const q = query.toLowerCase()
  const matchedProducts = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  )
  const matchedCollections = collections.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q)
  )

  const total = matchedProducts.length + matchedCollections.length

  return (
    <main className="pt-20 max-w-7xl mx-auto px-3 pb-16 ">
      <p className="text-[15px] tracking-wide  text-[#782423] mb-2 mt-10">Search Results</p>
      <h1 className="font-display text-4xl md:text-5xl text-[#1A1A1A] mb-2">
        "{query}"
      </h1>
      <p className="text-[12px] text-[#8B7A6A] tracking-wide mb-12">
        {total} result{total !== 1 ? 's' : ''} found
      </p>

      {matchedCollections.length > 0 && (
        <section className="mb-16">
          <p className="text-[15px] tracking-wide  text-[#782423] mb-6 pb-3 border-b border-[#D4B896]/30 ">
            Collections ({matchedCollections.length})
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {matchedCollections.map(col => (
              <Link key={col.slug} to={`/collections/${col.slug}`} className="group relative overflow-hidden h-80 aspect-[1/1]">
                <img
  src={col.image}
  alt={col.name}
  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
/>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-[15px] tracking-wide  text-[#a64241] mb-1">Collection</p>
                  <h3 className="text-white font-medium tracking-wide">{col.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {matchedProducts.length > 0 && (
        <section>
          <p className="text-[15px] tracking-wide  text-[#782423] mb-6 pb-3 border-b border-[#D4B896]/30">
            Products ({matchedProducts.length})
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {matchedProducts.map(product => (
              <Link key={product.slug} to={`/products/${product.slug}`} className="group">
                <div className="aspect-[1/1]  h-80 overflow-hidden mb-3 bg-[#E8DDD4]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="text-[12px] tracking-wide  text-[#782423] mb-1">{product.category}</p>
                <h3 className="text-[15px]  text-[#1A1A1A] tracking-wide">{product.name}</h3>
                <p className="text-[15px] text-[#782423]">{product.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {total === 0 && (
        <div className="text-center py-24">
          <p className="text-[#8B7A6A] text-lg font-display italic mb-4">No results for "{query}"</p>
          <p className="text-sm text-[#8B7A6A] tracking-wide mb-8">Try a different search term, or browse our collections.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/products" className="inline-block bg-[#782423] text-white text-xs tracking-[0.15em]  px-8 py-4 hover:bg-[#1A1A1A] transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
