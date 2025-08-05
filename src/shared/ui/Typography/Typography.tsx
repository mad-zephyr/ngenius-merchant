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
      return (
        <div className={classes}>
          <h1>{children}</h1>
        </div>
      )
    case 'h2':
      return (
        <div className={classes}>
          <h2>{children}</h2>
        </div>
      )
    case 'h3':
      return (
        <div className={classes}>
          <h3>{children}</h3>
        </div>
      )
    case 'h4':
      return (
        <div className={classes}>
          <h4>{children}</h4>
        </div>
      )
    case 'title-lg':
      return (
        <div className={classes}>
          <p>{children}</p>
        </div>
      )
    case 'title-md':
      return (
        <div className={classes}>
          <p>{children}</p>
        </div>
      )
    case 'title-sm':
      return (
        <div className={classes}>
          <p>{children}</p>
        </div>
      )
    case 'body-lg':
      return (
        <div className={classes}>
          <p>{children}</p>
        </div>
      )
    case 'body-md':
      return (
        <div className={classes}>
          <p>{children}</p>
        </div>
      )
    case 'body-sm':
      return (
        <div className={classes}>
          <p>{children}</p>
        </div>
      )
    case 'body-xs':
      return (
        <div className={classes}>
          <p>{children}</p>
        </div>
      )
    default:
      return <span>{children}</span>
  }
}
