import Image from 'next/image'

/**
 * Donkere gekreukte-papier-textuur uit Tristans banner, als achtergrondlaag.
 * Via next/image (responsieve srcset + preload met `priority` in de hero) i.p.v. een CSS-achtergrond,
 * zodat de textuur – vaak het LCP-element – vroeg en kleiner geladen wordt.
 */
export default function Texture({
  withRedPaper = false,
  priority = false,
  className = '',
}: {
  withRedPaper?: boolean
  priority?: boolean
  className?: string
}) {
  return (
    <div aria-hidden className={`absolute inset-0 ${className}`}>
      <Image
        src="/brand/texture-dark.webp"
        alt=""
        fill
        sizes="100vw"
        quality={70}
        priority={priority}
        className="object-cover object-center"
      />
      {withRedPaper && (
        <div
          className="absolute bottom-0 right-0 w-[70%] md:w-[46%] aspect-[879/624] bg-no-repeat bg-right-bottom bg-contain"
          style={{ backgroundImage: "url('/brand/paper-red.png')" }}
        />
      )}
    </div>
  )
}
