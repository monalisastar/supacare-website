import { Metadata } from 'next';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: 'Supacare Shop | Composting Products & Solutions',
  description:
    'Shop premium composting machines, compost blends, and sustainable waste solutions from Supacare Solutions.',
};

export default function ShopPage() {
  return <ShopClient />;
}
