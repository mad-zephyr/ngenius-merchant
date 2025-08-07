import Image from 'next/image'
import { FC } from 'react'

import { calculateDiscountPrice, currencySignMap, fr } from '@/shared/lib'
import { TProductCard } from '@/shared/types/app'
import { Button, placeholderShimmer, Typography } from '@/shared/ui'

import { QuantitySelector } from '../QuantitySelector'
import classes from './styles.module.sass'

type TProdCard = {
  data: TProductCard
  onChange: (sku: string, value: number) => void
  onRemove: (sku: string) => void
}

export const ProductCard: FC<TProdCard> = ({ data, onChange, onRemove }) => {
  const { sku, quantity, cover, description, details, name, price } = data

  const calculated = calculateDiscountPrice(price.actual, price.discount)
  const currencySign = currencySignMap[price.currency]
  const hasDiscount = !!calculated.discountPrice

  const handleChangeQuantity = (value: number) => {
    if (value > 0) {
      onChange(sku, value)
    }
  }

  const handleRemove = () => {
    onRemove(sku)
  }

  return (
    <div id={sku} className={classes.main}>
      <div className={classes.image}>
        <Image src={cover} alt="" fill placeholder={placeholderShimmer()} />
      </div>
      <div className={classes.content}>
        <Typography level="h4">{name}</Typography>
        <Typography level="body-md">{details.join(' • ')}</Typography>
        <Typography level="body-md">{description}</Typography>
        <div className={classes.footer}>
          <div className={classes.footerLeft}>
            <QuantitySelector value={quantity} onChange={handleChangeQuantity} />
            <Button size="xs" variant="plain" onClick={handleRemove}>
              Remove
            </Button>
          </div>
          <div className={classes.footerRight}>
            <Typography level="title-sm">
              {currencySign}
              {calculated.discountPrice
                ? fr.format(calculated.discountPrice * quantity)
                : fr.format(calculated.withoutDicount * quantity)}
            </Typography>
            {hasDiscount && (
              <Typography level="title-sm">
                {currencySign}
                {fr.format(calculated.withoutDicount * quantity)}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
