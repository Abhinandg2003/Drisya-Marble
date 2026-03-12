import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const panels = [
  {
    avif: "/images/brands/Kajaria.avif",
    jpg: "/images/brands/Kajaria.jpg",
    label: 'Serenity in Stone',
    href: '/brands?name=Kajaria',
  },
  {
    avif: "/images/brands/simpolo.avif",
    jpg: "/images/brands/simpolo.jpg",
    label: 'Minimalistic Elegance',
    href: '/brands?name=Simpolo',
  },
]

export default function Browsebytex() {
  return (
    <section className="relative pt-16 pb-8 overflow-hidden bg-[#1a1a1a]" style={{
          backgroundImage: "url('/images/Textures/menuwhite.avif'), url('/images/Textures/menuwhite.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>

          <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff]/60 via-[#ffffff]/80 to-[#ffffff]/60 z-0 pointer-events-none" />

      {/* Header — unchanged from original */}
      <div className="max-w-7xl mx-auto px-6 mb-10 relative z-10">
        <h2 className="flex justify-center text-center font-semibold font-display text-[30px] md:text-[40px] text-[#782423]">Browse by Brands.</h2>
        <a href="/brands">
          <p className="mt-2 flex justify-center text-center items-center text-[18px] md:text-[24px] font-medium text-[#782423]">
            Explore Brands <span><ArrowRight className="flex justify-center ml-2 bg-[#782423] rounded-full text-white p-1" /></span>
          </p>
        </a>
      </div>

      {/* Two images — side by side on lg+, stacked on sm/md, zero gap */}
      <div className="flex flex-col md:flex-row w-full mt-16">
        {panels.map((panel) => (
          <Link
  key={panel.href}
  to={panel.href}
  className="relative flex-1 overflow-hidden block min-h-[340px] sm:min-h-[400px] md:min-h-[380px] lg:min-h-[300px] xl:min-h-[420px] max-h-[340px] sm:max-h-[400px] md:max-h-[380px] lg:max-h-[300px] xl:max-h-[420px]"
>
            <picture>
  <source srcSet={panel.avif} type="image/avif" />
  
  <img
    src={panel.jpg}
    alt={panel.label}
    loading="lazy"
    className="w-full h-full object-cover"
    draggable={false}
  />
</picture>
            {/* Gradient so text is readable */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" /> */}

            {/* Text — bottom left */}
            <div className="absolute bottom-0 left-0 p-8 md:p-10">
              {/* <h3 className="font-display text-[25px] md:text-[30px] text-white leading-tight">
                {panel.label}
              </h3> */}
            </div>
          </Link>
        ))}
      </div>

    </section>
  )
}