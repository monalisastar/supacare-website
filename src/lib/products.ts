// src/lib/products.ts

export type Category = 'All' | 'Hardware' | 'Compost' | 'Support';

export interface Product {
  id: string;
  name: string;
  images: string[];       // multiple images
  alt: string;
  category: Category;
  price: number;
  description: string;    // detailed description
  specs?: Record<string, string>; // optional technical specs
}

export const allProducts: Product[] = [
  {
    id: '1',
    name: 'Compost Delivery per Truck',
    images: [
      '/images/shop/compostdelivery.png',
      '/images/shop/compostdelivery_truck2.png',
    ],
    alt: 'Supacare compost delivery truck unloading compost',
    category: 'Compost',
    price: 50,
    description:
      'Efficient compost delivery service per truckload. Ideal for farms, schools, and urban gardens seeking nutrient-rich soil amendments.',
    specs: {
      Capacity: '7 tons per truck',
      Delivery: 'Within 48 hours of order',
      Quality: 'Premium enriched compost',
    },
  },
  {
    id: '2',
    name: 'Compost Curing Chamber',
    images: [
      '/images/shop/curingchamber.png',
      '/images/shop/curingchamber_inside.png',
      '/images/shop/curingchamber_side.png',
    ],
    alt: 'Supacare compost curing chamber wooden shed',
    category: 'Hardware',
    price: 300,
    description:
      'A durable wooden chamber designed for compost curing and stabilization before packaging or field application.',
    specs: {
      Material: 'Treated wood & mesh panels',
      Capacity: '2 tons',
      Dimensions: '3m x 2m x 2m',
      Lifespan: '5+ years',
    },
  },
  {
    id: '3',
    name: 'Enriched Compost Blend',
    images: [
      '/images/shop/enriched blend.png',
      '/images/shop/enriched_blend_closeup.png',
    ],
    alt: 'Supacare enriched compost blend urban mix 25kg',
    category: 'Compost',
    price: 25,
    description:
      'A nutrient-balanced compost blend formulated for urban farms and gardens to boost plant health and yield.',
    specs: {
      BagSize: '25kg & 50kg',
      Nutrients: 'NPK 3:2:2',
      OrganicContent: '95%',
    },
  },
  {
    id: '4',
    name: 'Rotary Drum Composter',
    images: [
      '/images/shop/rotarydrum.jpg',
      '/images/shop/rotarydrum_side.png',
      '/images/shop/rotarydrum_open.png',
    ],
    alt: 'Supacare rotary drum composting machine',
    category: 'Hardware',
    price: 1200,
    description:
      'Industrial-grade rotary drum composter for efficient aerobic decomposition of organic waste with minimal odor.',
    specs: {
      Capacity: '500kg per batch',
      RotationSpeed: '10 RPM',
      Material: 'Galvanized steel',
      Power: '1.5 kW motor',
    },
  },
  {
    id: '5',
    name: 'Solar Dryer',
    images: [
      '/images/shop/Solar Dryer.png',
      '/images/shop/Solar Dryer_inside.png',
    ],
    alt: 'Supacare solar dryer with mesh panels',
    category: 'Hardware',
    price: 400,
    description:
      'Eco-friendly solar dryer suitable for compost drying and organic waste reduction through passive solar heating.',
    specs: {
      Frame: 'Aluminum',
      Capacity: 'Up to 250kg',
      PowerSource: 'Solar passive',
    },
  },
  {
    id: '6',
    name: 'Site Assessment',
    images: ['/images/shop/siteassement.png'],
    alt: 'Supacare staff performing compost site assessment',
    category: 'Support',
    price: 80,
    description:
      'Professional compost site assessment to evaluate land suitability, drainage, and compliance with local standards.',
    specs: {
      Duration: '1-day onsite visit',
      Deliverable: 'Comprehensive site report',
    },
  },
  {
    id: '7',
    name: 'Compost (25kg & 50kg)',
    images: [
      '/images/shop/bagged compost.png',
      '/images/shop/bagged_compost2.png',
    ],
    alt: 'Supacare branded compost bags 25kg and 50kg',
    category: 'Compost',
    price: 20,
    description:
      'Premium organic compost packaged for easy transport and application. Ideal for vegetable gardens and lawns.',
    specs: {
      Sizes: '25kg / 50kg',
      Type: 'Fully cured compost',
    },
  },
  {
    id: '8',
    name: 'Biogas Digester',
    images: [
      '/images/shop/biogasdigester.png',
      '/images/shop/biogasdigester_installation.png',
    ],
    alt: 'Supacare dome-shaped biogas digester rural setup',
    category: 'Hardware',
    price: 1500,
    description:
      'A dome-shaped anaerobic digester for household and institutional biogas generation. Converts waste into clean energy.',
    specs: {
      Capacity: '6m³',
      Output: 'Up to 3 hours gas/day',
      Material: 'Reinforced concrete dome',
    },
  },
  {
    id: '9',
    name: 'Bokashi Bin',
    images: [
      '/images/shop/bokashibin.jpg',
      '/images/shop/bokashibin_open.png',
    ],
    alt: 'Supacare branded indoor bokashi compost bin',
    category: 'Hardware',
    price: 75,
    description:
      'Indoor bokashi composting bin for households and small offices to ferment organic waste odorlessly.',
    specs: {
      Volume: '20 liters',
      Material: 'High-grade plastic',
      Includes: 'Drain tap and bokashi mix',
    },
  },
];
