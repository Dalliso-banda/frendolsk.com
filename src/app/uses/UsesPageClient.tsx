'use client';

import {
  Box,
  Typography,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  alpha,
} from '@mui/material';
import {
  Computer,
  Code,
  Brush,
  Terminal,
  Cloud,
  Chair,
  Build,
} from '@mui/icons-material';
import { AuthAwareMainLayout } from '@/components';

interface UsesCategory {
  title: string;
  icon: React.ElementType;
  items: {
    name: string;
    description?: string;
    link?: string;
  }[];
}

const usesCategories: UsesCategory[] = [
  {
    title: 'Hardware',
    icon: Computer,
    items: [
      {
        name: 'MacBook Pro 16" (2019)',
        description: '2.4 GHz 8-Core Intel Core i9 with 64GB RAM — my primary dev machine',
      },
      {
        name: '3× Samsung LU28R55 Monitors',
        description: '28" 4K displays arranged across my workspace',
      },
      {
        name: 'Logitech Ergo K860',
        description: 'Split ergonomic keyboard for comfortable typing',
      },
      {
        name: 'Apple Magic Trackpad 2',
        description: 'Gesture-based navigation and precision control',
      },
      {
        name: 'iPhone 14 Pro Max',
        description: 'Primary mobile device for testing and daily use',
      },
      {
        name: 'Samsung Galaxy A24',
        description: 'Android device for cross-platform testing',
      },
      {
        name: 'AirPods Pro 2',
        description: 'Noise cancellation for focused work sessions',
      },
    ],
  },
  {
    title: 'Development Tools',
    icon: Code,
    items: [
      {
        name: 'VS Code',
        description: 'Primary code editor — fast, extensible, and reliable',
      },
      {
        name: 'iTerm2',
        description: 'Feature-rich terminal emulator for macOS',
      },
      {
        name: 'Docker Desktop',
        description: 'Container management for local development environments',
      },
      {
        name: 'pgAdmin 4',
        description: 'PostgreSQL database management and querying',
      },
      {
        name: 'BBEdit',
        description: 'Lightweight text editor for quick edits and file comparison',
      },
    ],
  },
  {
    title: 'Design Tools',
    icon: Brush,
    items: [
      {
        name: 'Adobe Photoshop',
        description: 'Image editing and graphic design work',
      },
      {
        name: 'Figma',
        description: 'UI/UX design, prototyping, and collaboration',
      },
    ],
  },
  {
    title: 'CLI & Version Control',
    icon: Terminal,
    items: [
      {
        name: 'zsh + Oh My Zsh',
        description: 'Shell with plugins, themes, and productivity enhancements',
      },
      {
        name: 'git',
        description: 'Version control for all projects',
      },
      {
        name: 'pnpm',
        description: 'Fast, disk space efficient package manager',
      },
    ],
  },
  {
    title: 'Cloud & Hosting',
    icon: Cloud,
    items: [
      {
        name: 'Digital Ocean',
        description: 'Primary cloud provider for droplets and managed databases',
      },
      {
        name: 'AWS',
        description: 'Used occasionally for specific services and infrastructure',
      },
    ],
  },
  {
    title: 'Workspace',
    icon: Chair,
    items: [
      {
        name: 'Dual L-Desk Setup',
        description: 'Expansive workspace with room for multiple systems',
      },
      {
        name: 'Multi-Monitor Array',
        description: 'Work machine on one side, gaming rig on the other',
      },
      {
        name: 'Gaming PC',
        description: 'Separate system for gaming and personal projects',
      },
    ],
  },
];

export default function UsesPage() {
  return (
    <AuthAwareMainLayout>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Uses
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
              A comprehensive list of the tools, apps, and gear I use daily for development,
              design, and productivity. Inspired by{' '}
              <Box
                component="a"
                href="https://uses.tech"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'primary.main' }}
              >
                uses.tech
              </Box>
              .
            </Typography>
          </Box>

        {/* Categories */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
          {usesCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Paper
                key={index}
                sx={{
                  p: 3,
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1.5,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComponent sx={{ fontSize: 20 }} />
                  </Box>
                  <Typography variant="h6" component="h2" fontWeight={600}>
                    {category.title}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <List disablePadding>
                  {category.items.map((item, itemIndex) => (
                    <ListItem
                      key={itemIndex}
                      sx={{
                        px: 0,
                        py: 1,
                        borderBottom: itemIndex < category.items.length - 1 ? 1 : 0,
                        borderColor: 'divider',
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Build sx={{ fontSize: 16, color: 'text.secondary' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        secondary={item.description}
                        primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
                        secondaryTypographyProps={{ color: 'text.secondary', fontSize: '0.8rem' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            );
          })}
          </Box>

        {/* Note */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            textAlign: 'center',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.secondary.dark, 0.1)
                : alpha(theme.palette.secondary.light, 0.1),
          }}
        >
          <Typography variant="body1" color="text.secondary">
            <strong>Note:</strong> This page contains affiliate links where applicable.
            I only recommend products I actually use and believe in.
          </Typography>
        </Paper>
      </Container>
    </AuthAwareMainLayout>
  );
}
