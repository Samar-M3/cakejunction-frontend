import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CustomizeModal from '../components/CustomizeModal'

const allCakes = [
  { img: '/cake1.png', name: 'Red Rose Wedding', category: 'Wedding', desc: '4-tier white fondant with fresh red roses cascade', priceLabel: 'Custom quote', priceValue: null },
  { img: '/cake2.png', name: 'Hookah Luxury', category: 'Custom', desc: 'Black & gold sculpted hookah birthday cake', priceLabel: 'Custom quote', priceValue: null },
  { img: '/cake3.png', name: 'Safari Adventure', category: 'Kids', desc: "Jungle animals 3-tier for Reo's 2nd birthday", priceLabel: 'Custom quote', priceValue: null },
  { img: '/cake4.png', name: 'Captain America', category: 'Theme', desc: "Marvel superhero fondant for Prabal's 7th birthday", priceLabel: 'Custom quote', priceValue: null },
  { img: '/cake1.png', name: 'Classic White Wedding', category: 'Wedding', desc: 'Elegant scroll-patterned white fondant cake', priceLabel: 'Custom quote', priceValue: null },
  { img: '/cake3.png', name: 'Jungle Birthday', category: 'Kids', desc: 'Vibrant tropical themed celebration cake', priceLabel: 'Custom quote', priceValue: null },
  { img: '/cake2.png', name: 'Gold Glamour', category: 'Custom', desc: 'Opulent gold-leaf decorated milestone cake', priceLabel: 'Custom quote', priceValue: null },
  { img: '/cake4.png', name: 'Superhero Special', category: 'Theme', desc: 'Bold theme cake for young heroes', priceLabel: 'Custom quote', priceValue: null },
]

const categories = ['All', 'Wedding', 'Custom', 'Kids', 'Theme']

export default function Gallery() {
  const [active, setActive] = useState('All')
  const [visible, setVisible] = useState(false)
  const [selectedCake, setSelectedCake] = useState(null)

  useEffect(() => {
    setTimeout(() => setVisible(true), 50)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [active])

  const filtered = active === 'All' ? allCakes : allCakes.filter(c => c.category === active)

  return (
    <div className="bg-[#faf3e7] min-h-screen">
      {/* Header */}
      <div className="hero-pattern pt-32 pb-20 text-center">
        <p className={`font-accent text-[#c9a84c] text-3xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Our Portfolio
        </p>
        <h1 className={`font-display text-5xl md:text-6xl text-white mt-2 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Cake Gallery
        </h1>
        <p className={`font-body text-white/60 mt-4 max-w-md mx-auto transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Browse our handcrafted creations - from grand weddings to intimate celebrations.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-16 z-30 bg-[#faf3e7]/95 backdrop-blur-sm border-b border-[#c9a84c]/15 py-5">
        <div className="max-w-6xl mx-auto px-6 flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 font-body text-sm font-bold tracking-widest uppercase px-5 py-2 rounded-full border transition-all duration-200 ${
                active === cat
                  ? 'bg-[#265a2a] text-white border-[#265a2a]'
                  : 'border-[#c9a84c]/30 text-[#265a2a] hover:border-[#265a2a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((cake, i) => (
            <div
              key={`${cake.name}-${i}`}
              className={`reveal cake-card img-overlay rounded-xl overflow-hidden cursor-pointer group ${i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              style={{ transitionDelay: `${(i % 6) * 60}ms` }}
              onClick={() => setSelectedCake(cake)}
            >
              <img
                src={cake.img}
                alt={cake.name}
                className={`w-full object-cover ${i % 5 === 0 ? 'aspect-square' : 'aspect-[3/4]'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#163319]/80 via-transparent to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block bg-[#c9a84c] text-[#163319] text-[9px] font-body font-black tracking-[0.2em] uppercase px-2 py-0.5 rounded mb-1.5">
                  {cake.category}
                </span>
                <h3 className="font-display text-white text-sm">{cake.name}</h3>
                <p className="font-body text-white/60 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cake.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 reveal">
          <p className="font-display text-2xl text-[#163319] mb-3">Don't see what you're looking for?</p>
          <p className="font-body text-[#163319]/60 mb-6">Create a custom cake and add it straight to your cart.</p>
          <Link to="/menu" className="btn-primary">
            Start Custom Order
          </Link>
        </div>
      </div>

      {selectedCake && (
        <CustomizeModal cake={selectedCake} onClose={() => setSelectedCake(null)} />
      )}
    </div>
  )
}
