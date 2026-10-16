import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'
import { GOOGLE_MAPS_REVIEW_URL } from '@/lib/socials'
import { images } from '@/lib/images'
import Texture from './Texture'

/** "Laat een review achter" – gebaseerd op Tristans Instagram-post. */
export default function ReviewCTA() {
  return (
    <section id="review" className="relative py-20 bg-primary-dark overflow-hidden">
      <Texture />
      <div className="relative container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative mx-auto w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <Image src={images.homeAbout} alt="Afgewerkte wagen door T&R Car Detail" fill sizes="(max-width:1024px) 100vw, 448px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/85 to-primary-dark/10" />
          <div className="absolute inset-0 p-7 flex flex-col justify-between">
            <Image src="/brand/logo-tr-640.png" alt="" width={120} height={58} className="w-24 h-auto" />
            <div>
              <p className="font-brand text-3xl sm:text-4xl font-extrabold leading-none text-white uppercase">Laat een<br /><span className="text-accent-red">review</span> achter</p>
              <p className="mt-3 text-xs text-light/80 max-w-[14rem]">Jouw mening helpt ons groeien en zorgt ervoor dat nog meer mensen kunnen genieten van een perfecte detailingservice.</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-red px-4 py-1.5 text-xs font-semibold uppercase text-white">Schrijf een review <FiArrowUpRight /></span>
          </div>
        </div>
        <div className="text-center lg:text-left">
          <p className="text-accent-red font-semibold uppercase tracking-[0.3em] text-xs mb-3">Tevreden met het resultaat?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-light mb-5">Laat het ons weten</h2>
          <p className="text-light/80 text-lg max-w-xl mx-auto lg:mx-0 mb-8">
            Bij T&R Car Detail streven we naar perfectie, tot in de kleinste details. Heb je genoten van onze service? Laat dan een review achter op Google.
          </p>
          <a href={GOOGLE_MAPS_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent-red px-7 py-3 font-semibold text-white hover:bg-accent-dark-red transition-colors">
            Schrijf een Google-review <FiArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
