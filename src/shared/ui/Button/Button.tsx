'use client'

import clsx from 'clsx'
import { ButtonHTMLAttributes, FC, MouseEvent, PropsWithChildren } from 'react'

import { Icon, TIconNames } from '../Icon'
import cls from './style.module.sass'

type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: 'lg' | 'md' | 'sm' | 'xs'
  accent?: true

  variant: 'primary' | 'secondary' | 'plain'
  postFix?: TIconNames
  preFix?: TIconNames
}

export const Button: FC<PropsWithChildren<TButton>> = ({
  size,
  variant,
  onClick,
  postFix,
  className,
  children,
  preFix,
  accent,
  ...props
}) => {
  const classname = clsx(className, cls[size], cls[variant], { [cls.accent]: accent })

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
  }

  return (
    <button onClick={(e) => handleClick(e)} className={classname} {...props}>
      {preFix && <Icon name={preFix} />}
      {children}
      {postFix && <Icon name={postFix} />}
    </button>
  )
}
