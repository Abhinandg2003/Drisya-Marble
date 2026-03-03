import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const panels = [
  {
    image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1200&q=80',
    label: 'Serenity in Stone',
    href: '/collections/italian-classics',
  },
  {
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
    label: 'Minimalistic Elegance',
    href: '/collections/minimal-whites',
  },
]

export default function Browsebytex() {
  return (
    <section className="py-16 overflow-hidden bg-[#1a1a1a]">

      {/* Header — unchanged from original */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="flex justify-center text-center font-semibold font-display text-[30px] md:text-[40px] text-white">Browse by Texture.</h2>
        <a href="/products">
          <p className="mt-2 flex justify-center text-center items-center text-[18px] md:text-[24px] font-medium text-white">
            Explore Collections <span><ArrowRight className="flex justify-center ml-2 bg-[#782423] rounded-full text-white p-1" /></span>
          </p>
        </a>
      </div>

      {/* Two images — side by side on lg+, stacked on sm/md, zero gap */}
      <div className="flex flex-col md:flex-row w-full mt-16">
        {panels.map((panel) => (
          <Link
  key={panel.href}
  to={panel.href}
  className="relative flex-1 overflow-hidden block min-h-[240px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[300px] xl:min-h-[420px] max-h-[240px] sm:max-h-[300px] md:max-h-[380px] lg:max-h-[300px] xl:max-h-[420px]"
>
            <img
  src={panel.image}
  alt={panel.label}
  className="w-full h-full object-cover"
  draggable={false}
/>
            {/* Gradient so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Text — bottom left */}
            <div className="absolute bottom-0 left-0 p-8 md:p-10">
              <h3 className="font-display text-[25px] md:text-[30px] text-white leading-tight">
                {panel.label}
              </h3>
            </div>
          </Link>
        ))}
      </div>

    </section>
  )
}