'use client';

/**
 * Now Page Client Component
 * 
 * CUSTOMIZE: Update the nowData object below with what you're currently
 * working on, learning, and focusing on!
 * 
 * A "now page" tells visitors what you're focused on at this point in your life.
 * Learn more at https://nownownow.com/about
 */

import {
  Box,
  Typography,
  Container,
  Grid2,
  Paper,
  Chip,
  Divider,
  alpha,
} from '@mui/material';
import {
  Work,
  Code,
  MenuBook,
  Explore,
  Build,
  LocationOn,
  Update,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { AuthAwareMainLayout } from '@/components';

// CUSTOMIZE: Update this data with your current focus
const nowData = {
  lastUpdated: new Date(), // Update this when you change the content
  location: 'Working remotely', // Your current location
  currentProject: {
    name: 'My Current Project',
    tagline: 'A brief description of what you\'re building',
    description: `This is where you can describe your main project or focus area.
    What are you building? Why is it interesting? What problems does it solve?
    
    Update this section to share what you're passionate about right now.`,
    features: [
      'Feature or goal one',
      'Feature or goal two',
      'Feature or goal three',
      'Feature or goal four',
    ],
    techStack: {
      frontend: ['Next.js', 'React', 'TypeScript'],
      backend: ['Node.js', 'PostgreSQL'],
      tools: ['Docker', 'GitHub Actions'],
    },
  },
  sections: [
    {
      icon: Code,
      title: 'Currently Building',
      items: [
        'Working on my personal website',
        'Building side projects to learn new technologies',
        'Contributing to open source projects',
        'Writing blog posts about what I learn',
      ],
    },
    {
      icon: MenuBook,
      title: 'Currently Learning',
      items: [
        'Exploring new frameworks and libraries',
        'Reading about software architecture patterns',
        'Taking online courses to expand skills',
        'Learning from the developer community',
      ],
    },
    {
      icon: Explore,
      title: 'Exploring',
      items: [
        'New technologies and trends in web development',
        'Best practices for building scalable applications',
        'Ways to improve developer experience',
        'Community events and meetups',
      ],
    },
    {
      icon: Build,
      title: 'Goals',
      items: [
        'Ship more projects and ideas',
        'Write more and share knowledge',
        'Connect with other developers',
        'Keep learning and growing',
      ],
    },
  ],
  focus: [
    'Web Development',
    'Open Source',
    'Learning',
    'Building',
    'Writing',
    'Community',
  ],
};

export default function NowPage() {
  return (
    <AuthAwareMainLayout>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Now
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}
          >
            What I&apos;m currently focused on. This is a{' '}
            <Box
              component="a"
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'primary.main' }}
            >
              /now page
            </Box>
            .
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
            <Update fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Last updated: {format(nowData.lastUpdated, 'MMMM d, yyyy')}
            </Typography>
          </Box>
        </Box>

        {/* Location */}
        <Paper
          sx={{
            p: 3,
            mb: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primary.dark, 0.1)
                : alpha(theme.palette.primary.light, 0.1),
          }}
        >
          <LocationOn sx={{ color: 'primary.main', fontSize: 28 }} />
          <Typography variant="h6">{nowData.location}</Typography>
        </Paper>

        {/* Current Project Highlight */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 6,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.15)} 0%, ${alpha(theme.palette.secondary.dark, 0.1)} 100%)`
                : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.15)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
            border: 1,
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Work sx={{ color: 'primary.main' }} />
            <Typography variant="overline" color="primary.main" fontWeight={600}>
              Main Focus
            </Typography>
          </Box>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            {nowData.currentProject.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            {nowData.currentProject.tagline}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, whiteSpace: 'pre-line' }}
          >
            {nowData.currentProject.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Features/Goals */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Key Features / Goals
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 3 }}>
            {nowData.currentProject.features.map((feature, index) => (
              <Typography
                component="li"
                key={index}
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                {feature}
              </Typography>
            ))}
          </Box>

          {/* Tech Stack */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Tech Stack
          </Typography>
          <Grid2 container spacing={2}>
            {Object.entries(nowData.currentProject.techStack).map(([category, techs]) => (
              <Grid2 key={category} size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ display: 'block', mb: 1 }}
                >
                  {category}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {techs.map((tech) => (
                    <Chip key={tech} label={tech} size="small" variant="outlined" />
                  ))}
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Paper>

        {/* Activity Sections */}
        <Grid2 container spacing={3} sx={{ mb: 6 }}>
          {nowData.sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Grid2 key={section.title} size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <IconComponent sx={{ color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {section.title}
                    </Typography>
                  </Box>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {section.items.map((item, index) => (
                      <Typography
                        component="li"
                        key={index}
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </Grid2>
            );
          })}
        </Grid2>

        {/* Current Focus Areas */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Current Focus Areas
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
            {nowData.focus.map((item) => (
              <Chip
                key={item}
                label={item}
                variant="outlined"
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </AuthAwareMainLayout>
  );
}
