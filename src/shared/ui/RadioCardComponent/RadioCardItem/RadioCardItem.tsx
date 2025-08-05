import { FC, InputHTMLAttributes } from 'react'

import CheckedIcon from './checkedIcon.svg'
import cls from './styles.module.sass'

export type TRadioCardItem = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  value: string | number
  data: { title: string; details: string; price: number }
}

export const RadioCardItem: FC<TRadioCardItem> = (props) => {
  const {
    id,
    data: { title, details, price },
    ...rest
  } = props

  return (
    <label htmlFor={id} className={cls.main}>
      <input className={cls.checkbox} id={id} {...rest} type="radio" />
      <CheckedIcon />
      <div className={cls.content}>
        <div className={cls.title}>{title}</div>
        <div className={cls.subTitle}>{details}</div>
      </div>
      <div className={cls.title}>${price}</div>
    </label>
  )
}
