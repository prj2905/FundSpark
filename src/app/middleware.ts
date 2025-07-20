import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
export { default } from 'next-auth/middleware'


export async function middleware(request: NextRequest) {
    const token =  await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const url = request.nextUrl;

    if(token && (
        url.pathname.startsWith('auth/login') ||
        url.pathname.startsWith('auth/signup') ||
        url.pathname === '/'
    )){
      return NextResponse.redirect(new URL('/', request.url))
    }

  return NextResponse.redirect(new URL('/home', request.url))
}
 

export const config = {
  matcher: ['/auth/login','auth/signup','/','/dashboard']
}