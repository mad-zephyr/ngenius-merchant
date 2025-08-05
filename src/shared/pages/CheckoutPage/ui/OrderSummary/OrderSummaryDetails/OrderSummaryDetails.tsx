import { FC } from 'react'

import { useChekoutStore } from '@/shared/store/useChekoutStore'
import { Typography } from '@/shared/ui'

import cls from './styles.module.sass'

export const OrderSummaryDetails: FC = () => {
  const { price, discount } = useChekoutStore()

  return (
    <div className={cls.main}>
      <div className={cls.row}>
        <Typography level="body-xs">Subtotal</Typography>
        <Typography level="body-xs">${price.toFixed(2)}</Typography>
      </div>
      <div className={cls.row}>
        <Typography level="body-xs">Shipping</Typography>
        <Typography level="body-xs">FREE</Typography>
      </div>
      {!!discount && (
        <div className={cls.row}>
          <Typography level="body-xs">Coupon discount</Typography>
          <Typography level="body-xs">-${discount.toFixed(2)}</Typography>
        </div>
      )}
    </div>
  )
}
