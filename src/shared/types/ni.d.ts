// types/ni.d.ts
declare global {
  /* ---------- shared ---------- */

  interface NiCardInputValidStatus {
    isCVVValid: boolean
    isExpiryValid: boolean
    isNameValid: boolean
    isPanValid: boolean
  }

  // type NiCSS = Partial<CSSStyleDeclaration> | Record<string, unknown>;
  type NiCSS = NiStyle

  /* ---------- mountCardInput ---------- */

  interface NiMountCardInputOptions {
    style?: NiCSS // кастомизация UI:contentReference[oaicite:0]{index=0}
    apiKey: string
    language?: 'en' | 'ar'
    outletRef: string
    onSuccess?: (event: unknown) => void
    onFail?: (error: unknown) => void
    onChangeValidStatus?: (status: NiCardInputValidStatus) => void
  }

  interface NiMountedCardInput {
    /** демонтирует поля карты и освобождает ресурсы */
    destroy: () => void
  }

  /* ---------- generateSessionId ---------- */

  interface NiStyle {
    /** стиль контейнера вокруг инпута */
    main?: NiStyleBlock
    /** дефолтные стили SDK */
    base?: NiStyleBlock
    /** кастомные стили полей */
    input?: NiStyleBlock
    /** стили для невалидного состояния */
    invalid?: NiStyleBlock
    showInputsLabel?: boolean
  }

  interface NiGenerateSessionIdResponse {
    session_id: string
  } // пример в доках:contentReference[oaicite:1]{index=1}

  /* ---------- handlePaymentResponse ---------- */

  interface NiHandlePaymentResponseOptions {
    /** mount‑id контейнера для 3‑DS iframe */
    mountId?: string
    /** размеры/стиль 3‑DS iframe */
    style?:
      | NiCSS
      | {
          width?: number
          height?: number
        }
  }

  interface NiPaymentResponse {
    status: keyof NiAPI['paymentStates']
    error?: unknown
  } // сигнатура из доков :contentReference[oaicite:2]{index=2}

  /* ---------- главная точка SDK ---------- */

  interface NiAPI {
    /** Вставляет поля ввода карты в DOM‑элемент. */
    mountCardInput(mountId: string, options: NiMountCardInputOptions): NiMountedCardInput

    /** Сносит ВСЕ смонтированные инпуты (грубый вариант). */
    unMountCardInputs(): void

    /** Генерирует одноразовый session_id для оплаты. */
    generateSessionId(): Promise<NiGenerateSessionIdResponse>

    /**
     * Обрабатывает ответ платежного API.
     * При 3‑DS можно дополнительно смонтировать challenge‑iframe.
     */
    handlePaymentResponse(
      paymentResponse: unknown,
      opts?: NiHandlePaymentResponseOptions
    ): Promise<NiPaymentResponse>

    /** Константы статус‑машины платежей (AUTHORISE / CAPTURE / …). */
    paymentStates: {
      AUTHORISED: 'AUTHORISED'
      CAPTURED: 'CAPTURED'
      VERIFIED: 'VERIFIED'
      FAILED: 'FAILED'
      THREE_DS_FAILURE: 'THREE_DS_FAILURE'
    }
  }

  /* ---------- глобализация ---------- */

  interface Window {
    NI: NiAPI
  }
}

export {}
