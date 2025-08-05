import { type AxiosRequestConfig } from 'axios'

import { getHttp } from './http'

export const api = {
  async get<T, R, D>(url: string, config?: AxiosRequestConfig<D> | undefined) {
    return await getHttp().get<T, R, D>(url, config)
  },
  async post<T, R, D>(url: string, data?: D, config?: AxiosRequestConfig<D> | undefined) {
    return await getHttp().post<T, R, D>(url, data, config)
  },
}
