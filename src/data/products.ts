export interface Product {
  id: string;
  model: string;
  category: 'home' | 'clinic' | 'community' | 'industrial';
  categoryLabel: string;
  capacityLitersDay: number;
  capacityGallonsDay: number;
  storageTankLiters: number | null;
  powerConsumptionW: number;
  energyEfficiency: string;
  operatingHumidityRange: string;
  operatingTempRange: string;
  dimensions: string;
  weight: string;
  noiseLevel: string;
  filtration: string;
  waterTemp: string;
  warranty: string;
  price: string | null;
  image: string;
  idealFor: string[];
  benefits: string[];
  description: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: 'genny-plus',
    model: 'GENNY+',
    category: 'home',
    categoryLabel: 'Residential',
    capacityLitersDay: 20,
    capacityGallonsDay: 5.3,
    storageTankLiters: 7,
    powerConsumptionW: 500,
    energyEfficiency: '0.7 kWh/L',
    operatingHumidityRange: '20–90% RH',
    operatingTempRange: '15–40°C (59–104°F)',
    dimensions: '31.7 × 41.5 × 110 cm',
    weight: '55 kg (121 lbs)',
    noiseLevel: '< 45 dB',
    filtration: 'Multi-stage filtration + UV',
    waterTemp: 'Hot / Cold / Ambient',
    warranty: '2 years standard',
    price: 'Request Quote',
    image: 'https://d64gsuwffb70l.cloudfront.net/699640f21f6107c6a8cec065_1771454877868_af21543e.jpg',
    idealFor: ['Homes (2–6 people)', 'Small offices & studios', 'Clinics & boutique spaces'],
    benefits: [
      'Generates up to 20 L/day from air',
      'Multi-stage filtration + UV purification',
      'Hot, cold, and ambient water on demand',
      'No plumbing required — plug and play',
      'Compact footprint for any room',
      'Low noise: quieter than a refrigerator'
    ],
    description: 'Perfect for homes, home offices and small businesses. Compact, elegant and easy to use. Powered by Watergen GENius™ technology.',
    badge: 'Most Popular'
  },
  {
    id: 'gen-m1',
    model: 'GEN-M1',
    category: 'clinic',
    categoryLabel: 'Mid-Scale',
    capacityLitersDay: 220,
    capacityGallonsDay: 58,
    storageTankLiters: 60,
    powerConsumptionW: 3500,
    energyEfficiency: '0.35 kWh/L',
    operatingHumidityRange: '20–90% RH',
    operatingTempRange: '15–45°C (59–113°F)',
    dimensions: '130 × 85 × 195 cm',
    weight: '350 kg (772 lbs)',
    noiseLevel: '< 55 dB',
    filtration: 'Multi-stage filtration + UV + mineralization',
    waterTemp: 'Ambient',
    warranty: '2 years standard',
    price: 'Request Quote',
    image: 'https://d64gsuwffb70l.cloudfront.net/699640f21f6107c6a8cec065_1771454866327_531c0946.jpg',
    idealFor: ['Schools & clinics', 'Small hotels & resorts', 'Remote & off-grid sites'],
    benefits: [
      'Generates up to 220 L/day from air',
      'Modular and scalable design',
      'Mobile-ready for rapid deployment',
      'Solar-compatible power input',
      'Built for remote and off-grid locations',
      'Low maintenance requirements'
    ],
    description: 'Modular solution for schools, clinics, small hotels and off-grid sites. Scalable and efficient. Ideal for community-scale water independence.',
  },
  {
    id: 'gen-m-pro',
    model: 'GEN-M Pro',
    category: 'community',
    categoryLabel: 'Commercial',
    capacityLitersDay: 900,
    capacityGallonsDay: 238,
    storageTankLiters: 200,
    powerConsumptionW: 9800,
    energyEfficiency: '0.30 kWh/L',
    operatingHumidityRange: '20–90% RH',
    operatingTempRange: '15–45°C (59–113°F)',
    dimensions: '240 × 120 × 210 cm',
    weight: '1,200 kg (2,646 lbs)',
    noiseLevel: '< 60 dB',
    filtration: 'Multi-stage filtration + UV + mineralization',
    waterTemp: 'Ambient',
    warranty: '2 years standard',
    price: 'Request Quote',
    image: 'https://d64gsuwffb70l.cloudfront.net/699640f21f6107c6a8cec065_1771454880369_256d6bcc.jpg',
    idealFor: ['Hotels & resorts', 'Factories & warehouses', 'Hospitals & campuses'],
    benefits: [
      'Generates up to 900 L/day from air',
      'Commercial-grade reliability',
      'Compact footprint for high output',
      'Scalable with multiple units',
      'Advanced multi-stage purification',
      'Designed for continuous operation'
    ],
    description: 'Commercial-grade production for facilities that need reliable, high daily output with a compact footprint. Ideal for tribal community centers and campuses.',
    badge: 'Commercial Grade'
  },
  {
    id: 'gen-l',
    model: 'GEN-L',
    category: 'industrial',
    categoryLabel: 'Industrial',
    capacityLitersDay: 6000,
    capacityGallonsDay: 1585,
    storageTankLiters: 1000,
    powerConsumptionW: 52000,
    energyEfficiency: '0.25 kWh/L',
    operatingHumidityRange: '20–90% RH',
    operatingTempRange: '10–45°C (50–113°F)',
    dimensions: '600 × 240 × 290 cm (container)',
    weight: '6,500 kg (14,330 lbs)',
    noiseLevel: '< 70 dB',
    filtration: 'Multi-stage filtration + UV + mineralization',
    waterTemp: 'Ambient',
    warranty: '2 years standard',
    price: 'Request Quote',
    image: 'https://d64gsuwffb70l.cloudfront.net/699640f21f6107c6a8cec065_1771454866773_1c5671af.jpg',
    idealFor: ['Hospitals & large campuses', 'Villages & communities', 'Mining, military & industry'],
    benefits: [
      'Generates up to 6,000 L/day from air',
      'Container-based for easy transport',
      'Serves entire villages and communities',
      'Industrial-grade durability',
      'Rapid deployment capability',
      'Lowest cost per liter at scale'
    ],
    description: 'Large-scale solution for villages, hospitals, mining sites, military bases and industrial facilities. The ultimate water independence solution for tribal nations.',
    badge: 'High Capacity'
  },
  {
    id: 'gen-m1-solar',
    model: 'GEN-M1 Solar',
    category: 'clinic',
    categoryLabel: 'Mid-Scale Solar',
    capacityLitersDay: 200,
    capacityGallonsDay: 53,
    storageTankLiters: 60,
    powerConsumptionW: 3500,
    energyEfficiency: '0.38 kWh/L',
    operatingHumidityRange: '25–90% RH',
    operatingTempRange: '18–45°C (64–113°F)',
    dimensions: '130 × 85 × 195 cm (unit) + solar array',
    weight: '400 kg (882 lbs) + panels',
    noiseLevel: '< 55 dB',
    filtration: 'Multi-stage filtration + UV + mineralization',
    waterTemp: 'Ambient',
    warranty: '2 years standard',
    price: 'Request Quote',
    image: 'https://d64gsuwffb70l.cloudfront.net/699640f21f6107c6a8cec065_1771454946044_1ebcb344.jpg',
    idealFor: ['Off-grid tribal communities', 'Remote clinics', 'Emergency deployment'],
    benefits: [
      'Solar-powered — zero grid dependency',
      'Generates up to 200 L/day from air',
      'Complete energy independence',
      'Ideal for remote tribal lands',
      'Battery backup for 24/7 operation',
      'Rapid deployment kit available'
    ],
    description: 'Solar-powered variant of the GEN-M1 for complete off-grid water independence. Perfect for remote tribal communities without reliable grid access.',
    badge: 'Solar Ready'
  },
  {
    id: 'gen-l-plus',
    model: 'GEN-L+',
    category: 'industrial',
    categoryLabel: 'Industrial Plus',
    capacityLitersDay: 10000,
    capacityGallonsDay: 2642,
    storageTankLiters: 2000,
    powerConsumptionW: 85000,
    energyEfficiency: '0.23 kWh/L',
    operatingHumidityRange: '20–90% RH',
    operatingTempRange: '10–45°C (50–113°F)',
    dimensions: '2× 600 × 240 × 290 cm (dual container)',
    weight: '12,000 kg (26,455 lbs)',
    noiseLevel: '< 72 dB',
    filtration: 'Multi-stage filtration + UV + mineralization + RO',
    waterTemp: 'Ambient',
    warranty: '3 years standard',
    price: 'Request Quote',
    image: 'https://d64gsuwffb70l.cloudfront.net/699640f21f6107c6a8cec065_1771454949478_19e35f11.jpg',
    idealFor: ['Municipal water supply', 'Large tribal communities (500+ people)', 'Industrial campuses'],
    benefits: [
      'Generates up to 10,000 L/day from air',
      'Municipal-scale water production',
      'Dual-container modular system',
      'Serves 500+ people daily',
      'Reverse osmosis purification included',
      'Remote monitoring and management'
    ],
    description: 'Municipal-scale atmospheric water generation for large tribal communities, government facilities, and industrial operations. The flagship solution for water sovereignty.',
    badge: 'Municipal Scale'
  }
];

export const WHATSAPP_NUMBER = '12146007494';
export const CONTACT_EMAIL = 'contact.us@awanube.com';

export const DATA_SOURCES = [
  {
    name: 'EPA',
    title: 'EPA Drinking Water Access Report',
    url: 'https://www.epa.gov/tribal/drinking-water-infrastructure-tribal-communities'
  },
  {
    name: 'DigDeep',
    title: 'Closing the Water Access Gap in the United States',
    url: 'https://www.digdeep.org/close-the-water-gap'
  },
  {
    name: 'US Water Alliance',
    title: 'An Equitable Water Future',
    url: 'https://uswateralliance.org/resources/an-equitable-water-future/'
  },
  {
    name: 'Navajo Water Project',
    title: 'Navajo Nation Water Access Statistics',
    url: 'https://www.navajowaterproject.org/'
  }
];

export function generateWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function generateEmailLink(subject: string, body: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
