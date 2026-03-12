import { useState } from 'react'

const showrooms = [
  {
    name: 'Vadakkenchery Showroom',
    address: 'Bus Stop, NH Bypass, Service Road, Anjumoorthy, Vadakkancheri-II, Kerala 678682',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250982.73523969078!2d76.19233589453124!3d10.610005500000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba80b006bbf307b%3A0xd82664822f195b64!2sDRISYA%20MARBLE!5e0!3m2!1sen!2sin!4v1772524946752!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade&layer=c',
  },
  {
    name: 'Chittur Showroom',
    address: 'Near Govt. College, Ambattupalayam, Chittur, Kerala 678104',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250916.3932747146!2d76.46610230074509!3d10.690551400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8136748c760ef%3A0x4065c2d2fbac5753!2sDrisya%20Marble%20Chittur!5e0!3m2!1sen!2sin!4v1772524805796!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade&layer=c',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://formsubmit.co/ajax/abhinandg2003@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          subject: form.subject,
          message: form.message,
          _subject: `Drisya Stone & Tile — ${form.subject}`,
          _captcha: 'false',
          _template: 'table',
        }),
      })
      const data = await res.json()
      if (data.success === 'true' || data.success === true) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again or email us directly.')
      }
    } catch (err) {
      setError('Network error. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-20 bg-[#fdfaef]">
      <div className="max-w-7xl mx-auto px-6 pb-24">

        {/* Both headings on the same row, same vertical level */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-10">
          <h1 className="font-display font-semibold text-[25px] md:text-[40px] text-[#1A1A1A]">Get in Touch</h1>
          <h2 className="lg:flex font-display hidden font-semibold text-[25px] md:text-[40px] text-[#1A1A1A] lg:pl-12">Visit our Showrooms</h2>
        </div>

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-start">
                <div className="w-16 h-16 border-2 border-[#782423] flex items-center justify-center mb-8">
                  <svg className="w-8 h-8 text-[#782423]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-3xl mb-4">Thank You, {form.name}.</h2>
                <p className="text-[#5A4E44] tracking-wide leading-relaxed">
                  We've received your message and will respond within 1–2 business days.
                  In the meantime, feel free to visit our showroom or browse our collections.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[15px]  tracking-wide text-[#782423] mb-2">Name *</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-white border px-3 rounded-sm border-[#D4B896]/60 focus:border-[#782423] text-[#1A1A1A] py-3 text-sm tracking-wide focus:outline-none transition-colors placeholder-[#8B7A6A]/50"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-[15px] tracking-wide text-[#782423] mb-2">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full bg-white border px-3 rounded-sm border-[#D4B896]/60 focus:border-[#782423] text-[#1A1A1A] py-3 text-sm tracking-wide focus:outline-none transition-colors placeholder-[#8B7A6A]/50"
                      placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[15px] tracking-wide text-[#782423] mb-2">Phone</label>
                    <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full bg-white border px-3 rounded-sm border-[#D4B896]/60 focus:border-[#782423] text-[#1A1A1A] py-3 text-sm tracking-wide focus:outline-none transition-colors placeholder-[#8B7A6A]/50"
                      placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-[15px] tracking-wide text-[#782423] mb-2">Subject</label>
                    <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                      className="w-full bg-white border rounded-sm pl-3 pr-10 border-[#D4B896]/60 focus:border-[#782423] text-[#1A1A1A] py-3 text-sm tracking-wide focus:outline-none transition-colors">
                      <option>General Inquiry</option>
                      <option>Request Sample</option>
                      <option>Get a Quote</option>
                      <option>Trade Program</option>
                      <option>Order Status</option>
                      <option>Showroom Visit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[15px] tracking-wide text-[#782423] mb-2">Message *</label>
                  <textarea required rows={6} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-white px-3 border rounded-sm border-[#D4B896]/60 focus:border-[#782423] text-[#1A1A1A] py-3 text-sm tracking-wide focus:outline-none transition-colors placeholder-[#8B7A6A]/50 resize-none"
                    placeholder="Tell us about your project..." />
                </div>

                {error && <p className="text-red-500 text-sm tracking-wide">{error}</p>}

                <button type="submit" disabled={loading}
                  className="w-full rounded-md bg-gradient-to-r from-[#711a19] via-[#7e2e1e] to-[#711a19] text-white text-[14px] tracking-wide py-5 hover:bg-[#1A1A1A] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Right column — maps */}
          <div className="lg:pl-12">
            <h2 className="flex lg:hidden font-display  font-semibold text-[25px] md:text-[40px] text-[#1A1A1A] lg:pl-12 pb-10">Visit our Showrooms</h2>
            <div className="space-y-8">
              {showrooms.map((room) => (
                <div key={room.name}>
                  <div className="w-full rounded-sm overflow-hidden mb-3" style={{ height: '220px' }}>
                    <iframe
                      src={room.src}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={room.name}
                    />
                  </div>
                  <p className="text-[15px] font-semibold tracking-wide  text-[#782423] mb-0.5">{room.name}</p>
                  <p className="text-[13px] text-[#5A4E44]">{room.address}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}