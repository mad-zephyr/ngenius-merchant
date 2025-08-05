import { Children, cloneElement, FC, isValidElement, ReactElement } from 'react'

import { type TRadioCardItem } from '../RadioCardItem'
import cls from './styles.module.sass'

type RadioCardGroup = {
  /** Текущее выбранное значение (controlled) */
  value: string
  /** Коллбек при выборе новой опции */
  onChange: (value: string | number) => void
  /** Необязательное общее имя; если не задано, генерируется автоматически */
  name: string
  children: ReactElement<TRadioCardItem> | ReactElement<TRadioCardItem>[]
}

export const RadioCardGroup: FC<RadioCardGroup> = ({ onChange, value, name, children }) => {
  const enhanced = Children.map(children, (child) => {
    if (!isValidElement<TRadioCardItem>(child)) {
      return child
    }

    return cloneElement(child, {
      name,
      checked: child.props.value === value,
      onChange: () => onChange(child.props.value),
    })
  })

  return <fieldset className={cls.group}>{enhanced}</fieldset>
}
