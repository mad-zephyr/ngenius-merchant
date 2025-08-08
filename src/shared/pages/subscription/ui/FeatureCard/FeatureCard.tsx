import clsx from 'clsx'
import { FC } from 'react'

import { Button, Typography } from '@/shared/ui'

import { TFeatureItem } from '../FeatureItem'
import { FeatureList } from '../FeatureList'
import cls from './styles.module.sass'

export type TFeatureCard = {
  data: {
    header?: string
    title: string
    subtitle: string
    price: {
      actual: number
      discount?: number
      currency: 'USD' | 'AED' | 'EUR'
    }
    period: 'month' | 'year'
    features: TFeatureItem[]
    accent?: boolean
  }
}

export const FeatureCard: FC<TFeatureCard> = ({ data }) => {
  const { features, header, period, price, subtitle, title, accent } = data

  const billedBy = `Billed ${period === 'month' ? 'monthly' : 'yearly'}`

  return (
    <div className={clsx(cls.main, { [cls.accent]: accent })}>
      {header && <div className={cls.header}>{header}</div>}
      <div className={cls.column}>
        <Typography className={cls.title} level="h4">
          {title}
        </Typography>
        <Typography className={cls.subtitle} level="body-sm">
          {subtitle}
        </Typography>
      </div>
      <div className={cls.column}>
        <div className={cls.row}>
          <span className={cls.price}>
            {price.currency}
            {price.actual}
          </span>
          <span>/ {period}</span>
        </div>
        <Typography level="body-sm">{billedBy}</Typography>
      </div>
      <div className={cls.column}>
        <FeatureList items={features} />
      </div>

      <div className={cls.footer}>
        <Button size="lg" variant="primary">
          Buy now
        </Button>
      </div>
    </div>
  )
}
