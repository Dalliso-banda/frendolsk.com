import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { getMessageStats } from '@/db/messages';
import { verifyAdmin } from '@/lib/auth-helpers';

/**
 * GET /api/admin/dashboard - Get dashboard stats (admin)
 */
export async function GET(request: NextRequest) {
  const token = await verifyAdmin(request);

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getDb();

    // Get posts stats
    const postsStats = await db('posts')
      .select('status')
      .count('* as count')
      .groupBy('status');

    const postsCounts = {
      total: 0,
      published: 0,
      draft: 0,
      scheduled: 0,
      archived: 0,
    };

    for (const stat of postsStats) {
      const count = Number(stat.count);
      postsCounts.total += count;
      if (stat.status in postsCounts) {
        postsCounts[stat.status as keyof typeof postsCounts] = count;
      }
    }

    // Get message stats
    const messageStats = await getMessageStats();

    // Get recent posts (last 5)
    const recentPosts = await db('posts')
      .select(
        'id',
        'title',
        'slug',
        'status',
        'published_at',
        'created_at',
        'updated_at'
      )
      .orderBy('created_at', 'desc')
      .limit(5);

    const transformedPosts = recentPosts.map((post: Record<string, unknown>) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      status: post.status,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
    }));

    // Get recent messages (last 5)
    const recentMessages = await db('inbox_messages')
      .select(
        'id',
        'name',
        'email',
        'subject',
        'status',
        'created_at as createdAt',
        'read_at as readAt'
      )
      .whereNot('status', 'deleted')
      .orderBy('created_at', 'desc')
      .limit(5);

    return NextResponse.json({
      stats: {
        posts: postsCounts,
        messages: messageStats,
      },
      recentPosts: transformedPosts,
      recentMessages,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
