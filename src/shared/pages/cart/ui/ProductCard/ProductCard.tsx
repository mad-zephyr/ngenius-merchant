import Image from 'next/image'
import { FC } from 'react'

import { TProductCard } from '@/shared/types/app'
import { Button, Typography } from '@/shared/ui'

import { QuantitySelector } from '../QuantitySelector'
import classes from './styles.module.sass'

type TProdCard = {
  data: TProductCard
  onChange: (sku: string, value: number) => void
  onRemove: (sku: string) => void
}

export const ProductCard: FC<TProdCard> = ({ data, onChange, onRemove }) => {
  const { sku, quantity, cover, description, details, name, price } = data

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
        <Image src={cover} alt="" fill />
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
            {price.currency} {Number(price.actual * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}
