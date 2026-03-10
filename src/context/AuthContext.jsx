import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../lib/api'

const AuthContext = createContext(null)
const STORAGE_KEY = 'cake-junction-auth-v1'

const getInitialAuth = () => {
  if (typeof window === 'undefined') return { token: null, user: null }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { token: null, user: null }
  } catch {
    return { token: null, user: null }
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getInitialAuth)
  const [loading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
    }
  }, [auth])

  const login = async (email, password) => {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    setAuth({ token: data.token, user: data.user })
    return data.user
  }

  const register = async ({ name, email, password }) => {
    const data = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: { name, email, password },
    })
    setAuth({ token: data.token, user: data.user })
    return data.user
  }

  const logout = () => {
    setAuth({ token: null, user: null })
  }

  const value = useMemo(() => ({
    user: auth.user,
    token: auth.token,
    login,
    register,
    logout,
    loading,
  }), [auth, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
