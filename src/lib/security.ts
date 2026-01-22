import { NextResponse } from 'next/server';

/**
 * Generate secure HTTP headers for responses
 */
export function getSecurityHeaders(): HeadersInit {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': getCSP(),
  };
}

/**
 * Generate Content Security Policy
 */
function getCSP(): string {
  const directives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Needed for Next.js dev mode
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'img-src': ["'self'", 'data:', 'blob:', 'https:'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'connect-src': ["'self'"],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  };

  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}

/**
 * Add security headers to a NextResponse
 */
export function withSecurityHeaders(response: NextResponse): NextResponse {
  const headers = getSecurityHeaders();
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

/**
 * Rate limiting configuration
 */
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

// In-memory rate limit store (for single-instance deployment)
// For multi-instance, replace with Redis or DB-backed store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Check rate limit for a given key
 * @returns {boolean} true if request should be allowed, false if rate limited
 */
export function checkRateLimit(key: string, config: RateLimitConfig): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  // Clean up expired entries periodically
  if (Math.random() < 0.01) {
    cleanupRateLimits();
  }

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs });
    return true;
  }

  if (record.count >= config.maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Clean up expired rate limit entries
 */
function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Get remaining rate limit requests
 */
export function getRateLimitRemaining(key: string, config: RateLimitConfig): number {
  const record = rateLimitStore.get(key);
  if (!record || Date.now() > record.resetTime) {
    return config.maxRequests;
  }
  return Math.max(0, config.maxRequests - record.count);
}

/**
 * Bot detection heuristics
 */
export interface BotDetectionResult {
  isLikelyBot: boolean;
  reasons: string[];
}

export function detectBot(request: {
  userAgent?: string;
  timestamp?: number;
  honeypot?: string;
}): BotDetectionResult {
  const reasons: string[] = [];

  // Check honeypot field
  if (request.honeypot && request.honeypot.length > 0) {
    reasons.push('Honeypot field filled');
  }

  // Check submission time (too fast = likely bot)
  if (request.timestamp) {
    const submissionTime = Date.now() - request.timestamp;
    if (submissionTime < 3000) {
      // Less than 3 seconds
      reasons.push('Submitted too quickly');
    }
  }

  // Check user agent
  const userAgent = request.userAgent?.toLowerCase() || '';
  const botPatterns = [
    'bot',
    'crawler',
    'spider',
    'headless',
    'phantom',
    'selenium',
    'puppeteer',
    'playwright',
  ];

  if (botPatterns.some((pattern) => userAgent.includes(pattern))) {
    reasons.push('Bot-like user agent');
  }

  // Empty user agent
  if (!userAgent || userAgent.length < 10) {
    reasons.push('Missing or suspicious user agent');
  }

  return {
    isLikelyBot: reasons.length > 0,
    reasons,
  };
}

/**
 * Generate CSRF token
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate CSRF token
 */
export function validateCsrfToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;
  if (token.length !== storedToken.length) return false;

  // Constant-time comparison to prevent timing attacks
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ storedToken.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Sanitize IP address for logging
 */
export function sanitizeIp(ip: string | null): string {
  if (!ip) return 'unknown';
  // Handle IPv4-mapped IPv6 addresses
  if (ip.startsWith('::ffff:')) {
    return ip.slice(7);
  }
  return ip;
}

/**
 * Get client IP from request headers
 */
export function getClientIp(headers: Headers): string {
  // Check common proxy headers
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return sanitizeIp(forwardedFor.split(',')[0].trim());
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return sanitizeIp(realIp);
  }

  return 'unknown';
}
