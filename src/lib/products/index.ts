// src/lib/products/index.ts

import { compostProducts } from './compost';
import { hardwareProducts } from './hardware';
import { supportProducts } from './support';

export type Category = 'All' | 'Hardware' | 'Compost' | 'Support';

export interface Product {
  id: string;
  name: string;
  images: string[];
  alt: string;
  category: Category;
  price: number;
  description: string;
  specs?: Record<string, string>;
}

// ✅ Combine all product arrays into one export
export const allProducts: Product[] = [
  ...compostProducts,
  ...hardwareProducts,
  ...supportProducts,
];
