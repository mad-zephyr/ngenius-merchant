import clsx from 'clsx'
import { FC, InputHTMLAttributes } from 'react'
import { FieldErrors } from 'react-hook-form'

import { Icon, TIconNames } from '../Icon'
import cls from './styles.module.sass'

type TTextField = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  postfix?: TIconNames
  error?: FieldErrors
  required?: boolean
  name: string
  isDirty?: boolean
}

export const TextField: FC<TTextField> = ({
  label,
  className,
  hint,
  postfix,
  error,
  value,
  name,
  isDirty,
  required,
  ...props
}) => {
  const errorMessage = error?.[name]?.message

  const classNames = clsx(cls.main, className, { [cls.required]: required })
  const errorClassNames = clsx({ [cls.error]: !!errorMessage && isDirty })

  return (
    <div className={classNames}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={clsx(cls.input, errorClassNames)}>
        <input name={name} value={value} id={name} {...props} />
        <Icon name={postfix} />
      </div>
      {(errorMessage || hint) && (
        <span className={cls.hint}>{errorMessage?.toString() || hint}</span>
      )}
    </div>
  )
}
