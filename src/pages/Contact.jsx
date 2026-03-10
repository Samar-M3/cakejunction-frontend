import { useState, useEffect } from 'react'

const contactMethods = [
  {
    icon: '🟢',
    title: 'WhatsApp',
    desc: 'Chat instantly with our team',
    value: '+977 982-888-8759',
    href: 'https://wa.me/9779828888759',
    label: 'Message on WhatsApp',
  },
  {
    icon: '🟣',
    title: 'Viber',
    desc: 'Available on Viber too',
    value: '+977 981-601-9740',
    href: 'viber://chat?number=9779816019740',
    label: 'Message on Viber',
  },
  {
    icon: '📸',
    title: 'Instagram',
    desc: '10K+ followers, 1.6K+ posts',
    value: '@cakejunctionnepal',
    href: 'https://www.instagram.com/cakejunctionnepal',
    label: 'Follow on Instagram',
  },
  {
    icon: '📘',
    title: 'Facebook',
    desc: 'Updates and showcase',
    value: 'cakejunctionnepal',
    href: 'https://www.facebook.com/cakejunctionnepal',
    label: 'Find on Facebook',
  },
]

export default function Contact() {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', occasion: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 50)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', phone: '', occasion: '', message: '' })
  }

  return (
    <div className="bg-[#faf3e7] min-h-screen">
      {/* Header */}
      <div className="hero-pattern pt-32 pb-20 text-center">
        <p className={`font-accent text-[#c9a84c] text-3xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Get in touch
        </p>
        <h1 className={`font-display text-5xl md:text-6xl text-white mt-2 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Contact Us
        </h1>
        <p className={`font-body text-white/60 mt-4 max-w-md mx-auto transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Order online or reach out for custom quotes and delivery questions.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Form */}
          <div className="reveal">
            <div className="divider mb-6 justify-start">
              <span className="font-accent text-[#c9a84c] text-xl">Send a message</span>
            </div>
            <h2 className="font-display text-3xl text-[#163319] mb-8">We are here to help</h2>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Your Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Ramesh Sharma"
                    className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="98XXXXXXXX"
                    className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Occasion</label>
                <select
                  name="occasion"
                  value={form.occasion}
                  onChange={handleChange}
                  className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
                >
                  <option value="">Select occasion...</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Baby Shower</option>
                  <option>Custom / Other</option>
                </select>
              </div>

              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your cake request - size, flavor, design, delivery date..."
                  className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className={`btn-primary w-full text-center text-sm py-4 transition-all ${sent ? 'bg-[#c9a84c]' : ''}`}
              >
                {sent ? 'Message sent!' : 'Send Message'}
              </button>

              <p className="font-body text-xs text-[#163319]/40 text-center">
                We will respond within a few hours during business time.
              </p>
            </div>
          </div>

          {/* Contact methods + info */}
          <div className="space-y-8">
            <div className="reveal">
              <div className="divider mb-6 justify-start">
                <span className="font-accent text-[#c9a84c] text-xl">Reach us directly</span>
              </div>
              <h2 className="font-display text-3xl text-[#163319] mb-8">Contact Channels</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {contactMethods.map((m, i) => (
                <a
                  key={m.title}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal bg-white rounded-2xl p-5 border border-[#c9a84c]/10 hover:border-[#265a2a]/40 hover:shadow-md transition-all group"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="text-2xl mb-3">{m.icon}</div>
                  <div className="font-display text-[#163319] font-semibold mb-0.5">{m.title}</div>
                  <div className="font-body text-xs text-[#163319]/50 mb-2">{m.desc}</div>
                  <div className="font-body text-sm text-[#265a2a] font-bold">{m.value}</div>
                  <div className="font-body text-xs text-[#c9a84c] mt-2 group-hover:underline">{m.label} -&gt;</div>
                </a>
              ))}
            </div>

            {/* Info card */}
            <div className="reveal bg-[#265a2a] rounded-2xl p-7 text-white space-y-4">
              <h3 className="font-display text-xl mb-4">Visit Our Bakery</h3>
              <div className="space-y-3 font-body text-sm text-white/70">
                <div className="flex gap-3">
                  <span className="text-[#c9a84c]">📍</span>
                  <span>Bulbule, Chabahil, Kathmandu 44600</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#c9a84c]">📍</span>
                  <span>7 Rudramati Marg, Kathmandu 44602 (at PrintSewa)</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#c9a84c]">🕐</span>
                  <span>Opens 8 AM daily - Midnight delivery available</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#c9a84c]">💳</span>
                  <span>Cash on Delivery - FonePay - Mobile Banking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
