'use server'

import { PaymentErrorResponse, TToken } from '@/shared/types/ngenius-order'

import { paymentApi } from './paymentApi'

// type TAccessToken = {
//   name: 'ni' | 'client_credentials'
// }
export const getAccessToken = async () => {
  const AUTH_KEY = process.env.NEXT_MERCHANT_SERVICE_ACCOUNT

  try {
    const options = {
      headers: {
        Authorization: `Basic ${AUTH_KEY}`,
        accept: 'application/vnd.ni-identity.v1+json',
        'Content-Type': 'application/vnd.ni-identity.v1+json',
      },
    }

    const response = await paymentApi.post<unknown, { data: TToken }, unknown>(
      '/identity/auth/access-token',
      { grant_type: 'client_credentials' },
      options
    )

    return response.data
  } catch (errorResponse: unknown) {
    const error = errorResponse as { response: { data: PaymentErrorResponse } }
    console.log('ACCESS TOKEN Something goes wrong: ', { ...error })
    return null
  }
}
