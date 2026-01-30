import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AutocompleteProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  required?: boolean
}

export default function Autocomplete({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(value.toLowerCase())
  )

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
    setHighlightedIndex(0)
  }, [value, options])

  const handleSelect = (opt: string) => {
    onChange(opt)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') setIsOpen(true)
      return
    }
    if (e.key === 'Escape') {
      setIsOpen(false)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filteredOptions[highlightedIndex]) {
      e.preventDefault()
      handleSelect(filteredOptions[highlightedIndex])
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
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-lg bg-light border-2 border-secondary-dark border-opacity-30 text-primary-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all duration-200"
      />
      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute z-50 w-full mt-1.5 py-1.5 bg-light rounded-xl shadow-lg border-2 border-secondary-dark border-opacity-20 max-h-56 overflow-y-auto overscroll-contain"
          >
            {filteredOptions.map((opt, idx) => (
              <li
                key={opt}
                onClick={() => handleSelect(opt)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={`
                  px-4 py-2.5 cursor-pointer text-sm font-medium transition-colors duration-150
                  ${idx === 0 ? 'rounded-t-lg' : ''}
                  ${idx === filteredOptions.length - 1 ? 'rounded-b-lg' : ''}
                  ${idx === highlightedIndex
                    ? 'bg-accent-red/15 text-accent-red'
                    : 'text-primary-dark hover:bg-primary-dark/5'
                  }
                `}
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
