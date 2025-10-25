// src/lib/products/hardware.ts

import type { Product } from './index';

export const hardwareProducts: Product[] = [
  // ✅ Existing hardware items
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

  // ✅ Supacare Waste & Sanitary Bins
  {
    id: '30',
    name: '100L Pedal Bin',
    images: ['/images/shop/100lpedalbin.png'],
    alt: 'Green 100L pedal waste bin branded Supacare Solutions',
    category: 'Hardware',
    price: 13000,
    description:
      '100-liter green pedal bin with hands-free design ideal for hygienic waste handling in public and institutional settings.',
    specs: {
      Capacity: '100L',
      Type: 'Pedal operated',
      Material: 'HDPE',
      Color: 'Green',
    },
  },
  {
    id: '31',
    name: '120L Bin',
    images: ['/images/shop/120Lpeadlbin.png'],
    alt: '120L black-lidded waste bin branded Supacare Solutions',
    category: 'Hardware',
    price: 12850,
    description:
      '120-liter heavy-duty bin with wheels and black lid for versatile waste collection and mobility.',
    specs: {
      Capacity: '120L',
      Type: 'Standard wheeled bin',
      Material: 'HDPE',
      Color: 'Green/Black lid',
    },
  },
  {
    id: '32',
    name: '240L Bin',
    images: ['/images/shop/240Lpedalbin.png'],
    alt: '240L green waste bin with Supacare Solutions branding',
    category: 'Hardware',
    price: 19950,
    description:
      '240-liter outdoor waste bin suitable for residential and commercial waste management.',
    specs: {
      Capacity: '240L',
      Wheels: 'Yes',
      Material: 'HDPE',
    },
  },
  {
    id: '33',
    name: '360L Bin',
    images: ['/images/shop/360Lpedalbin.png'],
    alt: '360L red waste bin branded Supacare Solutions',
    category: 'Hardware',
    price: 25900,
    description:
      '360-liter high-capacity bin for institutions and estates, ideal for large-scale waste handling.',
    specs: {
      Capacity: '360L',
      Wheels: 'Yes',
      Material: 'HDPE',
      Color: 'Red',
    },
  },
  {
    id: '34',
    name: '750L Bin',
    images: ['/images/shop/750mlpedalbin.png'],
    alt: '750L blue wheeled waste container branded Supacare Solutions',
    category: 'Hardware',
    price: 47850,
    description:
      'Industrial-grade 750-liter bin with 4 swivel wheels, built for heavy-duty waste collection and mobility.',
    specs: {
      Capacity: '750L',
      Wheels: '4 swivel',
      Material: 'HDPE',
      Color: 'Blue',
    },
  },
  {
    id: '35',
    name: '1100L Bin',
    images: ['/images/shop/1000lpedalbin.png'],
    alt: '1100L grey waste bin branded Supacare Solutions',
    category: 'Hardware',
    price: 55750,
    description:
      'Massive 1100-liter container designed for industrial and estate-level waste management with easy mobility.',
    specs: {
      Capacity: '1100L',
      Wheels: '4 swivel',
      Material: 'HDPE',
      Color: 'Grey',
    },
  },
  {
    id: '36',
    name: '18L Sanitary Bin (Manual)',
    images: ['/images/shop/18lsanitarybin.png'],
    alt: '18L sanitary pedal bin branded Supacare Solutions',
    category: 'Hardware',
    price: 3650,
    description:
      '18-liter manual sanitary bin designed for hygienic waste disposal in female washrooms and offices.',
    specs: {
      Capacity: '18L',
      Type: 'Manual pedal',
      Material: 'Plastic',
      Color: 'White/Grey lid',
    },
  },
  {
    id: '37',
    name: '22L Sanitary Bin (Manual)',
    images: ['/images/shop/22LSanitaryBin(Manual).png'],
    alt: '22L manual sanitary bin branded Supacare Solutions',
    category: 'Hardware',
    price: 4550,
    description:
      '22-liter manual sanitary bin for safe and odor-free feminine hygiene waste disposal.',
    specs: {
      Capacity: '22L',
      Operation: 'Manual lid',
      Material: 'ABS plastic',
    },
  },
  {
    id: '38',
    name: '22L Sanitary Bin (Automatic)',
    images: ['/images/shop/22LSanitaryBin(Autol).png'],
    alt: '22L automatic sensor sanitary bin branded Supacare Solutions',
    category: 'Hardware',
    price: 6000,
    description:
      '22-liter automatic sensor sanitary bin for touch-free hygienic waste management.',
    specs: {
      Capacity: '22L',
      Operation: 'Motion sensor lid',
      Power: 'Battery/Rechargeable',
    },
  },

  // ✅ Eco-innovation hardware additions
  {
    id: '39',
    name: 'Solar Waste Compactor',
    images: ['/images/shop/solar-waste-compactor.png'],
    alt: 'Supacare solar-powered smart waste compactor',
    category: 'Hardware',
    price: 4200,
    description:
      'Smart solar-powered compactor that compresses waste automatically, reducing collection frequency and emissions.',
    specs: {
      Power: 'Solar-powered',
      CompactionRatio: 'Up to 5:1',
      Connectivity: 'IoT-enabled for monitoring',
    },
  },
  {
    id: '40',
    name: 'Rainwater Harvesting Barrel',
    images: ['/images/shop/rainwater-harvesting-barrel.png'],
    alt: 'Supacare rainwater harvesting barrel',
    category: 'Hardware',
    price: 250,
    description:
      'Rainwater collection barrel designed for sustainable water conservation and landscape irrigation.',
    specs: {
      Capacity: '200L',
      Material: 'Recycled HDPE',
      Includes: 'Tap, lid, and overflow valve',
    },
  },
];
