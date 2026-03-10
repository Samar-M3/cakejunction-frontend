const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    let errorMessage = 'Request failed.'
    try {
      const data = await response.json()
      errorMessage = data?.message || errorMessage
    } catch {
      // ignore
    }
    const error = new Error(errorMessage)
    error.status = response.status
    throw error
  }

  if (response.status === 204) return null
  return response.json()
}

export { API_BASE }
