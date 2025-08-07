type TOrderSummary = {
  currency: 'USD' | 'EUR' | 'AED'
}

type Keys = Pick<TOrderSummary, 'currency'>['currency']

export const currencySignMap: Record<Keys, string> = {
  USD: '$ ',
  EUR: '€ ',
  AED: 'AED ',
}
