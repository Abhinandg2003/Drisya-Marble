import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { products, collections, productCategories } from '../data'
import gsap from 'gsap'

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)

  const searchRef = useRef(null)
  const closeTimer = useRef(null)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const navigate = useNavigate()
  const location = useLocation()
  const searchWrapRef = useRef(null)
const searchIconRef = useRef(null)

  // Scroll hide/show — disabled when mobile menu is open
  useEffect(() => {
    const onScroll = () => {
      if (menuOpen) return // don't hide when mobile menu is open
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const current = window.scrollY
        const diff = current - lastScrollY.current
        if (current < 60) {
          setVisible(true)
        } else if (diff > 4) {
          setVisible(false)
          setActiveDropdown(null)
        } else if (diff < -4) {
          setVisible(true)
        }
        lastScrollY.current = current
        ticking.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  // Close on route change
  useEffect(() => {
    setActiveDropdown(null)
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location])

  // Search
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }


  useEffect(() => {
  if (!searchWrapRef.current) return

  if (searchOpen) {
    gsap.to(searchWrapRef.current, {
      width: 240,
      opacity: 1,
      duration: 0.45,
      ease: "power3.out"
    })

    gsap.to(searchIconRef.current, {
      opacity: 0,
      scale: 0.6,
      duration: 0.25,
      ease: "power2.out"
    })
  } else {
    gsap.to(searchWrapRef.current, {
      width: 0,
      opacity: 0,
      duration: 0.35,
      ease: "power2.inOut"
    })

    gsap.to(searchIconRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    })
  }
}, [searchOpen])


  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  // Keyboard close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setActiveDropdown(null); setSearchOpen(false); setMenuOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleZoneEnter = (name) => {
    clearTimeout(closeTimer.current)
    setActiveDropdown(name)
  }

  const handleZoneLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 80)
  }

  // Navbar height for offset
  const NAV_H = 80 // px, matches h-20

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-white
          border-b border-[#D4B896]/30
          shadow-[0_2px_20px_rgba(0,0,0,0.07)]
          transition-transform duration-300 ease-in-out
          ${visible ? 'translate-y-0' : '-translate-y-full'}
        `}
        style={{ height: NAV_H }}
      >
        <div className="max-w-8xl mx-auto px-6 md:px-10 lg:px-20 h-full flex items-center justify-between">

          {/* Logo */}
          {/* <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
                  <div className="bg-[#a64241]"></div>
                  <div className="bg-[#782423]"></div>
                  <div className="bg-[#782423]"></div>
                  <div className="bg-[#a64241]"></div>
                </div>
              </div>
              <div>
                <span className="font-display text-2xl tracking-[0.15em] text-[#1A1A1A] leading-none">
                  Petra
                </span>
                <div className="text-[11px] tracking-[0.15em] text-[#782423] font-body font-semibold">
                  Stone & Tile
                </div>
              </div>
            </div>
          </Link> */}
          <a href="/">
            <img src="/images/logo2.png" className='w-40' alt="" />
          </a>

          {/* Center Nav */}
          <div className="hidden lg:flex items-center gap-8">

            {/* Products */}
            <div
              className="relative pb-4 -mb-4"
              onMouseEnter={() => handleZoneEnter('products')}
              onMouseLeave={handleZoneLeave}
            >
              <button className="flex items-center gap-1.5 text-[15px] tracking-wide font-medium text-[#1A1A1A] hover:text-[#782423] transition-colors">
                Products
                <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Full-width panel — rendered via portal-like fixed positioning */}
              <div
                className={`fixed left-0 min-h-[85vh] right-0 bg-white border-b border-[#D4B896]/40 shadow-2xl transition-all duration-250 origin-top z-40 ${
                  activeDropdown === 'products'
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
                style={{ top: NAV_H }}
              >
                <div className="max-w-8xl mx-auto px-6 md:px-10 lg:px-20 py-12">
                  <div className="grid grid-cols-3 gap-16">

                    {/* Col 1 — Categories */}
                    <div>
                      <p className="text-[15px] tracking-wide  text-[#782423] font-semibold mb-6 pb-3 border-b border-[#D4B896]/40">
                        By Category
                      </p>
                      <div className="space-y-1">
                        {productCategories.map(cat => (
                          <Link
                            key={cat.slug}
                            to={`/products?category=${cat.slug}`}
                            className="flex items-center justify-between px-2 py-3 text-[15px] text-[#1A1A1A] hover:text-[#782423] hover:bg-[#F5F0EB] transition-colors tracking-wide font-normal group"
                          >
                            {cat.name}
                            <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#782423]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                        <Link
                          to="/products"
                          className="flex items-center gap-2 px-2 py-3 mt-2 text-[15px] tracking-wide  font-semibold text-[#782423] hover:underline underline-offset-4"
                        >
                          All Products →
                        </Link>
                      </div>
                    </div>

                    {/* Col 2 — Featured Products */}
                    <div>
                      <p className="text-[15px] tracking-wide  text-[#782423] font-semibold mb-6 pb-3 border-b border-[#D4B896]/40">
                        Featured
                      </p>
                      <div className="space-y-1">
                        {products.slice(0, 5).map(p => (
                          <Link
                            key={p.slug}
                            to={`/products/${p.slug}`}
                            className="flex items-center gap-4 px-2 py-3 hover:bg-[#F5F0EB] transition-colors group/item"
                          >
                            <img src={p.image} alt={p.name} className="w-12 h-12 object-cover flex-shrink-0" />
                            <div>
                              <p className="text-[15px] font-normal text-[#1A1A1A] group-hover/item:text-[#782423] transition-colors leading-snug">{p.name}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Col 3 — Editorial image */}
                    <div className="relative overflow-hidden group/img h-full min-h-[70vh]">
                      <img
                        src="https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80"
                        alt="Explore our stone collection"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105 min-h-[320px]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-7">
                        <p className="text-[10px] tracking-[0.4em] uppercase text-white mb-2">New Arrivals 2026</p>
                        <p className="font-display text-2xl text-white leading-tight mb-4">Italian Marble<br />Collection</p>
                        <Link
                          to="/collections/italian-classics"
                          className="inline-block text-[11px] tracking-[0.25em] uppercase text-white border border-white/50 px-5 py-2.5 hover:bg-white hover:text-[#1A1A1A] transition-colors duration-300"
                        >
                          Explore
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Collections */}
            <div
              className="relative pb-4 -mb-4"
              onMouseEnter={() => handleZoneEnter('collections')}
              onMouseLeave={handleZoneLeave}
            >
              <button className="flex items-center gap-1.5 text-[15px] tracking-wide font-medium text-[#1A1A1A] hover:text-[#782423] transition-colors">
                Collections
                <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'collections' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`fixed left-0 right-0 bg-white border-b border-[#D4B896]/40 shadow-2xl transition-all duration-250 origin-top z-40 ${
                  activeDropdown === 'collections'
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
                style={{ top: NAV_H }}
              >
                <div className="max-w-8xl mx-auto px-6 md:px-10 lg:px-20 py-12 min-h-[85vh]">
                  <div className="grid grid-cols-3 gap-16">

                    {/* Col 1 — Collection list */}
                    <div>
                      <p className="text-[15px] tracking-wide  text-[#782423] font-semibold mb-6 pb-3 border-b border-[#D4B896]/40">
                        All Collections
                      </p>
                      <div className="space-y-1">
                        {collections.map(col => (
                          <Link
                            key={col.slug}
                            to={`/collections/${col.slug}`}
                            className="flex items-center justify-between px-2 py-3.5 text-[15px] text-[#1A1A1A] hover:text-[#782423] hover:bg-[#F5F0EB] transition-colors tracking-wide font-normal group"
                          >
                            <span>{col.name}</span>
                            <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#782423]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Col 2 — Collection taglines */}
                    <div>
                      <p className="text-[15px] tracking-wide  text-[#782423] font-semibold mb-6 pb-3 border-b border-[#D4B896]/40">
                        About Each
                      </p>
                      <div className="space-y-5">
                        {collections.map(col => (
                          <Link
                            key={col.slug}
                            to={`/collections/${col.slug}`}
                            className="block group"
                          >
                            <p className="text-[15px] font-normal text-[#1A1A1A] group-hover:text-[#782423] transition-colors mb-0.5">{col.name}</p>
                            <p className="text-[12px] text-[#8B7A6A]  font-display">{col.tagline}</p>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Col 3 — Editorial image */}
                    <div className="relative overflow-hidden group/img h-full min-h-[70vh]">
                      <img
                        src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80"
                        alt="Our collections"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105 min-h-[320px]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-7">
                        <p className="text-[10px] tracking-[0.4em] uppercase text-white mb-2">Handcrafted</p>
                        <p className="font-display text-2xl text-white leading-tight mb-4">Artisan<br />Traditions</p>
                        <Link
                          to="/collections/artisan-crafts"
                          className="inline-block text-[11px] tracking-[0.25em] uppercase text-white border border-white/50 px-5 py-2.5 hover:bg-white hover:text-[#1A1A1A] transition-colors duration-300"
                        >
                          Discover
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <Link to="/catalogues" className="flex items-center gap-1.5 text-[15px] tracking-wide font-medium text-[#1A1A1A] hover:text-[#782423] transition-colors">
              Catalogues
            </Link>

            <Link to="/about" className="flex items-center gap-1.5 text-[15px] tracking-[0.1em] font-medium text-[#1A1A1A] hover:text-[#782423] transition-colors">
              About
            </Link>

            <Link to="/contact" className="flex items-center gap-1.5 text-[16px] tracking-[0.1em] font-medium text-[#1A1A1A] hover:text-[#782423] transition-colors">
              Contact
            </Link>
          </div>

          {/* Right: Search */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center">
              <div className="relative flex items-center">

  {/* Search icon */}
  <button
    ref={searchIconRef}
    onClick={() => setSearchOpen(true)}
    className="text-[#1A1A1A] hover:text-[#782423] transition-colors"
  >
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </button>

  {/* Expanding input */}
  <div
    ref={searchWrapRef}
    className="absolute right-0 overflow-hidden flex items-center"
    style={{ width: 0, opacity: 0 }}
  >
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        ref={searchRef}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search tiles..."
        className="bg-transparent border-b border-[#782423] text-[#1A1A1A] placeholder-[#782423]/40 text-[15px] tracking-wide focus:outline-none w-52 pb-1"
      />
      <button type="button" onClick={() => setSearchOpen(false)} className="ml-2 text-[#782423] hover:text-[#1A1A1A]">
        ✕
      </button>
    </form>
  </div>

</div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-[#1A1A1A] p-1"
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — rendered outside nav as a fixed overlay so it's independently scrollable */}
      {menuOpen && (
        <div
          className="lg:hidden fixed z-40 left-0 right-0 bg-white border-t border-[#D4B896]/20 overflow-y-auto"
          style={{ top: NAV_H, bottom: 0 }}
        >
          <div className="px-6 py-6 space-y-1 pb-16">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="flex items-center border-b border-[#782423] pb-2 mb-8">
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tiles..."
                className="bg-transparent text-[#1A1A1A] placeholder-[#782423]/40 text-[15px] tracking-wide focus:outline-none flex-1"
              />
              <button type="submit">
                <svg className="w-5 h-5 text-[#782423]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <p className="text-[15px] tracking-wide  text-[#782423] font-semibold pt-2 pb-1">Products</p>
            <Link to="/products" className="block text-[15px] font-semibold text-[#1A1A1A] py-3 border-b border-[#F0E8DF]">All Products</Link>
            {productCategories.map(cat => (
              <Link key={cat.slug} to={`/products?category=${cat.slug}`} className="block text-[14px] font-medium text-[#5A4E44] py-2.5 pl-3 border-b border-[#F0E8DF]">
                {cat.name}
              </Link>
            ))}

            <p className="text-[15px] tracking-wide  text-[#782423] font-semibold pt-6 pb-1">Collections</p>
            {collections.map(col => (
              <Link key={col.slug} to={`/collections/${col.slug}`} className="block text-[14px] font-medium text-[#5A4E44] py-2.5 border-b border-[#F0E8DF]">
                {col.name}
              </Link>
            ))}

            <p className="text-[15px] tracking-wide  text-[#782423] font-semibold pt-6 pb-1">More</p>
            <Link to="/catalogues" className="block text-[15px] font-medium text-[#1A1A1A] py-3 border-b border-[#F0E8DF]">Catalogues</Link>
            <Link to="/about" className="block text-[15px] font-medium text-[#1A1A1A] py-3 border-b border-[#F0E8DF]">About</Link>
            <Link to="/contact" className="block text-[15px] font-medium text-[#1A1A1A] py-3 border-b border-[#F0E8DF]">Contact</Link>
          </div>
        </div>
      )}
    </>
  )
}