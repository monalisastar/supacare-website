// src/lib/products/support.ts

import type { Product } from './index';

export const supportProducts: Product[] = [
  {
    id: '6',
    name: 'Site Assessment',
    images: ['/images/shop/siteassement.png'],
    alt: 'Supacare staff performing compost site assessment',
    category: 'Support',
    price: 80,
    description:
      'Professional site assessment to evaluate land suitability, drainage, and compliance with environmental and waste management standards.',
    specs: {
      Duration: '1-day onsite visit',
      Deliverable: 'Comprehensive assessment report',
      Includes: 'Waste flow analysis and environmental advice',
    },
  },
  {
    id: '15',
    name: 'Eco Disinfectant Spray',
    images: ['/images/shop/eco-disinfectant-spray.png'],
    alt: 'Organic disinfectant spray bottle',
    category: 'Support',
    price: 10,
    description:
      'Enzyme-based disinfectant for cleaning and odor control in eco-friendly operations. Safe, biodegradable, and non-toxic for people and pets.',
    specs: {
      Volume: '1L / 5L',
      Type: 'Organic enzyme cleaner',
      Biodegradable: 'Yes',
    },
  },
  {
    id: '25',
    name: 'Eco Sanitary Pad Bag',
    images: ['/images/shop/eco-sanitary-pad-bag.png'],
    alt: 'Eco sanitary disposal bag made from biodegradable material',
    category: 'Support',
    price: 10,
    description:
      'Disposal bags for sanitary products made from biodegradable materials to promote responsible waste handling and reduce plastic pollution.',
    specs: {
      Pack: '50 bags',
      Compostable: 'Yes',
      OdorSeal: 'Yes',
    },
  },
];
