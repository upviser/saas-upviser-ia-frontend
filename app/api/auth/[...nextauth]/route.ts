import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import Account from '@/models/Account'
import bcrypt from 'bcrypt'
import { connectDB } from '@/database/db'
import { NextRequest } from "next/server"

const getAuthOptions = (req: NextRequest) => {
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host')
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`

  return {
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
          if (!userFound) throw new Error('Credenciales inválidas')

          const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password)
          if (!passwordMatch) throw new Error('Credenciales inválidas')

          return {
            id: (userFound._id as any).toString(),
            email: userFound.email,
            tenantId: userFound.tenantId,
            firstName: userFound.firstName,
            lastName: userFound.lastName
          }
        }
      })
    ],
    callbacks: {
      jwt({ token, user }: { token: any, user: any }) {
        if (user) {
          token.user = user
          token.user.tenantId = user.tenantId
        }
        return token
      },
      session({ session, token }: { session: any, token: any }) {
        session.user = token.user
        if (token.user?.tenantId) {
          session.user.tenantId = token.user.tenantId
        }
        return session
      },
      redirect({ url, baseUrl: _defaultBaseUrl }: { url: string, baseUrl: string }) {
        // Redirige al dominio actual
        return url.startsWith('/') ? `${baseUrl}${url}` : url
      },
    },
    pages: {
      signIn: '/login'
    }
  }
}

const handler = async (req: NextRequest, res: any) => {
  const options = getAuthOptions(req)
  return NextAuth(req, res, options)
}

export { handler as GET, handler as POST }