'use client'

import { FC } from 'react'

import { Typography, useChekoutStore } from '@/shared'

import cls from './styles.module.sass'
import { OrderSummary, ProductCard } from './ui'

export const CartPage: FC = () => {
  const { products, addProduct, removeProduct } = useChekoutStore()

  const handleChange = (sku: string, value: number) => {
    addProduct(products[sku], value)
  }

  return (
    <div className={cls.main}>
      <div className={cls.header}>
        <Typography level="h1">Shopping Cart</Typography>
      </div>
      <div className={cls.content}>
        {Object.values(products).map((prod, i) => (
          <ProductCard
            key={prod.sku + i}
            data={prod}
            onChange={handleChange}
            onRemove={removeProduct}
          />
        ))}
      </div>
      <div className={cls.summary}>
        <OrderSummary currency="EUR" />
      </div>
    </div>
  )
}
