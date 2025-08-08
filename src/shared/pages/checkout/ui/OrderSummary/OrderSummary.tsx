'use client'

import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'

import { api } from '@/shared/api'
import { fr } from '@/shared/lib'
import { useNgeniusStore } from '@/shared/store'
import { useChekoutStore } from '@/shared/store/useChekoutStore'
import { CreateOrderRequest } from '@/shared/types'
import { NgeniusPaymentResponse } from '@/shared/types/ngenius-order'
import { Button, Modal, Typography } from '@/shared/ui'
import { OrderProduct, OrderSummaryDetails } from '@/shared/widgets'

import { TDetailsForm } from '../DeliveryDetailForm'
import cls from './styles.module.sass'

type OrderPaymentRequest = CreateOrderRequest & {
  sessionId: string
  outletRef: string
}

export function isAwait3DS(r: NgeniusPaymentResponse) {
  return r.state === 'AWAIT_3DS'
}

const DS_BLOCK_ID = '3ds_iframe'

export const OrderSummary: FC = () => {
  const router = useRouter()

  const [checkoutInProgress, setCheckoutInProgress] = useState(false)
  const {
    products,
    total,
    isFormValid,
    checkOutFormId,
    setCheckoutData,
    setDeliveryType,
    payment,
    savePayment,
  } = useChekoutStore()

  const { ni } = useNgeniusStore()
  const { handleSubmit, watch } = useFormContext<TDetailsForm>()
  const productsArray = Object.values(products)
  const [isOpen3ds, setIsOpen3ds] = useState(false)

  const delivery = watch('delivery')

  useEffect(() => {
    setDeliveryType(delivery as 'standard' | 'express')
  }, [delivery, setDeliveryType])

  // useEffect(() => {
  //   if (isOpen3ds) {
  //     lock()
  //   }

  //   return () => {
  //     unlock()
  //   }
  // }, [isOpen3ds, lock, unlock])

  useEffect(() => {
    if (payment && ni) {
      setTimeout(() => {
        ni.handlePaymentResponse(payment, {
          mountId: DS_BLOCK_ID,
          style: { width: 500, height: 500 },
        }).then(({ status }) => {
          console.log('PAYMENT STATU UE EFFECT: ', status)

          if (status === ni.paymentStates.AUTHORISED || status === ni.paymentStates.CAPTURED) {
            // Same as before this signals successful payment
            setCheckoutInProgress(false)

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
        })
      }, 100)
    }
  }, [ni, router, payment])

  const handlePay: SubmitHandler<TDetailsForm> = async (data) => {
    if (ni && isFormValid) {
      setCheckoutInProgress(true)

      const sessionId = await ni?.generateSessionId()

      setCheckoutData(data)

      try {
        const res = await api.post<unknown, { data: NgeniusPaymentResponse }, OrderPaymentRequest>(
          '/api/order/payment',
          {
            sessionId: sessionId.session_id,
            outletRef: process.env.NEXT_PUBLIC_OUTLET_REF || 'a785ec9f-6605-418f-9654-3215ba5f4882',
            action: 'PURCHASE',
            amount: { currencyCode: 'AED', value: total },

            billingAddress: {
              address1: data.adress,
              address2: data.aditionalAdress,
              city: data.city,
              countryCode: data.country,
              firstName: data.firstName,
              lastName: data.lastName,
              postalCode: data.zip,
              state: data.state,
            },

            shippingAddress: {
              address1: data.adress,
              address2: data.aditionalAdress,
              city: data.city,
              countryCode: data.country,
              firstName: data.firstName,
              lastName: data.lastName,
              postalCode: data.zip,
              state: data.state,
            },
            emailAddress: data.email,
          }
        )

        if (res.data) {
          console.log('PAYMENT RESPONSE: ', res.data)
          savePayment(res.data)

          if (isAwait3DS(res.data)) {
            setIsOpen3ds(true)
          }
        }
      } catch (err: unknown) {
        const error = err as AxiosError

        setCheckoutInProgress(false)

        console.log('CHECKOUT ERROR: ', error)
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

      <Modal isOpen={isOpen3ds}>
        <div id={DS_BLOCK_ID} />
      </Modal>

      <Button
        id={checkOutFormId}
        variant="primary"
        size="md"
        type="submit"
        preFix={checkoutInProgress ? 'loader' : 'secure'}
        onClick={handleSubmit(handlePay)}
        disabled={!isFormValid || checkoutInProgress}
      >
        {checkoutInProgress ? 'Order confirmation in progress' : 'Confirm order'}
      </Button>
    </section>
  )
}
