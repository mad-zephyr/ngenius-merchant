export const calculateDiscountPrice = (price: number, discount?: number) => {
  if (!discount) {
    return { withoutDicount: price }
  }

  const discountPrice = price - (price * discount) / 100

  return { discountPrice, withoutDicount: price }
}

export const fr = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function toMinorUnits(amountMajor: number): number {
  return Math.round(amountMajor * 100) // 38.49 → 3849
}
