import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''
  
  // Log para debugging
  console.log('Middleware - Hostname:', hostname)
  console.log('Middleware - Pathname:', pathname)
  
  // Permitir que todas las rutas pasen, pero agregar headers útiles
  const response = NextResponse.next()
  
  // Agregar headers para debugging
  response.headers.set('X-Hostname', hostname)
  response.headers.set('X-Pathname', pathname)
  
  // Si es un subdominio de upviser.cl, agregar header especial
  if (hostname.includes('.upviser.cl')) {
    const subdomain = hostname.split('.')[0]
    response.headers.set('X-Subdomain', subdomain)
  }
  
  // Si es un dominio .cl personalizado, agregar header especial
  if (hostname.endsWith('.cl') && !hostname.includes('upviser.cl')) {
    response.headers.set('X-Custom-Domain', 'true')
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
