import Image from 'next/image'
import { FC } from 'react'

import { calculateDiscountPrice, currencySignMap, fr } from '@/shared/lib'
import { TProductCard } from '@/shared/types/app'
import { placeholderShimmer, Typography } from '@/shared/ui'

import cls from './styles.module.sass'

export const OrderProduct: FC<TProductCard> = (props) => {
  const { cover, details, name, price, quantity } = props

  const calculated = calculateDiscountPrice(price.actual, price.discount)
  const currencySign = currencySignMap[price.currency]
  const hasDiscount = !!calculated.discountPrice

  return (
    <div className={cls.main}>
      <div className={cls.image}>
        <Image src={cover} alt={name} fill placeholder={placeholderShimmer()} />
      </div>
      <div className={cls.details}>
        <Typography level="title-lg">{name}</Typography>
        {details && <Typography level="title-sm">{details.join(' • ')}</Typography>}
        <Typography level="title-sm">Quantity: {quantity}</Typography>
      </div>
      <div className={cls.price}>
        <Typography level="title-sm">
          {currencySign}
          {fr.format(
            calculated.discountPrice ? calculated.discountPrice : calculated.withoutDicount
          )}
        </Typography>
        {hasDiscount && (
          <Typography level="title-sm">
            {currencySign}
            {fr.format(calculated.withoutDicount)}
          </Typography>
        )}
      </div>
    </div>
  )
}
