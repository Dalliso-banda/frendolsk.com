import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Cookie name must match what's configured in auth.ts
const cookieName = process.env.NODE_ENV === 'production'
  ? '__Secure-authjs.session-token'
  : 'authjs.session-token';

// Get secret directly from env (Edge runtime compatible)
const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth check for login page and API routes
  if (pathname === '/admin/login' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Protect all admin routes
  if (pathname.startsWith('/admin')) {
    try {
      const token = await getToken({
        req: request,
        secret,
        cookieName,
      });

      // Not logged in - redirect to login
      if (!token) {
        const url = new URL('/admin/login', request.url);
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
      }

      // Not admin - redirect to home
      if (token.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }

      // Logged in as admin - allow access
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match admin routes except static files and API
  matcher: ['/admin/:path*'],
};
