export default function About() {
  return (
    <main className="pt-20 bg-white">

      {/* Hero */}
      <div className="relative h-[90vh] w-full overflow-hidden flex justify-center text-center px-6">
        <img src="/images/about1.jpg" alt="About Drisya marbles" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
          <h1 className="font-display text-[45px] md:text-[70px] text-white">About Drisya Marble</h1>
        </div>
      </div>

      {/* ── NEW: About Drisya Marbles deep-dive section ────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-24">

        {/* Section heading */}
        {/* <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-[#1A1A1A] leading-tight">About Drisya Marble</h2>
        </div> */}

        {/* H1 — A Legacy of Trust */}
        <div className="mb-14">
          <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] mb-4">A Legacy of Trust. A Future of Design.</h3>
          <p className="text-[#5A4E44] leading-relaxed tracking-wide">
            Founded in 1999, Drisya Marbles began its journey in Anjumoorthi Mangalam, Wadakkancherry. What started as a specialized outlet for premium Marble directly sourced from the heart of Rajasthan has grown into one of Kerala's premier destinations for home lifestyle and architectural solutions.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#E8DDD4] mb-14" />

        {/* H2 — Our Journey of Evolution */}
        <div className="mb-14">
          <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] mb-4">Our Journey of Evolution</h3>
          <p className="text-[#5A4E44] leading-relaxed tracking-wide mb-6">
            We believe that staying relevant means listening to our customers. As modern architecture shifted, so did we:
          </p>
          <ul className="space-y-4">
            {[
              { year: '1999', text: 'Established our first showroom in Anjumoorthi Mangalam, specializing in authentic Rajasthan Marble.' },
              { year: '2005', text: 'Recognizing changing customer tastes, we strategically shifted our focus from marble to high-quality Tiles and Sanitary ware.' },
              { year: '2010', text: 'We solidified our brand portfolio, partnering with industry leaders like Kajaria, Johnson, Somany, and Simpolo.' },
              { year: '2015 – Present', text: 'Proudly recognized as the Top Dealers for Kajaria, a testament to our volume, quality, and reliability.' },
              { year: '2019', text: 'Expanded our footprint with a second branch in Chittur.' },
              { year: '2025', text: 'A Landmark Year. We completely rebuilt and upgraded our Wadakkancherry flagship showroom into a massive 40,000 sq. ft. experience center, inaugurated by the acclaimed actress Namitha Pramod.' },
            ].map(item => (
              <li key={item.year} className="flex gap-5">
                <span className="flex-shrink-0  font- tracking-wide text-[#782423] pt-0.5 w-28">{item.year}</span>
                <span className="text-[#5A4E44] leading-relaxed tracking-wide">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full h-px bg-[#E8DDD4] mb-14" />

        {/* H3 — World-Class Brands */}
        <div className="mb-14">
          <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] mb-4">World-Class Brands Under One Roof</h3>
          <p className="text-[#5A4E44] leading-relaxed tracking-wide mb-6">
            We bring the world's most trusted names in flooring and bath luxury to your doorstep:
          </p>
          <ul className="space-y-3">
            {[
              { cat: 'Tiles', brands: 'Kajaria, Johnson, Somany, Simpolo.' },
              { cat: 'Sanitary & Bath Fittings', brands: 'Grohe, Jaquar, American Standard, Carrowit, Cera, and more.' },
            ].map(item => (
              <li key={item.cat} className="flex gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#782423] mt-2" />
                <span className="text-[#5A4E44] leading-relaxed tracking-wide">
                  <span className="font-semibold text-[#1A1A1A]">{item.cat}:</span> {item.brands}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full h-px bg-[#E8DDD4] mb-14" />

        {/* H4 — The Drisya Difference */}
        <div className="mb-14">
          <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] mb-4">The Drisya Difference: Family & Commitment</h3>
          <p className="text-[#5A4E44] leading-relaxed tracking-wide mb-6">
            Drisya Marbles is more than just a business; it is a Family. Our success is built on three unbreakable pillars:
          </p>
          <ol className="space-y-5">
            {[
              { num: '01', title: 'Customer Trust', desc: 'We treat every project as if it were our own home. Your trust is the foundation of our 25-year history.' },
              { num: '02', title: 'Global Vision', desc: 'We "roam the world" to forecast new trends and find the best products, ensuring our customers always stay ahead of the curve.' },
              { num: '03', title: 'A Dedicated Team', desc: 'Our employees are our extended family. Their commitment and expertise ensure that every customer receives personalized, professional guidance.' },
            ].map(item => (
              <li key={item.num} className="flex gap-5">
                <span className="flex-shrink-0 font-display text-3xl text-[#782423]/20 leading-none w-10">{item.num}</span>
                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-1">{item.title}</p>
                  <p className="text-[#5A4E44] leading-relaxed tracking-wide">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="w-full h-px bg-[#E8DDD4] mb-14" />

        {/* H5 — Visit Our Experience Centers */}
        <div>
          <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] mb-4">Visit Our Experience Centers</h3>
          <p className="text-[#5A4E44] leading-relaxed tracking-wide mb-4">
            With 40,000 sq. ft. of inspiration, we invite you to explore the future of your home at our upgraded Wadakkancherry showroom.
          </p>
          <p className="font-display text-xl text-[#782423] italic">
            Drisya Marbles: Where your dream home meets our family's commitment.
          </p>
        </div>

      </section>

      {/* Original Intro quote (kept) */}
      <div className="max-w-3xl mx-auto px-6 pb-24 text-center border-t border-[#E8DDD4] pt-24">
        <div className="w-12 h-0.5 bg-[#782423] mx-auto mb-10" />
        <p className="font-display text-2xl text-[#1A1A1A] leading-relaxed italic mb-8">
          "Every surface tells a story. We curate the most extraordinary ones."
        </p>
        <p className="text-[#5A4E44] leading-relaxed tracking-wide">
          Since our establishment in 1999, Drisya Marble has accumulated over two decades of invaluable expertise in the tiles and sanitary ware industry. This extensive experience translates into reliable service, expert guidance, and unwavering commitment to customer satisfaction.
        </p>
      </div>

      {/* Story sections */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-1">
          <div className="relative h-96 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" alt="Quarry" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="bg-[#782423] p-8 md:p-16 flex flex-col justify-center">
            <h2 className="font-display text-white text-4xl mb-6">Our Vision</h2>
            <p className="text-white leading-relaxed tracking-wide">
              To be a leading provider of high quality tiles and sanitary ware, setting industry standards for innovation, customer satisfaction and community involvement.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div className="bg-[#1A1A1A] p-16 flex flex-col justify-center order-2 md:order-1">
            <h2 className="font-display text-4xl text-white mb-6">Our Mission</h2>
            <p className="text-white/75 leading-relaxed tracking-wide">
              To deliver superior products and services, foster growth, and contribute positively to society through innovation, quality, and community involvement.
            </p>
          </div>
          <div className="relative h-96 overflow-hidden order-1 md:order-2">
            <img src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80" alt="Artisans" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#782423] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-start text-white">
            {[
              { num: '25+', label: 'Years in Business' },
              { num: '20,000+', label: 'Happy Customers' },
              { num: '100+', label: 'Products' },
              { num: '50,000+', label: 'Products Sold' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-display text-5xl mb-2">{stat.num}</p>
                <p className="text-[14px] tracking-wide text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="bg-[#782423] pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white mb-12">
            <h2 className="font-display text-5xl mb-4">Our Clients</h2>
            <p className="text-[14px] tracking-wide text-white/70">Trusted by leading architects, builders, and homeowners.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-6 gap-x-8 text-start text-white leading-tight">
            {[
              "Azeezia Hospital","UBS Villas","Victoria Realtors","OMG Properties","RB Associates","Arcade Builders",
              "Sree Kurumba trust","Smart Business solutions","Buildark Construction","Plan House","Anil Santhosh Associates",
              "Likestone Builders","Galaxy Homes","GP Builders","SA Homes","Jayaraj Properties","CM Properties",
              "Adept Builders","Lee Construction","Luxe Interiors","Monei Interiors","Green Earth Foundation",
            ].map(client => (
              <p key={client} className="text-[15px] tracking-wide text-white/80 hover:text-white transition-colors duration-300">{client}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-display text-[45px] mb-8">The Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: 'Mr. Babu Peter', role: 'Founder', img: '/images/team/Babu peter.JPG' },
            { name: 'Marco Andrade', role: 'Head of Design Consultation', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
            { name: 'Sophie Chen', role: 'Senior Stone Specialist', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
            { name: 'James Okafor', role: 'Trade Relations Manager', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
          ].map(person => (
            <div key={person.name}>
              <div className="aspect-square overflow-hidden mb-4 bg-[#E8DDD4]">
                <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="font-semibold text-[20px] tracking-wide text-[#1A1A1A] mb-1">{person.name}</h3>
              <p className="text-[15px] tracking-wide text-black/75">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}