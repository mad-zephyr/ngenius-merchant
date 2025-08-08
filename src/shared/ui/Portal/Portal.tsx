import { PropsWithChildren, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useScrollLock } from 'usehooks-ts'

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)
  return wrapperElement
}

type TPortal = {
  wrapperId: string
}

export function Portal({
  children,
  wrapperId = 'react-portal-wrapper',
}: PropsWithChildren<TPortal>) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

  useScrollLock({ autoLock: true, lockTarget: 'html', widthReflow: true })

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBody(wrapperId)
    }
    setWrapperElement(element)

    return () => {
      // delete the programatically created element
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  if (!wrapperElement) return null

  return createPortal(children, wrapperElement)
}
