// src/lib/products/hardware.ts

import type { Product } from './index';

export const hardwareProducts: Product[] = [
  {
    id: '2',
    name: 'Compost Curing Chamber',
    images: ['/images/shop/curingchamber.png'],
    alt: 'Supacare compost curing chamber wooden shed',
    category: 'Hardware',
    price: 300,
    description:
      'Durable wooden chamber designed for compost curing and stabilization before packaging or field application.',
    specs: {
      Material: 'Treated wood & mesh panels',
      Capacity: '2 tons',
      Dimensions: '3m x 2m x 2m',
      Lifespan: '5+ years',
    },
  },
  {
    id: '4',
    name: 'Rotary Drum Composter',
    images: ['/images/shop/rotarydrum.jpg'],
    alt: 'Supacare rotary drum composting machine',
    category: 'Hardware',
    price: 1200,
    description:
      'Industrial-grade rotary drum composter for efficient aerobic decomposition of organic waste with minimal odor.',
    specs: {
      Capacity: '500kg per batch',
      RotationSpeed: '10 RPM',
      Material: 'Galvanized steel',
    },
  },
  {
    id: '5',
    name: 'Solar Dryer',
    images: ['/images/shop/solar-dryer-compost.png'],
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
    id: '8',
    name: 'Biogas Digester',
    images: ['/images/shop/biogasdigester.png'],
    alt: 'Supacare dome-shaped biogas digester rural setup',
    category: 'Hardware',
    price: 1500,
    description:
      'Dome-shaped anaerobic digester for household and institutional biogas generation. Converts waste into clean energy.',
    specs: {
      Capacity: '6m³',
      Output: 'Up to 3 hours gas/day',
      Material: 'Reinforced concrete dome',
    },
  },
  {
    id: '9',
    name: 'Bokashi Bin',
    images: ['/images/shop/bokashibin.jpg'],
    alt: 'Supacare indoor bokashi compost bin',
    category: 'Hardware',
    price: 75,
    description:
      'Indoor bokashi composting bin for households and small offices to ferment organic waste odorlessly.',
    specs: {
      Volume: '20 liters',
      Includes: 'Drain tap and bokashi mix',
    },
  },
  {
    id: '10',
    name: 'Mini Composter Kit',
    images: ['/images/shop/mini-composter-kit.png'],
    alt: 'Small home composting kit for beginners',
    category: 'Hardware',
    price: 60,
    description:
      'Compact home composter ideal for kitchen and balcony setups. Promotes circular waste management at household level.',
    specs: {
      Capacity: '15–20 liters',
      Material: 'Durable recycled plastic',
      Usage: 'Indoor/Outdoor',
    },
  },
  {
    id: '11',
    name: 'Pedal Waste Bin (Color-Coded)',
    images: ['/images/shop/pedal-waste-bin-color-coded..png'],
    alt: 'Set of green, red, and yellow pedal waste bins',
    category: 'Hardware',
    price: 90,
    description:
      'Color-coded pedal bins for hygienic waste segregation. Ideal for offices, schools, and healthcare facilities.',
    specs: {
      Sizes: '30L / 50L / 60L',
      Colors: 'Green, Yellow, Red',
      Material: 'HDPE plastic',
    },
  },
  {
    id: '12',
    name: 'Recycling Bag Set',
    images: ['/images/shop/recycling-bag-set.png'],
    alt: 'Three-section recycling bags for paper, plastic, organic waste',
    category: 'Hardware',
    price: 40,
    description:
      '3-section woven recycling bag set for convenient waste sorting in households or offices.',
    specs: {
      Material: 'Woven cloth',
      Sections: 'Paper, Plastic, Organic',
      Reusable: 'Yes',
    },
  },
  {
    id: '13',
    name: 'Reusable Sorting Baskets',
    images: ['/images/shop/reusable-sorting-baskets.png'],
    alt: 'Eco sorting baskets for circular waste handling',
    category: 'Hardware',
    price: 30,
    description:
      'Reusable baskets made for sorting recyclables and compostables. Stylish and sustainable for indoor use.',
    specs: {
      Material: 'Bamboo / Recycled plastic',
      Reusable: 'Yes',
    },
  },
  {
    id: '16',
    name: 'Biohazard Bags & Sharps Box',
    images: ['/images/shop/biohazard-bags-and-sharps-box.png'],
    alt: 'Yellow/red hazardous waste bags and sharps disposal box',
    category: 'Hardware',
    price: 35,
    description:
      'Medical waste disposal bags and sharps boxes designed for clinics, labs, and hospitals.',
    specs: {
      Sizes: 'Small/Medium/Large',
      Compliance: 'NEMA medical waste standards',
    },
  },
  {
    id: '17',
    name: 'Home Biogas Kit',
    images: ['/images/shop/home-biogas-kit.png'],
    alt: 'Compact home biogas digester dome setup',
    category: 'Hardware',
    price: 950,
    description:
      'Small-scale biogas system for domestic waste-to-energy conversion, reducing LPG dependence.',
    specs: {
      Capacity: '2m³',
      Output: '1 hour gas/day',
      Lifespan: '10 years',
    },
  },
  {
    id: '18',
    name: 'Sanitary Pad Incinerator',
    images: ['/images/shop/sanitary-pad-incineraton.png'],
    alt: 'Compact sanitary pad incinerator unit',
    category: 'Hardware',
    price: 280,
    description:
      'Electric incinerator for safe and hygienic disposal of sanitary waste, ideal for schools and offices.',
    specs: {
      Capacity: 'Up to 10 pads per cycle',
      Power: '220V',
      Material: 'Stainless steel',
    },
  },
  {
    id: '19',
    name: 'Pet Waste Biodegradable Bags',
    images: ['/images/shop/pet-waste-biodegradable-bags.png'],
    alt: 'Biodegradable pet waste collection bags',
    category: 'Hardware',
    price: 8,
    description:
      'Eco-friendly biodegradable bags for pet waste disposal, promoting clean and green neighborhoods.',
    specs: {
      Material: 'Cornstarch bioplastic',
      Pack: '50 pcs',
      Compostable: 'Yes',
    },
  },
  {
    id: '20',
    name: 'Waste Segregation Kit',
    images: ['/images/shop/waste-segregation-kit.png'],
    alt: 'Indoor waste segregation bins for recycling',
    category: 'Hardware',
    price: 85,
    description:
      'Set of indoor bins labeled for paper, plastic, and organic waste to promote easy segregation and recycling.',
    specs: {
      Sections: '3 (Paper, Plastic, Organic)',
      Capacity: '20L each',
      Material: 'Recycled plastic',
    },
  },
  {
    id: '23',
    name: 'Biodegradable Dustbin Liners',
    images: ['/images/shop/biodegradable-dustbin-liners.png'],
    alt: 'Eco dustbin liners made from biodegradable plastic',
    category: 'Hardware',
    price: 12,
    description:
      'Eco dustbin liners made from biodegradable material to replace traditional plastic bags in homes and offices.',
    specs: {
      Sizes: 'Medium / Large',
      Compostable: 'Yes',
      ShelfLife: '12 months',
    },
  },
  {
    id: '24',
    name: 'Biodegradable Food Packaging',
    images: ['/images/shop/biodegradable-food-packaging.png'],
    alt: 'Eco-friendly biodegradable food packaging containers',
    category: 'Hardware',
    price: 30,
    description:
      'Sustainable food packaging made from natural fibers and bioplastics — perfect for restaurants and caterers.',
    specs: {
      Type: 'Plates, Bowls, Boxes',
      Material: 'Sugarcane / PLA',
      Compostable: 'Yes',
    },
  },
  {
    id: '26',
    name: 'Medical Waste Incinerator',
    images: ['/images/shop/medical-waste-incinerator.png'],
    alt: 'Compact medical waste incinerator unit',
    category: 'Hardware',
    price: 1100,
    description:
      'Compact high-temperature incinerator for safe disposal of medical and pathological waste. Suitable for small hospitals and clinics.',
    specs: {
      Capacity: '10kg/hr',
      Temperature: 'Up to 1100°C',
      Fuel: 'Diesel / Gas',
    },
  },
];
