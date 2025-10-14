'use client'

import { useState, useEffect } from 'react'
import { getClientTenantId } from './tenantUtils'
import { createApiClient, apiRequest, fetchWithTenant } from './apiClient'
import { AxiosRequestConfig } from 'axios'

// Hook para usar en componentes del cliente
export const useTenantId = () => {
  const [tenantId, setTenantId] = useState<string>('')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchTenantId = async () => {
      try {
        const id = await getClientTenantId()
        setTenantId(id)
      } catch (error) {
        console.error('Error fetching tenant ID:', error)
        setTenantId(process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID || 'default')
      } finally {
        setLoading(false)
      }
    }
    
    fetchTenantId()
  }, [])
  
  return { tenantId, loading }
}

// Hook personalizado para usar en componentes
export const useApiClient = () => {
  const [apiClient, setApiClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const initApiClient = async () => {
      try {
        const client = await createApiClient()
        setApiClient(client)
      } catch (error) {
        console.error('Error initializing API client:', error)
      } finally {
        setLoading(false)
      }
    }
    
    initApiClient()
  }, [])
  
  return {
    apiClient,
    loading,
    apiRequest: (config: AxiosRequestConfig) => apiRequest(config),
    fetchWithTenant: (url: string, options: RequestInit = {}) => fetchWithTenant(url, options)
  }
}
