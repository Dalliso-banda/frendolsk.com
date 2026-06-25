import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getMessages,
  archiveMessages,
  deleteMessages,
  markAsSpam,
  markMessagesAsRead,
  updateMessageStatus,
} from '@/db/messages';
import { checkRateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limiter';
import { verifyAutomationAgentToken } from '@/lib/automation-agent';

const actionSchema = z.object({
  action: z.enum(['read', 'unread', 'archive', 'spam', 'delete']),
  ids: z.array(z.string().uuid()).min(1).max(100),
});

export async function GET(request: NextRequest) {
  const config = await verifyAutomationAgentToken(request);
  if (!config || !config.messagesReadEnabled) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const clientIp = getClientIp(request);
  const rateLimit = await checkRateLimit({
    action: 'agent-messages-read',
    identifier: clientIp,
    maxRequests: 60,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429, headers: rateLimitHeaders(rateLimit) }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get('pageSize') || '20', 10)));
    const status = searchParams.get('status') || undefined;

    const data = await getMessages(page, pageSize, status);

    return NextResponse.json({ data }, { headers: rateLimitHeaders(rateLimit) });
  } catch (error) {
    console.error('Agent messages GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500, headers: rateLimitHeaders(rateLimit) }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const config = await verifyAutomationAgentToken(request);
  if (!config || !config.messagesWriteEnabled) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const clientIp = getClientIp(request);
  const rateLimit = await checkRateLimit({
    action: 'agent-messages-write',
    identifier: clientIp,
    maxRequests: 30,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429, headers: rateLimitHeaders(rateLimit) }
    );
  }

  try {
    const body = await request.json();
    const parsed = actionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: parsed.error.flatten() },
        { status: 400, headers: rateLimitHeaders(rateLimit) }
      );
    }

    const { action, ids } = parsed.data;
    let count = 0;

    switch (action) {
      case 'read':
        count = await markMessagesAsRead(ids);
        break;
      case 'unread':
        for (const id of ids) {
          await updateMessageStatus(id, 'unread');
          count += 1;
        }
        break;
      case 'archive':
        count = await archiveMessages(ids);
        break;
      case 'spam':
        count = await markAsSpam(ids);
        break;
      case 'delete':
        count = await deleteMessages(ids);
        break;
    }

    return NextResponse.json(
      { message: `Updated ${count} messages`, count },
      { headers: rateLimitHeaders(rateLimit) }
    );
  } catch (error) {
    console.error('Agent messages PATCH error:', error);
    return NextResponse.json(
      { error: 'Failed to update messages' },
      { status: 500, headers: rateLimitHeaders(rateLimit) }
    );
  }
}
