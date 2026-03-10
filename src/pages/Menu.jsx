import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CustomizeModal from '../components/CustomizeModal'
import { useCart } from '../context/CartContext'

const menuCategories = [
  {
    id: 'wedding',
    name: 'Wedding Cakes',
    icon: 'W',
    items: [
      { name: 'Classic White Wedding', desc: 'Elegant white fondant with scroll piping, fresh florals', price: 'From NPR 5,000', priceValue: 5000, serves: '20-30 pax', img: '/cake1.png' },
      { name: 'Floral Cascade', desc: "Fresh red roses & baby's breath cascading tiers", price: 'From NPR 8,000', priceValue: 8000, serves: '40-60 pax', img: '/cake1.png' },
      { name: 'Luxury Pearl Wedding', desc: 'Pearl-embellished fondant with gold accents', price: 'From NPR 12,000', priceValue: 12000, serves: '60-80 pax', img: '/cake1.png' },
    ]
  },
  {
    id: 'birthday',
    name: 'Birthday Cakes',
    icon: 'B',
    items: [
      { name: 'Classic Birthday', desc: 'Buttercream frosted cake with fresh fruits and custom message', price: 'From NPR 800', priceValue: 800, serves: '8-12 pax', img: '/cake3.png' },
      { name: 'Kids Safari', desc: 'Jungle animals, fondant decorations, vibrant colors', price: 'From NPR 2,500', priceValue: 2500, serves: '15-25 pax', img: '/cake3.png' },
      { name: 'Luxury Black Gold', desc: 'Premium fondant with metallic finish and sculpted toppers', price: 'From NPR 4,000', priceValue: 4000, serves: '15-20 pax', img: '/cake2.png' },
    ]
  },
  {
    id: 'theme',
    name: 'Theme & Custom',
    icon: 'T',
    items: [
      { name: 'Superhero Theme', desc: 'Marvel or DC characters in fondant - Captain America, Spider-Man & more', price: 'From NPR 2,000', priceValue: 2000, serves: '10-15 pax', img: '/cake4.png' },
      { name: 'Hookah Luxury Cake', desc: 'Sculpted 3D hookah in black & gold fondant', price: 'From NPR 3,500', priceValue: 3500, serves: '10-15 pax', img: '/cake2.png' },
      { name: 'Fully Custom', desc: 'Your imagination, our craft. Share your idea in the customization form.', price: 'Quote on request', priceValue: null, serves: 'Any size', img: '/cake4.png' },
    ]
  },
  {
    id: 'bouquet',
    name: 'Cake Bouquets',
    icon: 'BQ',
    items: [
      { name: 'Cupcake Bouquet', desc: 'Individually decorated cupcakes arranged in a floral bouquet', price: 'From NPR 1,200', priceValue: 1200, serves: '12 cupcakes', img: '/cake3.png' },
      { name: 'Mini Cake Bouquet', desc: 'Assorted mini cakes in a stunning gift bouquet arrangement', price: 'From NPR 2,000', priceValue: 2000, serves: '6 mini cakes', img: '/cake1.png' },
    ]
  },
]

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('wedding')
  const [visible, setVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const { addItem } = useCart()

  useEffect(() => {
    setTimeout(() => setVisible(true), 50)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [activeCategory])

  const current = menuCategories.find(c => c.id === activeCategory)

  const handleQuickAdd = (item, event) => {
    if (event) event.stopPropagation()

    addItem({
      id: item.name,
      name: item.name,
      image: item.img,
      priceLabel: item.price,
      unitPrice: typeof item.priceValue === 'number' ? item.priceValue : null,
      quantity: 1,
      options: {
        size: '1 kg',
        flavor: 'Vanilla',
        filling: 'Fresh Cream',
        frosting: 'Buttercream',
        message: '',
        deliveryDate: '',
        notes: '',
        budget: typeof item.priceValue === 'number' ? item.priceValue : null,
      },
    })
  }

  return (
    <div className="bg-[#faf3e7] min-h-screen">
      {/* Header */}
      <div className="hero-pattern pt-32 pb-20 text-center">
        <p className={`font-accent text-[#c9a84c] text-3xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Our Offerings
        </p>
        <h1 className={`font-display text-5xl md:text-6xl text-white mt-2 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          The Menu
        </h1>
        <p className={`font-body text-white/60 mt-4 max-w-lg mx-auto transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Every item is freshly made to order. Prices are indicative - contact us for a custom quote.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Category tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14 reveal">
          {menuCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#265a2a] border-[#265a2a] text-white shadow-lg scale-105'
                  : 'bg-white border-[#c9a84c]/20 text-[#265a2a] hover:border-[#265a2a]/40'
              }`}
            >
              <span className="text-2xl block mb-2">{cat.icon}</span>
              <span className="font-display text-sm font-semibold">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="grid md:grid-cols-3 gap-6">
          {current.items.map((item, i) => (
            <div
              key={item.name}
              className="reveal bg-white rounded-2xl overflow-hidden shadow-sm border border-[#c9a84c]/10 hover:shadow-md hover:border-[#c9a84c]/30 transition-all duration-300 group cursor-pointer"
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden h-48">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#163319]/50 to-transparent" />
                <div className="absolute top-3 right-3 bg-[#c9a84c] text-[#163319] text-xs font-body font-bold px-2 py-0.5 rounded">
                  {item.serves}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg text-[#163319] mb-2">{item.name}</h3>
                <p className="font-body text-sm text-[#163319]/60 leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[#265a2a] font-bold">{item.price}</span>
                  <button
                    onClick={(event) => handleQuickAdd(item, event)}
                    className="btn-primary text-[10px] px-4 py-2"
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="font-body text-[11px] text-[#163319]/45 mt-3">
                  Click the card to customize this cake.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Custom order CTA */}
        <div className="mt-16 bg-[#265a2a] rounded-3xl p-10 text-center reveal">
          <p className="font-accent text-[#c9a84c] text-3xl mb-3">Have something special in mind?</p>
          <h3 className="font-display text-3xl text-white mb-4">Design a Fully Custom Cake</h3>
          <p className="font-body text-white/60 mb-8 max-w-lg mx-auto">
            Use the customization form on any cake to add flavors, sizes, and notes. We will confirm every detail before baking.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/cart" className="btn-primary px-8">
              View Cart
            </Link>
            <Link to="/contact" className="btn-outline px-8">
              Need Help?
            </Link>
          </div>
        </div>
      </div>

      {selectedItem && (
        <CustomizeModal
          cake={{
            ...selectedItem,
            name: selectedItem.name,
            priceLabel: selectedItem.price,
            priceValue: selectedItem.priceValue,
          }}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}

