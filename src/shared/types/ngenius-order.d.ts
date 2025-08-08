/* --------------------------------------------------------------------------
   N‑Genius Payments – canonical TypeScript contracts (v2025‑08‑08)
   --------------------------------------------------------------------------
   ▸ All existing interfaces have been de‑duplicated and cross‑referenced.
   ▸ Original names are preserved where possible to minimise churn.
   ▸ Forward‑compatibility: every object carries an index signature
     so that newly‑added fields never break compilation.
   -------------------------------------------------------------------------- */

/* ────────────────────────────  Shared scalars  ───────────────────────────── */
export type ISODateTime = string // e.g. "2025-08-08T03:23:56.832787077Z"
export type CurrencyCode = string // ISO‑4217 ("AED", "USD", …)
export type CountryCode = string // ISO‑3166‑2 ("AE", "US", …)

/* ───────────────────────────────  Orders  ────────────────────────────────── */
export type OrderAction = 'AUTH' | 'SALE' | 'PURCHASE'
export type Language = 'en' | 'ar' | 'fr' | string
export type Channel = 'MoTo' | string // future‑proof

export interface Amount {
  currencyCode: CurrencyCode // ISO‑4217
  /** Minor units – 100 = 1.00 AED */
  value: number
}

export interface MerchantAttributes {
  redirectUrl?: string
  cancelUrl?: string
  cancelText?: string
  skipConfirmationPage?: boolean
  skip3DS?: boolean
  /** Any future N‑Genius flags */
  [k: string]: unknown
}

export interface Address {
  firstName?: string
  lastName?: string
  address1?: string
  address2?: string
  city?: string
  state?: string
  postalCode?: string
  countryCode?: CountryCode
  [k: string]: unknown
}

export type MerchantDefinedData = Record<string, string>

export interface SavedCard {
  cardToken: string // Base‑64 token
  cardholderName?: string
  expiry?: string // YYYY‑MM
  maskedPan?: string
  scheme?: string // VISA / MASTERCARD …
  cvv?: string // only on input
  recaptureCsc?: boolean
  [k: string]: unknown
}

export interface PayFacData {
  payFacId?: string // 11‑digit
  saleOrgId?: string // legacy field (a.k.a subMerchantId)
  subMerchantId?: string // 15‑digit
  subMerchantMcc?: string // 4‑digit MCC
  [k: string]: unknown
}

export interface DynamicDescriptor {
  merchantName: string // "PayFac*SubMerchant"
  merchantAddress?: {
    city?: string
    state?: string
    country?: string
    [k: string]: unknown
  }
  [k: string]: unknown
}

/** POST /transactions/outlets/{outlet}/payment/hosted-session/{sessionId} */
export interface HostedSessionPaymentRequest {
  action: OrderAction
  amount: Amount
  emailAddress?: string
  language?: Language
  merchantAttributes?: MerchantAttributes
  merchantOrderReference?: string
  paymentAttempts?: number
  billingAddress?: Address
  shippingAddress?: Address
  merchantDefinedData?: MerchantDefinedData
  savedCard?: SavedCard
  recaptureCsc?: boolean
  payFacData?: PayFacData
  dynamicDescriptor?: DynamicDescriptor
  channel?: Channel
  [k: string]: unknown
}

/* ─────────────────────────── Token & Error DTOs ─────────────────────────── */
export interface TToken {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  token_type: 'bearer'
  'not-before-policy': number
  session_state: string
  scope: string[]
}

export interface TError {
  message: string
  localizedMessage: string
  errorCode: string
  domain: string
}

export interface PaymentErrorResponse {
  message: string
  code: number
  errors: TError[]
}

/* ─────────────────────────── Create‑Order DTOs ──────────────────────────── */
export type CreateOrderRequest = HostedSessionPaymentRequest

export interface CreateOrderResponse {
  _id: string
  _links: Record<string, Link | Link[]>
  action: OrderAction
  amount: Amount
  language?: Language
  merchantAttributes?: MerchantAttributes & { redirectUrl?: string }
  emailAddress?: string
  reference: string
  outletId: string
  createDateTime: ISODateTime
  paymentMethods: {
    card: string[]
    wallet?: string[]
  }
  referrer?: string
  formattedAmount?: string
  formattedOrderSummary?: Record<string, unknown>
  _embedded?: {
    payment?: Array<Partial<NgeniusPaymentResponse>>
  }
  [k: string]: unknown
}

/* ─────────────────────────────  Payments  ───────────────────────────────── */
export interface Link {
  href: string
  templated?: boolean
  name?: string
}

export interface CuriesLink extends Link {
  name: string
  templated: boolean
}

export interface PaymentMethod {
  expiry: string // YYYY‑MM
  cardholderName: string
  name: string | 'MASTERCARD' | 'DINERS_CLUB_INTERNATIONAL' | 'VISA' | 'CARD' // Scheme
  cardType: string // CREDIT / DEBIT / …
  cardCategory?: string
  issuingOrg?: string
  issuingCountry?: CountryCode
  issuingOrgWebsite?: string
  issuingOrgPhoneNumber?: string
  pan?: string
  cvv?: string
  [k: string]: unknown
}

export interface SavedCardResponse extends SavedCard {
  maskedPan: string // required in response
  scheme: string | 'MASTERCARD' | 'DINERS_CLUB_INTERNATIONAL' | 'VISA' | 'CARD'
  recaptureCsc: boolean
}

export interface AuthResponse {
  authorizationCode: string
  success: boolean
  resultCode: string
  resultMessage: string
  rrn?: string
  mid?: string
  systemAuditTraceNumber?: string
  [k: string]: unknown
}

export interface ThreeDSChallenge {
  acsUrl: string
  acsPaReq: string
  acsMd: string
  summaryText?: string
  [k: string]: unknown
}

export interface ThreeDSResult {
  eci: string
  eciDescription?: string
  summaryText?: string
  [k: string]: unknown
}

export interface Capture {
  _id?: string
  reference?: string
  state?: string
  amount?: Amount
  updateDateTime?: ISODateTime
  authResponse?: AuthResponse
  [k: string]: unknown
}

/* ----- Base object all payment states share -------------------------------- */
interface BasePayment {
  _id: string // urn:payment:{uuid}
  reference: string
  amount: Amount
  updateDateTime: ISODateTime
  outletId: string
  orderReference: string
  merchantOrderReference?: string
  authenticationCode?: string
  originIp?: string
  mid?: string // Merchant ID (duplicate)
  paymentMethod: PaymentMethod
  _links: {
    self: Link // always present
    curies: CuriesLink[]
    [rel: string]: Link | Link[]
  }
  [k: string]: unknown // forward‑compat
}

/* ----- Branch A – awaiting 3‑D Secure ------------------------------------- */
export interface Await3DSPayment extends BasePayment {
  state: 'AWAIT_3DS'
  '3ds': ThreeDSChallenge
}

/* ----- Branch B – finalised (CAPTURED / AUTH / …) -------------------------- */
export interface FinalisedPayment extends BasePayment {
  state: 'CAPTURED' | 'PARTIALLY_CAPTURED' | 'AUTHORISED' | 'FAILED' | 'VOIDED' | string
  '3ds'?: ThreeDSResult
  savedCard?: SavedCardResponse
  authResponse?: AuthResponse
  _embedded?: {
    'cnp:capture': Capture[]
    [rel: string]: unknown
  }
}

export type NgeniusPaymentResponse = Await3DSPayment | FinalisedPayment
