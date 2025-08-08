'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Link, Typography } from '@/shared/ui'
import { PaymentMethodForm } from '@/shared/widgets'

import classes from './styles.module.sass'
import { DeliveryDetailForm, detailsFormSchema, OrderSummary, TDetailsForm } from './ui'

const defaultValues: TDetailsForm = {
  email: '',
  country: '',
  firstName: '',
  lastName: '',
  adress: '',
  aditionalAdress: '',
  city: '',
  state: '',
  zip: '',
  delivery: 'standard',
}

export const CheckoutPage: FC<PropsWithChildren> = () => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(detailsFormSchema),
  })

  return (
    <>
      <FormProvider {...methods}>
        <div className={classes.main}>
          <div className={classes.header}>
            <Link href="/cart" size="sm" prefix="arrowSquareLeft">
              Back to Shopping Cart
            </Link>
          </div>
          <div className={classes.title}>
            <Typography level="h3">Checkout</Typography>
          </div>

          <div className={classes.left}>
            <DeliveryDetailForm paymentForm={<PaymentMethodForm />} />
          </div>

          <div className={classes.right}>
            <OrderSummary />
          </div>
        </div>
      </FormProvider>
    </>
  )
}
