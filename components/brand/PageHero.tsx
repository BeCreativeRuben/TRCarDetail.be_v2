import { ReactNode } from 'react'
import Texture from './Texture'
import TornEdge from './TornEdge'

/** Donkere banner-kop voor binnenpagina's (redesign B/C). */
export default function PageHero({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-primary-dark pt-14 pb-20 md:pt-20 md:pb-24 mb-12">
      <Texture withRedPaper priority />
      <div className="relative container-custom text-center">
        {eyebrow && <p className="text-accent-red font-semibold uppercase tracking-[0.3em] text-xs md:text-sm mb-3">{eyebrow}</p>}
        <h1 className="text-light mb-5">{title}</h1>
        {children}
      </div>
      <TornEdge position="bottom" color="#F2F4F3" />
    </section>
  )
}
