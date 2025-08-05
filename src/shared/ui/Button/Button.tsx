'use client'

import cls from 'clsx'
import { ButtonHTMLAttributes, FC, MouseEvent, PropsWithChildren } from 'react'

import { Icon, TIconNames } from '../Icon'
import classes from './style.module.sass'

type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: 'lg' | 'md' | 'sm' | 'xs'

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
  ...props
}) => {
  const classname = cls(className, classes[size], classes[variant])

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
