'use client'

import { FC, useState } from 'react'

import { fr } from '@/shared/lib'
import { useChekoutStore } from '@/shared/store'
import { Badge, Button, TextField, Typography } from '@/shared/ui'

import cls from './styles.module.sass'

export const DiscountButton: FC = () => {
  const { applyCoupon, coupons, discount, removeCoupon } = useChekoutStore()

  const [addCouponActive, setAddCouponActive] = useState(!!coupons.length)
  const [couponName, setCouponName] = useState<string>('')

  const handleSetActiveCoupon = () => {
    setAddCouponActive(true)
  }

  const handleAddCoupon = () => {
    if (couponName) {
      applyCoupon({ discount: 10, id: crypto.randomUUID(), name: couponName })
    }

    setCouponName('')
  }

  return (
    <>
      <div className={cls.row}>
        <div className={cls.group}>
          {Object.values(coupons).map((coupon) => (
            <Badge key={coupon.id} variant="primary">
              {coupon.name}
            </Badge>
          ))}
        </div>
        {!!discount && <Typography level="title-lg">-${fr.format(discount)}</Typography>}
      </div>
      <div className={cls.row_reverse}>
        {!addCouponActive ? (
          <Button
            size="xs"
            variant="plain"
            preFix="coupon"
            className={cls.link}
            onClick={handleSetActiveCoupon}
          >
            Add coupon codes
          </Button>
        ) : (
          <div className={cls.column}>
            <div className={cls.group}>
              <TextField
                label="Coupon code"
                placeholder="Enter coupon code"
                name={'coupon'}
                value={couponName}
                onChange={(e) => {
                  setCouponName(e.target.value)
                }}
              />
              <Button size="md" variant="secondary" onClick={handleAddCoupon}>
                Apply
              </Button>
            </div>
            <div className={cls.badges}>
              {Object.values(coupons).map((coupon) => (
                <Badge
                  key={coupon.id}
                  variant="secondary"
                  postFix="crossIcon"
                  onClickPostFix={() => removeCoupon(coupon.id)}
                >
                  {coupon.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
