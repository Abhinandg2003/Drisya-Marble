import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LenisProvider from './context/Leniscontext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductsPage from './pages/ProductsPage'
import ProductDetail from './pages/ProductDetail'
import CollectionPage from './pages/CollectionPage'
import About from './pages/About'
import Contact from './pages/Contact'
import SearchResults from './pages/SearchResults'
import Catalogues from './pages/Catalogues'
import ScrollToTop from "./components/ScrollToTop"

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* LenisProvider wraps everything so every page and component gets
          smooth scroll. It also wires up GSAP ScrollTrigger automatically. */}
      <LenisProvider>
        <div className="min-h-screen bg-[#F5F0EB] text-[#1A1A1A] font-body">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/collections/:slug" element={<CollectionPage />} />
            <Route path="/catalogues" element={<Catalogues />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
          <Footer />
        </div>
      </LenisProvider>
    </Router>
  )
}