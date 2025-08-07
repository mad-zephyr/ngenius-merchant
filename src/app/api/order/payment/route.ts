import { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { getAccessToken, paymentApi, toMinorUnits } from '@/shared'
import {
  CreateOrderRequest,
  HostedSessionPaymentRequest,
  NgeniusPaymentResponse,
} from '@/shared/types/ngenius-order'

export async function POST(req: NextRequest) {
  const { sessionId, outletRef, ...rest } = (await req.json()) as CreateOrderRequest & {
    sessionId: string
    outletRef: string
  }

  const token = await getAccessToken()

  console.log('VALUE: ', toMinorUnits(rest.amount.value))

  const data = {
    action: 'SALE',
    amount: {
      currencyCode: rest.amount.currencyCode,
      value: toMinorUnits(rest.amount.value),
    },
    shippingAddress: { ...rest.shippingAddress },
    session: { id: sessionId },
    order: {
      reference: `TEST-${Date.now()}`,
    },

    merchantAttributes: {
      redirectUrl: 'https://ngenius.netlify.app/order/successfull',
    },
    emailAddress: rest.emailAddress,
  } satisfies HostedSessionPaymentRequest

  const options = {
    headers: {
      Authorization: `Bearer ${token?.access_token}`,
      'Content-Type': 'application/vnd.ni-payment.v2+json',
      Accept: 'application/vnd.ni-payment.v2+json',
    },
  }

  console.log('DATA: ', data)

  try {
    const response = await paymentApi.post<
      unknown,
      NgeniusPaymentResponse,
      HostedSessionPaymentRequest
    >(`/transactions/outlets/${outletRef}/payment/hosted-session/${sessionId}`, data, options)

    console.log('PAYMENT RESPONSE: ', response.data)

    return NextResponse.json(response.data)
  } catch (error: unknown) {
    const err = error as AxiosError
    console.error('PAYMENT ERROR ↙︎', err.response?.status, err.response?.data)

    return NextResponse.json({ error: err.response?.data }, { status: 500 })
  }
}
