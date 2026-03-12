import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { products, collections } from '../data'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CollectionsCarousel from '../components/Collectionscarousel'
import ProductsCarousel from '../components/Productscarousel'
import { ArrowRight, Play } from 'lucide-react';
import Browsebytex from '../components/Browsebytex'
import ServicesCarousel from '../components/ServicesCarousel'
import Showroom from '../components/Showroom'

// ScrollTrigger is already registered and synced with Lenis in LenisContext.
// We just use it here — no need to register or create RAF loops.
gsap.registerPlugin(ScrollTrigger)


const heroSlides = [
  { src: '/images/hero/hero1.mp4', poster: '/images/hero/hero1.jpg' },
  { src: 'https://assets.mixkit.co/videos/preview/mixkit-rocky-desert-landscape-2743-large.mp4', poster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80' },
  { src: 'https://assets.mixkit.co/videos/preview/mixkit-white-walls-interior-1117-large.mp4', poster: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1920&q=80' },
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
    const currentVideo  = videos[current]
    const previousVideo = videos[prevIndex.current]
    if (currentVideo) {
      currentVideo.play().catch(() => {})
      gsap.to(currentVideo, { opacity: 1, duration: 1.4, ease: 'power2.out' })
    }
    if (previousVideo && previousVideo !== currentVideo) {
      gsap.to(previousVideo, {
        opacity: 0, duration: 1.4, ease: 'power2.out',
        onComplete: () => { previousVideo.pause(); previousVideo.currentTime = 0 },
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
            src={slide.src} poster={slide.poster}
            muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#290908]/0 via-[#290908]/50 to-[#290908]/100" />
        </div>
      ))}

      {/* Static text — never changes */}
      <div className="relative z-10 h-full  flex flex-col top-[25vh] md:top-[35vh] items-start pb-32 px-10 md:px-40 text-center">
        <h1 className="font-display text-3xl md:text-6xl text-[#fdfaef] leading-tight mb-5 text-left">
          Kerala's Premier Destination<br />for Tiles & Sanitary Elegance
        </h1>

        <div className="w-full h-px max-w-3xl  bg-[#fdfaef] mb-4" />

        
        <p className="text-[#fdfaef] text-xl md:text-2xl font-display tracking-widest mb-10 text-start">
          27+ Years of Excellence in Tiles, Bath Fittings & Granite
        </p>
        <div className="flex items-center gap-4 flex-wrap justify-start">
          <Link
            to="https://maps.app.goo.gl/oy7Xv6k6CK4PmXvc8"
            className="bg-gradient-to-r from-[#ddb65b] via-[#f2df8f] to-[#ddb65b] font-medium text-[#1a1a1a] text-[15px] tracking-wider  px-5 py-2.5 rounded-lg hover:bg-[#a64241] transition-colors duration-300" target='none'
          >
            Explore Our Showroom
          </Link>
          <Link
            to="https://www.youtube.com/@drisyamarble"
            className=" text-[#1a1a1a] text-[15px] font-medium tracking-wider bg-gradient-to-r from-[#ddb65b] via-[#f2df8f] to-[#ddb65b]  px-5 py-2.5 rounded-xl hover:bg-white hover:text-[#1A1A1A] transition-colors duration-300"
          >
            <div className='flex items-center'>
            <Play className='h-5 w-5 mr-3 bg-[#782423] p-1 fill-[#f2df8f] text-[#f2df8f] rounded-full'/>
            Watch video
            </div>
          </Link>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`transition-all duration-300 ${i === current ? 'w-12 h-0.5 bg-white' : 'w-4 h-0.5 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>

      <button onClick={() => goTo((current - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-0 top-1/2   -translate-y-1/2 z-10 w-12 h-12 hidden  lg:flex items-center justify-center text-white">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={() => goTo((current + 1) % heroSlides.length)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 hidden lg:flex items-center justify-center text-white">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  )
}


function StickyLabel() {
  return (
    <div className="sticky top-0  z-40  pointer-events-none">
      <h1 className="text-[50px] tracking-wide flex justify-center text-center font-display leading-tight font-medium  text-white py-5 ">
        2025 Grand Opening Event
      </h1>
    </div>
  )
}

function StickyLabelbottom() {
  return (
    <div className="sticky   z-40  pointer-events-none">
      <h1 className="text-[30px] tracking-wide flex justify-center mt-[40vh] lg:mt-[60vh] text-center font-display leading-tight font-medium px-2 text-white  pt-5 ">
        From a Fine Marble Outlet to Kerala's Largest Lifestyle Brand
      </h1>
      <div className="w-full h-px max-w-3xl mx-auto mt-3 bg-white mb-4" />
      <p className="text-[20px]   tracking-wide mx-auto mt-5 max-w-2xl text-center  leading-tight font-medium px-2 text-white ">
        "We started with a vision of trust and quality. Today, we help you build the home of your dreams"
      </p>
    </div>
  )
}


function StickyLabel2() {
  return (
    <div className="sticky top-0  z-40  pointer-events-none">
      <h1 className="text-[50px] tracking-wide flex justify-center text-center font-display leading-tight font-medium  text-white py-5 ">
        Visit Our Showroom
      </h1>
    </div>
  )
}

function StickyLabelbottom2() {
  return (
    <div className="sticky   z-40  pointer-events-none">
      <h1 className="text-[30px] tracking-wide flex justify-center mt-[40vh] lg:mt-[60vh] text-center font-display leading-tight font-medium px-2 text-white  pt-5 ">
        Kerala's Biggest Tile Showroom
      </h1>
      <div className="w-full h-px max-w-md mx-auto mt-3 bg-white mb-4" />
      <p className="text-[20px]   tracking-wide mx-auto mt-5 max-w-2xl text-center  leading-tight font-medium px-2 text-white ">
        Vadakkanchery, Chittur
      </p>
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


function ParallaxSectionnew() {
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
          { yPercent: -70 },   // smaller movement
          {
            yPercent: -10,      // smaller movement
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

    <picture className="absolute left-0 w-full object-cover object-center pointer-events-none h-[100%] top-[20%] lg:h-[120%] lg:-top-[10%]">
      <source srcSet="/images/parallaxnew2.avif" type="image/avif" />

      <img
        ref={imgRef}
        src="/images/parallaxnew2.jpg"
        alt=""
        className="absolute left-0 w-full object-cover object-center pointer-events-none h-[100%] top-[20%] lg:h-[120%] lg:-top-[10%]"
      />
    </picture>

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
          { yPercent: -70 },   // smaller movement
          {
            yPercent: -10,      // smaller movement
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

    <picture className="absolute left-0 w-full object-cover object-center pointer-events-none h-[100%] top-[20%] lg:h-[120%] lg:-top-[10%]">
      <source srcSet="/images/parallax2.avif" type="image/avif" />

      <img
        ref={imgRef}
        src="/images/parallax2.jpg"
        alt=""
        className="absolute left-0 w-full object-cover object-center pointer-events-none h-[100%] top-[20%] lg:h-[120%] lg:-top-[10%]"
      />
    </picture>

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
                  from-black/40 via-black/10 to-black/40" />



  <div className="absolute inset-0 z-0">
    <ParallaxSectionnew />
  </div>
  <StickyLabelbottom/>

</section>

<Showroom/>

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

  <StickyLabel2 />
    {/* Gradient overlay */}
  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b 
                  from-black/50 via-black/25 to-transparent" />

  <div className="absolute inset-0">
    <ParallaxSection2 />
  </div>
  <StickyLabelbottom2/>



</section>
  {/* <ServicesCarousel/> */}

  <ProductsCarousel/>

      {/* CTA */}
<section className="relative min-h-screen overflow-hidden flex items-center justify-center text-center px-6">
  <img
    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1920&q=80"
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-[#3d0404]/40 to-black/60" />

  <div className="relative z-10 max-w-3xl">
    <h2 className="leading-tight font-semibold font-display text-[30px] md:text-[40px] text-[#f2df8f] mb-4">
      Ready to transform your space?
    </h2>

    <p className="text-[15px] md:text-[20px] font-medium text-white mb-8">
      Request samples, visit our showroom, or speak with a tile specialist.
    </p>

    <Link
      to="/contact"
      className="bg-gradient-to-r from-[#ddb65b] via-[#f2df8f] to-[#ddb65b] font-medium text-[#1a1a1a] text-[15px] tracking-wider  px-6 py-3 rounded-lg hover:bg-[#a64241] transition-colors duration-300"
    >
      Get in Touch
    </Link>
  </div>
</section>

      {/* Why Petra */}
      <section className="relative py-16 overflow-hidden bg-[#1a1a1a] px-[2%]" style={{
          backgroundImage: "url('/images/Textures/menuwhite.avif'), url('/images/Textures/menuwhite.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>

          <div className="absolute inset-0  bg-gradient-to-r from-[#ffffff]/60 via-[#ffffff]/80 to-[#ffffff]/60 z-0 pointer-events-none" />
        <div className="grid grid-cols-1 relative z-10  md:grid-cols-3 gap-12">
          {[
            { title: 'Extensive Product Range', desc: 'Drisya Marbles offers a wide selection of high-quality wall and floor tiles, sanitary ware, and plumbing fittings, catering to diverse customer needs.' },
            { title: 'Expert Guidance', desc: 'Our specialists have 20+ years of experience helping architects and homeowners find the perfect material.' },
            { title: 'Trade Program', desc: 'Exclusive pricing, priority samples, and dedicated support for interior designers and contractors.' },
          ].map(item => (
            <div key={item.title} className="text-center ">
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