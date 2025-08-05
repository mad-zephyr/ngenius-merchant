/* eslint-disable @typescript-eslint/no-explicit-any */

export function patchCustomElementsDefineOnce() {
  if (typeof window === 'undefined' || (window as any).__ced_patched) return
  ;(window as any).__ced_patched = true

  const orig = window.customElements.define
  window.customElements.define = (...args: Parameters<typeof orig>) => {
    if (!window.customElements.get(args[0] as string)) {
      return (orig as any).apply(window.customElements, args)
    }
  }
}
