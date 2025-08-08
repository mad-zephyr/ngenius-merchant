import { FC } from 'react'

import { Typography } from '@/shared/ui'

import cls from './styles.module.sass'
import { FeatureCard, TFeatureCard } from './ui'

const FEATURED_CARDS: TFeatureCard[] = [
  {
    data: {
      title: 'Basic Plan',
      subtitle: 'Access to a curated selection of abstract images',
      price: { actual: 9.99, currency: 'USD' },
      period: 'month',
      features: [
        { checked: true, text: 'Standard quality images' },
        { checked: true, text: 'Limited to personal use' },
        { checked: true, text: 'Email support' },
      ],
    },
  },
  {
    data: {
      header: 'Most Popular',
      title: 'Standard Plan',
      subtitle: 'Next-level Integrations, priced economically',
      price: { actual: 19.99, currency: 'USD' },
      period: 'month',
      accent: true,
      features: [
        { checked: true, text: 'Expanded library with more diverse abstract images' },
        { checked: true, text: 'High-resolution images available' },
        { checked: true, text: 'Suitable for commercial use' },
        { checked: true, text: 'Priority email support' },
        { checked: true, text: 'Advanced analytics' },
      ],
    },
  },
  {
    data: {
      title: 'Premium Plan',
      subtitle: 'Experience limitless living for power users',
      price: { actual: 29.99, currency: 'USD' },
      period: 'month',
      features: [
        {
          checked: true,
          text: 'Full access to the entire image library, including exclusive content',
        },
        { checked: true, text: 'Highest quality images, including premium collections' },
        { checked: true, text: 'Commercial and resale rights' },
        { checked: true, text: 'Dedicated customer support line' },
        { checked: true, text: '24/7 support response time' },
        { checked: true, text: 'Advanced analytics and insights' },
      ],
    },
  },
]

export const SubscriptionPage: FC = () => {
  return (
    <main className={cls.main}>
      <section className={cls.header}>
        <Typography className={cls.header_subtitle} level="body-sm">
          Pricing Tiers
        </Typography>
        <Typography level="h1">Fit for all your needs</Typography>
        <Typography className={cls.header_descr} level="body-sm">
          Pick the plan that suits you today and step up as your demands grow - our flexible options
          have your journey mapped out.
        </Typography>
      </section>

      <section className={cls.section}>
        {FEATURED_CARDS.map((card, i) => (
          <FeatureCard key={i} data={card.data} />
        ))}
      </section>
    </main>
  )
}
