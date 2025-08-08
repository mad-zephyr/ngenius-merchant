import Image from 'next/image'
import { FC } from 'react'

import { PaymentMethod } from '@/shared/types/ngenius-order'
import { placeholderShimmer, Typography } from '@/shared/ui'

import cls from './styles.module.sass'

type TCreditCard = {
  data?: PaymentMethod
}

export const CreditCard: FC<TCreditCard> = ({ data }) => {
  const pan = data?.pan || ''
  const expiry = data?.expiry || ''
  const name = data?.name || 'CARD'

  return (
    <div className={cls.main}>
      <Image
        src={`/assets/${name}.svg`}
        alt="card"
        width={70}
        height={48}
        placeholder={placeholderShimmer()}
      />

      <div className={cls.group}>
        <Typography level="body-xs">Ending with {pan?.replace(/\d+\*+/g, '')}</Typography>
        <Typography level="body-xs">Expires {expiry}</Typography>
      </div>
    </div>
  )
}
