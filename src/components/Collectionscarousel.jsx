import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collections } from '../data'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react';
export default function CollectionsCarousel() {
  const trackRef   = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [canPrev, setCanPrev]     = useState(false)
  const [canNext, setCanNext]     = useState(true)
  const [pages, setPages]         = useState(1)
  const [activePage, setActivePage] = useState(0)
  // Keep pages in a ref so onTrackScroll always sees the latest value
  // without needing to be re-registered whenever pages changes
  const pagesRef = useRef(1)

  const onTrackScroll = () => {
    const track = trackRef.current
    if (!track) return
    const maxScroll = track.scrollWidth - track.clientWidth
    setCanPrev(track.scrollLeft > 5)
    setCanNext(track.scrollLeft < maxScroll - 5)
    // Active page = how many full clientWidths we've scrolled
    const page = Math.min(
      Math.round(track.scrollLeft / track.clientWidth),
      pagesRef.current - 1
    )
    setActivePage(page)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const calcPages = () => {
      if (!trackRef.current) return
      // ceil(scrollWidth / clientWidth) = number of screen-wide pages of content
      const count = Math.ceil(trackRef.current.scrollWidth / trackRef.current.clientWidth)
      pagesRef.current = count
      setPages(count)
    }

    calcPages()
    window.addEventListener('resize', calcPages)
    return () => window.removeEventListener('resize', calcPages)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', onTrackScroll, { passive: true })
    return () => track.removeEventListener('scroll', onTrackScroll)
  }, [])

  const scrollByPage = (dir) => {
    const track = trackRef.current
    if (!track) return
    gsap.to(track, {
      scrollLeft: track.scrollLeft + dir * track.clientWidth,
      duration: 0.7,
      ease: 'power3.out',
    })
  }

  const scrollToPage = (idx) => {
    const track = trackRef.current
    if (!track) return
    gsap.to(track, {
      scrollLeft: idx * track.clientWidth,
      duration: 0.7,
      ease: 'power3.out',
    })
  }

  return (
    <section className="py-24 overflow-hidden bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="flex justify-center text-[18px] md:text-[24px] font-medium  text-[#1a1a1a] ">Collections</p>
        <h2 className="flex justify-center text-center leading-tight font-semibold font-display text-[30px] md:text-[40px] text-[#1A1A1A]">Discover our inspiring unique collections.</h2>
        <a href="/collections">
            <p className="mt-2 flex justify-center items-center text-[18px] md:text-[24px] font-medium  text-[#1a1a1a] ">Explore Collections <span> <ArrowRight className='flex justify-center ml-2 bg-[#782423] rounded-full text-white p-1'/> </span> </p>
        </a>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto select-none pl-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {collections.map((col, i) => (
          <Link
            key={col.slug}
            data-card
            to={`/collections/${col.slug}`}
            className="relative flex-shrink-0 overflow-hidden group w-[90vw] md:w-[500px] h-[280px] "
          >
            <img
              src={col.image}
              alt={col.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <span className="absolute top-4 right-4 font-display text-4xl text-white/10 leading-none select-none">
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[15px]  text-white mb-1 ">{col.tagline}</p>
              <h3 className="font-display text-xl text-white leading-tight">{col.name}</h3>
            </div>
          </Link>
        ))}
        <div className="flex-shrink-0 w-6" />
      </div>

      {/* Controls: ‹  dots  › — all vertically centered on the same row */}
      <div className=" md:visible flex items-center justify-center gap-6 mt-10">

        <button
          onClick={() => scrollByPage(-1)}
          disabled={!canPrev}
          className={`text-4xl font-light leading-none transition-opacity duration-300 ${
            canPrev ? 'text-[#1a1a1a] hover:opacity-40' : 'text-[#1a1a1a]/40 opacity-30'
          }`}
        >
          ‹
        </button>

        {/* Dots — one per page, not one per slide */}
        <div className="flex items-center gap-3 pt-3">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              className={`transition-all duration-300 ${
                i === activePage
                  ? 'w-[20px] md:w-[50px] h-[5px] bg-[#1a1a1a]'
                  : 'w-[20px] md:w-[50px] h-[5px] bg-[#1a1a1a]/40 hover:bg-[#1a1a1a]/80'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => scrollByPage(1)}
          disabled={!canNext}
          className={`text-4xl font-light leading-none transition-opacity duration-300 ${
            canNext ? 'text-[#1a1a1a] hover:opacity-60' : 'text-[#1a1a1a] opacity-30'
          }`}
        >
          ›
        </button>

      </div>
    </section>
  )
}