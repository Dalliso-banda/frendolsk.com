/**
 * Now Page Content — Frendo LSK
 * ================================
 *
 * CUSTOMIZE: Update this with what you're currently working on.
 *
 * A /now page tells visitors what you're focused on at this point in your life.
 * Learn more at https://nownownow.com/about
 *
 * Icons must be React components from @mui/icons-material.
 */

import { Code, MenuBook, Explore, Build } from '@mui/icons-material';
import type { NowContent } from '@core/types/content';

export const nowContent: NowContent = {
  // Update this date whenever you change this file
  lastUpdated: new Date('2026-01-01'),

  // Your current location / working situation
  location: 'Lusaka, Zambia',

  // Your main project or focus area
  currentProject: {
    name: 'Frendo LSK',
    tagline: 'Personal portfolio and writing platform',
    description: `Building and iterating on my personal site — a space for writing, projects, and notes about software engineering, AI, and hardware sovereignty.

The goal is to ship a clean, fast, honest portfolio that reflects who I am and what I care about.`,
    features: [
      'Blog with full Markdown support',
      'Projects showcase',
      'Contact and inbox system',
      'Dark/light theme with MUI',
    ],
    techStack: {
      frontend: ['Next.js', 'React', 'TypeScript', 'Material UI'],
      backend: ['Node.js', 'PostgreSQL', 'Knex'],
      tools: ['Docker', 'GitHub Actions'],
    },
  },

  // Activity sections (title + bullet list items)
  sections: [
    {
      icon: Code,
      title: 'Currently Building',
      items: [
        'Personal portfolio and blog platform',
        'AI-assisted tooling experiments',
        'Side projects exploring hardware + software',
      ],
    },
    {
      icon: MenuBook,
      title: 'Currently Learning',
      items: [
        'Large language model fine-tuning and prompting',
        'Distributed systems and database internals',
        'Rust for systems programming',
      ],
    },
    {
      icon: Explore,
      title: 'Exploring',
      items: [
        'AI applications for African markets',
        'Hardware sovereignty and local-first software',
        'Open source infrastructure projects',
      ],
    },
    {
      icon: Build,
      title: 'Goals',
      items: [
        'Ship meaningful open-source projects',
        'Write more — essays, tutorials, notes',
        'Connect with builders across Africa and the world',
        'Deepen expertise in AI and distributed systems',
      ],
    },
  ],

  // Focus area chips shown at the bottom of the page
  focus: ['Web Development', 'AI / ML', 'Open Source', 'Hardware', 'Writing', 'Zambia'],
};
