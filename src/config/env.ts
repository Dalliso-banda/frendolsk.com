import 'dotenv/config';
/**
 * Centralized Environment Configuration
 * =====================================
 *
 * All environment variables are defined and validated here.
 * Import from this file instead of using process.env directly.
 *
 * Local Development: Values from .env file
 * Production Docker: Values from docker-compose.override.yml (GitHub Secrets)
 */

// =============================================================================
// Helper Functions
// =============================================================================
console.log('Dotenv Check:', process.env.DATABASE_NAME || 'FAILED: Not loading from .env');
function getEnv(key: string, defaultValue: string = ''): string {

  return process.env[key] || defaultValue;

}

function getEnvInt(key: string, defaultValue: number): number {
  const value = process.env[key];
  return value ? parseInt(value, 10) : defaultValue;
}

function getEnvBool(key: string, defaultValue: boolean): boolean {
  const value = process.env[key];
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
}

// =============================================================================
// Environment Detection
// =============================================================================

export const env = {
  /** Current environment: 'development', 'production', 'test' */
  NODE_ENV: getEnv('NODE_ENV', 'development'),

  /** Whether running in production */
  isProduction: process.env.NODE_ENV === 'production',

  /** Whether running in development */
  isDevelopment: process.env.NODE_ENV === 'development',

  /** Whether running in test */
  isTest: process.env.NODE_ENV === 'test',
};

// =============================================================================
// Application Configuration
// =============================================================================

export const app = {
  /** Public URL of the site */
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  /** Site name displayed in UI */
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'My Site',

  /** Site description for SEO */
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'A personal website',
};

// =============================================================================
// Author Configuration (keep personal info in .env, not in code)
// IMPORTANT: Must use direct process.env access for NEXT_PUBLIC_ vars
// so Next.js can inline them at build time for client components
// =============================================================================

export const author = {
  /** Author's display name */
  name: process.env.NEXT_PUBLIC_AUTHOR_NAME || 'Your Name',

  /** Author's email */
  email: process.env.NEXT_PUBLIC_AUTHOR_EMAIL || 'you@example.com',

  /** Author's website URL */
  url: process.env.NEXT_PUBLIC_AUTHOR_URL || 'https://example.com',
};

// =============================================================================
// Social Links (keep personal info in .env, not in code)
// =============================================================================

export const social = {
  twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || '',
  github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB || '',
  linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || '',
  facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || '',
  instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || '',
  tiktok: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK || '',
  youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || '',
  discord: process.env.NEXT_PUBLIC_SOCIAL_DISCORD || '',
};

// =============================================================================
// Database Configuration
// =============================================================================

export const database = {
  /** Full connection URL (takes precedence if set) */
  url: getEnv('DATABASE_URL'),

  /** Database host */
  host: getEnv('DATABASE_HOST', 'localhost'),

  /** Database port */
  port: getEnvInt('DATABASE_PORT', 5432),

  /** Database name */
  name: getEnv('DATABASE_NAME', 'mysite'),

  /** Database user */
  user: getEnv('DATABASE_USER', 'postgres'),

  /** Database password */
  password: getEnv('DATABASE_PASSWORD', ''),

  /** Whether to use SSL (auto-enabled in production) */
  ssl: env.isProduction,
};

// =============================================================================
// Authentication Configuration
// =============================================================================

export const auth = {
  /** Secret for session encryption (NextAuth/Auth.js) */
  secret: getEnv('AUTH_SECRET') || getEnv('NEXTAUTH_SECRET', 'dev-secret-change-in-production'),

  /** Auth callback URL */
  url: getEnv('AUTH_URL') || getEnv('NEXTAUTH_URL', 'http://localhost:3000'),

  /** Session duration in seconds */
  sessionDuration: getEnvInt('AUTH_SESSION_DURATION', 86400), // 24 hours

  /** CSRF secret */
  csrfSecret: getEnv('CSRF_SECRET', 'csrf-dev-secret'),
};

// =============================================================================
// Admin Configuration (for seeding)
// =============================================================================

export const admin = {
  /** Admin email address */
  email: getEnv('ADMIN_EMAIL', 'admin@localhost.com'),

  /** Admin password (for initial seeding only) */
  password: getEnv('ADMIN_PASSWORD') || getEnv('ADMIN_INITIAL_PASSWORD', 'changeme123'),

  /** Admin display name */
  name: getEnv('ADMIN_NAME', 'Admin'),
};

// =============================================================================
// File Upload Configuration
// =============================================================================

export const upload = {
  /** Max file size in MB (default 50MB for large phone photos) */
  maxSizeMb: getEnvInt('UPLOAD_MAX_SIZE_MB', 50),

  /** Max file size in bytes */
  maxSizeBytes: getEnvInt('UPLOAD_MAX_SIZE_MB', 50) * 1024 * 1024,

  /** Allowed MIME types */
  allowedTypes: getEnv(
    'UPLOAD_ALLOWED_TYPES',
    'image/jpeg,image/png,image/gif,image/webp,image/svg+xml,application/pdf,text/plain,text/markdown'
  ).split(','),

  /** Upload path */
  path: getEnv('UPLOAD_PATH', '/uploads'),

  /** Whether to generate image variants (thumbnails, etc.) */
  generateVariants: getEnvBool('UPLOAD_GENERATE_VARIANTS', true),

  /** Maximum dimension for original images (will be resized if larger) */
  maxOriginalDimension: getEnvInt('UPLOAD_MAX_DIMENSION', 4096),
};

// =============================================================================
// Rate Limiting Configuration
// =============================================================================

export const rateLimit = {
  /** Window duration in milliseconds */
  windowMs: getEnvInt('RATE_LIMIT_WINDOW_MS', 900000), // 15 minutes

  /** Max requests per window */
  maxRequests: getEnvInt('RATE_LIMIT_MAX_REQUESTS', 100),

  /** Max login attempts per window */
  loginMaxAttempts: getEnvInt('RATE_LIMIT_LOGIN_MAX', 5),
};

// =============================================================================
// Export all configs
// =============================================================================

const config = {
  env,
  app,
  database,
  auth,
  admin,
  upload,
  rateLimit,
};

export default config;
