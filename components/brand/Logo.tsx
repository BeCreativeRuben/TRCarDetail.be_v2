import Image from 'next/image'

/** Nieuw T&R-logo (Tristan Moonens, 2026). Bedoeld voor donkere achtergronden. */
export default function Logo({ className = 'h-11 w-auto', priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/logo-tr-640.png"
      alt="T&R Car Detailing"
      width={640}
      height={307}
      sizes="240px"
      priority={priority}
      className={className}
    />
  )
}
