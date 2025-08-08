'use client'

import { FC, PropsWithChildren, useCallback, useEffect } from 'react'

import { Button } from '../Button'
import { Portal } from '../Portal'
import { Typography } from '../Typography'
import cls from './styles.module.sass'

type TModal = {
  isOpen: boolean
  id?: string
  title?: string
  onClose?: () => void
}

export const Modal: FC<PropsWithChildren<TModal>> = ({ children, title, isOpen, onClose, id }) => {
  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null)
    document.body.addEventListener('keydown', closeOnEscapeKey)

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])

  if (!isOpen) return null

  return (
    <Portal wrapperId={id || 'react-portal-modal-container'}>
      <div className={cls.modal}>
        <aside className={cls.main}>
          <div className={cls.header}>
            {title && <Typography level="title-md">{title}</Typography>}
            {onClose && (
              <Button size="xs" variant="plain" postFix="crossIcon" onClick={handleClose}></Button>
            )}
          </div>

          <div className={cls.content}>{children}</div>
        </aside>
      </div>
    </Portal>
  )
}
