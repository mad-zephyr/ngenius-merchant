import { useStore } from '@nanostores/react'
import { atom, computed, map } from 'nanostores'
import { useEffect, useId } from 'react'

import { mockProducts } from '../mocks'
import { TProductCard } from '../types'

type TDiscountCoupon = {
  name: string
  id: string
  discount: number
}

type TCheckoutForm = {
  formValid: boolean
  paymentValid: boolean
}

const initialProducts = mockProducts.reduce<Record<string, TProductCard>>((acc, cur) => {
  if (acc[cur.sku]) {
    return acc
  }

  acc[cur.sku] = cur

  return acc
}, {})

export const $products = map<Record<string, TProductCard>>(initialProducts)

export const $coupons = map<TDiscountCoupon[]>([])

export const $totalDiscount = computed([$products, $coupons], (products, coupons) => {
  const couponDisc = coupons.reduce((acc, { discount }) => acc + discount, 0)

  const productDisc = Object.values(products).reduce(
    (acc, cur) => acc + (cur.price.discount ?? 0) * cur.quantity,
    0
  )

  return couponDisc + productDisc
})

export const $totalPrice = computed($products, (products) =>
  Object.values(products).reduce((acc, { price, quantity }) => acc + price.actual * quantity, 0)
)

export const $price = computed([$totalPrice, $totalDiscount], (price, discount) => price - discount)

export const $checkoutForm = map<TCheckoutForm>({
  formValid: false,
  paymentValid: false,
})

export const $formSubmitCount = atom(0)

export const setFormSubmitCount = (submitCount: number) => {
  $formSubmitCount.set(submitCount)
}

export const $isFormSubmitting = atom(false)

export const setIsFormSubmitting = (isFormSubmitting: boolean) => {
  $isFormSubmitting.set(isFormSubmitting)
}

export const $isFormValid = computed(
  [$checkoutForm],
  ({ formValid, paymentValid }) => formValid && paymentValid
)

const $triggerFormValidation = atom(false)

const $checkOutFormId = atom<string>('formId')

const setCheckoutFormId = (id: string) => {
  $checkOutFormId.set(id)
}

const setShouldTriggerFormValidation = (trigger: boolean) => {
  $triggerFormValidation.set(trigger)
}

const setIsFormValid = (key: keyof TCheckoutForm, isValid: boolean) => {
  $checkoutForm.setKey(key, isValid)
}

export const addProduct = (prod: TProductCard, qty = 1) => {
  $products.setKey(prod.sku, { ...prod, quantity: qty })
}

export const removeProduct = (sku: string) => {
  $products.setKey(sku, undefined) // map.setKey(undefined) удалит ключ
}

export const applyCoupon = (coupon: TDiscountCoupon) => {
  $coupons.set([...$coupons.get(), coupon])
}

export const removeCoupon = (couponId: TDiscountCoupon['id']) => {
  const coupons = $coupons.get()
  $coupons.set(coupons.filter((coupon) => coupon.id !== couponId))
}

export const useChekoutStore = () => {
  const products = useStore($products)
  const price = useStore($totalPrice)
  const discount = useStore($totalDiscount)
  const coupons = useStore($coupons)
  const total = useStore($price)
  const isFormValid = useStore($isFormValid)
  const shouldTriggerFormValidation = useStore($triggerFormValidation)
  const formSubmitCount = useStore($formSubmitCount)
  const isFormSubmitting = useStore($isFormSubmitting)
  const checkOutFormId = useStore($checkOutFormId)
  const generatedChekoutFormId = useId()

  useEffect(() => {
    if (!checkOutFormId) {
      setCheckoutFormId(generatedChekoutFormId)
    }
  }, [checkOutFormId, generatedChekoutFormId])

  return {
    setCheckoutFormId,
    checkOutFormId,
    products,
    total,
    coupons,
    discount,
    price,
    isFormValid,
    shouldTriggerFormValidation,
    formSubmitCount,
    isFormSubmitting,
    setFormSubmitCount,
    setIsFormSubmitting,
    setShouldTriggerFormValidation,
    setIsFormValid,
    removeProduct,
    addProduct,
    applyCoupon,
    removeCoupon,
  }
}
