import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/db';

/**
 * POST /api/auth/verify
 * Verify user credentials (used by NextAuth Credentials provider)
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    const db = getDb();
    const user = await db('admin_users')
      .select('id', 'email', 'display_name', 'password_hash')
      .where('email', email)
      .first();

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return user without password hash
    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.display_name || 'Admin',
      role: 'admin',
    });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
