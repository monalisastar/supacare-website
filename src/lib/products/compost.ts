// src/lib/products/compost.ts

import type { Product } from './index';

export const compostProducts: Product[] = [
  {
    id: '1',
    name: 'Compost Delivery per Truck',
    images: ['/images/shop/compostdelivery.png'],
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
    id: '3',
    name: 'Enriched Compost Blend',
    images: ['/images/shop/enriched blend.png'],
    alt: 'Supacare enriched compost blend 25kg',
    category: 'Compost',
    price: 25,
    description:
      'Nutrient-balanced compost formulated for urban farms and gardens to boost plant health and yield.',
    specs: {
      BagSize: '25kg & 50kg',
      Nutrients: 'NPK 3:2:2',
      OrganicContent: '95%',
    },
  },
  {
    id: '7',
    name: 'Compost (25kg & 50kg)',
    images: ['/images/shop/bagged compost.png'],
    alt: 'Supacare compost bags 25kg and 50kg',
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
    id: '14',
    name: 'Compost Starter Mix',
    images: ['/images/shop/compost-starter-mix.png'],
    alt: 'Microbial compost starter mix packet',
    category: 'Compost',
    price: 15,
    description:
      'Microbial powder starter that accelerates compost breakdown and improves soil microbe diversity.',
    specs: {
      Form: 'Powder/Granules',
      Application: 'Mix with organic waste',
    },
  },
  {
    id: '21',
    name: 'Biodegradable Compost Bag',
    images: ['/images/shop/biodegradable-compost-bag.png'],
    alt: 'Biodegradable compostable bag for organic waste',
    category: 'Compost',
    price: 6,
    description:
      'Single-roll biodegradable compost bags made from cornstarch-based bioplastic, suitable for compost bins and organic waste.',
    specs: {
      Capacity: '10–15L',
      Pack: '25 bags',
      Compostable: 'Yes (EN13432 certified)',
    },
  },
  {
    id: '22',
    name: 'Biodegradable Compost Bags (Bulk)',
    images: ['/images/shop/biodegradable-compost-bags.png'],
    alt: 'Bulk pack of biodegradable compost bags',
    category: 'Compost',
    price: 25,
    description:
      'Bulk pack of eco-friendly compostable bags for households, farms, and institutions practicing sustainable waste segregation.',
    specs: {
      Quantity: '100 bags per pack',
      Material: 'Cornstarch blend',
      Thickness: '50 microns',
    },
  },
];
