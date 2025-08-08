'use client'

import Script from 'next/script'
import { FC, useCallback, useEffect, useId, useRef } from 'react'

import { useChekoutStore, useNgeniusStore } from '@/shared/store'

import { patchCustomElementsDefineOnce } from './lib'
import cls from './style.module.sass'

export type TPaymentMethodForm = { t?: unknown }

export const PaymentMethodForm: FC<TPaymentMethodForm> = () => {
  patchCustomElementsDefineOnce()
  const { setIsFormValid } = useChekoutStore()

  const mountId = useId()
  const paymentContainerRef = useRef<HTMLDivElement>(null)
  const { ni, setNiStore } = useNgeniusStore()

  const handleScriptReady = useCallback(() => {
    if (!ni && window.NI) {
      setNiStore(window.NI)
    }
  }, [ni, setNiStore])

  useEffect(() => {
    ni?.mountCardInput(mountId, {
      style: {
        main: {
          backgroundColor: 'white',
          fontFamily: 'Noto Sans',
          fontUrl:
            'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap',
          padding: '0px',
          height: '38px',
        },
        base: {
          fontUrl:
            'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap',
          fontFamily: 'Noto Sans',
          borderRadius: '4px',
          padding: '0px',
          minHeight: '38px',
          marginTop: '.375rem',
          margin: '0px',
          display: 'flex',
          rowGap: '1rem',
        },
        input: {
          fontUrl:
            'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap',
          fontFamily: 'Noto Sans',
          borderWidth: '1px',
          background: '#fafafa',
          borderColor: '#e5e5e5',
          borderStyle: 'solid',
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '143%',
          padding: '0px 14px',
          marginTop: '.375rem',
          display: 'flex',
          marginBottom: '1rem',
          marginRight: '2rem',
        },
        showInputsLabel: true,
      },
      language: 'en',
      apiKey: process.env.NEXT_PUBLIC_HOSTED_SESSION_SERVICE_ACCOUNT || 'key',
      outletRef: process.env.NEXT_PUBLIC_OUTLET_REF || '',
      onSuccess: console.log,
      onFail: console.error,

      onChangeValidStatus: (props) => {
        setIsFormValid('paymentValid', Object.values(props).every(Boolean))
      },
    })

    const ref = paymentContainerRef.current

    return () => {
      ni?.unMountCardInputs()

      if (ref) {
        ref.innerHTML = ''
      }
    }
  }, [mountId, ni, setIsFormValid])

  return (
    <>
      <Script
        src="https://paypage.sandbox.ngenius-payments.com/hosted-sessions/sdk.js"
        strategy="afterInteractive"
        onLoad={handleScriptReady}
      />

      <div className={cls.wrapper}>
        <div ref={paymentContainerRef} id={mountId} className={cls.form} />
      </div>
    </>
  )
}
