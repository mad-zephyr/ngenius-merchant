import { FC, PropsWithChildren } from 'react'

import cls from './styles.module.sass'

export const SelectionGroup: FC<PropsWithChildren> = ({ children }) => {
  return <div className={cls.group}>{children}</div>
}
