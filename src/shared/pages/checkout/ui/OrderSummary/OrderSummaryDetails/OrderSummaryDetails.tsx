'use client'

import { FC } from 'react'

import { fr } from '@/shared/lib'
import { useChekoutStore } from '@/shared/store/useChekoutStore'
import { Typography } from '@/shared/ui'

import cls from './styles.module.sass'

export const OrderSummaryDetails: FC = () => {
  const { price, discount, deliveryType } = useChekoutStore()

  return (
    <div className={cls.main}>
      <div className={cls.row}>
        <Typography level="body-xs">Subtotal</Typography>
        <Typography level="body-xs">${fr.format(price)}</Typography>
      </div>
      <div className={cls.row}>
        <Typography level="body-xs">Shipping</Typography>
        <Typography level="body-xs">{deliveryType === 'express' ? '$15' : 'FREE'}</Typography>
      </div>
      {!!discount && (
        <div className={cls.row}>
          <Typography level="body-xs">Coupon discount</Typography>
          <Typography level="body-xs">-${fr.format(discount)}</Typography>
        </div>
      )}
    </div>
  )
}
