import { Link } from 'react-router-dom'
import { collections, productCategories } from '../data'
import { Facebook, Instagram, MessageCircleMore, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#f5f0eb] text-[#D4C4B0]">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1">
            <div className='flex justify-center md:justify-start mb-10'>
            <a href="/home">
                <img src="/images/logo.png" alt="" className='h-[150px]' /></a>
                </div>
            <p className="text-[14px] leading-relaxed tracking-wide text-[#1a1a1a]/75 max-w-xs">
              Curating the world's finest natural stone and tile for those who demand extraordinary surfaces.
            </p>
            <div className="flex justify-center md:justify-start  gap-4 mt-6">
              {[<Instagram/>, <Facebook/>,<MessageCircleMore/> ,<Youtube/>].map(s => (
                <a key={s} href="#" className="text-[8px] tracking-[0.2em]  text-[#1a1a1a]/75 hover:text-[#782423] transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-[17px]   text-[#782423] mb-6 tracking-wide font-semibold">Products</p>
            <ul className="space-y-3">
              {productCategories.map(cat => (
                <li key={cat.slug}>
                  <Link to={`/products?category=${cat.slug}`} className="text-[15px] text-[#1a1a1a]/75 hover:text-[#1a1a1a] transition-colors tracking-wide">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li><Link to="/products" className="text-[15px] text-[#a64241] hover:text-[#782423] transition-colors tracking-wide">All Products</Link></li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <p className="text-[17px] tracking-wide  text-[#782423] mb-6 font-semibold">Collections</p>
            <ul className="space-y-3">
              {collections.map(col => (
                <li key={col.slug}>
                  <Link to={`/collections/${col.slug}`} className="text-[15px] text-[#1a1a1a]/75 hover:text-[#1a1a1a] transition-colors tracking-wide">
                    {col.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[17px] tracking-wide  text-[#782423] mb-6 font-semibold">Company</p>
            <ul className="space-y-3">
              {[['About', '/about'], ['Contact', '/contact'], ['Trade Program', '#'], ['Project Gallery', '#'], ['Installation Guide', '#']].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-[15px] text-[#1a1a1a]/75 hover:text-[#1a1a1a] transition-colors tracking-wide">{label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-4 border border-[#782423]/30">
              <p className="text-[17px] tracking-wide  text-[#782423] mb-2">Showroom</p>
              <p className="text-[14px] text-[#1a1a1a]/75 leading-relaxed">123 Stone Quarter<br />New York, NY 10001<br />Mon–Sat 9am–6pm</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#782423]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[14px] text-[#1a1a1a]/75 tracking-wide ">
            © {new Date().getFullYear()} Drisya Marble. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map(item => (
              <a key={item} href="#" className="text-[14px] text-[#1a1a1a]/75 hover:text-[#782423] tracking-wide  transition-colors text-center">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
