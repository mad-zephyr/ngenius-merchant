import { FC } from 'react'

import { Typography } from '@/shared/ui'
import { Icon } from '@/shared/ui/Icon'

import cls from './styles.module.sass'

export type TFeatureItem = {
  checked: boolean
  text: string
}

export const FeatureItem: FC<TFeatureItem> = ({ checked, text }) => {
  return (
    <li className={cls.item}>
      <Icon name={checked ? 'check' : 'minus'} />
      <Typography level="body-sm">{text}</Typography>
    </li>
  )
}
