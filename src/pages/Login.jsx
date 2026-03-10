import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/orders'

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(form.email, form.password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#faf3e7] min-h-screen">
      <div className="hero-pattern pt-32 pb-20 text-center">
        <p className="font-accent text-[#c9a84c] text-3xl">Welcome back</p>
        <h1 className="font-display text-5xl md:text-6xl text-white mt-2">Login</h1>
        <p className="font-body text-white/60 mt-4 max-w-md mx-auto">
          Sign in to view your orders and complete checkout.
        </p>
      </div>

      <div className="max-w-xl mx-auto px-6 py-16">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-[#c9a84c]/10 shadow-sm p-8 space-y-5"
        >
          <div>
            <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
            />
          </div>

          {error && (
            <div className="text-sm text-[#be123c] font-body">{error}</div>
          )}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>

          <p className="font-body text-xs text-[#163319]/50 text-center">
            No account yet?{' '}
            <Link to="/signup" className="text-[#265a2a] font-semibold">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
