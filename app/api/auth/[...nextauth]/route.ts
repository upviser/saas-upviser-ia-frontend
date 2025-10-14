import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import Account from '@/models/Account'
import bcrypt from 'bcrypt'
import { connectDB } from '@/database/db'
import { NextRequest } from "next/server"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Contraseña', type: 'password', placeholder: '******' }
      },
      async authorize(credentials) {
         await connectDB()
    
        const userFound = await Account.findOne({ email: credentials?.email.toLowerCase() }).select('+password')
        if (!userFound) throw new Error('Credenciales invalidas')
          
        const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password)
        if (!passwordMatch) throw new Error('Credenciales invalidas')
    
        return userFound
      }
    })
  ],
  callbacks: {
    jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.user = user
        // Asegurar que el tenantId esté disponible en el token
        token.user.tenantId = user.tenantId
      }
      return token
    },
    session({ session, token }: { session: any, token: any }) {
      session.user = token.user as any
      // Asegurar que el tenantId esté disponible en la sesión
      if (token.user?.tenantId) {
        session.user.tenantId = token.user.tenantId
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}

const handler = async (req: NextRequest, res: any) => {
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host')
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'

  // Asignamos la URL base dinámica antes de ejecutar NextAuth
  process.env.NEXTAUTH_URL = `${protocol}://${host}`

  return NextAuth(req, res, authOptions)
}

export { handler as GET, handler as POST }