import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/orders', label: 'Orders' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1e4620]/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.jpg"
            alt="Cake Junction Nepal"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#c9a84c]/40 group-hover:ring-[#c9a84c] transition-all duration-300"
          />
          <div className="leading-tight">
            <span className="font-accent text-[#c9a84c] text-xl leading-none block">Cake Junction</span>
            <span className="font-body text-white/70 text-[10px] tracking-[0.2em] uppercase">Nepal</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-link font-body text-sm tracking-widest uppercase font-light transition-colors duration-200 ${
                  isActive ? 'text-[#c9a84c] active' : 'text-white/80 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="font-body text-xs text-white/70">Hi, {user.name.split(' ')[0]}</span>
              <button
                onClick={logout}
                className="btn-outline text-[10px] px-4 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline text-[10px] px-4 py-2">
                Login
              </Link>
              <Link to="/signup" className="btn-primary text-[10px] px-4 py-2">
                Sign Up
              </Link>
            </>
          )}
          <Link
            to="/cart"
            className="relative w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="View cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
              <path d="M6 6h15l-1.5 9h-13z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6l-2-3H2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.6" strokeWidth="1.6" />
              <circle cx="18" cy="20" r="1.6" strokeWidth="1.6" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c9a84c] text-[#163319] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            to="/cart"
            className="relative w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
            aria-label="View cart"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
              <path d="M6 6h15l-1.5 9h-13z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6l-2-3H2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.6" strokeWidth="1.6" />
              <circle cx="18" cy="20" r="1.6" strokeWidth="1.6" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c9a84c] text-[#163319] text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-400 overflow-hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#1e4620]/98 backdrop-blur-lg px-6 py-6 flex flex-col gap-5 border-t border-white/10">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-body text-sm tracking-widest uppercase font-light transition-colors ${
                  isActive ? 'text-[#c9a84c]' : 'text-white/80'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="flex flex-col gap-3">
            {user ? (
              <button
                onClick={() => {
                  logout()
                  setMenuOpen(false)
                }}
                className="btn-outline text-center text-xs"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn-outline text-center text-xs" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-center text-xs" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
            <Link to="/cart" className="btn-primary text-center text-xs" onClick={() => setMenuOpen(false)}>
              View Cart {itemCount > 0 ? `(${itemCount})` : ''}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
