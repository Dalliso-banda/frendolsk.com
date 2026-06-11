/**
 * About Page Content — Frendo LSK
 * ================================
 *
 * CUSTOMIZE: Replace the content below with your actual bio, skills, and interests.
 *
 * Icons must be React components from @mui/icons-material (or any icon library).
 * Skills categories: 'frontend' | 'backend' | 'devops' | 'tools' | 'other'
 */

import { Code, Lightbulb, Rocket, Groups, Coffee, Psychology, Memory } from '@mui/icons-material';
import type { AboutContent } from '@core/types/content';

export const aboutContent: AboutContent = {
  // Displayed under your name in the hero section
  tagline: 'Software Engineer • AI Enthusiast • Creative Technologist',

  // Paragraphs shown in the hero section (add as many as you like)
  intro: [
    "Welcome to my corner of the internet! I'm a software engineer and creative technologist based in Lusaka, Zambia. I'm passionate about building things at the intersection of code, hardware, and human experience.",
    "When I'm not writing software, you'll find me exploring AI/ML, tinkering with hardware projects, or thinking about how technology can expand sovereignty and opportunity across Africa.",
  ],

  // Paragraphs shown in the "My Journey" section
  story: [
    'I started my journey in software development with a deep curiosity about how systems work — from microcontrollers to distributed cloud architectures. That curiosity evolved into a career building full-stack applications, APIs, and AI-powered tools.',
    "Over the years I've worked on diverse projects: consumer web apps, open-source tooling, and hardware-adjacent software. Each experience sharpened my belief that great software is empathetic, performant, and honest.",
    'Today, I focus on React, Node.js, and AI integrations — building products that are accessible, fast, and genuinely useful. I believe in shipping working software, learning in public, and leaving things better than I found them.',
  ],

  // Skills shown as chips — add/remove as needed
  skills: [
    { name: 'React', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'PostgreSQL', category: 'backend' },
    { name: 'Python', category: 'backend' },
    { name: 'Docker', category: 'devops' },
    { name: 'GitHub Actions', category: 'devops' },
    { name: 'AI / LLMs', category: 'tools' },
    { name: 'Git', category: 'tools' },
  ],

  // Interests shown as icon cards
  interests: [
    { icon: Code, label: 'Software Engineering' },
    { icon: Memory, label: 'AI & Machine Learning' },
    { icon: Lightbulb, label: 'Creative Tech' },
    { icon: Rocket, label: 'Side Projects' },
    { icon: Groups, label: 'Open Source' },
    { icon: Coffee, label: 'Coffee' },
    { icon: Psychology, label: 'Problem Solving' },
  ],
};
