import axios from 'axios'

// import { interceptorErrorRequest, interceptorRequest } from './interceptors'

export const getHttp = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL,
  })

  // instance.interceptors.request.use(interceptorRequest, interceptorErrorRequest)

  return instance
}
