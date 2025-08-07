'use client'

import { useStore } from '@nanostores/react'
import { atom, computed, map } from 'nanostores'
import { useEffect, useId } from 'react'

import { calculateDiscountPrice } from '../lib'
import { mockProducts } from '../mocks'
import { NgeniusPaymentResponse, TProductCard } from '../types'

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

export const $subTotal = computed($products, (products) => {
  return Object.values(products).reduce((acc, { price, quantity }) => {
    const disPrice = calculateDiscountPrice(price.actual, price.discount)

    return (
      acc + (disPrice?.discountPrice ? disPrice.discountPrice : disPrice.withoutDicount) * quantity
    )
  }, 0)
})

export const $totalDiscount = computed([$coupons], (coupons) => {
  return coupons.reduce((acc, { discount }) => acc + discount, 0)
})

type TDeliveryType = 'standard' | 'express'

const $deliveryType = atom<TDeliveryType>('standard')

const setDeliveryType = (type: TDeliveryType) => {
  $deliveryType.set(type)
}

export const $totalPrice = computed(
  [$subTotal, $totalDiscount, $deliveryType],
  (subTotalPrice, discount, deliveryType) => {
    const subtotal = subTotalPrice - discount

    switch (deliveryType) {
      case 'express':
        return subtotal + 15
      default:
        return subtotal
    }
  }
)

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

type TCheckoutData = {
  email: string
  firstName: string
  delivery: string
  country?: string | undefined
  lastName?: string | undefined
  adress?: string | undefined
  aditionalAdress?: string | undefined
  city?: string | undefined
  state?: string | undefined
  zip?: string | undefined
}

export const $checkoutData = atom<TCheckoutData>({
  email: '',
  country: '',
  firstName: '',
  lastName: '',
  adress: '',
  aditionalAdress: '',
  city: '',
  state: '',
  zip: '',
  delivery: 'express',
})

export const setCheckoutData = (data: TCheckoutData) => {
  $checkoutData.set(data)
}

export const $payment = atom<NgeniusPaymentResponse | null>(null)

function savePayment(res: NgeniusPaymentResponse) {
  $payment.set(res)
}

export const useChekoutStore = () => {
  const generatedChekoutFormId = useId()
  const products = useStore($products)
  const discount = useStore($totalDiscount)
  const coupons = useStore($coupons)
  const total = useStore($totalPrice)
  const subTotal = useStore($subTotal)
  const isFormValid = useStore($isFormValid)
  const shouldTriggerFormValidation = useStore($triggerFormValidation)
  const formSubmitCount = useStore($formSubmitCount)
  const isFormSubmitting = useStore($isFormSubmitting)
  const checkOutFormId = useStore($checkOutFormId)
  const checkoutData = useStore($checkoutData)
  const deliveryType = useStore($deliveryType)
  const payment = useStore($payment)

  const setCheckoutFormId = (id: string) => {
    $checkOutFormId.set(id)
  }

  useEffect(() => {
    if (!checkOutFormId) {
      setCheckoutFormId(generatedChekoutFormId)
    }
  }, [checkOutFormId, generatedChekoutFormId])

  return {
    payment,
    savePayment,
    setCheckoutFormId,
    setDeliveryType,
    deliveryType,
    checkOutFormId,
    products,
    total,
    coupons,
    discount,
    subTotal,
    isFormValid,
    shouldTriggerFormValidation,
    formSubmitCount,
    isFormSubmitting,
    checkoutData,
    setCheckoutData,
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
