import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

import cls from './style.module.sass'

type THeadlineLevel =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'title-lg'
  | 'title-md'
  | 'title-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'body-xs'

type TTypography = { level: THeadlineLevel; className?: string }

export const Typography: FC<PropsWithChildren<TTypography>> = ({ level, className, children }) => {
  const classes = clsx(cls[level], className)

  switch (level) {
    case 'h1':
      return <h1 className={classes}>{children}</h1>
    case 'h2':
      return <h2 className={classes}>{children}</h2>
    case 'h3':
      return <h3 className={classes}>{children}</h3>
    case 'h4':
      return <h4 className={classes}>{children}</h4>
    case 'title-lg':
    case 'title-md':
    case 'title-sm':
    case 'body-lg':
    case 'body-md':
    case 'body-sm':
    case 'body-xs':
    default:
      return <p className={classes}>{children}</p>
  }
}
