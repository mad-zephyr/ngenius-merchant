'use client'

import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { currencySignMap, fr } from '@/shared/lib'
import { useChekoutStore } from '@/shared/store/useChekoutStore'
import { Button, Typography } from '@/shared/ui'

import classes from './styles.module.sass'
import { DiscountButton } from './ui'

type TOrderSummary = {
  currency: 'USD' | 'EUR' | 'AED'
}

export const OrderSummary: FC<TOrderSummary> = ({ currency = 'USD' }) => {
  const router = useRouter()

  const { total, subTotal, deliveryType } = useChekoutStore()

  const handleNavigate = () => {
    router.push('/cart/checkout')
  }
  return (
    <div className={classes.main}>
      <Typography level="h4">Order Summary</Typography>
      <div className={classes.content}>
        <div className={classes.row}>
          <Typography level="body-sm">Subtotal</Typography>
          <Typography level="body-lg" className={classes.priceDetails}>
            {currencySignMap[currency]}
            {fr.format(subTotal)}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography level="body-sm">Shipping</Typography>
          <Typography level="body-lg" className={classes.priceDetails}>
            {deliveryType === 'express' ? '$15' : 'FREE'}
          </Typography>
        </div>

        <DiscountButton />
      </div>

      <div className={classes.row}>
        <Typography level="title-lg" className={classes.priceTitle}>
          Total
        </Typography>
        <Typography level="title-lg" className={classes.price}>
          {currencySignMap[currency]}
          {fr.format(total)}
        </Typography>
      </div>

      <Button size="lg" variant="primary" onClick={handleNavigate}>
        Checkout
      </Button>
    </div>
  )
}
