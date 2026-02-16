/**
 * Car brands sold in Belgium (source: AutoGids.be, 2025).
 * Used for autocomplete in the booking form.
 */

const carModelsByBrand: Record<string, string[]> = {
  'Abarth': ['500', '500e', '595', '695', '124 Spider'],
  'Alfa Romeo': ['Giulia', 'Stelvio', 'Tonale', 'MiTo', 'Giulietta'],
  'Alpine': ['A110', 'A290', 'A310', 'A424'],
  'Aston Martin': ['DB11', 'DBX', 'DBS', 'Vantage', 'Valkyrie'],
  'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q7', 'Q8', 'e-tron', 'TT', 'RS3', 'RS4', 'RS5', 'RS6'],
  'Bentley': ['Continental GT', 'Bentayga', 'Flying Spur', 'Mulsanne'],
  'BMW': ['1-serie', '2-serie', '3-serie', '4-serie', '5-serie', '6-serie', '7-serie', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'i3', 'i4', 'iX1', 'iX3', 'iX'],
  'BMW Alpina': ['B3', 'B4', 'B5', 'B7', 'XB7', 'XD3'],
  'BYD': ['Dolphin', 'ATTO 3', 'SEAL', 'SEAL U', 'HAN', 'Tang', 'Song'],
  'Caterham': ['Seven', 'Seven 170', 'Seven 420'],
  'Citroën': ['C3', 'C4', 'C5 X', 'C5 Aircross', 'Berlingo', 'ë-C4', 'Ami'],
  'Cupra': ['Leon', 'Formentor', 'Born', 'Ateca', 'Tavascan'],
  'Dacia': ['Sandero', 'Duster', 'Jogger', 'Spring', 'Logan'],
  'DFSK': ['Seres 3', 'Fengon 5', 'Fengon 500'],
  'DS': ['DS 3', 'DS 4', 'DS 7', 'DS 9'],
  'Ferrari': ['296 GTB', '812 Superfast', 'SF90 Stradale', 'Purosangue', 'Roma', 'Portofino', 'F8 Tributo', 'SF90 Spider'],
  'Fiat': ['500', '500e', '500X', '500L', 'Panda', 'Tipo', 'Ducato', 'Grande Panda'],
  'Ford': ['Fiesta', 'Focus', 'Mondeo', 'Puma', 'Kuga', 'Explorer', 'Mustang', 'Mustang Mach-E', 'Transit', 'Tourneo'],
  'Honda': ['Jazz', 'Civic', 'HR-V', 'CR-V', 'e:Ny1', 'ZR-V'],
  'Hongqi': ['E-HS9', 'H9'],
  'Hyundai': ['i10', 'i20', 'i30', 'Kona', 'Tucson', 'Santa Fe', 'IONIQ 5', 'IONIQ 6', 'Bayon'],
  'Ineos': ['Grenadier', 'Fusilier'],
  'JAECOO': ['7', 'J7'],
  'Jaguar': ['E-PACE', 'F-PACE', 'I-PACE', 'XF', 'F-TYPE'],
  'Jeep': ['Renegade', 'Compass', 'Wrangler', 'Grand Cherokee', 'Avenger'],
  'KGM': ['Korando', 'Rexton', 'Musso', 'Tivoli'],
  'Kia': ['Picanto', 'Rio', 'Ceed', 'Niro', 'Sportage', 'Sorento', 'EV6', 'EV9', 'Stonic', 'XCeed', 'EV4'],
  'Lamborghini': ['Huracán', 'Urus', 'Revuelto', 'Aventador', 'Gallardo'],
  'Lancia': ['Ypsilon', 'Delta'],
  'Land Rover': ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque'],
  'Leapmotor': ['C10', 'T03', 'C11'],
  'Lexus': ['UX', 'NX', 'RX', 'RZ', 'ES', 'IS', 'LC'],
  'Lotus': ['Emira', 'Eletre', 'Evija', 'Elise', 'Exige'],
  'Lynk & Co': ['01', '02', '03', '05', '06'],
  'Maserati': ['Ghibli', 'Quattroporte', 'Levante', 'MC20', 'GranTurismo'],
  'Mazda': ['2', '3', '6', 'CX-3', 'CX-30', 'CX-5', 'CX-60', 'MX-5'],
  'McLaren': ['720S', '765LT', 'Artura', 'GT', '570S', 'P1'],
  'Mercedes-Benz': ['A-klasse', 'B-klasse', 'C-klasse', 'E-klasse', 'S-klasse', 'CLA', 'CLS', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS', 'V-klasse', 'E-klasse T'],
  'MG': ['3', '4', '5', 'ZS', 'HS', '4 Electric', 'Marvel R'],
  'Mini': ['3-deurs', '5-deurs', 'Clubman', 'Cabrio', 'Countryman', 'Electric'],
  'Mitsubishi': ['Space Star', 'ASX', 'Eclipse Cross', 'Outlander'],
  'Nio': ['ET5', 'ET7', 'EL6', 'EL7', 'ES8'],
  'Nissan': ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Ariya', 'Leaf', 'Navara'],
  'OMODA': ['C5', 'E5'],
  'Opel': ['Corsa', 'Astra', 'Insignia', 'Mokka', 'Crossland', 'Grandland', 'Combo', 'Vivaro', 'Zafira'],
  'Peugeot': ['108', '208', '308', '408', '508', '2008', '3008', '5008', 'Rifter', 'Partner', 'Expert', 'e-208', 'e-2008'],
  'Polestar': ['Polestar 2', 'Polestar 3', 'Polestar 4'],
  'Porsche': ['718', '911', 'Taycan', 'Macan', 'Cayenne', 'Panamera'],
  'Range Rover': ['Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque'],
  'Renault': ['Clio', 'Megane', 'Talisman', 'Captur', 'Austral', 'Arkana', 'Scenic', 'Zoe', 'Megane E-Tech', 'Twingo', 'Kangoo', 'Master', '4'],
  'Rolls-Royce': ['Ghost', 'Phantom', 'Cullinan', 'Spectre', 'Wraith', 'Dawn'],
  'Seat': ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco'],
  'Seres': ['3', '5'],
  'Skoda': ['Fabia', 'Scala', 'Octavia', 'Superb', 'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq', 'Enyaq Coupé'],
  'Smart': ['Fortwo', 'Forfour', '#1', '#3', '#5'],
  'Subaru': ['Impreza', 'Outback', 'Forester', 'XV', 'Solterra'],
  'Suzuki': ['Ignis', 'Swift', 'Vitara', 'S-Cross', 'Across'],
  'Tesla': ['Model 3', 'Model Y', 'Model S', 'Model X'],
  'Toyota': ['Yaris', 'Yaris Cross', 'Corolla', 'C-HR', 'RAV4', 'bZ4X', 'Camry', 'Land Cruiser', 'Aygo X', 'Proace', 'Hilux'],
  'Volkswagen': ['Polo', 'Golf', 'Passat', 'Arteon', 'T-Roc', 'T-Cross', 'Tiguan', 'Touareg', 'ID.3', 'ID.4', 'ID.5', 'ID.Buzz', 'Caddy', 'Transporter', 'Multivan'],
  'Volvo': ['C40', 'XC40', 'XC60', 'XC90', 'EX30', 'EX90', 'S60', 'V60', 'V90'],
  'Voyah': ['Free', 'Dreamer', 'Passion'],
  'XPENG': ['G9', 'P7', 'G6', 'X9'],
  'Zeekr': ['001', '009', 'X']
}

export const carBrands = Object.keys(carModelsByBrand).sort()
export { carModelsByBrand }

/** Merk|model-combinaties die als "groot" voertuig gelden (toeslag). Gebaseerd op SUV, busjes, grote sedans. */
const LARGE_CAR_KEYS = new Set<string>([
  'Audi|Q7', 'Audi|Q8', 'Audi|A8', 'Audi|e-tron',
  'BMW|X5', 'BMW|X6', 'BMW|X7', 'BMW|6-serie', 'BMW|7-serie',
  'Ford|Explorer', 'Ford|Transit', 'Ford|Tourneo',
  'Mercedes-Benz|GLE', 'Mercedes-Benz|GLS', 'Mercedes-Benz|S-klasse', 'Mercedes-Benz|V-klasse',
  'Volkswagen|Touareg', 'Volkswagen|Transporter', 'Volkswagen|Multivan', 'Volkswagen|ID.Buzz',
  'Jeep|Grand Cherokee', 'Jeep|Wrangler',
  'Porsche|Cayenne', 'Porsche|Panamera',
  'Volvo|XC90', 'Volvo|V90',
  'Renault|Master', 'Renault|Kangoo',
  'Fiat|Ducato',
  'Peugeot|Expert', 'Peugeot|5008', 'Peugeot|Rifter', 'Peugeot|Partner',
  'Opel|Vivaro', 'Opel|Zafira', 'Opel|Combo',
  'Citroën|Berlingo',
  'Land Rover|Defender', 'Land Rover|Discovery', 'Land Rover|Discovery Sport', 'Land Rover|Range Rover', 'Land Rover|Range Rover Sport', 'Land Rover|Range Rover Velar',
  'Range Rover|Range Rover', 'Range Rover|Range Rover Sport', 'Range Rover|Range Rover Velar', 'Range Rover|Range Rover Evoque',
  'Jaguar|F-PACE', 'Jaguar|I-PACE',
  'Lexus|RX', 'Lexus|RZ',
  'Kia|Sorento', 'Kia|EV9',
  'Hyundai|Santa Fe',
  'Nissan|X-Trail', 'Nissan|Navara',
  'Mazda|CX-60',
  'Toyota|Land Cruiser', 'Toyota|Hilux', 'Toyota|Proace',
  'Skoda|Kodiaq', 'Skoda|Enyaq', 'Skoda|Enyaq Coupé',
  'Seat|Tarraco',
  'Cupra|Tavascan',
  'Tesla|Model X',
  'BYD|Tang', 'BYD|Song',
  'Nio|ES8', 'Nio|EL7',
  'Bentley|Bentayga', 'Bentley|Flying Spur', 'Bentley|Mulsanne',
  'Lamborghini|Urus',
  'Rolls-Royce|Cullinan', 'Rolls-Royce|Ghost', 'Rolls-Royce|Phantom', 'Rolls-Royce|Spectre',
  'Maserati|Levante', 'Maserati|Quattroporte',
  'Aston Martin|DBX',
  'Ferrari|Purosangue',
  'Ineos|Grenadier', 'Ineos|Fusilier',
  'KGM|Rexton', 'KGM|Musso',
  'Subaru|Outback',
  'Suzuki|Across',
  'Mitsubishi|Outlander',
  'BMW Alpina|XB7',
].map(s => s.toLowerCase()))

export function getModelsForBrand(brand: string): string[] {
  const normalized = Object.keys(carModelsByBrand).find(
    b => b.toLowerCase() === brand.trim().toLowerCase()
  )
  return normalized ? carModelsByBrand[normalized] : []
}

/** Bepaalt of het voertuig als "groot" telt (toeslag). Onbekend merk/model = standaard. */
export function isLargeCar(make: string, model: string): boolean {
  const m = make.trim().toLowerCase()
  const mod = model.trim().toLowerCase()
  if (!m || !mod) return false
  const key = `${m}|${mod}`
  if (LARGE_CAR_KEYS.has(key)) return true
  // Ook check op genormaliseerde merknaam uit onze lijst (bv. gebruiker typt "VW" i.p.v. "Volkswagen")
  const brandKey = Object.keys(carModelsByBrand).find(b => b.toLowerCase() === m)
  if (brandKey) {
    const keyAlt = `${brandKey.toLowerCase()}|${mod}`
    return LARGE_CAR_KEYS.has(keyAlt)
  }
  return false
}
