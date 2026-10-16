/** Donkere gekreukte-papier-textuur uit Tristans banner, als achtergrondlaag. */
export default function Texture({ withRedPaper = false, className = '' }: { withRedPaper?: boolean; className?: string }) {
  return (
    <div aria-hidden className={`absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/brand/texture-dark.webp')" }} />
      {withRedPaper && (
        <div
          className="absolute bottom-0 right-0 w-[70%] md:w-[46%] aspect-[879/624] bg-no-repeat bg-right-bottom bg-contain"
          style={{ backgroundImage: "url('/brand/paper-red.png')" }}
        />
      )}
    </div>
  )
}
