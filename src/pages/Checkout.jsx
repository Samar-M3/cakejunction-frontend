import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../lib/api'

const formatNpr = (value) =>
  new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0,
  }).format(value)

export default function Checkout() {
  const { items, subtotal, unpricedCount, clearCart } = useCart()
  const { user, token } = useAuth()
  const [submitted, setSubmitted] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('online')
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Kathmandu',
    deliveryDate: '',
    deliveryTime: '',
    note: '',
  })

  useEffect(() => {
    if (!user) return
    setForm((prev) => ({
      ...prev,
      name: prev.name || user.name || '',
      email: prev.email || user.email || '',
    }))
  }, [user])

  if (!user && !submitted) {
    return (
      <div className="bg-[#faf3e7] min-h-screen">
        <div className="hero-pattern pt-32 pb-16 text-center">
          <p className="font-accent text-[#c9a84c] text-3xl">Almost there</p>
          <h1 className="font-display text-5xl md:text-6xl text-white mt-2">Login to Checkout</h1>
          <p className="font-body text-white/60 mt-4 max-w-md mx-auto">
            Create an account or sign in to place your order and track delivery.
          </p>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login" state={{ from: '/checkout' }} className="btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn-outline">
            Create Account
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0 && !submitted) {
    return (
      <div className="bg-[#faf3e7] min-h-screen">
        <div className="hero-pattern pt-32 pb-16 text-center">
          <p className="font-accent text-[#c9a84c] text-3xl">Checkout</p>
          <h1 className="font-display text-5xl md:text-6xl text-white mt-2">Your cart is empty</h1>
          <p className="font-body text-white/60 mt-4 max-w-md mx-auto">
            Add cakes to your cart before proceeding to payment.
          </p>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <Link to="/menu" className="btn-primary">
            Browse Cakes
          </Link>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="bg-[#faf3e7] min-h-screen">
        <div className="hero-pattern pt-32 pb-16 text-center">
          <p className="font-accent text-[#c9a84c] text-3xl">Thank you</p>
          <h1 className="font-display text-5xl md:text-6xl text-white mt-2">Order Confirmed</h1>
          <p className="font-body text-white/60 mt-4 max-w-md mx-auto">
            We are preparing your cake. A confirmation call will follow soon.
          </p>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="bg-white rounded-2xl border border-[#c9a84c]/10 shadow-sm p-8">
            <p className="font-body text-sm text-[#163319]/60">Order ID</p>
            <p className="font-display text-3xl text-[#163319] mt-2">{submitted}</p>
            <p className="font-body text-sm text-[#163319]/60 mt-4">
              Keep this number for any follow-up questions.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu" className="btn-primary">
                Order More Cakes
              </Link>
              <Link to="/orders" className="btn-outline">
                View Orders
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSaving(true)

    try {
      const payload = {
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          unitPrice: typeof item.unitPrice === 'number' ? item.unitPrice : null,
          priceLabel: item.priceLabel,
          options: item.options || null,
        })),
        delivery: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          city: form.city,
          date: form.deliveryDate,
          time: form.deliveryTime,
          note: form.note,
        },
        paymentMethod,
        subtotal,
      }

      const response = await apiRequest('/api/orders', {
        method: 'POST',
        body: payload,
        token,
      })

      setSubmitted(response.orderId)
      clearCart()
    } catch (err) {
      setError(err.message || 'Unable to place order.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-[#faf3e7] min-h-screen">
      <div className="hero-pattern pt-32 pb-16 text-center">
        <p className="font-accent text-[#c9a84c] text-3xl">Secure checkout</p>
        <h1 className="font-display text-5xl md:text-6xl text-white mt-2">Payment</h1>
        <p className="font-body text-white/60 mt-4 max-w-md mx-auto">
          Provide delivery details and choose how you want to pay.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[1.6fr_0.8fr] gap-10"
      >
        <div className="space-y-10">
          <section className="bg-white rounded-2xl border border-[#c9a84c]/10 shadow-sm p-8">
            <h2 className="font-display text-2xl text-[#163319] mb-6">Delivery Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Full Name</label>
                <input
                  className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Phone</label>
                <input
                  className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Email (optional)</label>
                <input
                  className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">City</label>
                <input
                  className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Delivery Address</label>
              <input
                className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Delivery Date</label>
                <input
                  className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
                  name="deliveryDate"
                  type="date"
                  value={form.deliveryDate}
                  min={today}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Delivery Time</label>
                <input
                  className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
                  name="deliveryTime"
                  type="time"
                  value={form.deliveryTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Order Notes</label>
              <textarea
                className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors resize-none"
                name="note"
                rows="3"
                value={form.note}
                onChange={handleChange}
                placeholder="Any special delivery instructions?"
              />
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-[#c9a84c]/10 shadow-sm p-8">
            <h2 className="font-display text-2xl text-[#163319] mb-6">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border border-[#c9a84c]/20 rounded-xl cursor-pointer hover:border-[#265a2a]/40">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="mt-1"
                />
                <div>
                  <p className="font-body text-sm font-bold text-[#163319]">Pay Online</p>
                  <p className="font-body text-xs text-[#163319]/60">Card, FonePay, or mobile banking.</p>
                </div>
              </label>
              <label className="flex items-start gap-3 p-4 border border-[#c9a84c]/20 rounded-xl cursor-pointer hover:border-[#265a2a]/40">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1"
                />
                <div>
                  <p className="font-body text-sm font-bold text-[#163319]">Cash on Delivery</p>
                  <p className="font-body text-xs text-[#163319]/60">Pay once the cake arrives.</p>
                </div>
              </label>
            </div>
            {unpricedCount > 0 && (
              <p className="font-body text-xs text-[#163319]/50 mt-4">
                Custom quote items will be confirmed before payment is finalized.
              </p>
            )}
          </section>
        </div>

        <aside className="bg-white rounded-2xl border border-[#c9a84c]/10 shadow-sm p-6 h-fit">
          <h3 className="font-display text-2xl text-[#163319] mb-4">Order Summary</h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.key} className="flex items-start gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-[#163319]">{item.name}</p>
                  <p className="font-body text-xs text-[#163319]/60">Qty: {item.quantity}</p>
                </div>
                <div className="font-body text-sm text-[#265a2a]">
                  {typeof item.unitPrice === 'number'
                    ? formatNpr(item.unitPrice * item.quantity)
                    : 'Custom quote'}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#c9a84c]/10 my-5" />
          <div className="flex items-center justify-between font-body text-sm text-[#163319]/70">
            <span>Estimated Total</span>
            <span className="font-semibold text-[#163319]">{formatNpr(subtotal)}</span>
          </div>
          {error && (
            <p className="font-body text-xs text-[#be123c] mt-4">{error}</p>
          )}
          <button type="submit" className="btn-primary w-full mt-6" disabled={saving}>
            {saving
              ? 'Processing...'
              : paymentMethod === 'online' && subtotal > 0
                ? `Pay ${formatNpr(subtotal)}`
                : 'Place Order'}
          </button>
          <p className="font-body text-[11px] text-[#163319]/40 mt-3 text-center">
            By placing the order, you agree to our delivery and customization policy.
          </p>
        </aside>
      </form>
    </div>
  )
}
