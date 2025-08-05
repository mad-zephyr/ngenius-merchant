import {
  CreateOrderRequest,
  CreateOrderResponse,
  PaymentErrorResponse,
} from '@/shared/types/ngenius-order'

import { getAccessToken } from './getAccessToken'
import { paymentApi } from './paymentApi'

// action	Order type	"AUTH", "SALE", "PURCHASE"
// amount { }	Amount block	N/A
// amount.currencyCode	Order currency	"AED", "USD", "EUR"
// amount.value	Order amount	1000 (minor units)
// emailAddress	Payer's email address	customer@test.com

export const createOneStagePayment = async (outletRef: string, payload: CreateOrderRequest) => {
  const token = await getAccessToken()

  if (!token) {
    return
  }
  const { access_token } = token

  try {
    const options = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'content-type': 'application/vnd.ni-payment.v2+json',
        accept: 'application/vnd.ni-payment.v2+json',
      },
    }

    const respones = await paymentApi.post<
      CreateOrderRequest,
      { data: CreateOrderResponse },
      unknown
    >(`/transactions/outlets/${outletRef}/orders`, payload, options)

    return respones.data
  } catch (errorResponse: unknown) {
    const error = errorResponse as { response: { data: PaymentErrorResponse } }
    console.log('Something goes wrong: ', error.response.data)
    return null
  }
}
