/**
 * Analytics Database Layer
 * ========================
 * 
 * Manages page views, referrer tracking, and aggregated statistics.
 * Privacy-focused: No PII stored, data is aggregated for insights.
 */

import { getDb } from './index';

// =============================================================================
// Types
// =============================================================================

export interface PageView {
  id: string;
  sessionId: string;
  pagePath: string;
  pageTitle: string | null;
  referrerUrl: string | null;
  referrerDomain: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  deviceType: string | null;
  browser: string | null;
  os: string | null;
  country: string | null;
  isBot: boolean;
  statusCode: number;
  createdAt: Date;
}

export interface PageViewInput {
  sessionId: string;
  pagePath: string;
  pageTitle?: string;
  referrerUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  country?: string;
  isBot?: boolean;
  statusCode?: number;
}

export interface DailyStats {
  date: string;
  pagePath: string;
  referrerDomain: string | null;
  pageViews: number;
  uniqueVisitors: number;
}

export interface ReferrerStats {
  id: string;
  referrerDomain: string;
  referrerUrlSample: string | null;
  totalVisits: number;
  uniqueVisitors: number;
  firstSeenAt: Date;
  lastSeenAt: Date;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  total404s: number;
  topPages: { path: string; views: number; uniqueVisitors: number }[];
  topReferrers: { domain: string; visits: number; uniqueVisitors: number }[];
  recentReferrers: { domain: string; url: string | null; visitedAt: Date }[];
  viewsByDay: { date: string; views: number; visitors: number }[];
  trafficSources: { source: string; visits: number }[];
  top404s: { path: string; hits: number; lastHit: Date }[];
}

export interface PaginatedPages {
  pages: { path: string; views: number; uniqueVisitors: number }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Paginated404s {
  errors: { path: string; hits: number; lastHit: Date; referrer: string | null }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedReferrers {
  referrers: { domain: string; visits: number; uniqueVisitors: number; lastVisit: Date }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PageReferrers {
  pagePath: string;
  referrers: { domain: string; visits: number; uniqueVisitors: number; lastVisit: Date }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ReferrerPages {
  referrerDomain: string;
  pages: { path: string; views: number; uniqueVisitors: number; lastVisit: Date }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Safely parse a value to number, handling null, undefined, BigInt, and string inputs
 */
function toNumber(value: unknown, defaultValue: number = 0): number {
  if (value === null || value === undefined) return defaultValue;
  if (typeof value === 'bigint') return Number(value);
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  return defaultValue;
}

/**
 * Extract domain from a URL
 */
function extractDomain(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.hostname.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Sanitize and validate input strings
 */
function sanitizeString(str: string | undefined, maxLength: number): string | null {
  if (!str || typeof str !== 'string') return null;
  return str.slice(0, maxLength).trim() || null;
}

// =============================================================================
// Page View Operations
// =============================================================================

/**
 * Record a page view
 */
export async function recordPageView(input: PageViewInput): Promise<void> {
  const db = getDb();
  
  const referrerDomain = extractDomain(input.referrerUrl);
  
  // Insert page view
  await db('analytics_page_views').insert({
    session_id: sanitizeString(input.sessionId, 64),
    page_path: sanitizeString(input.pagePath, 500) || '/',
    page_title: sanitizeString(input.pageTitle, 300),
    referrer_url: sanitizeString(input.referrerUrl, 2000),
    referrer_domain: referrerDomain,
    utm_source: sanitizeString(input.utmSource, 100),
    utm_medium: sanitizeString(input.utmMedium, 100),
    utm_campaign: sanitizeString(input.utmCampaign, 100),
    utm_term: sanitizeString(input.utmTerm, 100),
    utm_content: sanitizeString(input.utmContent, 100),
    device_type: sanitizeString(input.deviceType, 20),
    browser: sanitizeString(input.browser, 50),
    os: sanitizeString(input.os, 50),
    country: sanitizeString(input.country, 2),
    is_bot: input.isBot || false,
    status_code: input.statusCode || 200,
  });

  // Update referrer stats if we have a referrer
  if (referrerDomain) {
    await db('analytics_referrers')
      .insert({
        referrer_domain: referrerDomain,
        referrer_url_sample: sanitizeString(input.referrerUrl, 2000),
        total_visits: 1,
        unique_visitors: 1,
        first_seen_at: new Date(),
        last_seen_at: new Date(),
      })
      .onConflict('referrer_domain')
      .merge({
        total_visits: db.raw('analytics_referrers.total_visits + 1'),
        referrer_url_sample: sanitizeString(input.referrerUrl, 2000),
        last_seen_at: new Date(),
      });
  }

  // Update daily stats
  const today = new Date().toISOString().split('T')[0];
  await db('analytics_daily_stats')
    .insert({
      date: today,
      page_path: sanitizeString(input.pagePath, 500) || '/',
      referrer_domain: referrerDomain,
      page_views: 1,
      unique_visitors: 1,
      updated_at: new Date(),
    })
    .onConflict(['date', 'page_path', 'referrer_domain'])
    .merge({
      page_views: db.raw('analytics_daily_stats.page_views + 1'),
      updated_at: new Date(),
    });
}

// =============================================================================
// Analytics Queries
// =============================================================================

/**
 * Get analytics summary for a date range
 */
export async function getAnalyticsSummary(
  startDate: Date,
  endDate: Date
): Promise<AnalyticsSummary> {
  const db = getDb();

  // Total page views and unique visitors
  const totals = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .select(
      db.raw('COUNT(*) as total_views'),
      db.raw('COUNT(DISTINCT session_id) as unique_visitors')
    )
    .first();

  // Top pages
  const topPages = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .groupBy('page_path')
    .select(
      'page_path as path',
      db.raw('COUNT(*) as views'),
      db.raw('COUNT(DISTINCT session_id) as unique_visitors')
    )
    .orderBy('views', 'desc')
    .limit(10);

  // Top referrers
  const topReferrers = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .whereNotNull('referrer_domain')
    .groupBy('referrer_domain')
    .select(
      'referrer_domain as domain',
      db.raw('COUNT(*) as visits'),
      db.raw('COUNT(DISTINCT session_id) as unique_visitors')
    )
    .orderBy('visits', 'desc')
    .limit(10);

  // Recent referrers (last 20)
  const recentReferrers = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .whereNotNull('referrer_domain')
    .select(
      'referrer_domain as domain',
      'referrer_url as url',
      'created_at as visitedAt'
    )
    .orderBy('created_at', 'desc')
    .limit(20);

  // Views by day
  const viewsByDay = await db('analytics_daily_stats')
    .where('date', '>=', startDate.toISOString().split('T')[0])
    .where('date', '<=', endDate.toISOString().split('T')[0])
    .groupBy('date')
    .select(
      'date',
      db.raw('SUM(page_views) as views'),
      db.raw('SUM(unique_visitors) as visitors')
    )
    .orderBy('date', 'asc');

  // Traffic sources (UTM + referrer combined)
  const trafficSources = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .select(
      db.raw(`
        CASE 
          WHEN utm_source IS NOT NULL THEN utm_source
          WHEN referrer_domain IS NOT NULL THEN referrer_domain
          ELSE 'direct'
        END as source
      `),
      db.raw('COUNT(*) as visits')
    )
    .groupBy('source')
    .orderBy('visits', 'desc')
    .limit(15);

  // Total 404 errors
  const total404Result = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .where('status_code', 404)
    .count('* as count')
    .first();

  // Top 404 pages
  const top404s = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .where('status_code', 404)
    .groupBy('page_path')
    .select(
      'page_path as path',
      db.raw('COUNT(*) as hits'),
      db.raw('MAX(created_at) as last_hit')
    )
    .orderBy('hits', 'desc')
    .limit(10);

  return {
    totalPageViews: toNumber(totals?.total_views),
    uniqueVisitors: toNumber(totals?.unique_visitors),
    total404s: toNumber(total404Result?.count),
    topPages: topPages.map((p) => ({
      path: p.path,
      views: toNumber(p.views),
      uniqueVisitors: toNumber(p.unique_visitors),
    })),
    topReferrers: topReferrers.map((r) => ({
      domain: r.domain,
      visits: toNumber(r.visits),
      uniqueVisitors: toNumber(r.unique_visitors),
    })),
    recentReferrers: recentReferrers.map((r) => ({
      domain: r.domain,
      url: r.url,
      visitedAt: r.visitedAt,
    })),
    viewsByDay: viewsByDay.map((d) => ({
      date: d.date,
      views: toNumber(d.views),
      visitors: toNumber(d.visitors),
    })),
    trafficSources: trafficSources.map((s) => ({
      source: s.source,
      visits: toNumber(s.visits),
    })),
    top404s: top404s.map((e) => ({
      path: e.path,
      hits: toNumber(e.hits),
      lastHit: e.last_hit,
    })),
  };
}

/**
 * Get all-time referrer stats
 */
export async function getReferrerStats(limit: number = 50): Promise<ReferrerStats[]> {
  const db = getDb();
  
  const referrers = await db('analytics_referrers')
    .select('*')
    .orderBy('total_visits', 'desc')
    .limit(limit);

  return referrers.map((r) => ({
    id: r.id,
    referrerDomain: r.referrer_domain,
    referrerUrlSample: r.referrer_url_sample,
    totalVisits: r.total_visits,
    uniqueVisitors: r.unique_visitors,
    firstSeenAt: r.first_seen_at,
    lastSeenAt: r.last_seen_at,
  }));
}

/**
 * Get page view trends for a specific page
 */
export async function getPageTrends(
  pagePath: string,
  days: number = 30
): Promise<{ date: string; views: number }[]> {
  const db = getDb();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const trends = await db('analytics_daily_stats')
    .where('page_path', pagePath)
    .where('date', '>=', startDate.toISOString().split('T')[0])
    .groupBy('date')
    .select('date', db.raw('SUM(page_views) as views'))
    .orderBy('date', 'asc');

  return trends.map((t) => ({
    date: t.date,
    views: toNumber(t.views),
  }));
}

/**
 * Get referrer details with their landing pages
 */
export async function getReferrerDetails(
  domain: string,
  limit: number = 50
): Promise<{ pagePath: string; visits: number; lastVisit: Date }[]> {
  const db = getDb();

  const details = await db('analytics_page_views')
    .where('referrer_domain', domain)
    .where('is_bot', false)
    .groupBy('page_path')
    .select(
      'page_path as pagePath',
      db.raw('COUNT(*) as visits'),
      db.raw('MAX(created_at) as lastVisit')
    )
    .orderBy('visits', 'desc')
    .limit(limit);

  return details.map((d) => ({
    pagePath: d.pagePath,
    visits: toNumber(d.visits),
    lastVisit: d.lastVisit,
  }));
}

/**
 * Clean up old page view data (keep aggregates)
 */
export async function cleanupOldPageViews(daysToKeep: number = 90): Promise<number> {
  const db = getDb();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

  const result = await db('analytics_page_views')
    .where('created_at', '<', cutoffDate)
    .delete();

  return result;
}

// =============================================================================
// Paginated Queries for Drill-Down
// =============================================================================

/**
 * Get paginated list of all pages with view counts
 */
export async function getAllPages(
  startDate: Date,
  endDate: Date,
  page: number = 1,
  limit: number = 50
): Promise<PaginatedPages> {
  const db = getDb();
  const offset = (page - 1) * limit;

  // Get total count
  const countResult = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .countDistinct('page_path as count')
    .first();

  const total = toNumber(countResult?.count);

  // Get paginated results
  const pages = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .groupBy('page_path')
    .select(
      'page_path as path',
      db.raw('COUNT(*) as views'),
      db.raw('COUNT(DISTINCT session_id) as unique_visitors')
    )
    .orderBy('views', 'desc')
    .limit(limit)
    .offset(offset);

  return {
    pages: pages.map((p) => ({
      path: p.path,
      views: toNumber(p.views),
      uniqueVisitors: toNumber(p.unique_visitors),
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Get paginated list of all 404 errors
 */
export async function getAll404s(
  startDate: Date,
  endDate: Date,
  page: number = 1,
  limit: number = 50
): Promise<Paginated404s> {
  const db = getDb();
  const offset = (page - 1) * limit;

  // Get total count of unique 404 paths
  const countResult = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .where('status_code', 404)
    .countDistinct('page_path as count')
    .first();

  const total = toNumber(countResult?.count);

  // Get paginated results with referrer info
  const errors = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .where('status_code', 404)
    .groupBy('page_path')
    .select(
      'page_path as path',
      db.raw('COUNT(*) as hits'),
      db.raw('MAX(created_at) as last_hit'),
      db.raw('(SELECT referrer_domain FROM analytics_page_views pv2 WHERE pv2.page_path = analytics_page_views.page_path AND pv2.status_code = 404 ORDER BY pv2.created_at DESC LIMIT 1) as referrer')
    )
    .orderBy('hits', 'desc')
    .limit(limit)
    .offset(offset);

  return {
    errors: errors.map((e) => ({
      path: e.path,
      hits: toNumber(e.hits),
      lastHit: e.last_hit,
      referrer: e.referrer,
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Get paginated list of all referrers
 */
export async function getAllReferrers(
  startDate: Date,
  endDate: Date,
  page: number = 1,
  limit: number = 50
): Promise<PaginatedReferrers> {
  const db = getDb();
  const offset = (page - 1) * limit;

  // Get total count
  const countResult = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .whereNotNull('referrer_domain')
    .countDistinct('referrer_domain as count')
    .first();

  const total = toNumber(countResult?.count);

  // Get paginated results
  const referrers = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .whereNotNull('referrer_domain')
    .groupBy('referrer_domain')
    .select(
      'referrer_domain as domain',
      db.raw('COUNT(*) as visits'),
      db.raw('COUNT(DISTINCT session_id) as unique_visitors'),
      db.raw('MAX(created_at) as last_visit')
    )
    .orderBy('visits', 'desc')
    .limit(limit)
    .offset(offset);

  return {
    referrers: referrers.map((r) => ({
      domain: r.domain,
      visits: toNumber(r.visits),
      uniqueVisitors: toNumber(r.unique_visitors),
      lastVisit: r.last_visit,
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

// =============================================================================
// Granular Drill-Down Queries
// =============================================================================

/**
 * Get referrers for a specific page (drill-down from pages view)
 */
export async function getReferrersForPage(
  pagePath: string,
  startDate: Date,
  endDate: Date,
  page: number = 1,
  limit: number = 50
): Promise<PageReferrers> {
  const db = getDb();
  const offset = (page - 1) * limit;

  // Get total count of unique referrers for this page
  const countResult = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .where('page_path', pagePath)
    .whereNotNull('referrer_domain')
    .countDistinct('referrer_domain as count')
    .first();

  const total = toNumber(countResult?.count);

  // Get paginated referrers for this specific page
  const referrers = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .where('page_path', pagePath)
    .whereNotNull('referrer_domain')
    .groupBy('referrer_domain')
    .select(
      'referrer_domain as domain',
      db.raw('COUNT(*) as visits'),
      db.raw('COUNT(DISTINCT session_id) as unique_visitors'),
      db.raw('MAX(created_at) as last_visit')
    )
    .orderBy('visits', 'desc')
    .limit(limit)
    .offset(offset);

  return {
    pagePath,
    referrers: referrers.map((r) => ({
      domain: r.domain,
      visits: toNumber(r.visits),
      uniqueVisitors: toNumber(r.unique_visitors),
      lastVisit: r.last_visit,
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Get pages visited from a specific referrer (drill-down from referrers view)
 */
export async function getPagesFromReferrer(
  referrerDomain: string,
  startDate: Date,
  endDate: Date,
  page: number = 1,
  limit: number = 50
): Promise<ReferrerPages> {
  const db = getDb();
  const offset = (page - 1) * limit;

  // Get total count of unique pages from this referrer
  const countResult = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .where('referrer_domain', referrerDomain)
    .countDistinct('page_path as count')
    .first();

  const total = toNumber(countResult?.count);

  // Get paginated pages visited from this referrer
  const pages = await db('analytics_page_views')
    .where('created_at', '>=', startDate)
    .where('created_at', '<=', endDate)
    .where('is_bot', false)
    .where('referrer_domain', referrerDomain)
    .groupBy('page_path')
    .select(
      'page_path as path',
      db.raw('COUNT(*) as views'),
      db.raw('COUNT(DISTINCT session_id) as unique_visitors'),
      db.raw('MAX(created_at) as last_visit')
    )
    .orderBy('views', 'desc')
    .limit(limit)
    .offset(offset);

  return {
    referrerDomain,
    pages: pages.map((p) => ({
      path: p.path,
      views: toNumber(p.views),
      uniqueVisitors: toNumber(p.unique_visitors),
      lastVisit: p.last_visit,
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}