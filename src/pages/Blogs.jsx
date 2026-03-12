import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'


const API_URL = 'https://drisya-backend.onrender.com/api/cms/blogs'

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

function SkeletonFeatured() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-14 border-b border-[#E8DDD4]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 animate-pulse">
        <div className="bg-[#E8DDD4]" style={{ height: 'clamp(280px, 35vw, 500px)' }} />
        <div className="bg-white p-10 md:p-16 flex flex-col justify-center gap-4">
          <div className="h-3 bg-[#E8DDD4] rounded w-32" />
          <div className="h-8 bg-[#E8DDD4] rounded w-3/4" />
          <div className="h-8 bg-[#E8DDD4] rounded w-1/2" />
          <div className="h-3 bg-[#E8DDD4] rounded w-full" />
          <div className="h-3 bg-[#E8DDD4] rounded w-5/6" />
        </div>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="flex flex-col border-[4px] border-[#E8DDD4] bg-white p-3 animate-pulse">
      <div className="mb-5 bg-[#E8DDD4]" style={{ height: '220px' }} />
      <div className="h-3 bg-[#E8DDD4] rounded w-24 mb-3" />
      <div className="h-5 bg-[#E8DDD4] rounded w-3/4 mb-2" />
      <div className="h-5 bg-[#E8DDD4] rounded w-1/2 mb-4" />
      <div className="h-3 bg-[#E8DDD4] rounded w-full mb-2" />
      <div className="h-3 bg-[#E8DDD4] rounded w-5/6" />
    </div>
  )
}

export default function Blogs() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const scrollRef = useRef(null)

  useEffect(() => {
    setLoading(true)
    fetch(API_URL)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          // Sort newest first, add slug
          const sorted = [...data.blogs].sort((a, b) => new Date(b.date) - new Date(a.date))
          setPosts(sorted.map((p, i) => ({ ...p, slug: slugify(p.title) + '-' + p._id.slice(-6) })))
        } else {
          setError('Failed to load posts.')
        }
      })
      .catch(() => setError('Could not reach the server.'))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...Array.from(new Set(posts.flatMap(p => p.tag || [])))]
  const featured = posts[0] || null
  const rest = posts.slice(1)
  const filtered = rest.filter(p => activeCategory === 'All' || (p.tag || []).includes(activeCategory))

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 200, behavior: 'smooth' })

  return (
    <main className="pt-20 bg-[#fdfaef] min-h-screen">

      {/* Hero */}
      <div className="relative h-[30vh] md:h-[50vh] overflow-hidden">
        <picture>
          <source srcSet="/images/Blogs.avif" type="image/avif" />
          <img src="/images/Blogs.jpg" alt="Blogs" className="absolute inset-0 w-full h-full object-cover" />
        </picture>
        <div className="absolute inset-0 bg-black/20" />
        {/* <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'url(/images/Textures/menuwhite.jpg)', backgroundSize: 'cover', opacity: 0.18 }}
        /> */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
          <h1 className="font-display text-[35px] md:text-[70px] text-white">Stories and Insights</h1>
        </div>
      </div>

      {/* Featured */}
      {loading && <SkeletonFeatured />}
      {error && (
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <p className="text-[#8B7A6A] tracking-wide text-sm">{error}</p>
        </div>
      )}
      {!loading && !error && featured && (
        <div className="max-w-7xl mx-auto px-6 py-14 border-b border-[#E8DDD4]">
          <Link to={`/blogs/${featured.slug}`} state={{ post: featured }} className="grid grid-cols-1 lg:grid-cols-2 gap-0 group border-[8px] border-[#f2df8f]">
            <div className="relative overflow-hidden" style={{ height: 'clamp(280px, 35vw, 500px)' }}>
              <img src={featured.image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="bg-white py-10 px-3 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                  {(featured.tag || []).slice(0,3).map((t, i) => (
                    <span
                      key={i}
                      className="text-[13px] tracking-wide text-[#782423] border border-[#D4B896]/60 px-2 py-0.5 rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="w-1 h-1 rounded-full bg-[#D4B896]" />
                <span className="text-[12px] text-[#8B7A6A]">{featured.readTime} min read</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] leading-tight mb-5 group-hover:text-[#782423] transition-colors duration-300">{featured.title}</h2>
              <p className="text-[#5A4E44] leading-relaxed tracking-wide mb-8 text-sm">{featured.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[15px] text-[#1A1A1A]">{featured.author}</p>
                  <p className="text-[11px] text-[#8B7A6A]">{formatDate(featured.date)}</p>
                </div>
                <span className="text-[13px] tracking-wide text-[#782423] border-b border-[#782423]/40 pb-0.5 group-hover:border-[#782423] transition-colors">Read More →</span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Category filter carousel */}
      {!loading && !error && categories.length > 1 && (
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
          <div className="flex items-center gap-2">
            <div ref={scrollRef} className="flex items-center gap-2 overflow-x-auto flex-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 text-[13px] tracking-wide rounded-md px-4 py-2 border transition-colors duration-200 ${activeCategory === cat
                    ? 'border rounded-md bg-gradient-to-r from-[#711a19] via-[#7e2e1e] to-[#711a19] text-[#fff6e2] transition-all duration-200'
                    : 'border-[#D4B896]/60 text-[#5A4E44] hover:border-[#711a19] hover:text-[#782423]'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {loading && Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
          {!loading && !error && filtered.map(post => (
            <Link key={post._id} to={`/blogs/${post.slug}`} state={{ post }} className="group flex flex-col border-[4px] border-[#f2df8f] bg-white p-3">
              <div className="relative overflow-hidden mb-5" style={{ height: '220px' }}>
                <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {(post.tag || []).slice(0,3).map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] tracking-wide text-[#782423] border border-[#D4B896]/60 px-2 py-0.5 rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="w-1 h-1 rounded-full bg-[#D4B896]" />
                <span className="text-[11px] text-[#8B7A6A]">{post.readTime} min read</span>
              </div>
              <h3 className="font-display text-xl text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#782423] transition-colors duration-300">{post.title}</h3>
              <p className="text-[#5A4E44] text-sm leading-relaxed tracking-wide mb-5 flex-1 line-clamp-3">{post.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E8DDD4]">
                <p className="text-[11px] text-[#8B7A6A]">{formatDate(post.date)}</p>
                <span className="text-[13px] tracking-wide text-[#782423] border-b border-[#782423]/30 pb-0.5 group-hover:border-[#782423] transition-colors">Read →</span>
              </div>
            </Link>
          ))}
          {!loading && !error && filtered.length === 0 && (
            <div className="col-span-3 py-20 text-center">
              <p className="text-[#5A4E44] tracking-wide text-sm">No posts in this category yet.</p>
            </div>
          )}
        </div>
        <Link to="https://drisya-cms.vercel.app/">
          <button className="w-auto bg-gradient-to-r from-[#711a19] via-[#7e2e1e] to-[#711a19] my-5 text-white text-[14px] tracking-wide py-3 px-5 rounded-md flex items-center justify-center gap-3">Edit Blogs</button>
        </Link>
      </div>

    </main>
  )
}