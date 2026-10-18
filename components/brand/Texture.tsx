/**
 * Donkere gekreukte-papier-textuur. Op mobiel een klein AVIF-bestand (LCP),
 * ontdekt via <picture> — geen CSS-achtergrond.
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
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <picture>
        <source media="(max-width: 768px)" srcSet="/brand/texture-dark-mobile.avif" type="image/avif" />
        <source media="(max-width: 768px)" srcSet="/brand/texture-dark-mobile.webp" type="image/webp" />
        <source srcSet="/brand/texture-dark.avif" type="image/avif" />
        {/* Al op maat gemaakte AVIF/WebP; next/image zou dit LCP-bestand opnieuw verwerken. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/texture-dark.webp"
          alt=""
          width={1640}
          height={624}
          fetchPriority={priority ? 'high' : 'low'}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>
      {withRedPaper && (
        // eslint-disable-next-line @next/next/no-img-element -- decoratief papier, geen LCP
        <img
          src="/brand/paper-red.png"
          alt=""
          width={879}
          height={624}
          loading="lazy"
          decoding="async"
          className="absolute bottom-0 right-0 w-[70%] md:w-[46%] h-auto"
        />
      )}
    </div>
  )
}
