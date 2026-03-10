import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'

const sizeOptions = ['0.5 kg', '1 kg', '2 kg', '3 kg']
const sizeMultipliers = {
  '0.5 kg': 0.75,
  '1 kg': 1,
  '2 kg': 1.8,
  '3 kg': 2.5,
}
const flavorOptions = ['Vanilla', 'Chocolate', 'Red Velvet', 'Butterscotch', 'Black Forest']
const frostingOptions = ['Buttercream', 'Whipped Cream', 'Fondant']
const fillingOptions = ['Fresh Cream', 'Chocolate Ganache', 'Strawberry', 'Nutella']

const formatNpr = (value) =>
  new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0,
  }).format(value)

export default function CustomizeModal({ cake, onClose }) {
  const { addItem } = useCart()
  const [size, setSize] = useState(sizeOptions[1])
  const [flavor, setFlavor] = useState(flavorOptions[0])
  const [filling, setFilling] = useState(fillingOptions[0])
  const [frosting, setFrosting] = useState(frostingOptions[0])
  const [message, setMessage] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [notes, setNotes] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [budget, setBudget] = useState('')


  useEffect(() => {
    if (!cake) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [cake])

  const basePrice = useMemo(() => {
    if (typeof cake?.priceValue === 'number') return cake.priceValue
    const parsed = Number(budget)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null
  }, [cake, budget])

  const unitPrice = useMemo(() => {
    if (!basePrice) return null
    const multiplier = sizeMultipliers[size] ?? 1
    return Math.round(basePrice * multiplier)
  }, [basePrice, size])

  if (!cake) return null

  const inputClassName = 'w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors'

  const handleAdd = () => {
    const options = {
      size,
      flavor,
      frosting,
      filling,
      message,
      deliveryDate,
      notes,
      budget: basePrice,
    }

    addItem({
      id: cake.id || cake.name,
      name: cake.name,
      image: cake.img,
      priceLabel: cake.priceLabel || cake.price || (unitPrice ? formatNpr(unitPrice) : 'Custom quote'),
      unitPrice,
      quantity,
      options,
    })
    onClose()
  }

  return (
    <div key={cake?.id || cake?.name} className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-4xl bg-[#fdf6ea] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#163319]/90 text-white flex items-center justify-center hover:bg-black transition-colors"
          aria-label="Close customization"
        >
          x
        </button>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative bg-[#163319] text-white p-8">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }} />
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img src={cake.img} alt={cake.name} className="w-full h-64 object-cover" />
              </div>
              <div className="mt-6">
                <p className="font-accent text-[#c9a84c] text-2xl">Customize Your Cake</p>
                <h3 className="font-display text-3xl mt-2">{cake.name}</h3>
                <p className="font-body text-white/70 text-sm mt-3">{cake.desc}</p>
                <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/10">
                  <div className="font-body text-xs uppercase tracking-[0.2em] text-white/60">Starting Price</div>
                  <div className="font-display text-2xl text-[#c9a84c]">
                    {unitPrice ? formatNpr(unitPrice) : 'Custom quote'}
                  </div>
                  <p className="font-body text-[11px] text-white/50 mt-2">
                    Final pricing depends on size and design details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Size</label>
                <select className={inputClassName} value={size} onChange={(e) => setSize(e.target.value)}>
                  {sizeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Flavor</label>
                <select className={inputClassName} value={flavor} onChange={(e) => setFlavor(e.target.value)}>
                  {flavorOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Filling</label>
                <select className={inputClassName} value={filling} onChange={(e) => setFilling(e.target.value)}>
                  {fillingOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Frosting</label>
                <select className={inputClassName} value={frosting} onChange={(e) => setFrosting(e.target.value)}>
                  {frostingOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {typeof cake.priceValue !== 'number' && (
              <div className="mt-5">
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Estimated Budget (NPR)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Enter your budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={inputClassName}
                />
              </div>
            )}

            <div className="mt-5">
              <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Message on Cake</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Happy Birthday, Asha!"
                className={inputClassName}
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Delivery Date</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className={inputClassName}
                />
              </div>
              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Extra Notes</label>
              <textarea
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Color theme, toppers, dietary notes..."
                className={`${inputClassName} resize-none`}
              />
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button onClick={handleAdd} className="btn-primary w-full">
                Add to Cart
              </button>
              <button onClick={onClose} className="btn-outline w-full">
                Keep Browsing
              </button>
              {unitPrice === null && (
                <p className="font-body text-xs text-[#163319]/50 text-center">
                  Custom designs are quoted after review. You can still check out to reserve your slot.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
