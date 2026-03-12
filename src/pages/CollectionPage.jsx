import { Link, useParams, Navigate } from 'react-router-dom'
import { collections, productItems, products } from '../data'

export default function CollectionPage() {
  const { slug } = useParams()
  const collection = collections.find(c => c.slug === slug)

  if (!collection) return <Navigate to="/products" replace />

  // Get unique brand names that have items in this collection's category slug
  const uniqueBrands = [...new Set(
    productItems
      .filter(item => item.category.toLowerCase() === slug.toLowerCase())
      .map(item => item.brand)
  )]

  const otherCollections = collections.filter(c => c.slug !== slug)

  return (
    <main className="pt-20 bg-[#fdfaef]">
      {/* Full-screen Hero */}
      <div className="relative h-[30vh] md:h-[50vh] overflow-hidden">
        <picture>
          <source srcSet={collection.imageAvifHi} type="image/avif" />
        <img
          src={collection.imagehi}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-24 max-w-7xl">
          <h1 className="font-display text-6xl md:text-8xl text-white mb-6 leading-none">{collection.name}</h1>
          <p className="text-white/75 text-[20px] tracking-wide italic font-display">{collection.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-4xl mx-auto px-6 py-10 md:py-20 text-center">
        <div className="w-12 h-0.5 bg-[#782423] mx-auto mb-8"></div>
        <p className="text-[#5A4E44] text-xl leading-relaxed tracking-wide font-display italic">
          {collection.description}
        </p>
      </div>

      {/* Brands in this collection */}
      {uniqueBrands.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <p className="text-[15px] tracking-wide text-[#782423] mb-5">
            {uniqueBrands.length} {uniqueBrands.length === 1 ? 'Brand' : 'Brands'} in this collection
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {uniqueBrands.map(brandName => {
              // Use the brand-level image from products array
              const brandProduct = products.find(p => p.name === brandName)
              const brandImage = brandProduct?.image || null

              return (
                <Link
                  key={brandName}
                  to={`/brandsnew?name=${encodeURIComponent(brandName)}&category=${slug}`}
                  className="group"
                >
                  <div className="aspect-square rounded-sm overflow-hidden mb-4 bg-[#E8DDD4] relative flex items-center justify-center">
                    {brandImage ? (
                      <img
                        src={brandImage}
                        alt={brandName}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <span className="font-display text-2xl text-[#5A4E44] group-hover:text-[#782423] transition-colors">
                        {brandName.charAt(0)}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60">
                      <p className="text-white text-xs tracking-widest">View Products</p>
                    </div>
                  </div>
                  <h3 className="text-[15px] tracking-wide font-medium text-[#1A1A1A] mb-1 group-hover:text-[#782423] transition-colors">
                    {brandName}
                  </h3>
                  <p className="text-[12px] tracking-wide text-[#782423]">{collection.name}</p>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {uniqueBrands.length === 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-24 text-center">
          <p className="text-[#8B7A6A] tracking-widest text-sm py-16">
            New pieces arriving soon.
          </p>
          <Link to="/products" className="inline-block border border-[#782423] text-[#782423] text-xs tracking-[0.15em] px-8 py-4 hover:bg-[#782423] hover:text-white transition-colors">
            Browse All Products
          </Link>
        </div>
      )}

      {/* Other Collections */}
      <section className="bg-[#EDE5DA] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-[30px] font-medium text-[#1A1A1A] mb-10">Explore Collections</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {otherCollections.map(col => (
              <Link key={col.slug} to={`/collections/${col.slug}`} className="relative overflow-hidden group rounded-sm aspect-square">
                <img src={col.image} alt={col.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-[15px] tracking-wide font-medium">{col.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}