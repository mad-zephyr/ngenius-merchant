import { useStore } from '@nanostores/react'
import { atom } from 'nanostores'

type NiStore = {
  ni?: NiAPI
}

export const $niStore = atom<NiStore>({
  ni: typeof window !== 'undefined' ? window?.NI : undefined,
})

export const setNiStore = (ni: NiAPI) => {
  console.log('NI SETED: ', ni)
  $niStore.set({ ...$niStore.get(), ni })
}

export const useNgeniusStore = () => {
  const { ni } = useStore($niStore)

  return { ni, setNiStore }
}
