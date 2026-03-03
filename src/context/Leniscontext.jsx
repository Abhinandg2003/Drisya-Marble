import { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

// ─── Context ──────────────────────────────────────────────────────────────────
// Expose the lenis instance (as a ref) so any component can call
// lenisRef.current.scrollTo(), .stop(), .start() etc.
const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

// ─── Provider ─────────────────────────────────────────────────────────────────
export default function LenisProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    // ── Create instance ──────────────────────────────────────────────────────
    const lenis = new Lenis({

      // DURATION
      // How long (seconds) each scroll gesture animates.
      // 0.8 = snappy/native feel | 1.2 = smooth default | 2.0 = very floaty
      duration: .5,

      // EASING
      // Function that maps progress t:[0→1] to an output value.
      // This default is an exponential ease-out — fast start, long tail.
      // Swap for: t => 1 - Math.pow(1 - t, 3)  (cubic ease-out, tighter)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      // ORIENTATION
      // 'vertical' for normal pages. 'horizontal' for side-scroll layouts.
      orientation: 'vertical',

      // GESTURE ORIENTATION
      // Which physical gesture axes lenis intercepts.
      // 'vertical' | 'horizontal' | 'both'
      gestureOrientation: 'vertical',

      // SMOOTH WHEEL
      // true  = lenis intercepts mouse wheel and smooths it (core feature)
      // false = native wheel, disabling lenis for mouse users
      smoothWheel: true,

      // WHEEL MULTIPLIER
      // How far each mouse wheel tick scrolls. 1.0 = default.
      // Lower (0.7) = shorter steps. Higher (1.4) = longer steps.
      wheelMultiplier: 1.0,

      // TOUCH MULTIPLIER
      // Same as wheelMultiplier but for touch/trackpad swipe distance.
      touchMultiplier: 1.0,

      // INFINITE
      // true = scroll loops back to top at bottom of page.
      // false for any normal website.
      infinite: false,

      // AUTORAF
      // MUST BE FALSE when using GSAP ScrollTrigger.
      // We drive the RAF loop ourselves via gsap.ticker below so both
      // systems share one loop and stay perfectly in sync.
      // Set true only if you are not using GSAP at all.
      autoRaf: false,
    })

    lenisRef.current = lenis

    // ── Sync lenis → GSAP ScrollTrigger ─────────────────────────────────────
    // Each time lenis updates the scroll position, tell ScrollTrigger to
    // re-read it. Without this, ScrollTrigger uses a stale value from the
    // previous frame and parallax / pin effects jitter by one frame.
    lenis.on('scroll', ScrollTrigger.update)

    // ── Drive lenis from GSAP's ticker ──────────────────────────────────────
    // gsap.ticker fires every requestAnimationFrame. We forward elapsed time
    // (seconds → milliseconds) to lenis.raf() so both share exactly one RAF.
    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)

    // Disable GSAP's built-in lag smoothing so it doesn't add artificial
    // delay on top of lenis's own easing.
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  )
}