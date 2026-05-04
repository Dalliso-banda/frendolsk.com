import type { Metadata } from 'next';
import ResumeView from '@core/views/resume/ResumeView';
import { siteConfig } from '@/config';
import { getFullResume } from '@/db/resume';
import { fetchSiteSettings } from '@/lib/fetchSiteSettings';
import { readdir } from 'fs/promises';
import path from 'path';

async function getResumeFileInfo(): Promise<{ url: string; filename: string } | null> {
  const resumeDir = path.join(process.cwd(), 'public', 'uploads', 'resume');
  try {
    const files = await readdir(resumeDir);
    const resumeFile = files.find((f) => f.startsWith('resume.'));
    if (resumeFile) return { url: `/uploads/resume/${resumeFile}`, filename: resumeFile };
  } catch { /* directory doesn't exist */ }
  return null;
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Professional resume - Full Stack Developer with experience in React, Next.js, TypeScript, Node.js, and more.',
  openGraph: {
    title: `Resume | ${siteConfig.name}`,
    description: 'Professional resume and work experience.',
    url: `${siteConfig.url}/resume`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Resume | ${siteConfig.name}`,
    description: 'Professional resume and work experience.',
  },
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ResumePage() {
  const [resumeData, settings, resumeFile] = await Promise.all([
    getFullResume().catch(() => ({ skills: {} as Record<string, never>, experiences: [], education: [], certifications: [] })),
    fetchSiteSettings(),
    getResumeFileInfo().catch(() => null),
  ]);

  // Serialize Date objects to strings for the client component
  const serializedResume = {
    skills: resumeData.skills,
    experiences: resumeData.experiences.map((exp) => ({
      ...exp,
      start_date: exp.start_date.toISOString(),
      end_date: exp.end_date ? exp.end_date.toISOString() : null,
    })),
    education: resumeData.education.map((edu) => ({
      ...edu,
      start_date: edu.start_date ? edu.start_date.toISOString() : null,
      end_date: edu.end_date ? edu.end_date.toISOString() : null,
    })),
    certifications: resumeData.certifications,
    resumeFile,
  };

  return <ResumeView resume={serializedResume} settings={settings} />;
}
