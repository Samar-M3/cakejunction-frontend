import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )

    const el = ref.current
    if (el) {
      // Observe all .reveal children
      const revealEls = el.querySelectorAll('.reveal')
      revealEls.forEach((r) => observer.observe(r))
      // Also observe el itself if it has reveal class
      if (el.classList.contains('reveal')) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return ref
}
