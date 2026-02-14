import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  datalistId?: string
  datalistOptions?: string[]
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', datalistId, datalistOptions, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-primary-dark mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          list={datalistId}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-light border-2 border-secondary-dark border-opacity-30
            text-primary-dark placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent
            transition-all duration-200
            ${error ? 'border-accent-red' : ''}
            ${className}
          `}
          {...props}
        />
        {datalistId && datalistOptions && datalistOptions.length > 0 && (
          <datalist id={datalistId}>
            {datalistOptions.map((opt) => (
              <option key={opt} value={opt} />
            ))}
          </datalist>
        )}
        {error && (
          <p className="mt-1 text-sm text-accent-red">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
