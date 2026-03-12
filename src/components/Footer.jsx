import { Link } from 'react-router-dom'
import { collections, productCategories,products,} from '../data'
import { Facebook, Instagram, MessageCircleMore, Youtube } from 'lucide-react'

const brandNames = [...new Set(products.map(p => p.name))]

export default function Footer() {
  return (
    <footer className="relative pt-16 overflow-hidden bg-white" style={{
          backgroundImage: `
          url(/images/Textures/menured.avif),
          url(/images/Textures/menured.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>

                    <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-0 md:pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          {/* Brand */}
          <div className="col-span-1">
            <div className='flex justify-center md:justify-start mb-5'>
            <a href="/">
            <picture>
              <source srcSet="/images/logogold2.avif" type="image/avif" />
                <img src="/images/logogold2.jpg" alt="" className='h-[150px]' />
                </picture>
                </a>
                
                </div>
            <p className="text-[14px] leading-relaxed tracking-wide text-white/75 max-w-xs">
              Curating the world's finest natural stone and tile for those who demand extraordinary surfaces.
            </p>
            <div className="flex justify-center md:justify-start  gap-4 mt-6">
              {[<Instagram/>, <Facebook/>,<MessageCircleMore/> ,<Youtube/>].map(s => (
                <a key={s} href="#" className="text-[8px] tracking-[0.2em]  text-[#f4dc7c] hover:text-[#ddb65b] transition-colors">
                  {s}
                </a>

                
              ))}
            </div>


<div className='flex justify-center lg:justify-start'>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2  px-3 py-1 mt-5 w-fit border rounded-md text-[15px] bg-gradient-to-r from-[#ddb65b] via-[#f2df8f] to-[#ddb65b] text-[#1a1a1a] tracking-wide font-medium  transition-all duration-200 hover:bg-[#782423]"
              style={{ borderColor: '#f2df8f' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-[17px]   text-[#f2df8f] mb-6 tracking-wide font-semibold">Brands</p>
            <ul className="space-y-3">
              {brandNames.slice(0, 7).map(name => (
  <li key={name}>
    <Link
      to={`/brands?name=${encodeURIComponent(name)}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="text-[15px] text-white/75 hover:text-white hover:underline transition-colors tracking-wide"
    >
      {name}
    </Link>
  </li>
))}
              <li><Link to="/brands" className="text-[15px] text-[#f2df8f] hover:text-[#f2df8f] hover:underline transition-colors tracking-wide">All Brands→</Link></li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <p className="text-[17px] tracking-wide  text-[#f2df8f] mb-6 font-semibold">Collections</p>
            <ul className="space-y-3">
              {collections.map(col => (
                <li key={col.slug}>
                  <Link key={col.slug} to={`/collections/${col.slug}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                   className="text-[15px] text-white/75 hover:text-white hover:underline transition-colors tracking-wide">
                    {col.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[17px] tracking-wide  text-[#f2df8f] mb-6 font-semibold">Company</p>
            <ul className="space-y-3">
              {[['Insights','/blogs'],['About', '/about'],['Careers', '/careers'], ['Contact', '/contact']].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-[15px] text-white/75 hover:text-white hover:underline transition-colors tracking-wide">{label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 border border-[#f2df8f]/30">
              <p className="text-[17px] tracking-wide font-semibold  text-[#f2df8f] mb-2">Showrooms</p>
              <a target='blank' href="https://maps.app.goo.gl/4xrNXrAgMN69ob5B8">
                <p className="text-[14px] text-white/75 leading-relaxed mb-2 hover:text-white hover:underline">Bus Stop, NH Bypass, Service Road<br />Anjumoorthy, Vadakkancheri-II<br />Kerala 678682</p>
                </a>

              <a target='blank' href="https://maps.app.goo.gl/xU3f6fasXoNpwm1M6"><p className="text-[14px] hover:underline hover:text-white text-white/75 leading-relaxed">Near Govt. College<br />Ambattupalayam, Chittur<br />Kerala 678104</p></a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#f2df8f]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[14px] text-white/75 tracking-wide ">
            © {new Date().getFullYear()} Drisya Marble. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <a key={item} href="#" className="text-[14px] text-white/75 hover:text-white hover:underline tracking-wide  transition-colors text-center">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
