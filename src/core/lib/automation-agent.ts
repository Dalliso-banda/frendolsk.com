import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { NextRequest } from 'next/server';
import { getSetting, upsertSetting } from '@/db/settings';

const AUTOMATION_SETTING_KEY = 'automation_agent_config';

export interface AutomationAgentConfig {
  enabled: boolean;
  postsEnabled: boolean;
  messagesReadEnabled: boolean;
  messagesWriteEnabled: boolean;
  allowCustomAuthor: boolean;
  defaultAuthorId: string | null;
  tokenHash: string | null;
  tokenHint: string | null;
  tokenUpdatedAt: string | null;
}

export interface PublicAutomationAgentConfig {
  enabled: boolean;
  postsEnabled: boolean;
  messagesReadEnabled: boolean;
  messagesWriteEnabled: boolean;
  allowCustomAuthor: boolean;
  defaultAuthorId: string | null;
  tokenConfigured: boolean;
  tokenHint: string | null;
  tokenUpdatedAt: string | null;
}

const defaultConfig: AutomationAgentConfig = {
  enabled: false,
  postsEnabled: false,
  messagesReadEnabled: false,
  messagesWriteEnabled: false,
  allowCustomAuthor: false,
  defaultAuthorId: null,
  tokenHash: null,
  tokenHint: null,
  tokenUpdatedAt: null,
};

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function parseConfig(value: unknown): AutomationAgentConfig {
  if (!value || typeof value !== 'object') {
    return { ...defaultConfig };
  }

  const source = value as Record<string, unknown>;
  return {
    enabled: source.enabled === true,
    postsEnabled: source.postsEnabled === true,
    messagesReadEnabled: source.messagesReadEnabled === true,
    messagesWriteEnabled: source.messagesWriteEnabled === true,
    allowCustomAuthor: source.allowCustomAuthor === true,
    defaultAuthorId: asNonEmptyString(source.defaultAuthorId),
    tokenHash: asNonEmptyString(source.tokenHash),
    tokenHint: asNonEmptyString(source.tokenHint),
    tokenUpdatedAt: asNonEmptyString(source.tokenUpdatedAt),
  };
}

export function hashAgentToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function createAgentToken(): string {
  return randomBytes(32).toString('base64url');
}

function parseBearerToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.slice(7).trim();
  return token.length > 0 ? token : null;
}

function safeHashEquals(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left, 'utf8');
  const rightBuffer = Buffer.from(right, 'utf8');
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export async function getAutomationAgentConfig(): Promise<AutomationAgentConfig> {
  const value = await getSetting(AUTOMATION_SETTING_KEY);
  return parseConfig(value);
}

export async function setAutomationAgentConfig(
  updates: Partial<AutomationAgentConfig>
): Promise<AutomationAgentConfig> {
  const current = await getAutomationAgentConfig();
  const next: AutomationAgentConfig = {
    enabled: updates.enabled ?? current.enabled,
    postsEnabled: updates.postsEnabled ?? current.postsEnabled,
    messagesReadEnabled: updates.messagesReadEnabled ?? current.messagesReadEnabled,
    messagesWriteEnabled: updates.messagesWriteEnabled ?? current.messagesWriteEnabled,
    allowCustomAuthor: updates.allowCustomAuthor ?? current.allowCustomAuthor,
    defaultAuthorId: asNonEmptyString(updates.defaultAuthorId ?? current.defaultAuthorId),
    tokenHash: asNonEmptyString(updates.tokenHash ?? current.tokenHash),
    tokenHint: asNonEmptyString(updates.tokenHint ?? current.tokenHint),
    tokenUpdatedAt: asNonEmptyString(updates.tokenUpdatedAt ?? current.tokenUpdatedAt),
  };

  await upsertSetting(
    AUTOMATION_SETTING_KEY,
    next,
    'json',
    'automation',
    'Agent automation config'
  );
  return next;
}

export function toPublicAutomationConfig(
  config: AutomationAgentConfig
): PublicAutomationAgentConfig {
  return {
    enabled: config.enabled,
    postsEnabled: config.postsEnabled,
    messagesReadEnabled: config.messagesReadEnabled,
    messagesWriteEnabled: config.messagesWriteEnabled,
    allowCustomAuthor: config.allowCustomAuthor,
    defaultAuthorId: config.defaultAuthorId,
    tokenConfigured: Boolean(config.tokenHash),
    tokenHint: config.tokenHint,
    tokenUpdatedAt: config.tokenUpdatedAt,
  };
}

export async function verifyAutomationAgentToken(
  request: NextRequest
): Promise<AutomationAgentConfig | null> {
  const config = await getAutomationAgentConfig();
  if (!config.enabled || !config.tokenHash) {
    return null;
  }

  const bearer = parseBearerToken(request);
  if (!bearer) {
    return null;
  }

  const incomingHash = hashAgentToken(bearer);
  if (!safeHashEquals(config.tokenHash, incomingHash)) {
    return null;
  }

  return config;
}
