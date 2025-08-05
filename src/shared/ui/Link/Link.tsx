'use client'

import cls from 'clsx'
import NextLink from 'next/link'
import { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react'

import { Icon, TIconNames } from '../Icon'
import classes from './styles.module.sass'

type TLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  size?: 'md' | 'sm'
  prefix?: TIconNames
  postfix?: TIconNames
  variant?: 'color'
  disabled?: boolean
}

export const Link: FC<PropsWithChildren<TLink>> = ({
  href,
  prefix,
  postfix,
  children,
  className,
  disabled,
  size = 'md',
  variant = 'color',
  ...props
}) => {
  const classNames = cls(classes.link, classes[variant], classes[size], className)

  return (
    <NextLink
      href={href}
      className={classNames}
      onNavigate={(e) => {
        if (disabled) {
          e.preventDefault()
        }
      }}
      {...props}
    >
      {prefix && <Icon name={prefix} />}
      {children}
      {postfix && <Icon name={postfix} />}
    </NextLink>
  )
}
