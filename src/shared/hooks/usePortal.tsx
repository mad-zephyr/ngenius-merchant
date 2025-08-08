'use client'

import { PropsWithChildren, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type TReactPortal = {
  wrapperId: string
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)
  return wrapperElement
}

export function ReactPortal({
  children,
  wrapperId = 'react-portal-wrapper',
}: PropsWithChildren<TReactPortal>) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

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

// /** Хук-обёртка для React-портала */
// export function usePortal() {
//   const [container, setContainer] = useState<HTMLElement | null>(null)
//   const id = useId()

//   useLayoutEffect(() => {
//     if (!container) {
//       const modalRoot = document.getElementById(id)
//       let created = false

//       if (!modalRoot) {
//         created = true
//         setContainer(createWrapperAndAppendToBody(id))
//       }

//       setContainer(modalRoot)
//     }

//     return () => {
//       if (container?.parentNode) {
//         container.parentNode.removeChild(container)
//       }
//     }
//   }, [id, container])

//   return {
//     portal: (children: ReactNode) => (container ? createPortal(children, container) : <></>),
//   }
// }
