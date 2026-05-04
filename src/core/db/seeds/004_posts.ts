import type { Knex } from 'knex';

/**
 * Seed posts with sample blog content
 * Theme: Science Fiction & Fantasy Audiobooks
 */
export async function seed(knex: Knex): Promise<void> {
  // Check if any posts exist
  const existingPosts = await knex('posts').count('* as count').first();
  if (existingPosts && Number(existingPosts.count) > 0) {
    console.log('Posts already seeded, skipping...');
    return;
  }

  // Get admin user for author_id
  const adminUser = await knex('admin_users').first();
  const authorId = adminUser?.id || null;

  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  const posts = [
    {
      title: 'Why Space Opera Audiobooks Are Perfect for Long Commutes',
      slug: 'space-opera-audiobooks-long-commutes',
      excerpt: 'Discover how epic space adventures make the perfect companion for your daily drive or transit ride.',
      content_markdown: `## The Perfect Travel Companions

There is something magical about losing yourself in a galaxy-spanning adventure while stuck in traffic. Space opera audiobooks have become my absolute favorite way to transform mundane commutes into epic journeys.

## What Makes Space Opera Work So Well?

### Epic Scope
These stories span star systems, generations, and civilizations. A 15-hour audiobook barely scratches the surface of these vast universes.

### Multiple Characters
Space operas typically feature ensemble casts, which keeps things fresh and engaging. Just when you think you know where the story is going, the narrative shifts to another corner of the galaxy.

### Perfect Pacing
The genre naturally has peaks and valleys in its pacing—intense battles followed by character moments—which helps maintain focus during variable traffic conditions.

## Getting Started

If you are new to the genre, here are some tips:

1. **Start with a standalone novel** before committing to a 15-book series
2. **Sample the narrator first** - a great narrator can make or break the experience
3. **Do not worry about missing details** - good space operas reward re-listens

## My Commute Essentials

I always keep these in my audiobook queue:
- A long series for the daily grind
- A standalone for shorter trips
- Something lighter for stressful days

Happy listening, and may your commute be filled with adventure!`,
      status: 'published',
      published_at: new Date(now.getTime() - 15 * oneDay),
      created_at: new Date(now.getTime() - 20 * oneDay),
      updated_at: new Date(now.getTime() - 15 * oneDay),
      reading_time_minutes: 5,
      author_id: authorId,
    },
    {
      title: 'The Art of Audiobook Narration: What Makes a Great Performance',
      slug: 'art-of-audiobook-narration',
      excerpt: 'Exploring what separates a good audiobook from a truly memorable listening experience.',
      content_markdown: `## More Than Just Reading

A truly great audiobook narrator does not just read—they perform. They breathe life into characters, set the pace, and become the invisible bridge between author and listener.

## Key Elements of Great Narration

### Voice Distinction
The best narrators create distinct voices for each character without becoming cartoonish. You should be able to tell who is speaking without dialogue tags.

### Pacing and Rhythm
Knowing when to speed up during action sequences and slow down for emotional moments is an art form. Great narrators understand the music of language.

### Emotional Authenticity
When a character experiences loss or triumph, you should feel it in the narrator's voice—subtle changes in tone that convey deep emotion without melodrama.

### Consistency
Maintaining character voices across a 20+ hour book (or multi-book series) requires incredible skill and dedication.

## Narrators to Watch

Pay attention to credits. When you find a narrator you love, explore their other work. You might discover your next favorite book simply because of who is reading it.

## The Narrator-Author Partnership

The best audiobooks feel like a collaboration. Some authors even write with specific narrators in mind, crafting dialogue and descriptions that play to their strengths.

What makes your favorite audiobook narrator special? The answer is usually a combination of all these elements, blended so seamlessly you forget you are listening to a performance at all.`,
      status: 'published',
      published_at: new Date(now.getTime() - 10 * oneDay),
      created_at: new Date(now.getTime() - 12 * oneDay),
      updated_at: new Date(now.getTime() - 10 * oneDay),
      reading_time_minutes: 4,
      author_id: authorId,
    },
    {
      title: 'Building Your Science Fiction Reading List: A Beginner Guide',
      slug: 'building-scifi-reading-list-beginners-guide',
      excerpt: 'New to science fiction? Here is how to build a reading list that will hook you for life.',
      content_markdown: `## Welcome to the Genre

Science fiction is vast and varied—from hard science to social commentary, from near-future thrillers to far-future space exploration. Finding your entry point can feel overwhelming.

## Different Flavors of Sci-Fi

### Hard Science Fiction
Stories grounded in real science and technology. Great for readers who love technical details and plausible futures.

### Space Opera
Epic adventures across the stars. Think galactic empires, alien civilizations, and heroes saving the universe.

### Military Science Fiction
Focuses on armed conflict, military organizations, and the humans (or aliens) who serve. Often explores themes of duty, sacrifice, and the nature of warfare.

### Social Science Fiction
Uses speculative settings to examine society, politics, and human nature. The "what if" is often about people, not technology.

## Building Your List

### Step 1: Identify Your Interests
Do you love action? Character studies? Political intrigue? World-building? Start with books that match your existing preferences.

### Step 2: Try Different Eras
Classic sci-fi from the golden age reads differently than modern works. Sample both to find your preference.

### Step 3: Do Not Fear the Series
Many of the best sci-fi stories are told across multiple books. Starting a series is a commitment, but the payoff is immense.

## What is Next?

In upcoming posts, I will dive deeper into each subgenre with specific recommendations. For now, happy exploring!`,
      status: 'draft',
      published_at: null,
      created_at: new Date(now.getTime() - 5 * oneDay),
      updated_at: new Date(now.getTime() - 2 * oneDay),
      reading_time_minutes: 5,
      author_id: authorId,
    },
    {
      title: 'Fantasy Worlds That Feel Real: The Magic of Great Worldbuilding',
      slug: 'fantasy-worlds-feel-real-worldbuilding',
      excerpt: 'What makes some fantasy worlds so immersive you forget they are fictional? Let us explore the craft of worldbuilding.',
      content_markdown: `## The Immersion Factor

The best fantasy worlds do not just have magic and monsters—they have history, culture, economics, and internal logic that makes everything feel authentic.

## Elements of Great Worldbuilding

### Consistent Rules
Magic systems that follow clear rules are more satisfying than unlimited power. Constraints create drama and force creative problem-solving.

### Living History
Great worlds have pasts that inform their present. You sense centuries of events shaping current politics, prejudices, and possibilities.

### Cultural Depth
Different regions should feel genuinely different—not just in appearance, but in values, customs, and worldviews.

### Economic Reality
Someone has to grow the food and forge the swords. The best worlds account for how societies actually function.

## Worldbuilding in Audio

When listening to audiobooks, worldbuilding often shines even brighter. A skilled narrator can make unfamiliar names and places feel natural, and the pacing gives you time to absorb complex lore.

## Coming Soon

I am working on a deep dive into specific fantasy series that excel at worldbuilding. Stay tuned!`,
      status: 'scheduled',
      published_at: new Date(now.getTime() + 14 * oneDay),
      created_at: new Date(now.getTime() - 3 * oneDay),
      updated_at: new Date(now.getTime() - 1 * oneDay),
      reading_time_minutes: 4,
      author_id: authorId,
    },
    {
      title: 'Audiobook Listening Tips: Getting the Most From Your Books',
      slug: 'audiobook-listening-tips-getting-most',
      excerpt: 'Practical advice for both new and experienced audiobook listeners to enhance your listening experience.',
      content_markdown: `## Maximize Your Listening

Audiobooks are a unique medium, and getting the most from them takes a bit of practice and some helpful habits.

## For New Listeners

### Start with the Right Speed
Most people can comfortably listen at 1.25x-1.5x speed once they are used to audiobooks. Start at 1x and gradually increase.

### Choose Engaging Content
Your first audiobook should be something you are genuinely excited about. Save the "should read" books for later.

### Pair with Activities
Audiobooks work best when your hands are busy but your mind is free—commuting, exercising, cooking, or doing chores.

## For Experienced Listeners

### Manage Your Library
Keep a queue organized by mood, length, and genre. Having options prevents the "I do not know what to listen to" problem.

### Use Sleep Timers
Falling asleep to audiobooks is great, but use a timer so you do not lose your place.

### Take Notes
For books with complex plots or information you want to retain, jot down quick notes when you pause.

## Common Challenges

### "I zone out and miss things"
This is normal! Use the 30-second rewind frequently, and do not stress about catching every word.

### "I cannot picture the characters"
This fades with practice. Your imagination will fill in the gaps over time.

### "It feels too slow"
Increase the playback speed gradually until you find your sweet spot.

Happy listening!`,
      status: 'published',
      published_at: new Date(now.getTime() - 5 * oneDay),
      created_at: new Date(now.getTime() - 6 * oneDay),
      updated_at: new Date(now.getTime() - 5 * oneDay),
      reading_time_minutes: 4,
      author_id: authorId,
    },
  ];

  // Insert posts
  const insertedPosts = await knex('posts').insert(posts).returning(['id', 'slug']);
  console.log(`Seeded ${insertedPosts.length} posts (sci-fi/fantasy audiobook theme)`);

  // Get existing tags
  const tags = await knex('tags').select('id', 'slug');
  const tagMap = new Map(tags.map((t: { id: string; slug: string }) => [t.slug, t.id]));

  // Define post-tag relationships
  const postTagMappings: Record<string, string[]> = {
    'space-opera-audiobooks-long-commutes': ['space-opera', 'audiobooks', 'recommendations'],
    'art-of-audiobook-narration': ['audiobooks', 'narration', 'book-reviews'],
    'building-scifi-reading-list-beginners-guide': ['science-fiction', 'recommendations', 'series'],
    'fantasy-worlds-feel-real-worldbuilding': ['fantasy', 'book-reviews', 'series'],
    'audiobook-listening-tips-getting-most': ['audiobooks', 'recommendations'],
  };

  // Insert post_tags relationships
  const postTags: { post_id: string; tag_id: string }[] = [];
  
  for (const post of insertedPosts) {
    const tagSlugs = postTagMappings[post.slug] || [];
    for (const tagSlug of tagSlugs) {
      const tagId = tagMap.get(tagSlug);
      if (tagId) {
        postTags.push({ post_id: post.id, tag_id: tagId });
      }
    }
  }

  if (postTags.length > 0) {
    await knex('post_tags').insert(postTags);
    console.log(`Created ${postTags.length} post-tag relationships`);
  }
}
