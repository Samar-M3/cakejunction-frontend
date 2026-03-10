import { useEffect, useState } from 'react'

export default function About() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 50)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-[#faf3e7] min-h-screen">
      {/* Header */}
      <div className="hero-pattern pt-32 pb-20 text-center">
        <p className={`font-accent text-[#c9a84c] text-3xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Our Story
        </p>
        <h1 className={`font-display text-5xl md:text-6xl text-white mt-2 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          About Us
        </h1>
      </div>

      {/* Story section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="reveal">
            <div className="divider mb-5 justify-start">
              <span className="font-accent text-[#c9a84c] text-xl">Who we are</span>
            </div>
            <h2 className="font-display text-4xl text-[#163319] mb-6">Baking Joy Since Day One</h2>
            <p className="font-body text-[#163319]/70 leading-relaxed mb-5">
              Cake Junction Nepal was born from a simple belief: every celebration deserves a cake as special as the moment itself. Nestled in the heart of Kathmandu, we've been crafting artisanal cakes that combine beautiful design with exceptional taste.
            </p>
            <p className="font-body text-[#163319]/70 leading-relaxed mb-5">
              From intimate birthday cakes to grand wedding masterpieces, our team of passionate bakers brings creativity and precision to every order. We source only the freshest ingredients and use time-honored techniques alongside modern artistry.
            </p>
            <p className="font-body text-[#163319]/70 leading-relaxed">
              With over 10,000 happy customers across Kathmandu and a 4.2-star Google rating, we're proud to be part of so many cherished memories.
            </p>
          </div>
          <div className="reveal">
            <div className="grid grid-cols-2 gap-4">
              <img src="/cake1.png" alt="Wedding cake" className="rounded-2xl w-full aspect-[3/4] object-cover shadow-lg" />
              <div className="flex flex-col gap-4 pt-8">
                <img src="/cake2.png" alt="Custom cake" className="rounded-2xl w-full aspect-square object-cover shadow-lg" />
                <img src="/cake3.png" alt="Kids cake" className="rounded-2xl w-full aspect-square object-cover shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12 reveal">
            <div className="divider mb-4">
              <span className="font-accent text-[#c9a84c] text-2xl">Our values</span>
            </div>
            <h2 className="font-display text-4xl text-[#163319]">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🌿', title: 'Fresh Quality', desc: 'We never compromise on ingredients. Every cake is made fresh on the day of delivery.' },
              { icon: '🎨', title: 'Creative Design', desc: 'Our bakers are artists. We transform your vision into edible art with meticulous attention to detail.' },
              { icon: '❤️', title: 'Customer Love', desc: 'Your happiness is our mission. We go above and beyond to make every order a perfect experience.' },
            ].map((v, i) => (
              <div
                key={v.title}
                className="reveal text-center p-8 bg-white rounded-2xl shadow-sm border border-[#c9a84c]/10"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="w-16 h-16 bg-[#f0f7f0] rounded-full flex items-center justify-center text-3xl mx-auto mb-5">
                  {v.icon}
                </div>
                <h3 className="font-display text-xl text-[#163319] mb-3">{v.title}</h3>
                <p className="font-body text-sm text-[#163319]/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-[#265a2a] rounded-3xl overflow-hidden reveal">
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-14">
              <p className="font-accent text-[#c9a84c] text-2xl mb-3">Visit us</p>
              <h2 className="font-display text-3xl text-white mb-8">Find Cake Junction</h2>
              <div className="space-y-5 font-body text-white/70">
                <div className="flex gap-4">
                  <span className="text-[#c9a84c] text-lg">📍</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Main Location</p>
                    <p>Bulbule, Chabahil, Kathmandu 44600</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#c9a84c] text-lg">📍</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Also at PrintSewa</p>
                    <p>7 Rudramati Marg, Kathmandu 44602</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#c9a84c] text-lg">🕐</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Hours</p>
                    <p>Opens at 8 AM daily</p>
                    <p className="text-[#c9a84c]">Midnight delivery available!</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#c9a84c] text-lg">📞</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Contact</p>
                    <a href="tel:+9779828888759" className="block hover:text-[#c9a84c] transition-colors">+977 982-888-8759</a>
                    <a href="tel:+9779816019740" className="block hover:text-[#c9a84c] transition-colors">+977 981-601-9740</a>
                  </div>
                </div>
              </div>
              <a href="https://maps.app.goo.gl/BhatkekopulKalopulKTM" target="_blank" rel="noopener noreferrer"
                className="btn-outline mt-8 inline-block">
                Get Directions
              </a>
            </div>
            <div className="relative min-h-64 md:min-h-0">
              <img src="/cake4.png" alt="Store" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="font-display text-white text-2xl">Kathmandu, Nepal</p>
                  <p className="font-body text-white/60">Chabahil & Rudramati Marg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
