import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  // Estado inicial: do localStorage ou do valor padrão
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  // Sempre que storedValue mudar, atualiza o localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
