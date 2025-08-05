'use client'

import { FC } from 'react'

import { Typography, useChekoutStore } from '@/shared'

import classes from './classes.module.sass'
import { OrderSummary, ProductCard } from './ui'

export const CartPage: FC = () => {
  const { products, addProduct, removeProduct } = useChekoutStore()

  const productsArray = Object.values(products)

  const handleChange = (sku: string, value: number) => {
    addProduct(products[sku], value)
  }

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Typography level="h1">Shopping Cart</Typography>
      </div>
      <div className={classes.content}>
        {productsArray.map((prod, i) => (
          <ProductCard
            key={prod.sku + i}
            data={prod}
            onChange={handleChange}
            onRemove={removeProduct}
          />
        ))}
      </div>
      <div className={classes.summary}>
        <OrderSummary currency="EUR" />
      </div>
    </div>
  )
}
