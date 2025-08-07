'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { fr } from '@/shared/lib'
import { useChekoutStore } from '@/shared/store'
import { Button, placeholderShimmer, Typography } from '@/shared/ui'

// eslint-disable-next-line no-restricted-imports, import/no-internal-modules
import { OrderProduct } from '../checkout/ui/OrderSummary/OrderProduct'
// eslint-disable-next-line no-restricted-imports, import/no-internal-modules
import { OrderSummaryDetails } from '../checkout/ui/OrderSummary/OrderSummaryDetails'
import cls from './styles.module.sass'
import { CreditCard } from './ui'

export const SuccessfullOrderPage: FC = () => {
  const route = useRouter()
  const { products, total, checkoutData } = useChekoutStore()

  return (
    <div className={cls.main}>
      <div className={cls.left}>
        <div className={cls.image}>
          <Image
            src={'/assets/success-purchase.jpg'}
            alt="successfull purchase"
            fill
            placeholder={placeholderShimmer()}
          />
        </div>
      </div>
      <div className={cls.right}>
        <div className={cls.header}>
          <Typography className={cls.title} level="h1">
            Your order is confirmed.
          </Typography>
          <Typography level="body-md">
            Your order is now in the queue and being processed. We&apos;ll let you know when we ship
            it out!
          </Typography>
        </div>

        <div className={cls.block}>
          <Typography level="body-md">Order Number</Typography>
          <Button size="xs" variant="plain" postFix="copyIcon" accent>
            {1928371928}
          </Button>
        </div>

        <div className={cls.wrapper}>
          {Object.values(products).map((item, i) => (
            <OrderProduct key={item.sku + i} {...item} />
          ))}
        </div>

        <OrderSummaryDetails />

        <div className={cls.price}>
          <span>Total</span>
          <span>${fr.format(total)}</span>
        </div>

        <div className={cls.details}>
          <div className={cls.details_content}>
            <Typography level="body-sm">Shipping address</Typography>
            <div className={cls.details_block}>
              <Typography level="body-xs">{checkoutData.email || '+1 (650) 555-0198'}</Typography>
              <Typography level="body-xs">
                {checkoutData.adress || '150 Elm Street, Apartment 3B'}
              </Typography>
              <Typography level="body-xs">
                {`${checkoutData.city} ${checkoutData.country} ${checkoutData.zip}`}
              </Typography>
              <Typography level="body-xs">{checkoutData.country || 'United States'}</Typography>
            </div>
          </div>

          <div className={cls.details_content}>
            <Typography level="body-sm">Payment</Typography>
            <div className={cls.details_block}>
              <CreditCard maskedPan="409319******6474" expiry={'2029-11'} name={'VISA'} />
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          size="md"
          type="submit"
          postFix="arrowRight"
          onClick={() => route.push('/')}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  )
}
