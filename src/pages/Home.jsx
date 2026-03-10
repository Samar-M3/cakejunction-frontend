import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const cakes = [
  { img: '/cake1.png', title: 'Wedding Elegance', desc: 'Multi-tier wedding cakes adorned with fresh florals', tag: 'Wedding' },
  { img: '/cake2.png', title: 'Luxury Custom', desc: 'Black & gold sculpted cakes for milestone birthdays', tag: 'Custom' },
  { img: '/cake3.png', title: 'Kids Safari', desc: 'Whimsical jungle-themed cakes for little ones', tag: 'Birthday' },
  { img: '/cake4.png', title: 'Theme Cakes', desc: 'Superhero & character cakes that wow every time', tag: 'Theme' },
]

const features = [
  { icon: '🎂', title: 'Custom Design', desc: 'Every cake is tailored to your vision, from sketch to slice.' },
  { icon: '🌙', title: 'Midnight Delivery', desc: 'Surprise your loved ones at any hour with our midnight delivery.' },
  { icon: '🌿', title: 'Fresh Ingredients', desc: 'Made daily with the freshest, highest-quality ingredients.' },
  { icon: '💳', title: 'Easy Payment', desc: 'COD, FonePay, or Mobile Banking — whatever suits you.' },
]

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '1.6K+', label: 'Cakes Created' },
  { value: '4.2★', label: 'Google Rating' },
  { value: '24/7', label: 'Delivery Available' },
]

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      {/* ── HERO ── */}
      <section className="hero-pattern min-h-screen flex items-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-[#c9a84c]/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-[#3a8c40]/10 blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-[#c9a84c]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#3a8c40] animate-pulse" />
              <span className="font-body text-[#c9a84c] text-xs tracking-[0.2em] uppercase">Kathmandu's Finest</span>
            </div>
            <h1 className="font-display text-white leading-[1.1] mb-6">
              <span className="block text-5xl md:text-6xl lg:text-7xl">Cakes That</span>
              <span className="block font-accent text-[#c9a84c] text-6xl md:text-7xl lg:text-8xl mt-1">Tell Stories</span>
            </h1>
            <p className="font-body text-white/65 text-lg leading-relaxed max-w-md mb-8">
              Handcrafted with love in Kathmandu. Custom designs, fresh ingredients, and midnight delivery right to your door.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu" className="btn-primary">Explore Menu</Link>
              <Link to="/cart" className="btn-outline">
                Order Online
              </Link>
            </div>

            {/* Quick stats row */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[['10K+', 'Followers'], ['1.6K+', 'Posts'], ['4.2★', 'Rated']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl text-white font-bold">{v}</div>
                  <div className="font-body text-xs text-white/40 uppercase tracking-widest mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image collage */}
          <div className={`relative transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative w-full aspect-[4/5] max-w-sm mx-auto">
              {/* Main image */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden ring-1 ring-white/10">
                <img src="/cake1.png" alt="Wedding Cake" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#163319]/60 to-transparent" />
              </div>
              {/* Floating card 1 */}
              <div className="absolute -left-8 bottom-24 bg-[#1e4620] border border-[#c9a84c]/30 rounded-xl p-3 shadow-2xl animate-float">
                <img src="/cake3.png" alt="Kids cake" className="w-16 h-16 rounded-lg object-cover" />
                <p className="font-body text-white text-xs mt-1.5 font-medium">Safari Birthday</p>
                <p className="font-body text-white/50 text-[10px]">Custom Design</p>
              </div>
              {/* Floating card 2 */}
              <div className="absolute -right-6 top-16 bg-[#1e4620] border border-[#c9a84c]/30 rounded-xl p-3 shadow-2xl" style={{animation: 'float 4s ease-in-out infinite 1.5s'}}>
                <img src="/cake4.png" alt="Captain America cake" className="w-16 h-16 rounded-lg object-cover" />
                <p className="font-body text-white text-xs mt-1.5 font-medium">Theme Cakes</p>
                <p className="font-body text-white/50 text-[10px]">For Every Hero</p>
              </div>
              {/* Bottom label */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <p className="font-accent text-[#c9a84c] text-lg leading-none">We Bake Quality</p>
                <p className="font-body text-white/60 text-xs mt-0.5">Midnight delivery available ❤️</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="font-body text-white text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-[#c9a84c] py-3 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{animation: 'marquee 20s linear infinite'}}>
          {Array(6).fill('🎂 Custom Cakes  ·  🌙 Midnight Delivery  ·  💐 Bouquets Available  ·  ⭐ 4.2 Google Rating  ·  📍 Kathmandu  ·').map((t, i) => (
            <span key={i} className="font-body text-[#163319] text-sm font-bold tracking-wider mx-6">{t}</span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-[#faf3e7]" ref={sectionRef}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <div className="divider mb-4">
              <span className="font-accent text-[#c9a84c] text-2xl">Why choose us</span>
            </div>
            <h2 className="font-display text-4xl text-[#163319] mt-2">Quality in Every Layer</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="reveal group bg-white rounded-2xl p-8 shadow-sm border border-[#c9a84c]/10 hover:border-[#c9a84c]/40 hover:shadow-lg transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 bg-[#f0f7f0] rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="font-display text-lg text-[#163319] mb-2">{f.title}</h3>
                <p className="font-body text-sm text-[#163319]/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="py-24 bg-[#f5e7ce]/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal">
            <div>
              <div className="divider mb-4 justify-start">
                <span className="font-accent text-[#c9a84c] text-2xl">Our creations</span>
              </div>
              <h2 className="font-display text-4xl text-[#163319]">Sweet Masterpieces</h2>
            </div>
            <Link to="/gallery" className="btn-outline mt-6 md:mt-0">View All</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cakes.map((c, i) => (
              <div
                key={c.title}
                className="cake-card img-overlay rounded-xl overflow-hidden cursor-pointer reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className={`w-full object-cover ${i === 0 ? 'aspect-[3/4] md:row-span-2' : 'aspect-square'}`}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                  <span className="inline-block bg-[#c9a84c] text-[#163319] text-[10px] font-body font-bold tracking-widest uppercase px-2 py-0.5 rounded mb-1">{c.tag}</span>
                  <p className="font-display text-white text-sm">{c.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#265a2a] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center reveal">
                <div className="font-display text-4xl md:text-5xl text-white font-bold shimmer-text">{s.value}</div>
                <div className="font-body text-xs text-white/50 uppercase tracking-[0.2em] mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-[#faf3e7]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <div className="divider mb-4">
              <span className="font-accent text-[#c9a84c] text-2xl">What people say</span>
            </div>
            <h2 className="font-display text-4xl text-[#163319]">Loved by Kathmandu</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Aarav S.', review: 'The wedding cake was absolutely stunning! Every tier was perfect and the taste was divine. Will definitely order again!', stars: 5 },
              { name: 'Priya M.', review: 'Ordered a custom birthday cake at midnight and they delivered on time. The design was exactly what I wanted. Amazing service!', stars: 5 },
              { name: 'Bibek B.', review: 'Best cake shop in Kathmandu! The quality is unmatched and the team is so friendly and accommodating.', stars: 4 },
            ].map((t, i) => (
              <div
                key={t.name}
                className="reveal bg-white rounded-2xl p-7 shadow-sm border border-[#c9a84c]/10 hover:border-[#c9a84c]/30 transition-all"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex text-[#c9a84c] mb-4">
                  {Array(t.stars).fill('★').map((s, j) => <span key={j}>{s}</span>)}
                  {Array(5 - t.stars).fill('☆').map((s, j) => <span key={j} className="text-[#c9a84c]/30">{s}</span>)}
                </div>
                <p className="font-body text-sm text-[#163319]/70 leading-relaxed italic mb-5">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#265a2a] flex items-center justify-center text-white font-display font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <span className="font-body text-sm font-bold text-[#163319]">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden">
        <div className="bg-[#163319] py-20 px-6">
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")'}} />
          <div className="max-w-3xl mx-auto text-center relative">
            <div className="reveal">
              <p className="font-accent text-[#c9a84c] text-3xl mb-3">Ready to celebrate?</p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                Let's Bake Your<br />Perfect Cake
              </h2>
              <p className="font-body text-white/60 mb-10 max-w-xl mx-auto">
                Customize your cake, add it to cart, and pay online or on delivery.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/menu" className="btn-primary text-sm px-8 py-4">
                  Order Online
                </Link>
                <Link to="/contact" className="btn-outline text-sm px-8 py-4">
                  Need Help?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

