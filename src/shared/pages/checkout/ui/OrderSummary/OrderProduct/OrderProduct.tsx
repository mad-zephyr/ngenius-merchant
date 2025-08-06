import Image from 'next/image'
import { FC } from 'react'

import { fr } from '@/shared/lib'
import { TProductCard } from '@/shared/types/app'
import { Typography } from '@/shared/ui'

import cls from './styles.module.sass'

export const OrderProduct: FC<TProductCard> = (props) => {
  const { cover, details, name, price, quantity } = props
  return (
    <div className={cls.main}>
      <div className={cls.image}>
        <Image src={cover} alt={name} fill />
      </div>
      <div className={cls.details}>
        <Typography level="title-lg">{name}</Typography>
        {details && <Typography level="title-sm">{details.join(' • ')}</Typography>}
        <Typography level="title-sm">Quantity: {quantity}</Typography>
      </div>
      <Typography level="title-sm">
        {price.currency} {fr.format(price.actual)}
      </Typography>
    </div>
  )
}
