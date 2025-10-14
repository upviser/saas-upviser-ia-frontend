// Utilidades para manejar tenantId basado en dominio

// Función para obtener tenantId del lado del servidor
export async function getServerTenantId(): Promise<string> {
  try {
    const hostname = process.env.NODE_ENV === 'development' 
      ? 'localhost' 
      : process.env.DEFAULT_DOMAIN || 'localhost'
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch tenants')
    }
    
    const tenants = await response.json()
    
    // Buscar tenant por dominio exacto
    const tenant = tenants.find((t: any) => t.domain === hostname)
    
    if (!tenant) {
      console.warn(`No tenant found for domain: ${hostname}`)
      return process.env.DEFAULT_TENANT_ID || 'default'
    }
    
    return tenant.tenantId
  } catch (error) {
    console.error('Error getting tenant ID:', error)
    return process.env.DEFAULT_TENANT_ID || 'default'
  }
}

// Función para obtener tenantId del lado del cliente
export async function getClientTenantId(): Promise<string> {
  try {
    const hostname = window.location.hostname
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch tenants')
    }
    
    const tenants = await response.json()
    
    // Buscar tenant por dominio exacto
    const tenant = tenants.find((t: any) => t.domain === hostname)
    
    if (!tenant) {
      console.warn(`No tenant found for domain: ${hostname}`)
      return process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID || 'default'
    }
    
    return tenant.tenantId
  } catch (error) {
    console.error('Error getting tenant ID:', error)
    return process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID || 'default'
  }
}

