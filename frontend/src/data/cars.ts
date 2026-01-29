/**
 * Car brands and models commonly sold in Belgium/Flanders.
 * Used for autocomplete in the booking form.
 */

const carModelsByBrand: Record<string, string[]> = {
  'Alfa Romeo': ['Giulia', 'Stelvio', 'Tonale', 'MiTo', 'Giulietta'],
  'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q7', 'Q8', 'e-tron', 'TT', 'RS3', 'RS4', 'RS5', 'RS6'],
  'BMW': ['1-serie', '2-serie', '3-serie', '4-serie', '5-serie', '6-serie', '7-serie', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'i3', 'i4', 'iX1', 'iX3', 'iX'],
  'Citroën': ['C3', 'C4', 'C5 X', 'C5 Aircross', 'Berlingo', 'ë-C4', 'Ami'],
  'Cupra': ['Leon', 'Formentor', 'Born', 'Ateca', 'Tavascan'],
  'Dacia': ['Sandero', 'Duster', 'Jogger', 'Spring', 'Logan'],
  'DS': ['DS 3', 'DS 4', 'DS 7', 'DS 9'],
  'Fiat': ['500', '500e', '500X', '500L', 'Panda', 'Tipo', 'Ducato'],
  'Ford': ['Fiesta', 'Focus', 'Mondeo', 'Puma', 'Kuga', 'Explorer', 'Mustang', 'Mustang Mach-E', 'Transit', 'Tourneo'],
  'Honda': ['Jazz', 'Civic', 'HR-V', 'CR-V', 'e:Ny1', 'ZR-V'],
  'Hyundai': ['i10', 'i20', 'i30', 'Kona', 'Tucson', 'Santa Fe', 'IONIQ 5', 'IONIQ 6', 'Bayon'],
  'Jaguar': ['E-PACE', 'F-PACE', 'I-PACE', 'XF', 'F-TYPE'],
  'Jeep': ['Renegade', 'Compass', 'Wrangler', 'Grand Cherokee', 'Avenger'],
  'Kia': ['Picanto', 'Rio', 'Ceed', 'Niro', 'Sportage', 'Sorento', 'EV6', 'EV9', 'Stonic', 'XCeed'],
  'Land Rover': ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque'],
  'Lexus': ['UX', 'NX', 'RX', 'RZ', 'ES', 'IS', 'LC'],
  'Mazda': ['2', '3', '6', 'CX-3', 'CX-30', 'CX-5', 'CX-60', 'MX-5'],
  'Mercedes-Benz': ['A-klasse', 'B-klasse', 'C-klasse', 'E-klasse', 'S-klasse', 'CLA', 'CLS', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS', 'V-klasse', 'E-klasse T'],
  'MG': ['3', '4', '5', 'ZS', 'HS', '4 Electric'],
  'Mini': ['3-deurs', '5-deurs', 'Clubman', 'Cabrio', 'Countryman', 'Electric'],
  'Mitsubishi': ['Space Star', 'ASX', 'Eclipse Cross', 'Outlander'],
  'Nissan': ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Ariya', 'Leaf', 'Navara'],
  'Opel': ['Corsa', 'Astra', 'Insignia', 'Mokka', 'Crossland', 'Grandland', 'Combo', 'Vivaro', 'Zafira'],
  'Peugeot': ['108', '208', '308', '408', '508', '2008', '3008', '5008', 'Rifter', 'Partner', 'Expert', 'e-208', 'e-2008'],
  'Porsche': ['718', '911', 'Taycan', 'Macan', 'Cayenne', 'Panamera'],
  'Renault': ['Clio', 'Megane', 'Talisman', 'Captur', 'Austral', 'Arkana', 'Scenic', 'Zoe', 'Megane E-Tech', 'Twingo', 'Kangoo', 'Master'],
  'Seat': ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco'],
  'Skoda': ['Fabia', 'Scala', 'Octavia', 'Superb', 'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq', 'Enyaq Coupé'],
  'Smart': ['Fortwo', 'Forfour', '#1', '#3'],
  'Subaru': ['Impreza', 'Outback', 'Forester', 'XV', 'Solterra'],
  'Suzuki': ['Ignis', 'Swift', 'Vitara', 'S-Cross', 'Across'],
  'Tesla': ['Model 3', 'Model Y', 'Model S', 'Model X'],
  'Toyota': ['Yaris', 'Yaris Cross', 'Corolla', 'C-HR', 'RAV4', 'bZ4X', 'Camry', 'Land Cruiser', 'Aygo X', 'Proace', 'Hilux'],
  'Volkswagen': ['Polo', 'Golf', 'Passat', 'Arteon', 'T-Roc', 'T-Cross', 'Tiguan', 'Touareg', 'ID.3', 'ID.4', 'ID.5', 'ID.Buzz', 'Caddy', 'Transporter', 'Multivan'],
  'Volvo': ['C40', 'XC40', 'XC60', 'XC90', 'EX30', 'EX90', 'S60', 'V60', 'V90']
}

export const carBrands = Object.keys(carModelsByBrand).sort()
export { carModelsByBrand }

export function getModelsForBrand(brand: string): string[] {
  const normalized = Object.keys(carModelsByBrand).find(
    b => b.toLowerCase() === brand.trim().toLowerCase()
  )
  return normalized ? carModelsByBrand[normalized] : []
}
