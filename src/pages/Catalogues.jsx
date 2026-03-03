import { useState } from 'react'
import { Link } from 'react-router-dom'

const catalogues = [
  {
    id: 'main-2024',
    title: 'The Drisya Collection 2024',
    subtitle: 'Complete Product Catalogue',
    year: '2024',
    pages: 186,
    size: '42 MB',
    cover: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&q=80',
    description: 'Our comprehensive 2024 catalogue featuring the full range of natural stone, porcelain, and artisan tile. Includes technical specifications, installation guides, and designer insights.',
    category: 'Full Catalogue',
    featured: true,
  },
  {
    id: 'marble-2024',
    title: 'Italian Marble & Stone',
    subtitle: 'Natural Stone Collection',
    year: '2024',
    pages: 64,
    size: '18 MB',
    cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    description: 'A dedicated catalogue of our finest Italian marbles, travertines, and limestones. Each piece documented with quarry origin, vein patterns, and finish options.',
    category: 'Natural Stone',
    featured: false,
  },
  {
    id: 'artisan-2024',
    title: 'Artisan & Handmade',
    subtitle: 'Zellige, Terracotta & Beyond',
    year: '2024',
    pages: 48,
    size: '14 MB',
    cover: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&q=80',
    description: 'Celebrate the traditions of handmade tile. Moroccan zellige, Spanish talavera, hand-pressed terracotta — with stories of the artisan families behind each collection.',
    category: 'Artisan',
    featured: false,
  },
  {
    id: 'outdoor-2024',
    title: 'Outdoor & Landscape',
    subtitle: 'Exterior Surfaces Guide',
    year: '2024',
    pages: 52,
    size: '16 MB',
    cover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    description: 'Tiles rated for outdoor use, including frost-resistance data, slip ratings, and installation specifications for patios, pool surrounds, and garden paths.',
    category: 'Outdoor',
    featured: false,
  },
  {
    id: 'modern-2024',
    title: 'Modern & Minimal',
    subtitle: 'Contemporary Surfaces',
    year: '2024',
    pages: 58,
    size: '20 MB',
    cover: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
    description: 'Large-format porcelain, ultra-slim panels, and monolithic surfaces for the contemporary home. Includes size guide and grout-free installation options.',
    category: 'Modern',
    featured: false,
  },
  {
    id: 'trade-2024',
    title: 'Trade Programme Guide',
    subtitle: 'For Architects & Designers',
    year: '2024',
    pages: 32,
    size: '8 MB',
    cover: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=600&q=80',
    description: 'Everything trade clients need: pricing structure, sample ordering, project consultation services, and our bespoke sourcing programme for unique specifications.',
    category: 'Trade',
    featured: false,
  },
]

const categories = ['All', ...Array.from(new Set(catalogues.map(c => c.category)))]

export default function Catalogues() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [requestForm, setRequestForm] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', company: '' })
  const [submitted, setSubmitted] = useState(null)

  const filtered = activeCategory === 'All' ? catalogues : catalogues.filter(c => c.category === activeCategory)

  const handleRequest = (catalogueId) => {
    setRequestForm(catalogueId)
    setFormData({ name: '', email: '', company: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(requestForm)
    setRequestForm(null)
  }

  return (
    <main className="pt-20">

      {/* Hero */}
      <div className="relative overflow-hidden bg-[#1A1A1A] py-28 px-6">
        {/* Decorative tile grid in background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array(48).fill(0).map((_, i) => (
              <div
                key={i}
                className="border border-[#782423]/30"
                style={{ background: i % 7 === 0 ? '#782423' : i % 11 === 0 ? '#a64241' : 'transparent' }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="text-[9px] tracking-[0.5em]  text-[#a64241] mb-4">Downloads & Literature</p>
          <h1 className="font-display text-6xl md:text-8xl text-white mb-6 leading-none">
            Catalogues
          </h1>
          <p className="text-[#8B7A6A] text-lg tracking-wide max-w-xl">
            Browse and download our full product literature — from comprehensive collection guides to specialist trade documents.
          </p>
        </div>
      </div>

      {/* Featured catalogue */}
      {catalogues.find(c => c.featured) && (
        <section className="border-b border-[#D4B896]/30">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <p className="text-[9px] tracking-[0.4em]  text-[#782423] mb-8">Featured</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative group overflow-hidden">
                <img
                  src={catalogues[0].cover}
                  alt={catalogues[0].title}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#782423] text-white text-[9px] tracking-[0.15em]  px-3 py-1.5">
                  {catalogues[0].year}
                </div>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.15em]  text-[#782423] mb-3">{catalogues[0].category}</p>
                <h2 className="font-display text-4xl md:text-5xl text-[#1A1A1A] mb-3 leading-tight">{catalogues[0].title}</h2>
                <p className="text-[#8B7A6A] tracking-widest  text-xs mb-6">{catalogues[0].subtitle}</p>
                <p className="text-[#5A4E44] leading-relaxed tracking-wide mb-8 text-base">
                  {catalogues[0].description}
                </p>
                <div className="flex gap-8 mb-10">
                  <div>
                    <p className="text-[9px] tracking-[0.15em]  text-[#782423] mb-1">Pages</p>
                    <p className="font-display text-2xl text-[#1A1A1A]">{catalogues[0].pages}</p>
                  </div>
                  <div className="w-px bg-[#D4B896]/30" />
                  <div>
                    <p className="text-[9px] tracking-[0.15em]  text-[#782423] mb-1">File Size</p>
                    <p className="font-display text-2xl text-[#1A1A1A]">{catalogues[0].size}</p>
                  </div>
                  <div className="w-px bg-[#D4B896]/30" />
                  <div>
                    <p className="text-[9px] tracking-[0.15em]  text-[#782423] mb-1">Format</p>
                    <p className="font-display text-2xl text-[#1A1A1A]">PDF</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleRequest(catalogues[0].id)}
                    className="bg-[#782423] text-white text-xs tracking-[0.15em]  px-8 py-4 hover:bg-[#1A1A1A] transition-colors duration-300"
                  >
                    Download Free
                  </button>
                  <button className="border border-[#D4B896]/60 text-[#5A4E44] text-xs tracking-[0.15em]  px-8 py-4 hover:border-[#782423] hover:text-[#782423] transition-colors duration-300">
                    Preview Online
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All catalogues */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap mb-12">
          <span className="text-[9px] tracking-[0.15em]  text-[#782423] mr-4">Filter</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs tracking-[0.2em]  transition-colors border ${
                activeCategory === cat
                  ? 'bg-[#782423] text-white border-[#782423]'
                  : 'border-[#D4B896]/60 text-[#5A4E44] hover:border-[#782423] hover:text-[#782423]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.filter(c => !c.featured || activeCategory !== 'All').map(catalogue => (
            <div key={catalogue.id} className="group">
              <div className="relative overflow-hidden aspect-[3/4] mb-5 bg-[#E8DDD4]">
                <img
                  src={catalogue.cover}
                  alt={catalogue.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-[#782423] text-white text-[9px] tracking-[0.25em]  px-2.5 py-1">
                  {catalogue.year}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => handleRequest(catalogue.id)}
                    className="w-full bg-white text-[#1A1A1A] text-xs tracking-[0.25em]  py-3 hover:bg-[#782423] hover:text-white transition-colors duration-300"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
              <p className="text-[9px] tracking-[0.15em]  text-[#782423] mb-2">{catalogue.category}</p>
              <h3 className="font-display text-xl text-[#1A1A1A] mb-1">{catalogue.title}</h3>
              <p className="text-[10px] tracking-[0.2em]  text-[#8B7A6A] mb-3">{catalogue.subtitle}</p>
              <p className="text-sm text-[#5A4E44] leading-relaxed line-clamp-2 mb-4">{catalogue.description}</p>
              <div className="flex items-center gap-4 text-[10px] tracking-[0.2em]  text-[#8B7A6A]">
                <span>{catalogue.pages} pages</span>
                <span className="w-px h-3 bg-[#D4B896]" />
                <span>{catalogue.size}</span>
                <span className="w-px h-3 bg-[#D4B896]" />
                <span>PDF</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Physical copy CTA */}
      <section className="bg-[#EDE5DA] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-12 h-0.5 bg-[#782423] mx-auto mb-8" />
          <h2 className="font-display text-4xl text-[#1A1A1A] mb-4">Prefer a Printed Copy?</h2>
          <p className="text-[#5A4E44] tracking-wide leading-relaxed mb-8">
            We offer complimentary printed catalogues for trade professionals and serious homeowners. 
            Request your copy and we'll have it shipped directly to you.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#782423] text-white text-xs tracking-[0.15em]  px-10 py-4 hover:bg-[#1A1A1A] transition-colors duration-300"
          >
            Request a Printed Copy
          </Link>
        </div>
      </section>

      {/* Download Modal */}
      {requestForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setRequestForm(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-white w-full max-w-md p-10 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setRequestForm(null)}
              className="absolute top-5 right-5 text-[#8B7A6A] hover:text-[#1A1A1A] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <p className="text-[9px] tracking-[0.4em]  text-[#782423] mb-3">Free Download</p>
            <h3 className="font-display text-2xl text-[#1A1A1A] mb-6">
              {catalogues.find(c => c.id === requestForm)?.title}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Your name', type: 'text' },
                { key: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email' },
                { key: 'company', label: 'Company / Studio', placeholder: 'Optional', type: 'text' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-[9px] tracking-[0.15em]  text-[#782423] mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    required={field.key !== 'company'}
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full bg-transparent border-b border-[#D4B896]/60 focus:border-[#782423] text-[#1A1A1A] py-2 text-sm tracking-wide focus:outline-none transition-colors placeholder-[#8B7A6A]/40"
                  />
                </div>
              ))}

              <p className="text-[10px] text-[#8B7A6A] tracking-wide leading-relaxed">
                By downloading you agree to receive occasional product updates from Petra Stone & Tile. Unsubscribe anytime.
              </p>

              <button
                type="submit"
                className="w-full bg-[#782423] text-white text-xs tracking-[0.15em]  py-4 hover:bg-[#1A1A1A] transition-colors duration-300"
              >
                Download Now
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success notification */}
      {submitted && (
        <div className="fixed bottom-6 right-6 z-[200] bg-[#1A1A1A] text-white px-6 py-4 flex items-center gap-4 shadow-2xl">
          <div className="w-6 h-6 bg-[#782423] flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide">Download link sent!</p>
            <p className="text-[10px] text-white/60">Check your inbox for the PDF link.</p>
          </div>
          <button onClick={() => setSubmitted(null)} className="ml-4 text-white/40 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </main>
  )
}