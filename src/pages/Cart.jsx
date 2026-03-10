import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const formatNpr = (value) =>
  new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0,
  }).format(value)

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, unpricedCount } = useCart()
  const { user } = useAuth()

  if (items.length === 0) {
    return (
      <div className="bg-[#faf3e7] min-h-screen">
        <div className="hero-pattern pt-32 pb-16 text-center">
          <p className="font-accent text-[#c9a84c] text-3xl">Your Cart</p>
          <h1 className="font-display text-5xl md:text-6xl text-white mt-2">It is empty</h1>
          <p className="font-body text-white/60 mt-4 max-w-md mx-auto">
            Add cakes from the menu or gallery to start an order.
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

  return (
    <div className="bg-[#faf3e7] min-h-screen">
      <div className="hero-pattern pt-32 pb-16 text-center">
        <p className="font-accent text-[#c9a84c] text-3xl">Ready to order?</p>
        <h1 className="font-display text-5xl md:text-6xl text-white mt-2">Your Cart</h1>
        <p className="font-body text-white/60 mt-4 max-w-md mx-auto">
          Review your cakes, customize quantities, then proceed to payment.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[1.6fr_0.8fr] gap-10">
        <div className="space-y-6">
          {items.map((item) => {
            const lineTotal =
              typeof item.unitPrice === 'number'
                ? formatNpr(item.unitPrice * item.quantity)
                : 'Custom quote'
            const optionEntries = [
              item.options?.size ? `Size: ${item.options.size}` : null,
              item.options?.flavor ? `Flavor: ${item.options.flavor}` : null,
              item.options?.filling ? `Filling: ${item.options.filling}` : null,
              item.options?.frosting ? `Frosting: ${item.options.frosting}` : null,
              item.options?.message ? `Message: ${item.options.message}` : null,
              item.options?.deliveryDate ? `Delivery: ${item.options.deliveryDate}` : null,
            ].filter(Boolean)

            return (
              <div
                key={item.key}
                className="bg-white rounded-2xl border border-[#c9a84c]/10 shadow-sm p-6 flex flex-col md:flex-row gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-40 h-40 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl text-[#163319]">{item.name}</h3>
                      <p className="font-body text-sm text-[#163319]/60 mt-1">{item.priceLabel}</p>
                    </div>
                    <div className="font-display text-lg text-[#265a2a]">{lineTotal}</div>
                  </div>
                  {optionEntries.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {optionEntries.map((entry) => (
                        <span
                          key={entry}
                          className="text-[11px] font-body text-[#163319]/70 bg-[#f5e7ce]/70 px-2 py-1 rounded-full"
                        >
                          {entry}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.options?.notes && (
                    <p className="font-body text-xs text-[#163319]/50 mt-3">Notes: {item.options.notes}</p>
                  )}

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-[#c9a84c]/30 text-[#265a2a] hover:border-[#265a2a]"
                      >
                        -
                      </button>
                      <span className="font-body text-sm font-bold text-[#163319] w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-[#c9a84c]/30 text-[#265a2a] hover:border-[#265a2a]"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="text-xs uppercase tracking-widest font-bold text-[#be123c]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <aside className="bg-white rounded-2xl border border-[#c9a84c]/10 shadow-sm p-6 h-fit">
          <h3 className="font-display text-2xl text-[#163319] mb-4">Order Summary</h3>
          <div className="space-y-3 font-body text-sm text-[#163319]/70">
            <div className="flex items-center justify-between">
              <span>Estimated Subtotal</span>
              <span className="font-semibold text-[#163319]">{formatNpr(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Delivery</span>
              <span className="font-semibold text-[#163319]">Calculated at checkout</span>
            </div>
            {unpricedCount > 0 && (
              <p className="text-xs text-[#163319]/50">
                {unpricedCount} item(s) require a custom quote and are not included in the total yet.
              </p>
            )}
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/checkout" className="btn-primary text-center">
              Proceed to Checkout
            </Link>
            {!user && (
              <Link to="/login" state={{ from: '/checkout' }} className="btn-outline text-center">
                Login to Checkout
              </Link>
            )}
            <button onClick={clearCart} className="btn-outline">
              Clear Cart
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
