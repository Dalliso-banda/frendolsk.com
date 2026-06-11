import type { Metadata } from 'next';
import type { NextRequest } from 'next/server';
import type React from 'react';

export interface ExtensionHelpers {
  auth: typeof import('@/auth').auth;
  getDb: typeof import('@/db').getDb;
  verifyAdmin: typeof import('@/lib/auth-helpers').verifyAdmin;
}

export interface AdminPageExtension {
  /** Route href, e.g. '/admin/telemetry' */
  href: `/admin/${string}`;
  /** Dynamic import for the page component */
  loadPage: () => Promise<{ default: React.ComponentType } | React.ComponentType>;
  /** Optional metadata for the dynamic admin page */
  getMetadata?: () => Promise<Metadata> | Metadata;
}

export type ApiExtensionMethod = 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT';

export interface ApiExtensionContext {
  params: {
    path: string[];
  };
  helpers: ExtensionHelpers;
}

export type ApiExtensionHandler = (
  request: NextRequest,
  context: ApiExtensionContext
) => Promise<Response> | Response;

export interface ApiExtension {
  /** Route path, e.g. '/api/telemetry' */
  path: `/api/${string}`;
  handlers: Partial<Record<ApiExtensionMethod, ApiExtensionHandler>>;
}
