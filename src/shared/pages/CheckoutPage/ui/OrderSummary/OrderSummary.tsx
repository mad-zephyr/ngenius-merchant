'use client'

import { FC } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'

import { api } from '@/shared/api'
import { useNgeniusStore } from '@/shared/store'
import { useChekoutStore } from '@/shared/store/useChekoutStore'
import { CreateOrderRequest } from '@/shared/types'
import { Button, Typography } from '@/shared/ui'

import { TDetailsForm } from '../DeliveryDetailForm'
import { OrderProduct } from './OrderProduct'
import { OrderSummaryDetails } from './OrderSummaryDetails'
import classes from './styles.module.sass'

type OrderPaymentRequest = CreateOrderRequest & {
  sessionId: string
  outletRef: string
}

export const OrderSummary: FC = () => {
  const { products, total, isFormValid, checkOutFormId } = useChekoutStore()

  const { handleSubmit } = useFormContext<TDetailsForm>()

  const { ni } = useNgeniusStore()

  const handlePay: SubmitHandler<TDetailsForm> = async (data) => {
    if (ni && isFormValid) {
      const sessionId = await ni?.generateSessionId()

      await api.post<unknown, unknown, OrderPaymentRequest>('/api/order/payment', {
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
    }
  }

  return (
    <section className={classes.section}>
      <Typography level="h4">Order Summary</Typography>
      <div className={classes.wrapper}>
        {Object.values(products).map((item, i) => (
          <OrderProduct key={item.sku + i} {...item} />
        ))}
      </div>
      <OrderSummaryDetails />
      <div className={classes.price}>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
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
