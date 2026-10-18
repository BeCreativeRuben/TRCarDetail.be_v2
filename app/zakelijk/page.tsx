import Link from 'next/link'
import Image from 'next/image'
import { FiMapPin, FiClock, FiUsers, FiFileText, FiCheck, FiTruck } from 'react-icons/fi'
import Button from '@/components/ui/Button'
import { images } from '@/lib/images'
import Texture from '@/components/brand/Texture'
import TornEdge from '@/components/brand/TornEdge'
import ServiceIcons from '@/components/brand/ServiceIcons'

const painPoints = [
  {
    icon: FiClock,
    title: 'Minder stilstand',
    text: 'Wij komen naar uw parking of werflocatie. Uw wagens blijven beschikbaar waar u ze nodig heeft.',
  },
  {
    icon: FiUsers,
    title: 'Eén aanspreekpunt',
    text: 'Vaste contactpersoon, duidelijke planning en facturatie — geen losse afspraken per chauffeur.',
  },
  {
    icon: FiTruck,
    title: 'Batch-planning',
    text: 'Meerdere voertuigen per bezoek. Ideaal voor fleets die regelmatig of periodiek onderhouden moeten worden.',
  },
]

const steps = [
  'U vraagt een offerte aan met vlootomvang en locatie',
  'Wij stemmen scope, frequentie en planning af',
  'We komen op afgesproken dagen langs op uw site',
  'U ontvangt een heldere opvolging en factuur',
]

export default function ZakelijkHomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark text-light">
        <Texture priority />
        <div className="relative z-10 container-custom pt-12 pb-16 lg:pt-20 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <div className="text-center lg:text-left">
            <p className="text-accent-red font-brand font-bold uppercase tracking-[0.25em] text-xs md:text-sm mb-3">
              Zakelijk · Vlaanderen
            </p>
            <h1 className="text-light mb-5">
              Vlootdetailing op <span className="text-accent-red">uw locatie</span>
            </h1>
            <p className="text-lg md:text-xl text-light/85 max-w-xl mx-auto lg:mx-0 mb-8">
              Professionele car detailing voor bedrijfswagens en fleets. Minder stilstand, herhaalbare kwaliteit,
              vanuit Sint-Niklaas door heel Vlaanderen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/zakelijk/offerte" className="inline-flex w-full sm:w-auto">
                <Button variant="primary" size="lg" className="pointer-events-none flex items-center gap-2 w-full sm:w-auto">
                  <FiFileText className="w-5 h-5" aria-hidden />
                  Offerte aanvragen
                </Button>
              </Link>
              <Link href="/zakelijk/aanbod" className="inline-flex w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="pointer-events-none flex items-center gap-2 w-full sm:w-auto text-white border-white/80 hover:border-accent-red"
                >
                  Bekijk ons aanbod
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 -bottom-6 w-[78%] aspect-[879/624] bg-no-repeat bg-contain bg-right-bottom rotate-6"
              style={{ backgroundImage: "url('/brand/paper-red.png')" }}
            />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,.6)] -rotate-2 bg-secondary-dark">
              <Image
                src={images.zakelijkHero}
                alt="Mobiele vlootdetailing op locatie bij een bedrijf in Vlaanderen"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/75 via-primary-dark/10 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white">
                Op uw parking · batch-planning mogelijk
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 bg-accent-red">
          <TornEdge position="top" color="#FF2E00" />
          <div className="container-custom pt-8 pb-12">
            <ServiceIcons className="max-w-3xl mx-auto [&_img]:brightness-0 [&_img]:invert [&_a>span:last-child]:!text-primary-dark [&_a:hover>span:last-child]:!text-primary-dark" />
          </div>
          <TornEdge position="bottom" color="#F2F4F3" />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-light">
        <div className="container-custom">
          <h2 className="font-bold text-primary-dark text-center mb-4">Waarom bedrijven voor ons kiezen</h2>
          <p className="text-center text-primary-dark/80 max-w-2xl mx-auto mb-12">
            B2B vraagt om planning, betrouwbaarheid en schaal — niet om een losse wasbeurt.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {painPoints.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="bg-white border border-primary-dark/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-accent-red text-white flex items-center justify-center mb-4">
                  <Icon size={24} aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">{title}</h3>
                <p className="text-primary-dark/80 text-sm leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary-dark text-light">
        <Texture withRedPaper />
        <TornEdge position="top" color="#FF2E00" />
        <div className="relative container-custom py-20 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-accent-red mb-4 justify-center">
              <FiMapPin aria-hidden />
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em]">Werkgebied</span>
            </div>
            <h2 className="font-bold text-center text-light mb-4">Vlaanderen, op uw parking</h2>
            <p className="text-center text-light/85 mb-6">
              Wij komen naar u toe — of dat nu een kantoorparking, depot of werflocatie is. Ideaal voor leasevloten,
              saleswagens, bestelwagens en gemengde fleets.
            </p>
            <p className="text-center text-light/80 text-sm mb-10 max-w-2xl mx-auto">
              Op locatie werken we met water en elektriciteit ter beschikking van de klant. Zo kunnen we efficiënt
              detailen zonder aparte watervoorziening mee te slepen.
            </p>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={step} className="flex items-start gap-4 bg-white/5 rounded-xl p-4 border border-white/10">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-red text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-light/90">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="max-w-3xl mx-auto mt-16 md:mt-20 pt-12 border-t border-white/10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Klaar om te starten?</h2>
            <p className="text-light/85 text-lg max-w-xl mx-auto mb-8">
              Geen vaste prijslijst online: elke vloot is anders. Vraag een offerte met uw vlootomvang en locatie —
              wij nemen snel contact op.
            </p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-light/85 mb-10">
              {['Geen binding', 'Antwoord binnen 1–2 werkdagen', 'Planning op maat'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <FiCheck className="text-accent-red" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/zakelijk/offerte" className="inline-flex">
              <Button
                variant="primary"
                size="lg"
                className="inline-flex items-center gap-2 hover:bg-white hover:text-primary-dark hover:shadow-lg"
              >
                <FiFileText className="w-5 h-5" aria-hidden />
                Offerte aanvragen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
