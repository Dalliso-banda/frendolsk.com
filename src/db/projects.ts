import { getDb } from './index';

// Types
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  is_featured: boolean;
  is_private: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProjectWithTechnologies extends Project {
  technologies: string[];
}

// Get all projects
export async function getAllProjects(): Promise<ProjectWithTechnologies[]> {
  const db = getDb();
  
  const projects = await db('projects')
    .where('is_private', false)
    .orderBy('sort_order', 'asc')
    .orderBy('created_at', 'desc');

  // Get technologies for each project
  const projectsWithTech: ProjectWithTechnologies[] = [];
  
  for (const project of projects) {
    const technologies = await db('project_technologies')
      .where('project_id', project.id)
      .orderBy('sort_order', 'asc')
      .select('technology');
    
    projectsWithTech.push({
      ...project,
      technologies: technologies.map((t) => t.technology),
    });
  }

  return projectsWithTech;
}

// Get featured projects
export async function getFeaturedProjects(): Promise<ProjectWithTechnologies[]> {
  const db = getDb();
  
  const projects = await db('projects')
    .where('is_featured', true)
    .where('is_private', false)
    .orderBy('sort_order', 'asc')
    .limit(6);

  const projectsWithTech: ProjectWithTechnologies[] = [];
  
  for (const project of projects) {
    const technologies = await db('project_technologies')
      .where('project_id', project.id)
      .orderBy('sort_order', 'asc')
      .select('technology');
    
    projectsWithTech.push({
      ...project,
      technologies: technologies.map((t) => t.technology),
    });
  }

  return projectsWithTech;
}

// Get project by slug
export async function getProjectBySlug(slug: string): Promise<ProjectWithTechnologies | null> {
  const db = getDb();
  
  const project = await db('projects').where('slug', slug).first();
  
  if (!project) return null;

  const technologies = await db('project_technologies')
    .where('project_id', project.id)
    .orderBy('sort_order', 'asc')
    .select('technology');

  return {
    ...project,
    technologies: technologies.map((t) => t.technology),
  };
}

// Create project
export async function createProject(
  data: Omit<Project, 'id' | 'created_at' | 'updated_at'>,
  technologies: string[] = []
): Promise<ProjectWithTechnologies> {
  const db = getDb();
  
  const [project] = await db('projects').insert(data).returning('*');

  // Insert technologies
  for (let i = 0; i < technologies.length; i++) {
    await db('project_technologies').insert({
      project_id: project.id,
      technology: technologies[i],
      sort_order: i,
    });
  }

  return {
    ...project,
    technologies,
  };
}

// Update project
export async function updateProject(
  id: string,
  data: Partial<Omit<Project, 'id' | 'created_at'>>,
  technologies?: string[]
): Promise<ProjectWithTechnologies | null> {
  const db = getDb();
  
  const [project] = await db('projects')
    .where('id', id)
    .update({ ...data, updated_at: new Date() })
    .returning('*');

  if (!project) return null;

  // Update technologies if provided
  if (technologies !== undefined) {
    await db('project_technologies').where('project_id', id).delete();
    
    for (let i = 0; i < technologies.length; i++) {
      await db('project_technologies').insert({
        project_id: id,
        technology: technologies[i],
        sort_order: i,
      });
    }
  }

  const techs = await db('project_technologies')
    .where('project_id', id)
    .orderBy('sort_order', 'asc')
    .select('technology');

  return {
    ...project,
    technologies: techs.map((t) => t.technology),
  };
}

// Delete project
export async function deleteProject(id: string): Promise<boolean> {
  const db = getDb();
  const deleted = await db('projects').where('id', id).delete();
  return deleted > 0;
}
