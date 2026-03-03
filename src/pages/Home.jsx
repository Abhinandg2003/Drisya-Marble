import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { products, collections } from '../data'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CollectionsCarousel from '../components/Collectionscarousel'
import ProductsCarousel from '../components/Productscarousel'
import { ArrowRight } from 'lucide-react';
import Browsebytex from '../components/Browsebytex'
import ServicesCarousel from '../components/ServicesCarousel'

// ScrollTrigger is already registered and synced with Lenis in LenisContext.
// We just use it here — no need to register or create RAF loops.
gsap.registerPlugin(ScrollTrigger)

const heroSlides = [
  {
    src: '/images/hero/hero1.jpg',
    poster: '/images/hero/hero1.jpg',
    title: 'Italian Marble',
    subtitle: 'Quarried from the mountains of Carrara',
  },
  {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-rocky-desert-landscape-2743-large.mp4',
    poster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    title: 'Earth & Stone',
    subtitle: 'Textures forged over millennia',
  },
  {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-white-walls-interior-1117-large.mp4',
    poster: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1920&q=80',
    title: 'Modern Surfaces',
    subtitle: 'Where architecture meets artistry',
  },
]

function VideoCarousel() {
  const prevIndex = useRef(0)
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const videoRefs = useRef([])

  const goTo = (idx) => {
    if (transitioning || idx === current) return
    setTransitioning(true)
    setTimeout(() => { setCurrent(idx); setTransitioning(false) }, 400)
  }

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % heroSlides.length), 7000)
    return () => clearInterval(timer)
  }, [current])

useEffect(() => {
  const videos = videoRefs.current
  if (!videos.length) return

  const currentVideo = videos[current]
  const previousVideo = videos[prevIndex.current]

  if (currentVideo) {
    currentVideo.play().catch(() => {})

    gsap.to(currentVideo, {
      opacity: 1,
      duration: 1.4,
      ease: "power2.out"
    })
  }

  if (previousVideo && previousVideo !== currentVideo) {
    gsap.to(previousVideo, {
      opacity: 0,
      duration: 1.4,
      ease: "power2.out",
      onComplete: () => {
        previousVideo.pause()
        previousVideo.currentTime = 0
      }
    })
  }

  prevIndex.current = current
}, [current])

  return (
    <div className="relative h-screen overflow-hidden">
      {heroSlides.map((slide, i) => (
        <div key={i} className="absolute inset-0">
          <video
            ref={el => videoRefs.current[i] = el}
            src={slide.src}
            poster={slide.poster}
            muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        </div>
      ))}

      <div className="relative z-10 h-full flex flex-col justify-end items-center pb-32 px-8 md:px-16 max-w-7xl mx-auto w-full">
        <div className={`transition-all duration-700 delay-200 ${transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <h1 className="font-display text-5xl md:text-6xl text-center text-white leading-none mb-4">
            {heroSlides[current].title}
          </h1>
          <p className="text-white text-lg tracking-widest mb-8 text-center">
            {heroSlides[current].subtitle}
          </p>
          <div className="flex justify-center">
            {/* <Link to="/products" className="inline-block bg-[#782423] font-medium text-white text-[15px] tracking-wide px-8 py-4 hover:bg-[#a98424] transition-colors duration-300">
              Explore Products
            </Link> */}
            <a href="/products">
            <p className="mt-2 flex justify-center items-center text-[15px] text-semibold tracking-wide   text-white ">Explore <span> <ArrowRight className=' h-7 w-7 flex justify-center ml-2 bg-[#782423] rounded-full text-white p-1'/> </span> </p>
            
            <span></span>
        </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`transition-all duration-300 ${i === current ? 'w-12 h-0.5 bg-white' : 'w-4 h-0.5 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>

      <button onClick={() => goTo((current - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12  flex items-center justify-center text-white ">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={() => goTo((current + 1) % heroSlides.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12  flex items-center justify-center text-white">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  )
}


function StickyLabel() {
  return (
    <div className="sticky top-0 left-6 z-40 pointer-events-none">
      <h1 className="text-[30px] tracking-wide leading-tight font-medium  text-white pl-10 py-10 ">
        Crafted <br />Surfaces
      </h1>
    </div>
  )
}


// ─── Parallax Section ─────────────────────────────────────────────────────────
// Image is 120% tall, starting at top: -10% so it's centered at rest.
// GSAP moves it from yPercent -10 → +10 (total 20% travel) over the full
// visibility window of the section. Lenis feeds ScrollTrigger smooth values
// automatically via the LenisProvider — no extra wiring needed here.
function ParallaxSection() {
  const sectionRef = useRef(null)
  const imgRef     = useRef(null)

useEffect(() => {
  const ctx = gsap.context(() => {

    ScrollTrigger.matchMedia({

      // Desktop (keep EXACTLY your current effect)
      "(min-width: 1024px)": function () {
        gsap.fromTo(imgRef.current,
          { yPercent: -70 },
          {
            yPercent: 60,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0,
            },
          }
        )
      },

      // Mobile & Tablet
      "(max-width: 1023px)": function () {
        gsap.fromTo(imgRef.current,
          { yPercent: -40 },   // smaller movement
          {
            yPercent: 10,      // smaller movement
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0,     // no smoothing delay
            },
          }
        )
      }

    })

  }, sectionRef)

  return () => ctx.revert()
}, [])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <img
        ref={imgRef}
        src="/images/parallax1.jpg"
        alt=""
        className="absolute left-0 w-full object-cover object-center pointer-events-none"
        style={{ height: '120%', top: '-10%' }}
      />
    </section>
  )
}


function ParallaxSection2() {
  const sectionRef = useRef(null)
  const imgRef     = useRef(null)

useEffect(() => {
  const ctx = gsap.context(() => {

    ScrollTrigger.matchMedia({

      // Desktop (keep EXACTLY your current effect)
      "(min-width: 1024px)": function () {
        gsap.fromTo(imgRef.current,
          { yPercent: -70 },
          {
            yPercent: 60,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0,
            },
          }
        )
      },

      // Mobile & Tablet
      "(max-width: 1023px)": function () {
        gsap.fromTo(imgRef.current,
          { yPercent: -40 },   // smaller movement
          {
            yPercent: 10,      // smaller movement
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0,     // no smoothing delay
            },
          }
        )
      }

    })

  }, sectionRef)

  return () => ctx.revert()
}, [])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <img
        ref={imgRef}
        src="/images/parallax2.jpg"
        alt=""
        className="absolute left-0 w-full object-cover object-center pointer-events-none"
        style={{ height: '120%', top: '-10%' }}
      />
    </section>
  )
}


export default function Home() {
  return (
    <main className='bg-white'> 
      <VideoCarousel />

<section className="relative h-[100vh]">

  <StickyLabel />

  {/* Gradient overlay */}
  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b 
                  from-black/30 via-black/15 to-transparent" />

  <div className="absolute inset-0 z-0">
    <ParallaxSection />
  </div>

</section>

    {/* Collections Carousel — all 5 collections */}
      <CollectionsCarousel />

      {/* Featured Products */}
      {/* <section className="bg-[#1a1a1a] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-12">
            <div >
              <h2 className="flex justify-center font-semibold font-display text-[40px] text-white">Featured Products</h2>
              <a href="">
            <p className="mt-2 flex justify-center items-center text-[24px] text-medium  text-white ">Explore Collections <span> <ArrowRight className='flex justify-center ml-2 bg-white rounded-full text-[#3d3935] p-1'/> </span> </p>
        </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map(product => (
              <Link key={product.slug} to={`/products/${product.slug}`} className="group">
                <div className="aspect-square overflow-hidden mb-4 bg-[#D4C4B0]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="text-[13px] tracking-wide text-white/50 mb-1">{product.category}</p>
                <h3 className="text-[15px] font-medium text-white tracking-wide mb-1">{product.name}</h3>
                <p className="text-[15px] text-white/75">{product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      <Browsebytex/>

      <section className="relative h-[100vh]">

  <StickyLabel />
    {/* Gradient overlay */}
  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b 
                  from-black/50 via-black/25 to-transparent" />

  <div className="absolute inset-0">
    <ParallaxSection2 />
  </div>



</section>
  <ServicesCarousel/>

  <ProductsCarousel/>

      {/* CTA */}
<section className="relative min-h-screen overflow-hidden flex items-center justify-center text-center px-6">
  <img
    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1920&q=80"
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/60" />

  <div className="relative z-10 max-w-3xl">
    <h2 className="leading-tight font-semibold font-display text-[30px] md:text-[40px] text-white mb-4">
      Ready to transform your space?
    </h2>

    <p className="text-[18px] md:text-[24px] font-medium text-white mb-8">
      Request samples, visit our showroom, or speak with a tile specialist.
    </p>

    <Link
      to="/contact"
      className="inline-block bg-[#782423] text-white text-md  px-10 py-5 hover:bg-[#a64241] transition-colors duration-300"
    >
      Get in Touch
    </Link>
  </div>
</section>

      {/* Why Petra */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Extensive Product Range', desc: 'Drisya Marbles offers a wide selection of high-quality wall and floor tiles, sanitary ware, and plumbing fittings, catering to diverse customer needs.' },
            { title: 'Expert Guidance', desc: 'Our specialists have 20+ years of experience helping architects and homeowners find the perfect material.' },
            { title: 'Trade Program', desc: 'Exclusive pricing, priority samples, and dedicated support for interior designers and contractors.' },
          ].map(item => (
            <div key={item.title} className="text-center">
              <div className="w-12 h-0.5 bg-[#782423] mx-auto mb-8" />
              <h3 className="font-display text-2xl mb-4">{item.title}</h3>
              <p className="text-[#5A4E44] leading-relaxed text-sm tracking-wide">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}