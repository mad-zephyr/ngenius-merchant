export type TProductCard = {
  sku: string
  name: string
  description: string
  quantity: number
  price: {
    actual: number
    discount?: number
    currency: 'EUR' | 'USD' | 'AED'
  }
  details: string[]
  cover: string | StaticImageData
}
