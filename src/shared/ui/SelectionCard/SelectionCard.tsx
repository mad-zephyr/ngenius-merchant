import { FC, InputHTMLAttributes } from 'react'

import CheckedIcon from './checkedIcon.svg'
import cls from './styles.module.sass'

type TSelectionCard = InputHTMLAttributes<HTMLInputElement> & {
  data: { title: string; details: string; price: number }
}

export const SelectionCard: FC<TSelectionCard> = (props) => {
  const {
    id,
    name,
    data: { title, details, price },
  } = props

  return (
    <label htmlFor={id} className={cls.main}>
      <input className={cls.checkbox} id={id} name={name} type="radio" />
      <CheckedIcon />
      <div className={cls.content}>
        <div className={cls.title}>{title}</div>
        <div className={cls.subTitle}>{details}</div>
      </div>
      <div className={cls.title}>${price}</div>
    </label>
  )
}
