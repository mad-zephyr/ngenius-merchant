import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

import { Icon, TIconNames } from '../Icon'
import cls from './styles.module.sass'
type TBadge = {
  preFix?: TIconNames
  postFix?: TIconNames
  variant?: 'primary' | 'secondary'
  onClickPostFix?: () => void
}

export const Badge: FC<PropsWithChildren<TBadge>> = ({
  variant = 'primary',
  postFix,
  preFix,
  onClickPostFix,
  children,
}) => {
  return (
    <div className={clsx(cls.main, cls[variant])}>
      {preFix && <Icon name={preFix} />}
      {children}
      {postFix && <Icon name={postFix} onClick={onClickPostFix} />}
    </div>
  )
}
