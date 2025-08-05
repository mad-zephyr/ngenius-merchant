// types/ngenius-order.ts
// Полезно положить в src/types и добавить `typeRoots`/`paths` в tsconfig, чтобы расширять по мере нужды.

export type OrderAction = 'AUTH' | 'SALE' | 'PURCHASE'
export type Language = 'en' | 'ar' | 'fr' | string // SDK уже поддерживает FR, но можно оставить string
export type Channel = 'MoTo' // Канал для MO/TO-платежей

export interface Amount {
  /** Валюта заказа (ISO-4217, три буквы) */
  currencyCode: 'AED' | 'USD' | 'EUR' //  …
  /** Сумма в «minor units» (100 AED → 10000) */
  value: number
}

export interface MerchantAttributes {
  /** Куда перенаправить плательщика после успешного платежа */
  redirectUrl?: string
  /** Пропустить страницу подтверждения (true — да, false — нет) */
  skipConfirmationPage?: boolean
  /** Пропустить 3-D-Secure (только если разрешено в кабинете) */
  skip3DS?: boolean
  /** Куда вернуть клиента, если он отменит платёж */
  cancelUrl?: string
  /** Текст на кнопке возврата (по умолчанию — “Continue Shopping”) */
  cancelText?: string
}

export interface Address {
  firstName?: string
  lastName?: string
  address1?: string
  city?: string
  countryCode?: string // ISO-3166-alpha-3 (например, 'UAE')
}

export type MerchantDefinedData = Record<string, string>

export interface SavedCard {
  /** Base-64 токен карты */
  cardToken: string
  cardholderName?: string
  expiry?: string // YYYY-MM
  maskedPan?: string // 401200**1112
  scheme?: 'VISA' | 'MASTERCARD' | 'AMERICAN_EXPRESS' | 'DINERS_CLUB_INTERNATIONAL' | string
  /** CSC можно передать ТОЛЬКО во входящем запросе; в ответе не возвращается */
  cvv?: string
}

/** Платёжный фасилитатор / агрегатор (если аккаунт настроен как PayFac) */
export interface PayFacData {
  payFacId?: string
  saleOrgId?: string
}

/**
 * Полное тело запроса на создание заказа
 * (обязательны только `action` и `amount`, остальные — опциональны).
 */
export interface CreateOrderRequest {
  action: OrderAction
  amount: Amount
  emailAddress?: string
  language?: Language
  merchantAttributes?: MerchantAttributes
  merchantOrderReference?: string
  billingAddress?: Address
  shippingAddress?: Address
  merchantDefinedData?: MerchantDefinedData // до 100 произвольных пар ключ-значение
  savedCard?: SavedCard // Pay-by-Token
  recaptureCsc?: boolean // переснять CSC для сохранённой карты
  payFacData?: PayFacData
  channel?: Channel // 'MoTo' — Mail/Telephone Order
}

export interface CreateOrderResponse {
  _id: string
  _links: Record<
    string,
    | { href: string; templated?: boolean; name?: string }
    | Array<{ name: string; href: string; templated: boolean }>
  >
  action: 'AUTH' | 'SALE' | 'PURCHASE'
  amount: {
    currencyCode: string
    value: number
  }
  language?: 'en' | 'ar' | 'fr'
  merchantAttributes?: {
    redirectUrl: string
    [key: string]: unknown
  }
  emailAddress?: string
  reference: string
  outletId: string
  createDateTime: string
  paymentMethods: {
    card: string[]
    wallet?: string[]
  }
  referrer?: string
  formattedAmount?: string
  formattedOrderSummary?: Record<string, unknown>
  _embedded?: {
    payment?: Array<{
      _id: string
      _links: Record<
        string,
        | { href: string; templated?: boolean }
        | Array<{ name: string; href: string; templated: boolean }>
      >
      /** Состояние платежа (например, STARTED, AUTHORISED) */
      state?: string
      amount: {
        currencyCode: string
        value: number
      }
      updateDateTime: string
      outletId: string
      orderReference: string
      /** В ответе Paypage может не быть полей paymentMethod/savedCard/authResponse/3ds */
      [key: string]: unknown
    }>
  }
}

export type TToken = {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  token_type: 'bearer'
  'not-before-policy': number
  session_state: string
  scope: string[]
}

type TError = {
  message: string
  localizedMessage: string
  errorCode: string
  domain: string
}

export type PaymentErrorResponse = {
  message: string
  code: number
  errors: TError[]
}
