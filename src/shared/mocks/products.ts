import { TProductCard } from '@/shared'

export const mockProducts: TProductCard[] = [
  {
    sku: 'DEVTEE-001',
    name: '</Body> Tee',
    description: 'Minimalist white tee featuring "Hello, World!" in a classic monospace font.',
    quantity: 1,
    price: { actual: 24.99, currency: 'USD' },
    details: [
      '100 % organic cotton',
      'Unisex classic fit',
      'Screen-printed graphic',
      'Color: White',
    ],
    cover: '/assets/T-shirt-1.jpg',
  },
  {
    sku: 'DEVTEE-002',
    name: "I'm into codding Tee",
    description: 'Black tee with a subtle "git commit && git push" command line print.',
    quantity: 1,
    price: { actual: 27.5, discount: 22.0, currency: 'EUR' },
    details: [
      'Soft-touch ringspun cotton',
      'Slim fit',
      'Eco-friendly water-based ink',
      'Color: Black',
    ],
    cover: '/assets/T-shirt-2.jpg',
  },
  {
    sku: 'DEVTEE-003',
    name: "I'm here because you broke smth Tee",
    description: 'White tee displaying a glitched "404 — Shirt Not Found" message.',
    quantity: 1,
    price: { actual: 25.0, currency: 'USD' },
    details: ['Lightweight jersey knit', 'Tear-away label', 'Side-seamed', 'Color: White'],
    cover: '/assets/T-shirt-3.jpg',
  },
  {
    sku: 'DEVTEE-004',
    name: 'Semicolon ; Tee',
    description: 'Black tee with an oversized semicolon—because details end the bug.',
    quantity: 1,
    price: { actual: 23.49, currency: 'USD' },
    details: [
      'Preshrunk fabric',
      'Regular fit',
      'High-definition direct-to-garment print',
      'Color: Black',
    ],
    cover: '/assets/T-shirt-4.jpg',
  },
  {
    sku: 'DEVTEE-005',
    name: 'Dark Mode Enabled Tee',
    description: 'Jet-black tee declaring "Dark Mode Enabled" in neon green text.',
    quantity: 1,
    price: { actual: 28.99, discount: 24.99, currency: 'USD' },
    details: ['Premium heavyweight cotton', 'Ribbed collar', 'Fade-resistant ink', 'Color: Black'],
    cover: '/assets/T-shirt-5.jpg',
  },
]
