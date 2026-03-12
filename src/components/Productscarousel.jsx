import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products,productItems } from '../data'
import { ArrowRight } from 'lucide-react';

// Dot positions per product (as % from left, % from top)
const dotPositions = [
  { x: 38, y: 55 },
  { x: 60, y: 45 },
  { x: 42, y: 60 },
  { x: 50, y: 40 },
  { x: 35, y: 58 },
  { x: 55, y: 50 },
]

export default function ProductsCarousel() {
  const [openDot, setOpenDot] = useState(null)

  return (
    <section className="pb-8 bg-[#fcfbf7] pt-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="flex justify-center text-[18px] font-medium md:text-[24px] text-[#782423]">Inspiration</p>
        <h2 className="flex justify-center font-semibold font-display text-[40px] text-[#782423] text-center">
          Discover our inspiring unique products.
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-screen mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productItems.slice(0, 6).map((productitem, i) => {
          const dot = dotPositions[i]
          const isOpen = openDot === i

          return (
            <div key={productitem.slug} className="relative aspect-square rounded-sm overflow-hidden group">
              <img
                src={productitem.image}
                alt={productitem.name}
                className="w-full h-full object-cover"
                draggable={false}
              />

              {/* Subtle dark overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Pulsing dot */}
              <button
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                onClick={() => setOpenDot(isOpen ? null : i)}
                onMouseEnter={() => setOpenDot(i)}
                onMouseLeave={() => setOpenDot(null)}
                aria-label={productitem.name}
              >
                {/* Pulse rings */}
                <span className="absolute inset-0 -m-1 rounded-full bg-white/50 animate-[pulseDot_2.8s_infinite]" />
                {/* Core dot */}
                <span className="relative block w-5 h-5 rounded-full bg-white shadow-lg" />
              </button>

              {/* Popup */}
              <div
                className={`absolute z-20 -translate-x-1/2 transition-all duration-200 ${
                  isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-1 pointer-events-none'
                }`}
                style={{
                  left: `${dot.x}%`,
                  // if dot is in lower half, pop upward; otherwise downward
                  ...(dot.y > 50
                    ? { bottom: `${100 - dot.y + 4}%` }
                    : { top: `${dot.y + 4}%` }),
                }}
                onMouseEnter={() => setOpenDot(i)}
                onMouseLeave={() => setOpenDot(null)}
              >
                <div className="bg-white shadow-xl pl-5 pr-8 py-6 min-w-[160px] whitespace-nowrap">
                  <p className="text-[16px] md:text-[20px] font-medium text-[#1A1A1A] font-display text-left">{productitem.name}</p>
                  <p className="text-[13px] md:text-[15px] font-medium text-[#1A1A1A] mb-3 text-left">{productitem.brand}</p>
                  {/* <Link
                    to={`/products/${product.slug}`}
                    className="block text-center text-[10px] tracking-[0.2em] uppercase bg-[#782423] text-white px-3 py-2 hover:bg-[#1A1A1A] transition-colors duration-200"
                  >
                    Explore
                  </Link> */}
                  <a href={`/products/${productitem.slug}`}>
            <p className="mt-2 flex justify-start items-center text-[13px] md:text-[15px] font-medium  text-[#1a1a1a] ">Explore Products <span> <ArrowRight className='flex justify-center ml-2 bg-[#782423] rounded-full text-white p-1'/> </span> </p>
        </a>
                </div>
                {/* Little triangle pointer */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent ${
                    dot.y > 50
                      ? 'bottom-[-6px] border-t-[6px] border-t-white'
                      : 'top-[-6px] border-b-[6px] border-b-white'
                  }`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}