/**
 * Authentication Helpers
 * ======================
 *
 * Helper functions for authentication in API routes.
 * Centralizes getToken configuration to match NextAuth cookie settings.
 */

import { getToken as nextAuthGetToken, JWT } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { auth } from '@/config/env';

/**
 * Cookie name used by NextAuth - must match auth.ts configuration
 */
const COOKIE_NAME =
  process.env.NODE_ENV === 'production'
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';

/**
 * Get the authentication token from a request.
 * This wrapper ensures the correct cookie name and secret are used.
 *
 * @param request - The NextRequest object
 * @returns The JWT token or null if not authenticated
 */
export async function getAdminToken(request: NextRequest): Promise<JWT | null> {
  return nextAuthGetToken({
    req: request,
    secret: auth.secret,
    cookieName: COOKIE_NAME,
  });
}

/**
 * Verify that a request is from an authenticated admin user.
 *
 * @param request - The NextRequest object
 * @returns The JWT token if authenticated as admin, null otherwise
 */
export async function verifyAdmin(request: NextRequest): Promise<JWT | null> {
  const token = await getAdminToken(request);
  if (!token || token.role !== 'admin') {
    return null;
  }
  return token;
}
