import { describe, expect, it, vi } from 'vitest';
import {
  compareVersions,
  fetchLatestRelease,
  getUpdateStatus,
  normalizeVersion,
} from './update-status';

describe('update-status', () => {
  it('normalizes version strings', () => {
    expect(normalizeVersion('v2.1.0')).toBe('2.1.0');
    expect(normalizeVersion(' 1.0.0 ')).toBe('1.0.0');
    expect(normalizeVersion(undefined)).toBe('0.0.0');
  });

  it('compares semantic versions numerically', () => {
    expect(compareVersions('1.2.0', '1.10.0')).toBe(-1);
    expect(compareVersions('2.0.0', '1.9.9')).toBe(1);
    expect(compareVersions('v1.0.0', '1.0.0')).toBe(0);
  });

  it('returns latest release metadata when GitHub API responds', async () => {
    const fakeFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        tag_name: 'v3.4.5',
        name: 'DevHolm 3.4.5',
        html_url: 'https://github.com/devholm/devholm.com/releases/tag/v3.4.5',
        published_at: '2026-06-01T00:00:00.000Z',
      }),
    });

    const latest = await fetchLatestRelease('devholm/devholm.com', fakeFetch);

    expect(latest).toEqual({
      repo: 'devholm/devholm.com',
      tagName: 'v3.4.5',
      version: '3.4.5',
      name: 'DevHolm 3.4.5',
      url: 'https://github.com/devholm/devholm.com/releases/tag/v3.4.5',
      publishedAt: '2026-06-01T00:00:00.000Z',
    });
  });

  it('computes update availability from current and latest versions', async () => {
    vi.stubEnv('NEXT_PUBLIC_APP_VERSION', '2.0.0');
    const fakeFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        tag_name: 'v2.1.0',
        name: 'DevHolm 2.1.0',
        html_url: 'https://example.com/release',
        published_at: '2026-06-10T00:00:00.000Z',
      }),
    });

    const status = await getUpdateStatus('devholm/devholm.com', fakeFetch);
    expect(status.updateAvailable).toBe(true);
    expect(status.latest?.version).toBe('2.1.0');

    vi.unstubAllEnvs();
  });
});
