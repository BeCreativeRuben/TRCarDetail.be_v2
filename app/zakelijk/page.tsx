import Link from 'next/link'
import Image from 'next/image'
import { FiMapPin, FiClock, FiUsers, FiFileText, FiCheck, FiTruck } from 'react-icons/fi'
import Button from '@/components/ui/Button'
import { images } from '@/lib/images'

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
      <section className="relative bg-primary-dark text-light overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-secondary-dark to-primary-dark" />
        <div className="container-custom relative py-16 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-accent-red text-sm font-semibold uppercase tracking-wider mb-4">Zakelijk · Vlaanderen</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-xl leading-tight">
                Vlootdetailing op <span className="text-accent-red">uw locatie</span>
              </h1>
              <p className="text-lg md:text-xl text-light/85 max-w-xl mb-10">
                Professionele car detailing voor bedrijfswagens en fleets. Minder stilstand, herhaalbare kwaliteit,
                vanuit Sint-Niklaas door heel Vlaanderen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/zakelijk/offerte">
                  <Button variant="primary" size="lg" className="flex items-center gap-2">
                    <FiFileText className="w-5 h-5" />
                    Offerte aanvragen
                  </Button>
                </Link>
                <Link href="/zakelijk/aanbod">
                  <Button variant="outline" size="lg">
                    Bekijk ons aanbod
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={images.zakelijkHero}
                  alt="Mobiele vlootdetailing op locatie bij een bedrijf in Vlaanderen"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto bg-accent-red text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg text-center sm:text-left">
                Op uw parking · batch-planning mogelijk
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-light">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark text-center mb-4">
            Waarom bedrijven voor ons kiezen
          </h2>
          <p className="text-center text-primary-dark/70 max-w-2xl mx-auto mb-12">
            B2B vraagt om planning, betrouwbaarheid en schaal — niet om een losse wasbeurt.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white border border-primary-dark/10 rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-accent-red/10 text-accent-red flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">{title}</h3>
                <p className="text-primary-dark/75 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary-dark text-light">
        <div className="container-custom max-w-3xl">
          <div className="flex items-center gap-2 text-accent-red mb-4 justify-center">
            <FiMapPin />
            <span className="text-sm font-semibold uppercase tracking-wider">Werkgebied</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Vlaanderen, op uw parking</h2>
          <p className="text-center text-light/80 mb-10">
            Wij komen naar u toe — of dat nu een kantoorparking, depot of werflocatie is. Ideaal voor leasevloten,
            saleswagens, bestelwagens en gemengde fleets.
          </p>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={step} className="flex items-start gap-4 bg-white/5 rounded-lg p-4 border border-white/10">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-red text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <span className="pt-1 text-light/90">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-light">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Klaar om te starten?</h2>
          <p className="text-primary-dark/75 max-w-xl mx-auto mb-8">
            Geen vaste prijslijst online: elke vloot is anders. Vraag een offerte met uw vlootomvang en locatie —
            wij nemen snel contact op.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-primary-dark/70 mb-10">
            {['Geen binding', 'Antwoord binnen 1–2 werkdagen', 'Planning op maat'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <FiCheck className="text-accent-red" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/zakelijk/offerte">
            <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
              <FiFileText className="w-5 h-5" />
              Offerte aanvragen
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
