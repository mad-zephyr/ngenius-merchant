'use client'

import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'

import { api } from '@/shared/api'
import { fr } from '@/shared/lib'
import { useNgeniusStore } from '@/shared/store'
import { useChekoutStore } from '@/shared/store/useChekoutStore'
import { CreateOrderRequest } from '@/shared/types'
import { NgeniusPaymentResponse } from '@/shared/types/ngenius-order'
import { Button, Typography } from '@/shared/ui'

import { TDetailsForm } from '../DeliveryDetailForm'
import { OrderProduct } from './OrderProduct'
import { OrderSummaryDetails } from './OrderSummaryDetails'
import cls from './styles.module.sass'

type OrderPaymentRequest = CreateOrderRequest & {
  sessionId: string
  outletRef: string
}

export const OrderSummary: FC = () => {
  const router = useRouter()
  const { products, total, isFormValid, checkOutFormId, setCheckoutData, setDeliveryType } =
    useChekoutStore()
  const { ni } = useNgeniusStore()
  const { handleSubmit, watch } = useFormContext<TDetailsForm>()
  const productsArray = Object.values(products)

  const delivery = watch('delivery')

  useEffect(() => {
    setDeliveryType(delivery as 'standard' | 'express')
  }, [delivery, setDeliveryType])

  const handlePay: SubmitHandler<TDetailsForm> = async (data) => {
    if (ni && isFormValid) {
      const sessionId = await ni?.generateSessionId()

      setCheckoutData(data)

      const paymentResponse = await api.post<
        unknown,
        { data: NgeniusPaymentResponse },
        OrderPaymentRequest
      >('/api/order/payment', {
        sessionId: sessionId.session_id,
        outletRef: process.env.NEXT_PUBLIC_OUTLET_REF || 'a785ec9f-6605-418f-9654-3215ba5f4882',
        action: 'PURCHASE',
        amount: { currencyCode: 'AED', value: total },

        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          city: data.city,
          countryCode: data.country,
        },
        emailAddress: data.email,
      })

      const { status } = await ni.handlePaymentResponse(paymentResponse.data)

      if (status === ni.paymentStates.AUTHORISED || status === ni.paymentStates.CAPTURED) {
        // Same as before this signals successful payment
        router.replace('/cart/successfull')
      } else if (
        status === ni.paymentStates.FAILED ||
        // A new state to look out for is 3DS Challenge failure
        status === ni.paymentStates.THREE_DS_FAILURE
      ) {
        // payment failure signal
      } else {
        // FAILED authentications scenarios
      }
    }
  }

  return (
    <section className={cls.section}>
      <Typography level="h4">Order Summary</Typography>
      <div className={cls.wrapper}>
        {productsArray.map((item, i) => (
          <OrderProduct key={item.sku + i} {...item} />
        ))}
      </div>
      <OrderSummaryDetails />
      <div className={cls.price}>
        <span>Total</span>
        <span>${fr.format(total)}</span>
      </div>

      <Button
        id={checkOutFormId}
        variant="primary"
        size="md"
        type="submit"
        preFix="secure"
        onClick={handleSubmit(handlePay)}
        disabled={!isFormValid}
      >
        Confirm order
      </Button>
    </section>
  )
}
