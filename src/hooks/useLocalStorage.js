import { useEffect, useState } from 'react'

// useState that survives page reloads. Storage can be blocked (private mode etc.),
// so every access is wrapped and the app still works without it.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore – state just won't persist
    }
  }, [key, value])

  return [value, setValue]
}
