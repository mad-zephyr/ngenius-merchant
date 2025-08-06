import { TProductCard } from '@/shared'

export const mockProducts: TProductCard[] = [
  {
    sku: 'DEVTEE-001',
    name: '</Body> Tee',
    description: 'Minimalist white tee featuring "Hello, World!" in a classic monospace font.',
    quantity: 1,
    price: { actual: 24.99, currency: 'USD' },
    details: ['Cotton', 'Black'],
    cover: '/assets/T-shirt-1.jpg',
  },
  {
    sku: 'DEVTEE-002',
    name: "I'm into codding Tee",
    description: 'White tee with a subtle "I`m into codding Tee" command line print.',
    quantity: 1,
    price: { actual: 27.5, discount: 22.0, currency: 'USD' },
    details: ['Slim fit', 'White'],
    cover: '/assets/T-shirt-2.jpg',
  },
  {
    sku: 'DEVTEE-003',
    name: "I'm here because you broke smth Tee",
    description: 'White tee displaying a glitched "404 — Shirt Not Found" message.',
    quantity: 1,
    price: { actual: 25.0, currency: 'USD' },
    details: ['Lightweight', 'White'],
    cover: '/assets/T-shirt-3.jpg',
  },
  {
    sku: 'DEVTEE-004',
    name: 'Semicolon ; Tee',
    description: 'Black tee with an oversized semicolon—because details end the bug.',
    quantity: 1,
    price: { actual: 23.49, currency: 'USD' },
    details: ['Regular fit', 'Black'],
    cover: '/assets/T-shirt-4.jpg',
  },
  {
    sku: 'DEVTEE-005',
    name: 'White Mode Enabled Tee',
    description: 'Jet-White tee declaring "White Mode Enabled" in neon green text.',
    quantity: 1,
    price: { actual: 28.99, discount: 24.99, currency: 'USD' },
    details: ['Regular fit', 'White'],
    cover: '/assets/T-shirt-5.jpg',
  },
]
