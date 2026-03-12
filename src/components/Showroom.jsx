import { Award, Building2, Star, Globe } from 'lucide-react'

const achievements = [
    { icon: Award, stat: '27+', label: 'Years of Trust' },
    { icon: Building2, stat: '40,000 sq ft', label: 'Experience Center' },
    { icon: Star, stat: '#1', label: 'Top Kajaria Dealer in Kerala' },
    { icon: Globe, stat: '20+', label: 'Global Brands Under One Roof' },
]

export default function Showroom() {
    return (
        <><section
            className="relative lg:flex items-center justify-center overflow-hidden hidden"
            style={{
                backgroundImage: "url('/images/Textures/menuwhite.avif'), url('/images/Textures/menuwhite.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff]/60 via-[#ffffff]/80 to-[#ffffff]/60 z-0 pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl  mx-auto px-6 py-20">

                {/* Section heading */}
                <div className="text-center mb-12">
                    <h2 className="flex justify-center text-center leading-tight font-semibold font-display text-[30px] md:text-[40px] text-[#782423]">
                        Experience the Largest Home &<br className="hidden md:block" /> Bath Showroom in Kerala
                    </h2>
                </div>

                {/* Main two-column grid */}
                <div className="grid grid-cols-1  gap-0 border-[8px] rounded-sm border-[#f2df8f] shadow-xl">

                    {/* LEFT — showroom photo + achievements */}
                    <div className="flex flex-col">

                        {/* Showroom photo with founder portrait overlapping */}
                        <div className="relative">
                            <div className="overflow-hidden" style={{ height: 'clamp(60px, 20vw, 420px)' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80"
                                    alt="Drisya Marble Showroom"
                                    className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                            </div>

                            {/* Founder portrait — overlaps bottom-right of showroom image */}
                            <div
                                className="absolute -bottom-5 right-6 overflow-hidden border-[5px] shadow-2xl"
                                style={{
                                    width: 'clamp(10px, 15vw, 290px)',
                                    height: 'clamp(10px, 15vw, 290px)',
                                    borderColor: '#f2df8f',
                                }}
                            >
                                <img
                                    src="/images/team/Babu peter.jpg"
                                    alt="Mr. Babu Peter — Founder"
                                    className="w-full h-full object-cover object-top" />
                            </div>
                        </div>


                        <div style={{
                            backgroundImage: 'url(/images/Textures/navbarbg.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderBottomColor: '#f2df8f',
                        }} className='grid grid-cols-2 bg-[#782423]'
                        >
                            {/* Achievements row — below showroom photo */}
                            <div
                                className=" grid grid-cols-2 "

                            >
                                {achievements.map(({ icon: Icon, stat, label }) => (
                                    <div
                                        key={label}
                                        className="flex flex-row items-start "
                                    >
                                        <div className="flex flex-row items-center gap-2 m-5">
                                            <div
                                                className="w-10 h-10 lg:h-14 lg:w-14 flex items-center justify-center rounded-sm mb-1"
                                                style={{ background: 'rgba(242,223,143,0.12)', border: '1px solid rgba(242,223,143,0.3)' }}
                                            >
                                                <Icon className="w-5 h-5 md:h-8 md:w-8" style={{ color: '#f2df8f' }} strokeWidth={.6} />
                                            </div>
                                            <div className="flex flex-col items-start justify-center gap-2 p-2">
                                                <p className="font-display text-xl md:text-[22px] text-[#f2df8f] leading-none">{stat}</p>
                                                <p className="text-[12px] tracking-wide text-white/75 leading-snug">{label}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            {/* RIGHT — founder message box */}
                            <div className="flex items-stretch">
                                <div
                                    className="flex flex-col justify-center w-full px-10 py-12 lg:ml-0"
                                >


                                    <h3 className="font-display text-2xl md:text-3xl text-[#f2df8f] leading-snug mb-6">
                                        A Message from Our Founder
                                    </h3>

                                    <div className="w-10 h-px mb-6" style={{ background: '#f2df8f' }} />

                                    <p className="text-white/80 leading-relaxed tracking-wide text-[15px] mb-4">
                                        We started with a vision of trust and equality. Today, we help you build the home of your dreams — one tile at a time, with the same commitment and care that has defined Drisya Marble for over 25 years.
                                    </p>
                                    <p className='text-white text-[15px] font-display'>-Mr. Babu Peter</p>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section><section
            className="relative md:flex items-center justify-center overflow-hidden lg:hidden"
            style={{
                backgroundImage: "url('/images/Textures/menuwhite.avif'), url('/images/Textures/menuwhite.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
                <div className="absolute inset-0 bg-white/40 pointer-events-none" />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">

                    {/* Heading */}
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-5xl text-[#782423] leading-tight max-w-3xl mx-auto">
                            Experience the Largest Home &<br className="hidden md:block" /> Bath Showroom in Kerala
                        </h2>
                    </div>

                    {/* Card */}
                    <div className="border-[6px] border-white shadow-xl overflow-hidden">

                        {/* ── Showroom photo + founder portrait ── */}
                        <div className="relative">
                            <div className="w-full overflow-hidden" style={{ height: 'clamp(200px, 35vw, 420px)' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80"
                                    alt="Drisya Marble Showroom"
                                    className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                            </div>

                            
                        </div>

                        {/* ── Bottom area: achievements + founder message ── */}
                        <div
                            className="flex flex-col md:flex-row"
                            style={{
                                backgroundImage: 'url(/images/Textures/navbarbg.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >

                            {/* Achievements — 2×2 grid, full width on sm, half on md+ */}
                            <div className="w-full md:w-1/2 grid grid-cols-2 mt-6 md:mt-0">
                                {achievements.map(({ icon: Icon, stat, label }) => (
                                    <div key={label} className="flex items-center gap-3 px-4 py-3">
                                        <div
                                            className="flex-shrink-0 flex items-center justify-center rounded-sm"
                                            style={{
                                                width: 'clamp(36px, 5vw, 52px)',
                                                height: 'clamp(36px, 5vw, 52px)',
                                                background: 'rgba(242,223,143,0.12)',
                                                border: '1px solid rgba(242,223,143,0.3)',
                                            }}
                                        >
                                            <Icon
                                                style={{ color: '#f2df8f', width: 'clamp(16px,2.5vw,24px)', height: 'clamp(16px,2.5vw,24px)' }}
                                                strokeWidth={1.2} />
                                        </div>
                                        <div>
                                            <p className="font-display text-lg md:text-xl text-[#f2df8f] leading-none mb-1">{stat}</p>
                                            <p className="text-[11px] md:text-[12px] tracking-wide text-white/70 leading-snug">{label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Founder message — 2-col grid: text left, photo right */}
            <div
              className="w-full md:w-1/2"
              style={{ borderLeft: '1px solid rgba(242,223,143,0.2)' }}
            >
              <div className="flex flex-col justify-center px-6 py-8 md:py-12 col-span-2">
                {/* Heading + portrait side by side */}
                <div className="grid grid-cols-2 gap-4 items-center mb-3">
                  <h3 className="font-display text-lg md:text-xl lg:text-2xl text-[#f2df8f] leading-snug">
                    A Message from Our Founder
                  </h3>
                  <div
                    className="overflow-hidden border-[2px] justify-self-end"
                    style={{
                      width: 'clamp(100px, 8vw, 110px)',
                      height: 'clamp(120px, 10vw, 135px)',
                      borderColor: '#f2df8f',
                    }}
                  >
                    <img
                      src="/images/team/Babu peter.jpg"
                      alt="Mr. Babu Peter"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="w-8 h-px mb-3" style={{ background: '#f2df8f' }} />
                <p className="text-white/80 leading-relaxed tracking-wide text-[12px] md:text-[13px] mb-4">
                  We started with a vision of trust and equality. Today, we help you build the home of your dreams — one tile at a time, with the same commitment and care that has defined Drisya Marble for over 27 years.
                </p>
                <p className="text-white text-[13px] font-display">— Mr. Babu Peter</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section></>






    )
}





