'use client'

import { FC, ReactElement, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { useChekoutStore } from '@/shared/store'
import { RadioCardGroup, RadioCardItem, TextField, Typography } from '@/shared/ui'
import { TPaymentMethodForm } from '@/shared/widgets/cart/PaymentMethodForm/PaymentMethodForm'

import { TDetailsForm } from './DetailsFormSchema'
import cls from './styles.module.sass'

type TDeliveryDetailForm = {
  paymentForm: ReactElement<TPaymentMethodForm>
}

export const DeliveryDetailForm: FC<TDeliveryDetailForm> = ({ paymentForm }) => {
  const { setIsFormValid, shouldTriggerFormValidation, checkOutFormId } = useChekoutStore()

  const {
    register,
    trigger,
    control,
    formState: { errors, isDirty, isValid },
  } = useFormContext<TDetailsForm>()

  useEffect(() => {
    setIsFormValid('formValid', isValid)
  }, [isValid, setIsFormValid])

  useEffect(() => {
    if (shouldTriggerFormValidation) {
      trigger()
    }
  }, [shouldTriggerFormValidation, trigger])

  return (
    <form id={checkOutFormId} className={cls.section}>
      <div className={cls.section_item}>
        <div className={cls.section_title}>
          <Typography level="title-lg">Contact Information</Typography>
        </div>
        <TextField
          label="Email"
          type="email"
          placeholder="name@email.com"
          error={errors}
          isDirty={isDirty}
          required
          {...register('email', { required: true })}
        />
      </div>
      <div className={cls.section_item}>
        <div className={cls.section_title}>
          <Typography level="h4">Shipping Information</Typography>
        </div>

        <TextField
          label="Country / Region"
          type="text"
          placeholder="United States"
          error={errors}
          {...register('country')}
        />

        <div className={cls.row}>
          <TextField
            label="First name"
            type="text"
            placeholder="John"
            error={errors}
            isDirty={isDirty}
            required
            {...register('firstName', { required: true })}
          />
          <TextField
            label="Last name"
            type="text"
            placeholder="Appleseed"
            isDirty={isDirty}
            error={errors}
            {...register('lastName')}
          />
        </div>

        <div className={cls.column}>
          <TextField
            label="Address"
            type="text"
            placeholder="Street address"
            error={errors}
            isDirty={isDirty}
            {...register('adress')}
          />
          <TextField
            label=""
            type="text"
            placeholder="Apartment, suite, etc (optional)"
            error={errors}
            isDirty={isDirty}
            {...register('aditionalAdress')}
          />
        </div>

        <div className={cls.row}>
          <TextField
            label="City"
            type="text"
            placeholder="City"
            error={errors}
            isDirty={isDirty}
            {...register('city')}
          />
          <TextField
            label="State"
            type="text"
            placeholder="State"
            error={errors}
            isDirty={isDirty}
            {...register('state')}
          />
          <TextField
            label="Zip"
            type="text"
            placeholder="12345"
            error={errors}
            isDirty={isDirty}
            {...register('zip')}
          />
        </div>
      </div>
      <div className={cls.section_item}>
        <Typography level="title-lg">Delivery Method</Typography>

        <Controller
          name="delivery"
          control={control}
          render={({ field }) => (
            <RadioCardGroup {...field}>
              <RadioCardItem
                value="standard"
                data={{ title: 'Standard', details: '4-10 business days', price: 0 }}
              />
              <RadioCardItem
                value="express"
                data={{ title: 'Express', details: '2-5 business days', price: 15 }}
              />
            </RadioCardGroup>
          )}
        />
      </div>
      <div className={cls.section_item}>
        <Typography level="title-lg">Payment Method</Typography>
        {paymentForm}
      </div>
    </form>
  )
}
