import { AxiosRequestConfig } from 'axios'

import { paymentHttp } from './paymentHttp'

export const paymentApi = {
  async get<T, R, D>(url: string, config?: AxiosRequestConfig<D> | undefined) {
    return await paymentHttp().get<T, R, D>(url, config)
  },
  async post<T, R, D>(url: string, data?: D, config?: AxiosRequestConfig<D> | undefined) {
    return await paymentHttp().post<T, R, D>(url, data, config)
  },
}
