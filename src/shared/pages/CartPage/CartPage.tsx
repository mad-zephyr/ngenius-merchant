'use client'

import { FC } from 'react'

import { useChekoutStore } from '@/shared/store/useChekoutStore'
import { Typography } from '@/shared/ui'

import classes from './classes.module.sass'
import { OrderSummary, ProductCard } from './ui'

export const CartPage: FC = () => {
  const { products, addProduct, removeProduct } = useChekoutStore()

  const handleChange = (sku: string, value: number) => {
    addProduct(products[sku], value)
  }

  const handleRemove = (sku: string) => {
    removeProduct(sku)
  }

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Typography level="h1">Shopping Cart</Typography>
      </div>
      <div className={classes.content}>
        {Object.values(products).map((prod, i) => (
          <ProductCard
            key={prod.sku + i}
            data={prod}
            onChange={handleChange}
            onRemove={handleRemove}
          />
        ))}
      </div>
      <div className={classes.summary}>
        <OrderSummary currency="EUR" />
      </div>
    </div>
  )
}
