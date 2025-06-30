import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useRuntimeConfig } from '#app'

/**
 * Her çağrıda güncel baseURL ile axios instance döner
 */
function getApiInstance() {
  const config = useRuntimeConfig()
  const api = axios.create({
    baseURL: config.public.apiBase || "http://localhost:3000/api",
    // İstersen timeout, headers vs. ekleyebilirsin
  })

  // Response interceptor: Hata yönetimi
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: any) => {
      // Burada genel hata yönetimi yapabilirsin
      return Promise.reject(error)
    }
  )

  return api
}

/**
 * Genel amaçlı API fonksiyonu
 * @param method - 'get', 'post', 'put', 'delete' vs.
 * @param url - API endpoint (örn: '/users')
 * @param data - (Opsiyonel) POST/PUT için body
 * @param config - (Opsiyonel) Axios config
 * @returns AxiosResponse
 */
export async function apiRequest<T = any>(
  method: AxiosRequestConfig['method'],
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const api = getApiInstance()
  return api.request<T>({
    method,
    url,
    data,
    ...config,
  })
}

export { getApiInstance } 