import axios, { AxiosRequestConfig } from 'axios'
import { getClientTenantId } from './tenantUtils'

// Función helper para crear peticiones con tenantId
export const createApiClient = async (tenantId?: string) => {
  const resolvedTenantId = tenantId || await getClientTenantId()
  
  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  })

  // Interceptor para agregar el tenantId a todas las peticiones
  apiClient.interceptors.request.use(
    (config) => {
      if (resolvedTenantId) {
        config.headers['x-tenant-id'] = resolvedTenantId
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return apiClient
}

// Función helper para peticiones individuales
export const apiRequest = async (config: AxiosRequestConfig, tenantId?: string) => {
  const resolvedTenantId = tenantId || await getClientTenantId()
  
  const headers = {
    ...config.headers,
    ...(resolvedTenantId && { 'x-tenant-id': resolvedTenantId })
  }

  return axios({
    ...config,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers
  })
}

// Función helper para fetch con tenantId
export const fetchWithTenant = async (url: string, options: RequestInit = {}, tenantId?: string) => {
  const resolvedTenantId = tenantId || await getClientTenantId()
  
  const headers = {
    ...options.headers,
    ...(resolvedTenantId && { 'x-tenant-id': resolvedTenantId })
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers
  })
}

