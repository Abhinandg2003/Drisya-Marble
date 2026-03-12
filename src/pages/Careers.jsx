import { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { useEffect } from 'react'
import {
  Factory,
  TrendingUp,
  Users,
  Lightbulb,
  Building2,
  Package,
  Palette,
  Megaphone,
  BarChart3,
  Star
} from "lucide-react"

// ── Static data (swap for CMS/API later) ─────────────────────────────────────
const whyJoin = [
  { icon: Factory, title: 'Industry Leader', desc: 'Kerala\'s most trusted name in premium tiles and bath solutions for over two decades.' },
  { icon: TrendingUp, title: 'Career Growth', desc: 'Clear progression paths, mentorship programs, and continuous learning opportunities.' },
  { icon: Users, title: 'Collaborative Culture', desc: 'A team that supports each other — from the showroom floor to the boardroom.' },
  { icon: Lightbulb, title: 'Innovation First', desc: 'We constantly evolve — new brands, new tech, new ways to delight our customers.' },
]

const culture = [
  { label: 'Integrity', desc: 'We do right by our customers and each other, always.' },
  { label: 'Excellence', desc: 'We take pride in every tile we place and every service we offer.' },
  { label: 'Growth', desc: 'Personal development is part of the job, not an afterthought.' },
  { label: 'Community', desc: 'We build spaces that bring families and communities together.' },
]

const departments = [
  {
    name: "Sales & Showroom",
    icon: Building2,
    desc: "Guide customers through our premium collections and close dream projects."
  },
  {
    name: "Operations & Logistics",
    icon: Package,
    desc: "Keep our supply chain and delivery seamless and precise."
  },
  {
    name: "Design & Visual Merchandising",
    icon: Palette,
    desc: "Curate stunning showroom experiences and brand presence."
  },
  {
    name: "Marketing & Digital",
    icon: Megaphone,
    desc: "Tell our story and grow our brand across platforms."
  },
  {
    name: "Finance & Admin",
    icon: BarChart3,
    desc: "Keep our business running with accuracy and efficiency."
  },
  {
    name: "Customer Experience",
    icon: Star,
    desc: "Ensure every client interaction exceeds expectations."
  }
]

const POSITIONS_API = 'https://drisya-backend.onrender.com/api/cms/open-positions'

const testimonials = [
  {
    name: 'Arjun Menon',
    role: 'Sales Executive, 4 years',
    quote: 'Joining Drisya Marbles changed my career trajectory. The training, the brand names we represent, and the team culture here are unlike anything I\'ve experienced elsewhere.',
    initials: 'AM',
  },
  {
    name: 'Priya Nair',
    role: 'Design Consultant, 2 years',
    quote: 'Every day I get to help families create beautiful homes. The company genuinely invests in our skills — I\'ve grown so much since I joined.',
    initials: 'PN',
  },
  {
    name: 'Rohit Thomas',
    role: 'Operations Lead, 6 years',
    quote: 'The leadership here listens. When I proposed a new logistics process, they gave me the resources to implement it. That trust means everything.',
    initials: 'RT',
  },
]

export default function Careers() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [openPositions, setOpenPositions] = useState([])
  const [positionsLoading, setPositionsLoading] = useState(true)

  useEffect(() => {
    fetch(POSITIONS_API)
      .then(r => r.json())
      .then(data => {
        if (data.success) setOpenPositions(data.openPositions)
      })
      .catch(() => {})
      .finally(() => setPositionsLoading(false))
  }, [])

  // Normalize: department and type are arrays in API
  const normalized = openPositions.map(p => ({
    ...p,
    id: p._id,
    department: Array.isArray(p.department) ? p.department[0] : p.department,
    type: Array.isArray(p.type) ? p.type[0] : p.type,
  }))

  const filteredPositions = activeTab === 'all'
    ? normalized
    : normalized.filter(p => p.department === activeTab)

  const deptTabs = ['all', ...new Set(normalized.map(p => p.department))]

    return (
    <main className="pt-20 bg-[#fdfaef] min-h-screen">

      {/* ── Hero ── */}
      <div className="relative h-[30vh] md:h-[50vh] overflow-hidden">
        <picture>
            <source srcSet="/images/careers.avif" type="image/avif" />
        <img
          src="/images/careers.jpg"
          alt="Careers at Drisya Marbles"
          className="absolute inset-0 w-full h-full object-cover"
        />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `url(/images/Textures/menuwhite.avif),
            url(/images/Textures/menuwhite.jpg)
            `, backgroundSize: 'cover', opacity: 0.08 }}
        />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-5xl">
          <h1 className="font-display text-[40px] md:text-[72px] text-white leading-tight mb-4">
            Build Something<br />Beautiful With Us
          </h1>
          {/* <p className="text-white/70 text-[16px] tracking-wide max-w-xl">
            Kerala's leading stone and tile destination is growing. If you're passionate about design, quality, and exceptional customer experiences — we want to hear from you.
          </p> */}
        </div>
      </div>

      {/* ── Why Join Us ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          {/* <p className="text-[12px] tracking-[0.3em] text-[#782423] mb-3">WHY DRISYA MARBLES</p> */}
          <h2 className="font-display text-[32px] md:text-[48px] text-[#1A1A1A]">Why Join Us</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyJoin.map((item, i) => {
  const Icon = item.icon

  return (
    <div
      key={i}
      className="bg-white border rounded-sm border-[#E8DDD4] p-8 hover:border-[#782423]/40 transition-colors duration-300"
    >
      <Icon className="w-8 h-8 mb-5 text-[#782423]" />

      <h3 className="font-display text-[18px] text-[#1A1A1A] mb-3">
        {item.title}
      </h3>

      <p className="text-[#5A4E44] text-[13px] leading-relaxed tracking-wide">
        {item.desc}
      </p>
    </div>
  )
})}
        </div>
      </section>

      {/* ── Company Culture ── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: `
          url(/images/Textures/menured.avif),
          url(/images/Textures/menured.jpg)
          `,
           backgroundSize: 'cover' }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="mb-12">
            {/* <p className="text-[#f2df8f] text-[12px] tracking-[0.3em] mb-3">OUR VALUES</p> */}
            <h2 className="font-display text-[32px] md:text-[48px] text-white">Company Culture</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {culture.map((item, i) => (
              <div key={i} className="bg-black/20 backdrop-blur-sm p-8 hover:bg-black/10 transition-colors">
                <div className="w-8 h-0.5 bg-[#f2df8f] mb-6" />
                <h3 className="font-display text-[22px] text-[#f2df8f] mb-3">{item.label}</h3>
                <p className="text-white/70 text-[13px] leading-relaxed tracking-wide">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Departments ── */}
      {/* ── Departments ── */}
<section className="max-w-7xl mx-auto px-6 py-20">
  <div className="mb-12">
    <h2 className="font-display text-[32px] md:text-[48px] text-[#1A1A1A]">
      Our Departments
    </h2>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {departments.map((dept, i) => {
      const Icon = dept.icon

      return (
        <div
          key={i}
          className="border border-[#782423]/50 px-3 rounded-sm py-6 md:p-6 hover:border-[#782423] hover:bg-white transition-all duration-300 group cursor-default"
        >
          <Icon className="w-7 h-7 mb-4 text-[#782423]" />

          <h3 className="font-display text-[16px] text-[#1A1A1A] mb-2 group-hover:text-[#782423] transition-colors">
            {dept.name}
          </h3>

          <p className="text-[#8B7A6A] text-[12px] leading-relaxed tracking-wide">
            {dept.desc}
          </p>
        </div>
      )
    })}
  </div>
</section>

      {/* ── Open Positions ── */}
      <section className="bg-white border-t border-b border-[#E8DDD4]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              
              <h2 className="font-display text-[32px] md:text-[48px] text-[#1A1A1A]">Open Positions</h2>
            </div>
            <p className="text-[#8B7A6A] text-[13px] tracking-wide">{positionsLoading ? 'Loading…' : `${normalized.length} positions available`}</p>
          </div>

          {/* Dept tab filter */}
          <div className="flex items-center gap-2 flex-wrap mb-10 pb-6 border-b border-[#E8DDD4]">
            {deptTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[12px] tracking-wide border rounded-md transition-colors duration-200 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-[#711a19] via-[#7e2e1e] to-[#711a19] text-[#fff6e2] border-transparent'
                    : 'border-[#D4B896]/60 text-[#5A4E44] hover:border-[#711a19] hover:text-[#782423]'
                }`}
              >
                {tab === 'all' ? 'All Departments' : tab}
              </button>
            ))}
          </div>

          {/* Position cards */}
          <div className="space-y-4">
            {positionsLoading && Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border border-[#E8DDD4] p-6  rounded-sm md:p-8 animate-pulse">
                <div className="flex gap-3 mb-3">
                  <div className="h-5 bg-[#E8DDD4] rounded w-28" />
                  <div className="h-5 bg-[#E8DDD4] rounded w-16" />
                </div>
                <div className="h-6 bg-[#E8DDD4] rounded w-2/3 mb-3" />
                <div className="h-3 bg-[#E8DDD4] rounded w-full mb-2" />
                <div className="h-3 bg-[#E8DDD4] rounded w-4/5" />
              </div>
            ))}
            {!positionsLoading && filteredPositions.map(pos => (
              <div key={pos.id} className="border border-[#E8DDD4] p-6 md:p-8 hover:border-[#782423]/40 rounded-sm transition-colors duration-300 group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-[11px] tracking-wide rounded-sm text-[#782423] border border-[#782423]/30 px-2 py-0.5">{pos.department}</span>
                      <span className="text-[11px] text-[#8B7A6A]">{pos.type}</span>
                      <span className="text-[11px] text-[#8B7A6A]">📍 {pos.location}</span>
                    </div>
                    <h3 className="font-display text-[22px] text-[#1A1A1A] mb-3 group-hover:text-[#782423] transition-colors">{pos.title}</h3>
                    <p className="text-[#5A4E44] text-[13px] leading-relaxed tracking-wide mb-4">{pos.description}</p>
                    <ul className="flex flex-wrap gap-2">
                      {pos.requirements.map((req, i) => (
                        <li key={i} className="text-[11px] tracking-wide rounded-sm text-[#5A4E44] bg-[#F5F0EB] px-3 py-1">{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => navigate('/careers/apply', { state: { position: pos } })}
                      className="px-6 py-3 text-[12px] tracking-wide rounded-md bg-gradient-to-r from-[#711a19] via-[#7e2e1e] to-[#711a19] text-[#fff6e2] hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                      Apply Now →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!positionsLoading && filteredPositions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#8B7A6A] tracking-wide text-sm">No open positions in this department right now.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Employee Stories ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          {/* <p className="text-[12px] tracking-[0.3em] text-[#782423] mb-3">FROM THE TEAM</p> */}
          <h2 className="font-display text-[32px] md:text-[48px] text-[#1A1A1A]">Employee Stories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white border rounded-sm border-[#E8DDD4] p-8">
              <p className="font-display text-[22px] text-[#782423] mb-6">"</p>
              <p className="text-[#5A4E44] text-[14px] leading-relaxed tracking-wide mb-8 italic">{t.quote}</p>
              <div className="flex items-center gap-4 pt-4 border-t border-[#E8DDD4]">
                <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#711a19] to-[#7e2e1e] flex items-center justify-center text-[#f2df8f] text-[12px] font-semibold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-[14px] text-[#1A1A1A]">{t.name}</p>
                  <p className="text-[11px] text-[#8B7A6A]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 ">
            <h3 className="flex relative z-10 justify-center font-display font-medium text-2xl ">Have Some Questions?</h3>
            <div className="flex justify-center mt-5">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-md relative z-10 text-[12px] tracking-wide bg-gradient-to-r from-[#711a19] via-[#7e2e1e] to-[#711a19] text-[#fff6e2] hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Contact Us →
              </Link>
            </div>
            </div>
      </section>

    </main>
  )
}