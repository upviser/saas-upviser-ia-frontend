# 🚀 Guía de Despliegue Multi-Tenant en Vercel

## 📋 Configuración Completa para Dominios Dinámicos

### 1. 🏗️ Configuración del Proyecto

#### Variables de Entorno Necesarias

Crea un archivo `.env.local` con estas variables:

```env
# Configuración Multi-Tenant
# ========================

# Variables para el servidor (Node.js)
DEFAULT_DOMAIN=tu-dominio-principal.vercel.app
DEFAULT_TENANT_ID=default

# Variables para el cliente (Navegador)
NEXT_PUBLIC_DEFAULT_DOMAIN=tu-dominio-principal.vercel.app
NEXT_PUBLIC_DEFAULT_TENANT_ID=default

# URL de la API (ajusta según tu backend)
NEXT_PUBLIC_API_URL=https://tu-api-backend.com/api

# URL del sitio web principal
NEXT_PUBLIC_WEB_URL=https://tu-dominio-principal.vercel.app
```

### 2. 🌐 Configuración en Vercel

#### Paso 1: Desplegar el Proyecto

1. **Conecta tu repositorio a Vercel:**
   ```bash
   # Instala Vercel CLI si no lo tienes
   npm i -g vercel
   
   # Login en Vercel
   vercel login
   
   # Despliega el proyecto
   vercel
   ```

2. **Configura las variables de entorno en Vercel:**
   - Ve a tu proyecto en Vercel Dashboard
   - Settings → Environment Variables
   - Agrega todas las variables del `.env.local`

#### Paso 2: Configurar Dominios

##### Opción A: Subdominios de tu dominio principal (Recomendado)

1. **Configura el dominio principal:**
   - En Vercel Dashboard → Settings → Domains
   - Agrega: `upviser.cl` (tu dominio principal)
   - Configura DNS en tu proveedor de dominio:
     ```
     A     @     76.76.19.61
     CNAME www   cname.vercel-dns.com
     ```

2. **Configura wildcard para subdominios:**
   - En Vercel Dashboard → Settings → Domains
   - Agrega: `*.upviser.cl`
   - Configura DNS:
     ```
     CNAME *     cname.vercel-dns.com
     ```

##### Opción B: Dominios Personalizados

1. **Para cada cliente con dominio personalizado:**
   - En Vercel Dashboard → Settings → Domains
   - Agrega el dominio del cliente (ej: `cliente1.cl`)
   - El cliente debe configurar DNS:
     ```
     CNAME @     cname.vercel-dns.com
     CNAME www   cname.vercel-dns.com
     ```

### 3. 🔧 Configuración DNS Detallada

#### Para Subdominios (cliente1.upviser.cl)

En tu proveedor de DNS (ej: Cloudflare, Namecheap, etc.):

```
Tipo    Nombre        Valor
A       @             76.76.19.61
CNAME   www           cname.vercel-dns.com
CNAME   *             cname.vercel-dns.com
```

#### Para Dominios Personalizados (cliente1.cl)

El cliente debe configurar en su proveedor de DNS:

```
Tipo    Nombre        Valor
CNAME   @             cname.vercel-dns.com
CNAME   www           cname.vercel-dns.com
```

### 4. 🎯 Configuración del Backend

Tu backend debe tener un endpoint `/tenants` que devuelva:

```json
[
  {
    "domain": "cliente1.upviser.cl",
    "tenantId": "tenant_cliente1"
  },
  {
    "domain": "cliente2.upviser.cl", 
    "tenantId": "tenant_cliente2"
  },
  {
    "domain": "cliente1.cl",
    "tenantId": "tenant_cliente1_personalizado"
  }
]
```

### 5. 🧪 Testing Local

Para probar localmente con diferentes dominios:

1. **Modifica tu `/etc/hosts`:**
   ```
   127.0.0.1 cliente1.upviser.cl
   127.0.0.1 cliente1.cl
   ```

2. **Ejecuta el proyecto:**
   ```bash
   npm run dev
   ```

3. **Accede a:**
   - `http://cliente1.upviser.cl:3000`
   - `http://cliente1.cl:3000`

### 6. 🚀 Despliegue en Producción

#### Comandos de Despliegue:

```bash
# Despliegue inicial
vercel --prod

# Despliegues posteriores
git push origin main
# Vercel se despliega automáticamente
```

#### Verificación Post-Despliegue:

1. **Verifica que el dominio principal funciona:**
   - `https://upviser.cl`

2. **Verifica subdominios:**
   - `https://cliente1.upviser.cl`
   - `https://cliente2.upviser.cl`

3. **Verifica dominios personalizados:**
   - `https://cliente1.cl`

### 7. 🔍 Debugging

#### Verificar Headers:

```bash
# Verificar headers de dominio
curl -I https://cliente1.upviser.cl

# Deberías ver:
# X-Hostname: cliente1.upviser.cl
# X-Subdomain: cliente1
```

#### Logs en Vercel:

1. Ve a Vercel Dashboard → Functions
2. Revisa los logs para ver los headers
3. Verifica que el middleware está funcionando

### 8. 📊 Monitoreo

#### Métricas Importantes:

1. **Tiempo de respuesta por dominio**
2. **Errores 404 por dominio**
3. **Uso de ancho de banda por tenant**

#### Herramientas Recomendadas:

- **Vercel Analytics** (incluido)
- **Google Analytics** (por tenant)
- **Sentry** (para errores)

### 9. 🔒 Seguridad

#### Headers de Seguridad:

El middleware ya incluye:
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

#### Validación de Dominios:

```typescript
// En tu backend, valida que el dominio esté permitido
const allowedDomains = [
  'upviser.cl',
  '*.upviser.cl',
  'cliente1.cl',
  'cliente2.cl'
]
```

### 10. 🎉 ¡Listo!

Tu aplicación multitenant está configurada para:

✅ **Subdominios dinámicos**: `cliente1.upviser.cl`
✅ **Dominios personalizados**: `cliente1.cl`
✅ **SSL automático** en Vercel
✅ **CDN global** incluido
✅ **Escalabilidad automática**

### 📞 Soporte

Si tienes problemas:

1. **Revisa los logs** en Vercel Dashboard
2. **Verifica DNS** con herramientas como `dig` o `nslookup`
3. **Prueba localmente** con `/etc/hosts`
4. **Contacta soporte** si es necesario

---

**¡Tu aplicación multitenant está lista para producción!** 🚀
