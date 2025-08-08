import { FC } from 'react'

import { FeatureItem, TFeatureItem } from '../FeatureItem'
import cls from './style.module.sass'
type TFeatureList = {
  items: TFeatureItem[]
}

export const FeatureList: FC<TFeatureList> = ({ items }) => {
  return (
    <ul className={cls.list}>
      {items.map((item, i) => (
        <FeatureItem key={i} {...item} />
      ))}
    </ul>
  )
}
