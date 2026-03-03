import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { products, collections } from '../data'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = products.find(p => p.slug === slug)
  const [activeImg, setActiveImg] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')

  if (!product) return <Navigate to="/products" replace />

  const collection = collections.find(c => c.slug === product.collection)
  const related = products.filter(p => p.slug !== slug).slice(0, 4)

  return (
    <main className="pt-20 ">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8 ">
        <nav className="flex items-center gap-2 text-[14px] tracking-wide  text-[#8B7A6A]">
          <Link to="/" className="hover:text-[#782423]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#782423]">Products</Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl  mx-auto px-6 py-8">
        <div className="grid grid-cols-1  md:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div>
            <div className="  overflow-hidden h-[40vh] md:h-[60vh] bg-[#E8DDD4] mb-4">
              <img
                src={product.gallery[activeImg] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.gallery.length > 1 && (
              <div className="flex gap-3">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 overflow-hidden border-2 transition-colors ${i === activeImg ? 'border-[#782423]' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-[15px] tracking-wide  text-[#782423] mb-2">{product.category}</p>
            <h1 className="font-display text-[50px] font-medium md:text-[50px] text-[#1A1A1A] mb-4">{product.name}</h1>
            <p className="text-[25px] text-[#782423] font-medium mb-6">{product.price}</p>
            <div className="h-px bg-[#D4B896]/30 mb-6"></div>
            <p className="text-[#5A4E44] leading-relaxed tracking-wide mb-8">{product.description}</p>

            {/* Specs */}
            <div className="bg-[#EDE5DA] p-6 mb-8">
              <p className="text-[15px] tracking-wide  text-[#782423] mb-4">Specifications</p>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key}>
                    <p className="text-[15px] tracking-wide  text-[#8B7A6A] mb-1">{key}</p>
                    <p className="text-sm font-medium text-[#1A1A1A]">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link to="/contact" className="block text-center bg-[#782423] text-white text-[15px] tracking-wide  py-4 hover:bg-[#1A1A1A] transition-colors duration-300">
                Request Sample
              </Link>
              {/* <Link to="/contact" className="block text-center border border-[#782423] text-[#782423] text-xs tracking-[0.15em]  py-4 hover:bg-[#782423] hover:text-white transition-colors duration-300">
                Get a Quote
              </Link> */}
            </div>

            {/* Collection Badge */}
            {collection && (
              <Link to={`/collections/${collection.slug}`} className="mt-8 flex items-center gap-4 p-4 bg-[#EDE5DA] group">
                <img src={collection.image} alt={collection.name} className="w-14 h-14 object-cover" />
                <div>
                  <p className="text-[13px] tracking-wide  text-[#782423] mb-1">Part of</p>
                  <p className="text-[15px]  text-[#1A1A1A] group-hover:text-[#782423] transition-colors">{collection.name} Collection</p>
                </div>
                <svg className="w-4 h-4 text-[#782423] ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="bg-[#EDE5DA] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-[30px] font-medium text-[#1A1A1A] mb-10">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(p => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="group">
                <div className="aspect-square overflow-hidden mb-3 bg-[#D4C4B0]">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="text-[12px] tracking-wide  text-[#782423] mb-0.5">{p.category}</p>
                <h3 className="text-[15px]  text-[#1A1A1A] tracking-wide">{p.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
