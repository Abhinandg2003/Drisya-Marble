import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { products, collections, productCategories, productItems } from '../data'
import gsap from 'gsap'


// Unique brand names derived from products
const brandNames = [...new Set(products.map(p => p.name))]
const Items = [...new Set(productItems.map(p => p.category))]

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [activePath, setActivePath] = useState('/')

  const searchRef = useRef(null)
  const searchWrapRef = useRef(null)
  const searchIconRef = useRef(null)
  const closeTimer = useRef(null)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Track active path for underline indicator
  useEffect(() => {
    setActivePath(location.pathname)
    setActiveDropdown(null)
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location])

  // Scroll hide/show
  useEffect(() => {
    const onScroll = () => {
      if (menuOpen) return
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const current = window.scrollY
        const diff = current - lastScrollY.current
        if (current < 60) setVisible(true)
        else if (diff > 4) { setVisible(false); setActiveDropdown(null) }
        else if (diff < -4) setVisible(true)
        lastScrollY.current = current
        ticking.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])




  // Search animation
  useEffect(() => {
    if (!searchWrapRef.current) return
    if (searchOpen) {
      gsap.to(searchWrapRef.current, { width: 240, opacity: 1, duration: 0.45, ease: 'power3.out' })
      gsap.to(searchIconRef.current, { opacity: 0, scale: 0.6, duration: 0.25, ease: 'power2.out' })
    } else {
      gsap.to(searchWrapRef.current, { width: 0, opacity: 0, duration: 0.35, ease: 'power2.inOut' })
      gsap.to(searchIconRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
    }
  }, [searchOpen])

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setActiveDropdown(null); setSearchOpen(false); setMenuOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }, [menuOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleZoneEnter = (name) => {
    clearTimeout(closeTimer.current)
    setActiveDropdown(name)
  }

  const handleZoneLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 80)
  }

  const NAV_H = 80

  // Active underline — SVG lens shape: tapers to near-zero at both ends, bright gold peak in centre
  const activeUnderline = (
    <span className="absolute -bottom-1 left-0 right-0 flex justify-center pointer-events-none">
      <svg width="100%" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c9a84c" stopOpacity="0" />
            <stop offset="15%" stopColor="#c9a84c" stopOpacity="1" />
            <stop offset="50%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="85%" stopColor="#c9a84c" stopOpacity="1" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Ellipse path — full width at centre, tapers to a point at both ends */}
        <ellipse cx="50" cy="4" rx="46" ry="2.5" fill="url(#goldGrad)" />
      </svg>
    </span>
  )

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/blogs', label: 'Insights' },
    { to: '/about', label: 'About' },
    { to: '/careers', label: 'Careers' },
    { to: '/contact', label: 'Contact' },

  ]

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          border-b
          shadow-[0_2px_20px_rgba(0,0,0,0.18)]
          transition-transform duration-300 ease-in-out
          ${visible ? 'translate-y-0' : '-translate-y-full'}
        `}
        style={{
          height: NAV_H,
          backgroundImage: `
      url(/images/Textures/navbarbg.avif),
      url(/images/Textures/navbarbg.jpg)
    `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottomColor: '#f2df8f',
        }}
      >
        {/* Subtle dark overlay so text stays readable over the texture */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        <div className="relative max-w-8xl mx-auto px-6 md:px-10 lg:px-20 h-full flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <picture>
              <source srcSet="/images/logogold.avif" type="image/avif" />

              <img
                src="/images/logogold.png"
                className="w-40"
                alt="Drisya Marble"
              />
            </picture>
          </Link>

          {/* Center Nav */}
          <div className="hidden lg:flex items-center gap-8">

            {/* Home */}
            <Link to="/" className={`relative flex items-center gap-1.5 text-[15px] tracking-wide  font-display transition-colors pb-1 ${activePath === '/' ? 'text-[#f2df8f]' : 'text-white hover:text-[#f2df8f]'}`}>
              Home
              {activePath === '/' && activeUnderline}
            </Link>

            {/* Products dropdown */}
            <div
              className="relative pb-4 -mb-4"
              onMouseEnter={() => handleZoneEnter('products')}
              onMouseLeave={handleZoneLeave}
            >
              <button className={`relative flex items-center gap-1.5 text-[15px] font-display tracking-wide transition-colors pb-1 ${activePath.startsWith('/brands') ? 'text-[#f2df8f]' : 'text-white hover:text-[#f2df8f]'}`}>
                Brands
                <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {activePath.startsWith('/brands') && activeUnderline}
              </button>

              <div
                className={`fixed left-0 right-0 bg-[#fdfaef] border-b border-[#D4B896]/40 shadow-2xl transition-all duration-250 origin-top z-40 ${activeDropdown === 'products' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                style={{ top: NAV_H }}
              >

                <div className="relative max-w-8xl mx-auto px-6 md:px-10 lg:px-20 py-12 min-h-[85vh]">
                  <div className="grid grid-cols-3 gap-16">
                    {/* Col 1 — brand list, max 8 */}
                    <div>
                      <p className="text-[15px] tracking-wide text-[#782423] font-semibold mb-6 font-display pb-3 border-b border-[#D4B896]/40">Brands</p>
                      <div className="space-y-1">
                        {brandNames.slice(0, 7).map(name => (
                          <Link key={name} to={`/brands?name=${encodeURIComponent(name)}`}
                            className="flex items-center justify-between px-2 py-3.5 text-[15px] text-[#1A1A1A] hover:text-[#782423] hover:bg-[#F5F0EB] transition-colors tracking-wide font-normal group">
                            <span>{name}</span>
                            <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#f2df8f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                        {brandNames.length > 8 && (
                          <Link to="/brands" className="flex items-center gap-2 px-2 py-3.5 mt-1 text-[15px] font-display tracking-wide font-semibold text-[#782423] hover:underline underline-offset-4">
                            All Brands →
                          </Link>
                        )}
                      </div>
                    </div>
                    {/* Col 2 — brand name + short description */}
                    <div>
                      <p className="text-[15px] tracking-wide text-[#782423] font-display font-semibold  mb-6 pb-3 border-b border-[#D4B896]/40">Featured</p>
                      <div className="space-y-1">
                        {products.slice(7, 12).map(p => (
                          <Link key={p.slug} to={`/brands?name=${encodeURIComponent(p.name)}`}
                            className="flex items-center gap-4 px-2 py-3 hover:bg-[#F5F0EB] transition-colors group/item">
                            <img src={p.image} alt={p.name} className="w-12 h-12 object-cover flex-shrink-0" />
                            <p className="text-[15px] font-normal text-[#1A1A1A] group-hover/item:text-[#782423] transition-colors leading-snug">{p.name}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Col 3 — editorial image */}
                    <div className="relative overflow-hidden group/img h-full min-h-[70vh]">
                      <img src="https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80" alt="Brands"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105 min-h-[320px]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-7">

                        <p className="font-display text-2xl text-white leading-tight mb-4">Premium<br />Brands</p>
                        <Link to="/brands" className="inline-block text-[11px] tracking-[0.25em] uppercase text-white border border-white/50 px-5 py-2.5 hover:bg-white hover:text-[#1A1A1A] transition-colors duration-300">View All</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Collections dropdown */}
            <div
              className="relative pb-4 -mb-4"
              onMouseEnter={() => handleZoneEnter('collections')}
              onMouseLeave={handleZoneLeave}
            >
              <button className={`relative flex items-center gap-1.5 text-[15px] font-display tracking-wide transition-colors pb-1 ${activePath.startsWith('/products') ? 'text-[#f2df8f]' : 'text-white hover:text-[#f2df8f]'}`}>
                Collections
                <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'collections' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {activePath.startsWith('/products') && activeUnderline}
              </button>

              <div
                className={`fixed left-0 right-0 bg-[#fdfaef] border-b border-[#D4B896]/40 shadow-2xl transition-all duration-250 origin-top z-40 ${activeDropdown === 'collections' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                style={{ top: NAV_H }}
              >
                <div className="max-w-8xl mx-auto px-6 md:px-10 lg:px-20 py-12 min-h-[85vh]">
                  <div className="grid grid-cols-3 gap-16">
                    <div>
                      <p className="text-[15px] tracking-wide text-[#782423] font-semibold mb-6 font-display pb-3 border-b border-[#D4B896]/40">Collections</p>
                      <div className="space-y-1">
                        {collections.map(col => (
                          <Link key={col.slug} to={`/collections/${col.slug}`}
                            className="flex items-center justify-between px-2 py-3.5 text-[15px] text-[#1A1A1A] hover:text-[#782423] hover:bg-[#F5F0EB] transition-colors tracking-wide font-normal group">
                            <span>{col.name}</span>
                            <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#782423]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}

                        {brandNames.length > 8 && (
                          <Link to="/products" className="flex items-center gap-2 px-2 py-3.5 mt-1 text-[15px] font-display tracking-wide font-semibold text-[#782423] hover:underline underline-offset-4">
                            All Collections →
                          </Link>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-[15px] tracking-wide text-[#782423] font-semibold mb-6 pb-3 border-b font-display border-[#D4B896]/40">About Each</p>
                      <div className="space-y-5">
                        {collections.map(col => (
                          <Link key={col.slug} to={`/products?category=${col.slug}`} className="block group">
                            <p className="text-[15px] font-normal text-[#1A1A1A] group-hover:text-[#782423] transition-colors mb-0.5">{col.name}</p>
                            <p className="text-[12px] text-[#8B7A6A] ">{col.tagline}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="relative overflow-hidden group/img h-full min-h-[70vh]">
                      <img src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80" alt="Collections"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105 min-h-[320px]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-7">
                        <p className="text-[10px] tracking-[0.4em] uppercase text-white mb-2">Handcrafted</p>
                        <p className="font-display text-2xl text-white leading-tight mb-4">Artisan<br />Traditions</p>
                        <Link to="/collections/artisan-crafts" className="inline-block text-[11px] tracking-[0.25em] uppercase text-white border border-white/50 px-5 py-2.5 hover:bg-white hover:text-[#1A1A1A] transition-colors duration-300">Discover</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Plain nav links */}
            {navLinks.filter(l => l.to !== '/').map(link => (
              <Link key={link.to} to={link.to}
                className={`relative text-[15px] tracking-wide font-display  transition-colors pb-1 ${activePath === link.to ? 'text-[#f2df8f]' : 'text-white hover:text-[#f2df8f]'}`}>
                {link.label}
                {activePath === link.to && activeUnderline}
              </Link>
            ))}
          </div>

          {/* Right: Search + Call us */}
          <div className="flex items-center gap-4">

            {/* Search */}
            <div className="hidden navxl:flex items-center pl-20">
              <div className="relative flex items-center">
                <button ref={searchIconRef} onClick={() => setSearchOpen(true)}
                  className="text-white hover:text-[#f2df8f] transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <div ref={searchWrapRef} className="absolute right-0 overflow-hidden flex items-center" style={{ width: 0, opacity: 0 }}>
                  <form onSubmit={handleSearch} className="flex items-center">
                    <input ref={searchRef} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="bg-transparent border-b border-[#f2df8f] text-white placeholder-white/40 text-[15px] tracking-wide focus:outline-none w-52 pb-1" />
                    <button type="button" onClick={() => setSearchOpen(false)} className="ml-2 text-[#f2df8f] hover:text-white">✕</button>
                  </form>
                </div>
              </div>
            </div>

            {/* Call us button */}
            <a
              href="tel:+919876543210"
              className="hidden navxl:flex items-center gap-2 px-3 py-1 border rounded-md text-[15px] bg-gradient-to-r from-[#ddb65b] via-[#f2df8f] to-[#ddb65b] text-[#1a1a1a] tracking-wide font-medium  transition-all duration-200 hover:bg-[#782423]"
              style={{ borderColor: '#f2df8f' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="navxl:hidden text-white p-1" aria-label="Toggle menu">
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navxl:hidden fixed z-50 left-0 right-0 bg-[#fdfaef] border-t border-[#f2df8f]/40 overflow-y-auto" style={{ top: NAV_H, bottom: 0 }}>
          <div className="px-6 py-6 space-y-1 pb-16">
            <form onSubmit={handleSearch} className="flex items-center border-b border-[#782423] pb-2 mb-8">
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tiles..."
                className="bg-transparent text-[#1A1A1A] placeholder-[#782423]/40 text-[15px] tracking-wide focus:outline-none flex-1" />
              <button type="submit">
                <svg className="w-5 h-5 text-[#782423]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <Link to="/" className="block text-[15px] font-semibold font-display text-[#1A1A1A] py-3 border-b border-[#F0E8DF]">Home</Link>

            {/* <Link to="/brands" className="block text-[15px] font-semibold font-display text-[#1A1A1A] py-3 border-b border-[#F0E8DF]">Brands</Link>
            {productCategories.map(cat => (
              <Link key={cat.slug} to={`/products?category=${cat.slug}`} className="block text-[14px] font-medium text-[#5A4E44] py-2.5 pl-3 border-b border-[#F0E8DF]">{cat.name}</Link>
            ))} */}

            <Link to="/brands" className="block text-[15px] font-semibold font-display text-[#1A1A1A] py-3 border-b border-[#F0E8DF]">Brands</Link>
            {brandNames.slice(0, 7).map(name => (
              <Link key={name} to={`/brands?name=${encodeURIComponent(name)}`}
                className="block text-[14px] font-medium text-[#5A4E44] py-2.5 pl-3 border-b border-[#F0E8DF]">
                <span>{name}</span>

              </Link>
            ))}
            {brandNames.length > 8 && (
              <Link to="/brands" className="flex items-center gap-2 px-2 py-3.5 mt-1 text-[14px] font-display tracking-wide font-semibold text-[#782423] hover:underline underline-offset-4">
                All Brands →
              </Link>
            )}



            <Link to="/products" className="block text-[15px] font-semibold font-display text-[#1A1A1A] py-3 border-b border-[#F0E8DF]">Collections</Link>
            {collections.map(col => (
              <Link key={col.slug} to={`/collections/${col.slug}`} className="block text-[14px] font-medium text-[#5A4E44] py-2.5 border-b border-[#F0E8DF]">{col.name}</Link>
            ))}

            {/* <Link to="/products" className="block text-[15px] font-semibold font-display text-[#1A1A1A] py-3 border-b border-[#F0E8DF]">Collections</Link>
            {collections.map(col => (
              <Link key={col.slug} to={`/products?category=${col.slug}`}
                className="block text-[14px] font-medium text-[#5A4E44] py-2.5 border-b border-[#F0E8DF]">
                <span>{col.name}</span>
              </Link>
            ))} */}

            {brandNames.length > 8 && (
              <Link to="/products" className="flex items-center gap-2 py-3.5 mt-1 text-[14px] font-display tracking-wide font-semibold text-[#782423] hover:underline underline-offset-4">
                All Collections →
              </Link>
            )}



            <p className="text-[15px] tracking-wide text-[#1A1A1A] font-display font-semibold pt-6 pb-1">More</p>
            <Link to="/blogs" className="block text-[15px] font-medium text-[#1A1A1A] py-3 border-b border-[#F0E8DF]">Blogs</Link>
            <Link to="/about" className="block text-[15px] font-medium text-[#1A1A1A] py-3 border-b border-[#F0E8DF]">About</Link>
            <Link to="/careers" className="block text-[15px] font-medium text-[#1A1A1A] py-3 border-b border-[#F0E8DF]">Careers</Link>
            <Link to="/contact" className="block text-[15px] font-medium text-[#1A1A1A] py-3 border-b border-[#F0E8DF]">Contact</Link>

            <a href="tel:+919745606291" className="flex items-center gap-2 mt-4 text-[15px] font-medium text-[#782423] py-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          </div>
        </div>
      )}
    </>
  )
}