import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      firstName: string;
      lastName: string
      email: string;
      phone?: number
      address?: string
      number?: number
      details?: string
      city?: string
      region?: string
    };
  }
}