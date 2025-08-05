'use client'

import clsx from 'clsx'
import { ChangeEvent, FC } from 'react'

import { Icon } from '@/shared/ui/Icon'

import cls from './styles.module.sass'
type TQuantitySelector = {
  value: number
  readonly?: boolean
  disabled?: boolean
  onChange: (value: number) => void
}

export const QuantitySelector: FC<TQuantitySelector> = (props) => {
  const { value = 0, disabled, readonly, onChange } = props
  const classNames = clsx(cls.changer)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(+e.target.value)
  }

  const handleChangeUp = () => {
    onChange(value + 1)
  }
  const handleChangeDown = () => {
    onChange(value - 1)
  }

  return (
    <div className={classNames}>
      <div className={clsx(cls.btn, { [cls.disabled]: value === 1 })} onClick={handleChangeDown}>
        <Icon name="minus" />
      </div>
      <input
        onChange={handleChange}
        type="number"
        value={value}
        disabled={disabled}
        readOnly={readonly}
      />
      <div className={cls.btn} onClick={handleChangeUp}>
        <Icon name="plus" />
      </div>
    </div>
  )
}
