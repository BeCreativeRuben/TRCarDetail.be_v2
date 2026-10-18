/** Gescheurde-papierrand (geïnspireerd op Tristans banner). Plaats bovenaan/onderaan een sectie. */
const PATH_TOP =
  'M0,40 L0,18 L22,21 L41,14 L63,19 L80,11 L104,16 L121,8 L146,15 L167,10 L189,17 L208,9 L231,13 L252,6 L276,14 L297,10 L318,18 L340,11 L361,15 L385,7 L404,12 L427,9 L449,17 L470,12 L494,19 L515,11 L537,15 L556,8 L580,13 L602,9 L623,16 L645,10 L668,18 L689,12 L712,16 L733,7 L757,13 L778,10 L800,17 L821,11 L843,15 L866,6 L887,12 L909,9 L932,16 L953,11 L975,19 L996,12 L1019,15 L1040,8 L1063,14 L1084,10 L1106,17 L1128,12 L1150,16 L1171,9 L1194,13 L1200,11 L1200,40 Z'

export default function TornEdge({ color = '#FF2E00', position = 'bottom', className = '', shadow = true }: { color?: string; position?: 'top' | 'bottom'; className?: string; shadow?: boolean }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 ${position === 'bottom' ? 'bottom-0' : 'top-0 rotate-180'} h-6 md:h-8 ${className}`}>
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-full block" style={shadow ? { filter: 'drop-shadow(0 -2px 2px rgba(0,0,0,.35))' } : undefined}>
        <path d={PATH_TOP} fill={color} />
      </svg>
    </div>
  )
}
