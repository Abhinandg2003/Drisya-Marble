import { useState, useEffect } from 'react'
import { useParams, useLocation, Link, Navigate } from 'react-router-dom'

const API_URL = 'https://drisya-backend.onrender.com/api/cms/blogs'

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogDetail() {
  const { slug } = useParams()
  const { state } = useLocation()
  const [post, setPost] = useState(state?.post || null)
  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(!state?.post)

  useEffect(() => {
  setLoading(true)

  fetch(API_URL)
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        const withSlug = data.blogs.map(p => ({
          ...p,
          slug: slugify(p.title) + '-' + p._id.slice(-6)
        }))

        setAllPosts(withSlug)

        // prioritize state.post if present
        if (state?.post) {
          setPost(state.post)
        } else {
          const found = withSlug.find(p => p.slug === slug)
          if (found) setPost(found)
        }
      }
    })
    .finally(() => setLoading(false))
}, [slug, state])

useEffect(() => {
  window.scrollTo(0, 0)
}, [slug])

  if (loading) return (
    <main className="pt-20 bg-[#fdfaef] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20 animate-pulse space-y-6">
        <div className="h-4 bg-[#E8DDD4] rounded w-32" />
        <div className="h-10 bg-[#E8DDD4] rounded w-3/4" />
        <div className="h-10 bg-[#E8DDD4] rounded w-1/2" />
        <div className="bg-[#E8DDD4] w-full" style={{ height: '420px' }} />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-3 bg-[#E8DDD4] rounded w-full" />)}
        </div>
      </div>
    </main>
  )

  if (!post) return <Navigate to="/blogs" replace />

  const related = allPosts
    .filter(p => p._id !== post._id && (p.tag || []).some(t => (post.tag || []).includes(t)))
    .slice(0, 3)

  return (
    <main className="pt-20 bg-[#fdfaef] min-h-screen">

      {/* Hero image */}
      <div className="relative h-[35vh] md:h-[55vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-10 max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            {(post.tag || []).map(t => (
              <span key={t} className="text-[11px] tracking-wide rounded-sm bg-[#f2df8f] text-[#1a1a1a] border border-[#f2df8f]/40 px-2 py-0.5">{t}</span>
            ))}
            <span className="text-white text-[13px]">{post.readTime} min read</span>
          </div>
          <h1 className="font-display text-[30px] md:text-[54px] text-white leading-tight">{post.title}</h1>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Back */}

        {/* Meta */}
        <div className="flex items-center gap-6 mb-5 pb-8 border-b border-[#E8DDD4]">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#711a19] to-[#7e2e1e] flex items-center justify-center text-[#f2df8f] text-[12px] font-semibold flex-shrink-0">
            {post.author?.charAt(0) || 'D'}
          </div>
          <div>
            <p className="text-[14px] text-[#1A1A1A]">{post.author}</p>
            <p className="text-[11px] text-[#8B7A6A]">{formatDate(post.date)}</p>
          </div>
        </div>

        {/* Tags */}
        {(post.tag || []).length > 0 && (
          <div className="flex items-center gap-3 mb-5">
            {post.tag.map(t => (
              <span key={t} className="text-[11px] tracking-wide rounded-sm text-[#782423] border border-[#782423]  px-3 py-1">{t}</span>
            ))}
          </div>
        )}

        {/* Description as lead */}
        <p className="font-display text-[20px] text-[#5A4E44] leading-relaxed tracking-wide italic mb-10">
          {post.description}
        </p>

        {/* Main content */}
        <div
          className="prose prose-stone max-w-none text-[#5A4E44] text-[15px] leading-relaxed tracking-wide"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {post.content}
        </div>

        

                <Link to="/blogs" className="w-max  my-5 text-[#782423] text-[14px] tracking-wide py-3  rounded-md flex items-center hover:underline justify-start gap-3">← Back to Blogs</Link>

      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-[#E8DDD4] bg-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="font-display text-[28px] text-[#1A1A1A] mb-10">Related Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
              {related.map(p => (
                <Link key={p._id} to={`/blogs/${p.slug}`} state={{ post: p }} className="group flex flex-col border-[4px] border-[#f2df8f] bg-[#fdfaef] p-3">
                  <div className="relative overflow-hidden mb-5" style={{ height: '200px' }}>
                    <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
  {(p.tag || []).map((t, i) => (
    <span
      key={i}
      className="text-[13px] tracking-wide text-[#782423] border border-[#D4B896]/60 px-2 py-0.5 rounded-sm"
    >
      {t}
    </span>
  ))}
</div>
                    <span className="w-1 h-1 rounded-full bg-[#D4B896]" />
                    <span className="text-[11px] text-[#8B7A6A]">{p.readTime} min read</span>
                  </div>
                  <h3 className="font-display text-[18px] text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#782423] transition-colors">{p.title}</h3>
                  <p className="text-[#5A4E44] text-sm leading-relaxed tracking-wide line-clamp-2 flex-1">{p.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E8DDD4]">
                    <p className="text-[11px] text-[#8B7A6A]">{formatDate(p.date)}</p>
                    <span className="text-[13px] tracking-wide text-[#782423] border-b border-[#782423]/30 pb-0.5 group-hover:border-[#782423] transition-colors">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}