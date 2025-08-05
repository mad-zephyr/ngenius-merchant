'use client'

import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { useChekoutStore } from '@/shared/store/useChekoutStore'
import { Button, Typography } from '@/shared/ui'

import classes from './styles.module.sass'
import { DiscountButton } from './ui'

type TOrderSummary = {
  currency: 'USD' | 'EUR' | 'AED'
}

type Keys = Pick<TOrderSummary, 'currency'>['currency']

export const OrderSummary: FC<TOrderSummary> = ({ currency }) => {
  const router = useRouter()

  const { total, price } = useChekoutStore()

  const currnsySignMap: Record<Keys, string> = {
    USD: '$',
    EUR: '€',
    AED: 'AED',
  }

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
            {currnsySignMap[currency]}
            {price.toFixed(2)}
          </Typography>
        </div>
        <div className={classes.row}>
          <Typography level="body-sm">Shipping</Typography>
          <Typography level="body-lg" className={classes.priceDetails}>
            FREE
          </Typography>
        </div>

        <DiscountButton />
      </div>

      <div className={classes.row}>
        <Typography level="title-lg" className={classes.priceTitle}>
          Total
        </Typography>
        <Typography level="title-lg" className={classes.price}>
          {currnsySignMap[currency]}
          {total.toFixed(2)}
        </Typography>
      </div>

      <Button size="lg" variant="primary" onClick={handleNavigate}>
        Checkout
      </Button>
    </div>
  )
}
