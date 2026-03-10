import { useEffect, useState } from 'react'
import { apiRequest } from '../lib/api'
import { useAuth } from '../context/AuthContext'

const formatNpr = (value) =>
  new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0,
  }).format(value)

export default function Orders() {
  const { token, user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    const loadOrders = async () => {
      try {
        const data = await apiRequest('/api/orders', { token })
        if (active) {
          setOrders(data.orders || [])
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load orders.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadOrders()
    return () => {
      active = false
    }
  }, [token])

  return (
    <div className="bg-[#faf3e7] min-h-screen">
      <div className="hero-pattern pt-32 pb-16 text-center">
        <p className="font-accent text-[#c9a84c] text-3xl">Hello {user?.name || 'there'}</p>
        <h1 className="font-display text-5xl md:text-6xl text-white mt-2">Your Orders</h1>
        <p className="font-body text-white/60 mt-4 max-w-md mx-auto">
          Track delivery details and review your past cakes.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {loading && (
          <p className="font-body text-sm text-[#163319]/60">Loading orders...</p>
        )}
        {error && (
          <p className="font-body text-sm text-[#be123c]">{error}</p>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#c9a84c]/10 p-8 text-center">
            <p className="font-display text-2xl text-[#163319]">No orders yet</p>
            <p className="font-body text-sm text-[#163319]/60 mt-2">
              Once you place an order, it will appear here.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-[#c9a84c]/10 shadow-sm p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-body text-xs text-[#163319]/50 uppercase tracking-widest">Order #{order.id}</p>
                  <p className="font-display text-xl text-[#163319]">{order.status}</p>
                  <p className="font-body text-xs text-[#163319]/50 mt-1">
                    Placed on {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-body text-xs text-[#163319]/50 uppercase tracking-widest">Estimated total</p>
                  <p className="font-display text-xl text-[#265a2a]">
                    {formatNpr(Number(order.subtotal || 0))}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <div className="bg-[#f5e7ce]/50 rounded-2xl p-4">
                  <p className="font-body text-xs uppercase tracking-widest text-[#163319]/60 font-bold">Delivery</p>
                  <p className="font-body text-sm text-[#163319] mt-2">{order.delivery_name}</p>
                  <p className="font-body text-xs text-[#163319]/60">{order.delivery_phone}</p>
                  <p className="font-body text-xs text-[#163319]/60">{order.delivery_address}</p>
                  <p className="font-body text-xs text-[#163319]/60">{order.delivery_city}</p>
                  <p className="font-body text-xs text-[#163319]/60 mt-2">
                    {order.delivery_date} {order.delivery_time ? ` · ${order.delivery_time}` : ''}
                  </p>
                </div>
                <div className="bg-[#f5e7ce]/50 rounded-2xl p-4">
                  <p className="font-body text-xs uppercase tracking-widest text-[#163319]/60 font-bold">Items</p>
                  <ul className="mt-2 space-y-2">
                    {order.items.map((item) => (
                      <li key={item.id} className="text-sm text-[#163319]">
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
