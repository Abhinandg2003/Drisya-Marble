import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'

const FORMSUBMIT_EMAIL = 'abhinandg2003@gmail.com' // ← replace with actual email

export default function CareersApply() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const position = state?.position

  // Redirect if landed directly without a position
  useEffect(() => {
    if (!position) navigate('/careers', { replace: true })
  }, [position, navigate])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    portfolio: '',
    coverLetter: '',
    resume: null,
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  if (!position) return null

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    const data = new FormData()
    data.append('_subject', `Job Application: ${position.title}`)
    data.append('_captcha', 'false')
    data.append('_template', 'table')
    data.append('Position', position.title)
    data.append('Department', position.department)
    data.append('Full Name', formData.name)
    data.append('Email', formData.email)
    data.append('Phone', formData.phone)
    data.append('Current Location', formData.location)
    data.append('Years of Experience', formData.experience)
    data.append('Portfolio / LinkedIn', formData.portfolio || 'Not provided')
    data.append('Cover Letter', formData.coverLetter)
    if (formData.resume) data.append('resume', formData.resume)

    try {
      const res = await fetch(`https://formsubmit.co/${FORMSUBMIT_EMAIL}`, {
        method: 'POST',
        body: data,
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <main className="pt-20 bg-[#fdfaef] min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#711a19] to-[#7e2e1e] flex items-center justify-center mx-auto mb-8">
            <span className="text-[#f2df8f] text-2xl">✓</span>
          </div>
          <h1 className="font-display text-[36px] text-[#1A1A1A] mb-4">Application Submitted</h1>
          <p className="text-[#5A4E44] leading-relaxed tracking-wide mb-3">
            Thank you for applying for <span className="text-[#782423]">{position.title}</span>.
          </p>
          <p className="text-[#8B7A6A] text-sm tracking-wide mb-10">
            We'll review your application and get back to you within 5–7 business days.
          </p>
          <Link to="/careers" className="inline-block rounded-md px-8 py-3 text-[13px] tracking-wide border border-[#782423] text-[#782423] hover:bg-[#782423] hover:text-white transition-colors">
            ← Back to Careers
          </Link>
        </div>
      </main>
    )
  }

  const inputClass = "w-full bg-white border border-[#E8DDD4] rounded-sm px-4 py-3 text-[13px] text-[#1A1A1A] tracking-wide placeholder-[#C4B5A8] focus:outline-none focus:border-[#782423] transition-colors"
  const labelClass = "block text-[13px] tracking-wide text-[#782423] mb-2"

  return (
    <main className="pt-20 bg-[#fdfaef] min-h-screen">

      {/* Header */}
      <div className="border-b border-[#E8DDD4] bg-white">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <Link to="/careers" className="text-[13px] tracking-wide bg-gradient-to-r from-[#711a19] via-[#7e2e1e] to-[#711a19] rounded-md px-5 py-3 text-[#fdfaef]  transition-colors mb-6 inline-block">
            ← Back to Careers
          </Link>
          <p className="text-[15px] tracking-wide text-[#782423] mb-2">Applying for</p>
          <h1 className="font-display text-[32px]  md:text-[44px] text-[#1A1A1A] mb-2">{position.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <span className="text-[11px] tracking-wide rounded-sm text-[#8B7A6A] border border-[#E8DDD4] px-3 py-1">{position.department}</span>
            <span className="text-[11px] text-[#8B7A6A]">{position.type}</span>
            <span className="text-[11px] text-[#8B7A6A]">📍 {position.location}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Sidebar — position details */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white border border-[#E8DDD4] rounded-sm p-6 sticky top-28">
              <h3 className="font-display text-[16px] text-[#1A1A1A] mb-4">Role Overview</h3>
              <p className="text-[#5A4E44] text-[12px] leading-relaxed tracking-wide mb-6">{position.description}</p>
              <div className="w-full h-px bg-[#E8DDD4] mb-5" />
              <h4 className="text-[13px] tracking-wide text-[#782423] mb-3">Requirements</h4>
              <ul className="space-y-2">
                {position.requirements.map((req, i) => (
                  <li key={i} className="flex gap-2 text-[12px] text-[#5A4E44] leading-relaxed">
                    <span className="text-[#782423] flex-shrink-0 mt-0.5">—</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Position (locked) */}
              <div>
                <label className={labelClass}>Position</label>
                <input
                  type="text"
                  value={position.title}
                  readOnly
                  className={`${inputClass} bg-[#F5F0EB] rounded-sm cursor-not-allowed text-[#8B7A6A]`}
                />
              </div>

              {/* Personal info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Current Location *</label>
                  <input type="text" name="location" required value={formData.location} onChange={handleChange} placeholder="City, State" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Years of Experience *</label>
                  <select name="experience" required value={formData.experience} onChange={handleChange} className={inputClass}>
                    <option value="">Select experience</option>
                    <option value="Fresher (0–1 yr)">Fresher (0–1 yr)</option>
                    <option value="1–3 years">1–3 years</option>
                    <option value="3–5 years">3–5 years</option>
                    <option value="5–10 years">5–10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Portfolio / LinkedIn</label>
                  <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="https://" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Resume / CV *</label>
                <input
                  type="file"
                  name="resume"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  className="w-full bg-white rounded-sm border border-[#E8DDD4] px-4 py-3 text-[12px] text-[#5A4E44] tracking-wide file:mr-4 file:py-1 file:px-3 file:border file:border-[#782423]/40 file:text-[11px] file:tracking-wide file:text-[#782423] file:bg-transparent file:cursor-pointer hover:file:bg-[#782423] hover:file:text-white file:transition-colors focus:outline-none focus:border-[#782423] transition-colors"
                />
                <p className="text-[11px] text-[#8B7A6A] mt-1">PDF, DOC or DOCX — max 5MB</p>
              </div>

              <div>
                <label className={labelClass}>Cover Letter *</label>
                <textarea
                  name="coverLetter"
                  required
                  rows={6}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Tell us why you want to join Drisya Marbles and what makes you the right fit for this role..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === 'error' && (
                <p className="text-[12px] text-[#782423] tracking-wide">Something went wrong. Please try again or email us directly.</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 text-[13px] tracking-wide rounded-md bg-gradient-to-r from-[#711a19] via-[#7e2e1e] to-[#711a19] text-[#fff6e2] hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {status === 'submitting' ? 'Submitting…' : 'Submit Application →'}
              </button>

              <p className="text-[11px] text-[#8B7A6A] tracking-wide text-center">
                By submitting this form, you agree to our privacy policy. We'll only use your information to process your application.
              </p>

            </form>
          </div>
        </div>
      </div>
    </main>
  )
}