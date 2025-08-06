import Image from 'next/image'
import { FC } from 'react'

import { Typography } from '@/shared/ui'

import cls from './styles.module.sass'

type TCreditCard = {
  name?: 'VISA' | 'MASTER'
  maskedPan: string
  expiry: string
}

export const CreditCard: FC<TCreditCard> = ({ name = 'card', expiry, maskedPan }) => {
  return (
    <div className={cls.main}>
      <Image src={`/assets/${name}.svg`} alt="card" width={70} height={48} />

      <div className={cls.group}>
        <Typography level="body-xs">Ending with {maskedPan?.replace(/\d+\*+/g, '')}</Typography>
        <Typography level="body-xs">Expires {expiry}</Typography>
      </div>
    </div>
  )
}
