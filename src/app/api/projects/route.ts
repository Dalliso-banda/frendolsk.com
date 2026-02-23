import { NextResponse } from 'next/server';

/**
 * Projects API Route
 * 
 * Returns projects data from the database, with static example fallback.
 * CUSTOMIZE: Replace the staticProjects data with your own projects,
 * or better yet, use the database seeds to populate your portfolio.
 */

// Example static projects data (used when database isn't available)
const staticProjects = [
  {
    id: '1',
    title: 'Personal Portfolio',
    slug: 'personal-portfolio',
    description: 'My personal website built with Next.js, featuring a blog, projects showcase, and contact form. Fully responsive with dark mode support.',
    image_url: '/images/projects/portfolio.png',
    github_url: 'https://github.com/Dalliso-banda/frendolsk.com',
    live_url: 'https://frendolsk.com',
    is_featured: true,
    technologies: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'MUI'],
  },
  {
    id: '2',
    title: 'Artasylum',
    slug: 'task-manager',
    description: 'A site for people who write poetry to publish there poems ',
    image_url: '/images/projects/task-manager.png',
    github_url: 'https://github.com/yourusername/tasrk-manage',
    live_url: 'https://artasylum.xyz',
    is_featured: true,
    technologies: ['React', 'Node.js', 'postgres','express'],
  },
  {
    id: '3',
    title: 'Rule based Template',
    slug: 'rule-based-chat-bot',
    description: 'A beautiful weather dashboard that displays forecasts, historical data, and weather alerts using multiple weather APIs.',
    image_url: '/images/projects/weather.png',
    github_url: 'https://github.com/Dalliso-banda/ruleBasedChatBot',
    live_url: null,
    is_featured: true,
    technologies: ['compromise.js', 'node.js'],
  },
  {
    id: '4',
    title: 'Wadal',
    slug: 'ecommerce-api',
    description: 'A silly project of converting android phones into sim card farms that be sending bulk messages.',
    image_url: '/images/projects/api.png',
    github_url: 'https://github.com/Dalliso-banda/wadal',
    live_url: null,
    is_featured: false,
    technologies: ['Node.js'],
  },  {
    id: '5',
    title: 'THriftzone',
    slug: 'ecommerce',
    description: 'online platfrorm for buying and selling second-hand clothes, promoting sustainable fashion and reducing waste.',
    image_url: '/images/projects/api.png',
    github_url: 'https://github.com/Dalliso-banda/thriftzone',
    live_url: null,
    is_featured: false,
    technologies: ['Node.js'],
  },
   {
    id: '6',
    title: 'DOCRUSH',
    slug: 'health',
    description: 'A prototype of what could be an intermedaite between the doctor and patient built with the gemini API.',
    image_url: '/images/projects/api.png',
    github_url: 'https://github.com/Dalliso-banda/docRush-AIGenesis',
    live_url: null,
    is_featured: false,
    technologies: ['Node.js'],
  }
];

// Dynamic import for database module
async function getDbModule() {
  try {
    const dbModule = await import('@/db');
    return dbModule.getDb;
  } catch {
    return null;
  }
}

export async function GET() {
  // Try to get data from database first
  const getDb = await getDbModule();
  if (getDb) {
    try {
      const db = getDb();
      
      // Check if table exists
      const tableExists = await db.schema.hasTable('projects');
      
      if (tableExists) {
        // Fetch projects with technologies
        const projectsRaw = await db('projects')
          .where('is_private', false)
          .orderBy([
            { column: 'is_featured', order: 'desc' },
            { column: 'sort_order', order: 'asc' },
          ]);

        if (projectsRaw.length > 0) {
          const projects = await Promise.all(
            projectsRaw.map(async (project) => {
              const technologies = await db('project_technologies')
                .where('project_id', project.id)
                .orderBy('sort_order');
              return {
                ...project,
                technologies: technologies.map((t) => t.technology),
              };
            })
          );

          return NextResponse.json(projects);
        }
      }
    } catch (error) {
      console.error('Projects API: Database error, using static data:', error);
    }
  }

  // Return static data as fallback
  return NextResponse.json(staticProjects);
}
