import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
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
      await register(form)
      navigate('/orders', { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to sign up.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#faf3e7] min-h-screen">
      <div className="hero-pattern pt-32 pb-20 text-center">
        <p className="font-accent text-[#c9a84c] text-3xl">Create account</p>
        <h1 className="font-display text-5xl md:text-6xl text-white mt-2">Sign Up</h1>
        <p className="font-body text-white/60 mt-4 max-w-md mx-auto">
          Create your account to track orders and checkout faster.
        </p>
      </div>

      <div className="max-w-xl mx-auto px-6 py-16">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-[#c9a84c]/10 shadow-sm p-8 space-y-5"
        >
          <div>
            <label className="font-body text-xs text-[#163319]/60 uppercase tracking-widest font-bold block mb-2">Full Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
            />
          </div>
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
              minLength={6}
              className="w-full border border-[#c9a84c]/20 bg-white rounded-xl px-4 py-3 font-body text-sm text-[#163319] focus:outline-none focus:border-[#265a2a] transition-colors"
            />
          </div>

          {error && (
            <div className="text-sm text-[#be123c] font-body">{error}</div>
          )}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="font-body text-xs text-[#163319]/50 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-[#265a2a] font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
