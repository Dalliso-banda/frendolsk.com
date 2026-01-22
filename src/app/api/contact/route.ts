import { NextRequest, NextResponse } from 'next/server';
import { createMessage } from '@/db/messages';
import { getDb } from '@/db';
import { detectBot } from '@/lib/security';
import { contactFormSchema } from '@/lib/validations';
import { ZodError } from 'zod';

// Simple rate limiting: max 5 submissions per IP per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms
const MAX_SUBMISSIONS = 5;

async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const db = getDb();
  const key = `contact:${ip}`;
  const now = new Date();
  
  // Get existing rate limit record
  const record = await db('rate_limits').where('key', key).first();
  
  if (!record || new Date(record.expires_at) < now) {
    // Create or reset rate limit
    const windowStart = now;
    const expiresAt = new Date(now.getTime() + RATE_LIMIT_WINDOW);
    
    await db('rate_limits')
      .insert({
        key,
        count: 1,
        window_start: windowStart,
        expires_at: expiresAt,
      })
      .onConflict('key')
      .merge({
        count: 1,
        window_start: windowStart,
        expires_at: expiresAt,
      });
    
    return { allowed: true, remaining: MAX_SUBMISSIONS - 1 };
  }
  
  if (record.count >= MAX_SUBMISSIONS) {
    return { allowed: false, remaining: 0 };
  }
  
  // Increment count
  await db('rate_limits')
    .where('key', key)
    .increment('count', 1);
  
  return { allowed: true, remaining: MAX_SUBMISSIONS - record.count - 1 };
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

// Minimum time (in ms) a human would take to fill out the form
const MIN_SUBMISSION_TIME_MS = 3000;

/**
 * POST /api/contact - Submit a contact form
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    
    // Check rate limit
    const rateLimit = await checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'Retry-After': '3600',
          }
        }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, website, timestamp } = body;

    // =========================================================================
    // Bot Detection
    // =========================================================================
    
    // Check honeypot field (should be empty - bots often fill all fields)
    if (website && website.length > 0) {
      console.warn(`[Contact] Honeypot triggered from IP: ${ip}`);
      // Return success to not tip off the bot, but don't save
      return NextResponse.json(
        { success: true, message: 'Your message has been sent successfully. Thank you!' },
        { status: 201 }
      );
    }

    // Check submission timing (too fast = likely bot)
    if (timestamp) {
      const submissionTime = Date.now() - timestamp;
      if (submissionTime < MIN_SUBMISSION_TIME_MS) {
        console.warn(`[Contact] Submission too fast (${submissionTime}ms) from IP: ${ip}`);
        // Return success to not tip off the bot, but don't save
        return NextResponse.json(
          { success: true, message: 'Your message has been sent successfully. Thank you!' },
          { status: 201 }
        );
      }
    }

    // Run comprehensive bot detection
    const botCheck = detectBot({
      userAgent,
      timestamp,
      honeypot: website,
    });

    if (botCheck.isLikelyBot) {
      console.warn(`[Contact] Bot detected from IP: ${ip}. Reasons: ${botCheck.reasons.join(', ')}`);
      // Return success to not tip off the bot, but don't save
      return NextResponse.json(
        { success: true, message: 'Your message has been sent successfully. Thank you!' },
        { status: 201 }
      );
    }

    // =========================================================================
    // Validation with Zod Schema
    // =========================================================================
    
    try {
      contactFormSchema.parse({ name, email, subject, message, website, timestamp });
    } catch (zodError) {
      if (zodError instanceof ZodError) {
        const firstError = zodError.errors[0];
        return NextResponse.json(
          { error: firstError.message },
          { status: 400 }
        );
      }
      throw zodError;
    }

    // Additional email validation
    if (email && !validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // =========================================================================
    // Sanitization
    // =========================================================================
    
    const sanitizedName = name ? sanitizeInput(String(name)).substring(0, 200) : null;
    const sanitizedEmail = email ? String(email).trim().toLowerCase().substring(0, 255) : null;
    const sanitizedSubject = subject ? sanitizeInput(String(subject)).substring(0, 500) : null;
    const sanitizedMessage = sanitizeInput(String(message)).substring(0, 10000);

    if (sanitizedMessage.length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty after removing invalid content' },
        { status: 400 }
      );
    }

    // Create the message
    const newMessage = await createMessage({
      source: 'contact',
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      body: sanitizedMessage,
      ipAddress: ip,
      userAgent: userAgent,
      metadata: {
        referrer: request.headers.get('referer'),
        submittedAt: new Date().toISOString(),
        formLoadedAt: timestamp ? new Date(timestamp).toISOString() : null,
        submissionDurationMs: timestamp ? Date.now() - timestamp : null,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully. Thank you!',
        id: newMessage.id,
      },
      { 
        status: 201,
        headers: {
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        }
      }
    );
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
