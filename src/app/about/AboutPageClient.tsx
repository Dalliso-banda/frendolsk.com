'use client';

/**
 * About Page Client Component
 * 
 * CUSTOMIZE: Replace the placeholder content below with your own bio,
 * skills, and interests to make this page your own!
 */

import { Box, Typography, Container, Grid2, Avatar, Chip, Paper, alpha } from '@mui/material';
import { Code, Rocket, Groups, Coffee, MusicNote,Psychology, Person,PhotoCamera } from '@mui/icons-material';
import { AuthAwareMainLayout } from '@/components';
import { useSiteSettings } from '@/hooks/useSiteSettings';

// CUSTOMIZE: Add your own skills here
const skills = [
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'MySQL', category: 'backend' },
 {name:'Python Pandas', category:'data'},
  { name: 'Git', category: 'tools' },
];

// CUSTOMIZE: Add your own interests here
const interests = [
  { icon: Code, label: 'Software Development' },

  { icon: Rocket, label: 'Space Science' },
  { icon: Groups, label: 'Open Source' },
  { icon: MusicNote, label: 'DJing' },
  { icon: Psychology, label: 'Problem Solving' },

  { icon: PhotoCamera, label: 'Photography' },
];

export default function AboutPage() {
  const { settings } = useSiteSettings();
  const authorName = settings?.author?.name || 'Developer';

  return (
    <AuthAwareMainLayout>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 8, md: 12 } }}>
          <Grid2 container spacing={{ xs: 4, md: 5 }} alignItems="center">
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Avatar
                src={settings?.author?.avatarUrl || undefined}
                alt={authorName}
                sx={{
                  width: { xs: 180, md: 220 },
                  height: { xs: 180, md: 220 },
                  mx: { xs: 'auto', md: 0 },
                  border: 3,
                  borderColor: 'primary.main',
                  boxShadow: (theme) => `0 0 30px ${alpha(theme.palette.primary.main, 0.25)}`,
                  bgcolor: 'grey.500',
                  fontSize: { xs: '4rem', md: '5rem' },
                }}
              >
                <Person sx={{ fontSize: { xs: 100, md: 120 } }} />
              </Avatar>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                About Me
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 3, fontWeight: 400 }}>
                {/* CUSTOMIZE: Add your tagline here */}
                Full Stack Developer • Open Source Enthusiast
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 2.5 }}>
                {/* CUSTOMIZE: Add your intro paragraph here */}
                Welcome to my corner of the internet! I&apos;m a passionate developer who loves
                building things for the web. I enjoy turning complex problems into simple,
                beautiful, and intuitive solutions.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {/* CUSTOMIZE: Add more about yourself here */}
                When I&apos;m not at my desk debugging or solving linear algebra,I&apos;m usually
                exploring my creative side.
                Photography, Capturing the world through a lens and
                finding beauty in the details.
                 DJing,Blending rhythms and bringing energy to the
                space through music. I believe that the best engineering happens at the intersection
                of rigid logic and creative flow
              </Typography>
            </Grid2>
          </Grid2>
        </Box>

        {/* Story Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 6,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.1)} 0%, ${alpha(theme.palette.secondary.dark, 0.05)} 100%)`
                : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`,
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            My Journey
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
            {/* CUSTOMIZE: Tell your story here */}I started my journey in software development with
            a spark of curiosity after seeing Game Shakers, which led me to dive head-first into the
            complexities of C++. That initial fascination with how logic builds worlds eventually
            transitioned into a passion for Web Development and building dynamic, full-stack
            applications.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
            A pivotal moment in my career was being mentored by Christopher Hacia, a Senior Software
            Engineer who became family. His guidance was the key to unlocking my true potential,
            shifting my mindset from just "writing code" to engineering scalable, high-level
            solutions with a professional edge.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Today, my focus is on the frontier of Artificial Intelligence. I am currently
            deep-diving into the mathematics of Machine Learning, driven by a belief in continuous
            learning and the power of intelligent software.
          </Typography>
        </Paper>

        {/* Skills Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
            Skills & Technologies
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {skills.map((skill) => (
              <Chip key={skill.name} label={skill.name} variant="outlined" size="medium" />
            ))}
          </Box>
        </Box>

        {/* Interests Section */}
        <Box>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
            Interests
          </Typography>
          <Grid2 container spacing={2}>
            {interests.map((interest) => {
              const IconComponent = interest.icon;
              return (
                <Grid2 key={interest.label} size={{ xs: 6, sm: 4, md: 2 }}>
                  <Paper
                    sx={{
                      p: 2.5,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 120,
                      height: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 32,
                        color: 'primary.main',
                        mb: 1.5,
                      }}
                    />
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{ textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-word' }}
                    >
                      {interest.label}
                    </Typography>
                  </Paper>
                </Grid2>
              );
            })}
          </Grid2>
        </Box>
      </Container>
    </AuthAwareMainLayout>
  );
}
