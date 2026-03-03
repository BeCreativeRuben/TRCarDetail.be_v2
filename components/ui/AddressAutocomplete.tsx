'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type AddressSuggestion = { display_name: string; lat: number; lon: number }

interface AddressAutocompleteProps {
  label?: string
  value: string
  onChange: (value: string, coords?: { lat: number; lon: number }) => void
  placeholder?: string
  required?: boolean
}

const DEBOUNCE_MS = 350

export default function AddressAutocomplete({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const query = value.trim()
    if (query.length < 3) {
      setSuggestions([])
      setIsOpen(false)
      return
    }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/address-suggestions?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : [])
        setIsOpen(true)
        setHighlightedIndex(0)
      } catch {
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }, DEBOUNCE_MS)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [value])

  const handleSelect = (suggestion: AddressSuggestion) => {
    onChange(suggestion.display_name, { lat: suggestion.lat, lon: suggestion.lon })
    setIsOpen(false)
    setSuggestions([])
    inputRef.current?.blur()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Escape') setIsOpen(false)
      return
    }
    if (e.key === 'Escape') {
      setIsOpen(false)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && suggestions[highlightedIndex]) {
      e.preventDefault()
      handleSelect(suggestions[highlightedIndex])
    }
  }

  return (
    <div ref={containerRef} className="w-full relative">
      {label && (
        <label className="block text-sm font-medium text-primary-dark mb-2">
          {label} {required && '*'}
        </label>
      )}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        className="w-full px-4 py-3 rounded-lg bg-light border-2 border-secondary-dark border-opacity-30 text-primary-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all duration-200"
      />
      {isLoading && value.trim().length >= 3 && (
        <p className="text-xs text-primary-dark opacity-60 mt-1">Adressen zoeken…</p>
      )}
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1.5 py-1.5 bg-light rounded-xl shadow-lg border-2 border-secondary-dark border-opacity-20 max-h-56 overflow-y-auto"
          >
            {suggestions.map((suggestion, idx) => (
              <li
                key={suggestion.display_name}
                onClick={() => handleSelect(suggestion)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={`px-4 py-2.5 cursor-pointer text-sm font-medium transition-colors
                  ${idx === highlightedIndex ? 'bg-accent-red/15 text-accent-red' : 'text-primary-dark hover:bg-primary-dark/5'}`}
              >
                {suggestion.display_name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
