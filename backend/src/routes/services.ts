import { Router } from 'express'

const router = Router()

const services = [
  {
    id: 'interieur-basic',
    name: 'Interieur Basic',
    description: 'Basis interieurreiniging voor regelmatig onderhoud',
    basePrice: 95,
    largeCarSurcharge: 15,
    category: 'interieur',
    features: [
      'Interieur stofzuigen',
      'Interieur afstoffen',
      'Reinigen ramen en spiegels',
      'Dashboard reiniging',
      'Basis interieur verzorging'
    ]
  },
  {
    id: 'interieur-deepclean',
    name: 'Interieur DeepClean',
    description: 'Grondige dieptereiniging van het interieur',
    basePrice: 175,
    largeCarSurcharge: 25,
    category: 'interieur',
    popular: true,
    features: [
      'Alle basis interieur features',
      'Dieptereiniging van bekleding',
      'Reinigen van alle oppervlakken',
      'Lederverzorging (indien van toepassing)',
      'Geurbehandeling',
      'Professionele interieur detail behandeling'
    ]
  },
  {
    id: 'exterieur-basic',
    name: 'Exterieur Basic',
    description: 'Basis exterieurreiniging met professionele producten',
    basePrice: 95,
    largeCarSurcharge: 15,
    category: 'exterieur',
    features: [
      'Krasvrije wasbeurt (2 emmer methode)',
      'Reinigen deurstijlen en instaplijsten',
      'Reinigen velgen, banden en wielkasten',
      'Drogen met warme lucht en zachte microvezel',
      'Spraywax of sealant',
      'Bandendressing'
    ]
  },
  {
    id: 'exterieur-premium',
    name: 'Exterieur Premium',
    description: 'Dieptereiniging met teer- en vliegroest verwijdering',
    basePrice: 125,
    largeCarSurcharge: 25,
    category: 'exterieur',
    features: [
      'Alle basis exterieur features',
      'Teer en vliegroest verwijderen',
      'Kleibehandeling*',
      'Extra lakbescherming',
      'Professionele exterieur detail behandeling'
    ]
  },
  {
    id: 'full-basic',
    name: 'Full Package Basic',
    description: 'Complete reiniging inclusief basis interieur en exterieur',
    basePrice: 175,
    largeCarSurcharge: 25,
    category: 'full',
    popular: true,
    features: [
      'Alle exterieur basic features',
      'Alle interieur basic features',
      'Complete auto reiniging',
      'Professionele afwerking'
    ]
  },
  {
    id: 'full-premium',
    name: 'Full Package Premium',
    description: 'Complete dieptereiniging interieur en exterieur',
    basePrice: 275,
    largeCarSurcharge: 40,
    category: 'full',
    features: [
      'Alle exterieur premium features',
      'Alle interieur deepclean features',
      'Complete auto dieptereiniging',
      'Maximale verzorging en bescherming',
      'Professionele premium behandeling'
    ]
  }
]

// Get all services
router.get('/', (req, res) => {
  res.json(services)
})

// Get a specific service
router.get('/:id', (req, res) => {
  const service = services.find(s => s.id === req.params.id)
  if (!service) {
    return res.status(404).json({ error: 'Service not found' })
  }
  res.json(service)
})

export default router
