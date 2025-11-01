import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 🧩 Utility: Combine and deduplicate Tailwind class names
 * -------------------------------------------------------
 * - Accepts dynamic or conditional class inputs
 * - Ensures cleaner merging (e.g., hover:bg-green-600 overrides hover:bg-green-500)
 * - Used throughout all Supacare UI components (Button, Card, Input, etc.)
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
