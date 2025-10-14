#!/bin/bash

# 🚀 Script de Configuración Automática para Vercel Multi-Tenant
# =============================================================

echo "🏗️  Configurando proyecto multitenant en Vercel..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI no está instalado"
    echo "Instalando Vercel CLI..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        print_error "Error instalando Vercel CLI"
        exit 1
    fi
    print_success "Vercel CLI instalado correctamente"
fi

# Verificar si está logueado en Vercel
if ! vercel whoami &> /dev/null; then
    print_warning "No estás logueado en Vercel"
    echo "Iniciando sesión en Vercel..."
    vercel login
    if [ $? -ne 0 ]; then
        print_error "Error en el login de Vercel"
        exit 1
    fi
fi

print_success "Autenticado en Vercel"

# Crear archivo .env.local si no existe
if [ ! -f ".env.local" ]; then
    print_status "Creando archivo .env.local..."
    cat > .env.local << EOF
# Configuración Multi-Tenant
# ========================

# Variables para el servidor (Node.js)
DEFAULT_DOMAIN=localhost
DEFAULT_TENANT_ID=default

# Variables para el cliente (Navegador)
NEXT_PUBLIC_DEFAULT_DOMAIN=localhost
NEXT_PUBLIC_DEFAULT_TENANT_ID=default

# URL de la API (ajusta según tu backend)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# URL del sitio web
NEXT_PUBLIC_WEB_URL=http://localhost:3000
EOF
    print_success "Archivo .env.local creado"
else
    print_warning "El archivo .env.local ya existe"
fi

# Desplegar a Vercel
print_status "Desplegando proyecto a Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    print_success "Proyecto desplegado correctamente"
    
    echo ""
    echo "🎉 ¡Configuración completada!"
    echo ""
    echo "📋 Próximos pasos:"
    echo "1. Ve a tu dashboard de Vercel"
    echo "2. Configura las variables de entorno en Settings → Environment Variables"
    echo "3. Agrega tus dominios en Settings → Domains:"
    echo "   - upviser.cl (dominio principal)"
    echo "   - *.upviser.cl (subdominios wildcard)"
    echo "   - cliente1.cl, cliente2.cl, etc. (dominios personalizados)"
    echo "4. Configura DNS según la guía DEPLOYMENT_GUIDE.md"
    echo ""
    echo "📖 Lee DEPLOYMENT_GUIDE.md para instrucciones detalladas"
else
    print_error "Error desplegando el proyecto"
    exit 1
fi
