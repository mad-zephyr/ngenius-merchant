'use client'

import { FC } from 'react'

import { fr } from '@/shared/lib'
import { useChekoutStore } from '@/shared/store/useChekoutStore'
import { Badge, Typography } from '@/shared/ui'

import cls from './styles.module.sass'

export const OrderSummaryDetails: FC = () => {
  const { subTotal, discount, coupons, deliveryType } = useChekoutStore()

  console.log('COUPONS: ', coupons)

  return (
    <div className={cls.main}>
      <div className={cls.row}>
        <Typography level="body-xs">Subtotal</Typography>
        <Typography level="body-xs">${fr.format(subTotal)}</Typography>
      </div>
      <div className={cls.row}>
        <Typography level="body-xs">Shipping</Typography>
        <Typography level="body-xs">{deliveryType === 'express' ? '$15' : 'FREE'}</Typography>
      </div>
      {!!discount && (
        <div className={cls.row}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Typography level="body-xs">Coupon discount</Typography>
            {Object.values(coupons).map((coupon) => (
              <Badge key={coupon.id}>{coupon.name}</Badge>
            ))}
          </div>
          <Typography level="body-xs">-${fr.format(discount)}</Typography>
        </div>
      )}
    </div>
  )
}
