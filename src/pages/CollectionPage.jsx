import { Link, useParams, Navigate } from 'react-router-dom'
import { collections, products } from '../data'

export default function CollectionPage() {
  const { slug } = useParams()
  const collection = collections.find(c => c.slug === slug)

  if (!collection) return <Navigate to="/products" replace />

  const collectionProducts = products.filter(p => collection.products.includes(p.name))
  const otherCollections = collections.filter(c => c.slug !== slug)

  return (
    <main className="pt-20">
      {/* Full-screen Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={collection.image}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-24 max-w-5xl">
          <h1 className="font-display text-6xl md:text-8xl text-white mb-6 leading-none">{collection.name}</h1>
          <p className="text-white/75 text-[20px] tracking-wide italic font-display">{collection.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="w-12 h-0.5 bg-[#782423] mx-auto mb-8"></div>
        <p className="text-[#5A4E44] text-xl leading-relaxed tracking-wide font-display italic">
          {collection.description}
        </p>
      </div>

      {/* Products in this collection */}
      {collectionProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <p className="text-[15px] tracking-wide  text-[#782423] mb-5">
            {collectionProducts.length} {collectionProducts.length === 1 ? 'piece' : 'pieces'} in this collection
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionProducts.map(product => (
              <Link key={product.slug} to={`/products/${product.slug}`} className="group">
                <div className="aspect-[4/3] overflow-hidden mb-5 bg-[#E8DDD4]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-[12px] tracking-wide  text-[#782423] mb-2">{product.category}</p>
                <h3 className="font-display text-[20px] text-[#1A1A1A] mb-2 group-hover:text-[#782423] transition-colors">{product.name}</h3>
                <p className="text-[15px] text-[#5A4E44] mb-3">{product.price}</p>
                <p className="text-[12px] text-[#8B7A6A] leading-relaxed line-clamp-2">{product.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {collectionProducts.length === 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-24 text-center">
          <p className="text-[#8B7A6A] tracking-widest  text-sm py-16">
            New pieces arriving soon.
          </p>
          <Link to="/products" className="inline-block border border-[#782423] text-[#782423] text-xs tracking-[0.15em]  px-8 py-4 hover:bg-[#782423] hover:text-white transition-colors">
            Browse All Products
          </Link>
        </div>
      )}

      {/* Other Collections */}
      <section className="bg-[#EDE5DA] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-[30px] font-medium text-[#1A1A1A] mb-10">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {otherCollections.map(col => (
              <Link key={col.slug} to={`/collections/${col.slug}`} className="relative overflow-hidden group h-60">
                <img src={col.image} alt={col.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105  " />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-[15px] tracking-wide  font-medium">{col.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
