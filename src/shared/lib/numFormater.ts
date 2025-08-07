export const fr = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function toMinorUnits(amountMajor: number): number {
  return Math.round(amountMajor * 100) // 38.49 → 3849
}
