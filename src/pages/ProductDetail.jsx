import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { products, productItems, productCategories } from '../data'

export default function ProductDetail() {
  const { slug } = useParams()

  // Try productItems first, fall back to products (brands)
  const item = productItems.find(p => p.slug === slug)
  const brand = item ? products.find(p => p.name === item.brand) : null

  const [activeImg, setActiveImg] = useState(0)

  if (!item) return <Navigate to="/products" replace />

  // Category display name from productCategories
  const catEntry = productCategories.find(c => c.slug === item.category)
  const categoryName = catEntry ? catEntry.name : item.category

  // Related: same category, exclude self, max 4
  const related = productItems
    .filter(p => p.slug !== slug && p.category === item.category)
    .slice(0, 4)

  // Gallery: use item image + brand gallery if available
  const gallery = [item.image, ...(brand?.gallery || [])].filter(Boolean)

  return (
    <main className="pt-20 bg-[#fdfaef]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <nav className="flex items-center gap-2 text-[14px] tracking-wide text-[#8B7A6A]">
          <Link to="/" className="hover:text-[#782423]">Home</Link>
          <span>/</span>
          <Link to={`/products?category=${item.category}`} className="hover:text-[#782423]">{categoryName}</Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{item.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Image Gallery */}
          <div>
            <div className="overflow-hidden h-[40vh] rounded-md md:h-[60vh] bg-[#E8DDD4] mb-4">
              <img
                src={gallery[activeImg] || '/images/placeholder.jpg'}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-3 flex-wrap">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 overflow-hidden border-2 rounded-md transition-colors ${i === activeImg ? 'border-[#782423]' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-[13px] tracking-wide  text-[#782423] ">{categoryName}</p>
            <h1 className="font-display text-[42px] md:text-[50px] font-medium text-[#1A1A1A] leading-tight">{item.name}</h1>

            {/* Brand badge */}
            {brand && (
              <Link to={`/brands?name=${encodeURIComponent(brand.name)}`}
                className="inline-flex items-center  mb-6 text-[15px] tracking-wide text-[#5A4E44] hover:text-[#782423] transition-colors">
                
                by {brand.name}
              </Link>
            )}

            <div className="h-px bg-[#D4B896]/30 mb-6" />

            {brand?.description && (
              <p className="text-[#5A4E44] leading-relaxed tracking-wide mb-8">{brand.description}</p>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 mb-8">
              <Link
                to={`/brands?name=${encodeURIComponent(item.brand)}`}
                className="bg-gradient-to-r from-[#711a19] via-[#7e2e1e] to-[#711a19] text-[#fff6e2] hover:opacity-90 text-center font-medium  text-[15px] tracking-wider  px-6 py-3 rounded-md   transition-all  duration-300"
              >
                View All {item.brand} Products
              </Link>
              <Link
                to={`/products?category=${item.category}`}
                className="block text-center border border-[#782423] text-[#782423] text-[15px] tracking-wide   px-6 py-3 hover:bg-[#782423] hover:text-white transition-colors font-medium duration-300 rounded-md"
              >
                Browse {categoryName}
              </Link>
            </div>

            {/* Brand info card */}
            {brand && (
              <div className="flex items-center gap-4 p-4 rounded-md bg-[#EDE5DA]">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-14 h-14 object-contain flex-shrink-0 rounded-md bg-white p-1"
                  onError={e => e.target.style.display='none'}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] tracking-wide text-[#782423] mb-0.5">Brand</p>
                  <p className="text-[15px] text-[#1A1A1A] font-medium">{brand.name}</p>
                  <p className="text-[12px] text-[#8B7A6A] mt-0.5 line-clamp-1">{brand.category}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="bg-[#EDE5DA] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-[30px] font-medium text-[#1A1A1A] mb-10">More in {categoryName}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map(p => (
                <Link key={p.slug} to={`/products/${p.slug}`} className="group">
                  <div className="aspect-square overflow-hidden mb-3 rounded-md bg-[#D4C4B0]">
                    <img
                      src={p.image || '/images/placeholder.jpg'}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[12px] tracking-wide text-[#782423] mb-0.5">{p.brand}</p>
                  <h3 className="text-[15px] text-[#1A1A1A] tracking-wide group-hover:text-[#782423] transition-colors">{p.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}