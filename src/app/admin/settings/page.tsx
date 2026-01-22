'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid2 as Grid,
  TextField,
  Tabs,
  Tab,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
  InputAdornment,
} from '@mui/material';
import {
  Save,
  Web,
  Person,
  Share,
  Search as SearchIcon,
  GitHub,
  LinkedIn,
  Facebook,
  Instagram,
  YouTube,
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

// Custom icons for platforms not in MUI
function TikTokIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </SvgIcon>
  );
}

function DiscordIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </SvgIcon>
  );
}

// =============================================================================
// Types
// =============================================================================

interface SiteInfo {
  name: string;
  description: string;
  url: string;
  logoUrl: string | null;
  faviconUrl: string | null;
}

interface AuthorInfo {
  name: string;
  email: string;
  bio: string;
  tagline: string;
  avatarUrl: string | null;
}

interface SocialLinks {
  twitter: string | null;
  github: string | null;
  linkedin: string | null;
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
  discord: string | null;
}

interface SeoConfig {
  titleTemplate: string;
  defaultTitle: string;
  ogImage: string | null;
  twitterCard: string;
}

interface SettingsData {
  site: SiteInfo;
  author: AuthorInfo;
  social: SocialLinks;
  seo: SeoConfig;
}

// =============================================================================
// Tab Panel Component
// =============================================================================

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// =============================================================================
// Settings Page Component
// =============================================================================

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Settings state
  const [settings, setSettings] = useState<SettingsData | null>(null);

  // Form state (separate from saved state to track changes)
  const [formData, setFormData] = useState<SettingsData | null>(null);

  // =============================================================================
  // Data Fetching
  // =============================================================================

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/settings');

      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }

      const result = await response.json();
      setSettings(result.data);
      setFormData(result.data);
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // =============================================================================
  // Form Handlers
  // =============================================================================

  const updateSiteField = (field: keyof SiteInfo, value: string | null) => {
    if (!formData) return;
    setFormData({
      ...formData,
      site: { ...formData.site, [field]: value },
    });
    setHasChanges(true);
  };

  const updateAuthorField = (field: keyof AuthorInfo, value: string | null) => {
    if (!formData) return;
    setFormData({
      ...formData,
      author: { ...formData.author, [field]: value },
    });
    setHasChanges(true);
  };

  const updateSocialField = (field: keyof SocialLinks, value: string | null) => {
    if (!formData) return;
    setFormData({
      ...formData,
      social: { ...formData.social, [field]: value },
    });
    setHasChanges(true);
  };

  const updateSeoField = (field: keyof SeoConfig, value: string | null) => {
    if (!formData) return;
    setFormData({
      ...formData,
      seo: { ...formData.seo, [field]: value },
    });
    setHasChanges(true);
  };

  // =============================================================================
  // Save Handler
  // =============================================================================

  const handleSave = async () => {
    if (!formData) return;

    setSaving(true);
    setError(null);

    try {
      // Build the updates object
      const updates: Record<string, string | null> = {
        // Site settings
        site_name: formData.site.name,
        site_description: formData.site.description,
        site_url: formData.site.url,
        site_logo_url: formData.site.logoUrl,
        site_favicon_url: formData.site.faviconUrl,
        // Author settings
        author_name: formData.author.name,
        author_email: formData.author.email,
        author_bio: formData.author.bio,
        author_tagline: formData.author.tagline,
        author_avatar_url: formData.author.avatarUrl,
        // Social settings
        social_twitter: formData.social.twitter,
        social_github: formData.social.github,
        social_linkedin: formData.social.linkedin,
        social_facebook: formData.social.facebook,
        social_instagram: formData.social.instagram,
        social_tiktok: formData.social.tiktok,
        social_youtube: formData.social.youtube,
        social_discord: formData.social.discord,
        // SEO settings
        seo_title_template: formData.seo.titleTemplate,
        seo_default_title: formData.seo.defaultTitle,
        seo_og_image: formData.seo.ogImage,
        seo_twitter_card: formData.seo.twitterCard,
      };

      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save settings');
      }

      const result = await response.json();
      setSettings(result.data);
      setFormData(result.data);
      setHasChanges(false);
      setSuccess('Settings saved successfully');
    } catch (err) {
      console.error('Error saving settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (settings) {
      setFormData(settings);
      setHasChanges(false);
    }
  };

  // =============================================================================
  // Render
  // =============================================================================

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!formData) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Failed to load settings. Please refresh the page.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure your site settings, author information, and SEO defaults
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {hasChanges && (
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={saving ? <CircularProgress size={20} /> : <Save />}
            onClick={handleSave}
            disabled={!hasChanges || saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': { minHeight: 64 },
            '& .MuiTabs-scrollButtons': {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          }}
        >
          <Tab icon={<Web />} label="Site" iconPosition="start" />
          <Tab icon={<Person />} label="Author" iconPosition="start" />
          <Tab icon={<Share />} label="Social" iconPosition="start" />
          <Tab icon={<SearchIcon />} label="SEO" iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Site Settings Tab */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  General Information
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <TextField
                  fullWidth
                  label="Site Name"
                  value={formData.site.name}
                  onChange={(e) => updateSiteField('name', e.target.value)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  label="Site Description"
                  multiline
                  rows={3}
                  value={formData.site.description}
                  onChange={(e) => updateSiteField('description', e.target.value)}
                  helperText="A brief description of your site for SEO and social sharing"
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  label="Site URL"
                  value={formData.site.url}
                  onChange={(e) => updateSiteField('url', e.target.value)}
                  helperText="Your site's public URL (e.g., https://example.com)"
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Branding
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <TextField
                  fullWidth
                  label="Logo URL"
                  value={formData.site.logoUrl || ''}
                  onChange={(e) => updateSiteField('logoUrl', e.target.value || null)}
                  helperText="URL to your site logo (leave empty for no logo)"
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  label="Favicon URL"
                  value={formData.site.faviconUrl || ''}
                  onChange={(e) => updateSiteField('faviconUrl', e.target.value || null)}
                  helperText="URL to your site favicon"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Author Settings Tab */}
      <TabPanel value={activeTab} index={1}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Author Information
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <TextField
                  fullWidth
                  label="Author Name"
                  value={formData.author.name}
                  onChange={(e) => updateAuthorField('name', e.target.value)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  label="Author Email"
                  type="email"
                  value={formData.author.email}
                  onChange={(e) => updateAuthorField('email', e.target.value)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  label="Tagline"
                  value={formData.author.tagline}
                  onChange={(e) => updateAuthorField('tagline', e.target.value)}
                  helperText="A short tagline (e.g., 'Full-Stack Developer & Writer')"
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  About
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <TextField
                  fullWidth
                  label="Author Bio"
                  multiline
                  rows={6}
                  value={formData.author.bio}
                  onChange={(e) => updateAuthorField('bio', e.target.value)}
                  helperText="Your bio that appears on the About page and author cards"
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  label="Avatar URL"
                  value={formData.author.avatarUrl || ''}
                  onChange={(e) => updateAuthorField('avatarUrl', e.target.value || null)}
                  helperText="URL to your avatar image (or upload one in Profile settings)"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Social Links Tab */}
      <TabPanel value={activeTab} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Social Links
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Add your social media profile full URLs. These will be displayed in your site&apos;s footer and author cards.
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Twitter/X"
                  value={formData.social.twitter || ''}
                  onChange={(e) => updateSocialField('twitter', e.target.value || null)}
                  placeholder="https://twitter.com/username"
                  slotProps={{ inputLabel: { shrink: true } }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">𝕏</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="GitHub"
                  value={formData.social.github || ''}
                  onChange={(e) => updateSocialField('github', e.target.value || null)}
                  placeholder="https://github.com/username"
                  slotProps={{ inputLabel: { shrink: true } }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><GitHub fontSize="small" /></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="LinkedIn"
                  value={formData.social.linkedin || ''}
                  onChange={(e) => updateSocialField('linkedin', e.target.value || null)}
                  placeholder="https://linkedin.com/in/username"
                  slotProps={{ inputLabel: { shrink: true } }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><LinkedIn fontSize="small" /></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Facebook"
                  value={formData.social.facebook || ''}
                  onChange={(e) => updateSocialField('facebook', e.target.value || null)}
                  placeholder="https://facebook.com/username"
                  slotProps={{ inputLabel: { shrink: true } }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Facebook fontSize="small" /></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Instagram"
                  value={formData.social.instagram || ''}
                  onChange={(e) => updateSocialField('instagram', e.target.value || null)}
                  placeholder="https://instagram.com/username"
                  slotProps={{ inputLabel: { shrink: true } }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Instagram fontSize="small" /></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="TikTok"
                  value={formData.social.tiktok || ''}
                  onChange={(e) => updateSocialField('tiktok', e.target.value || null)}
                  placeholder="https://tiktok.com/@username"
                  slotProps={{ inputLabel: { shrink: true } }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><TikTokIcon fontSize="small" /></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="YouTube"
                  value={formData.social.youtube || ''}
                  onChange={(e) => updateSocialField('youtube', e.target.value || null)}
                  placeholder="https://youtube.com/@username"
                  slotProps={{ inputLabel: { shrink: true } }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><YouTube fontSize="small" /></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Discord"
                  value={formData.social.discord || ''}
                  onChange={(e) => updateSocialField('discord', e.target.value || null)}
                  placeholder="https://discord.gg/invite-code"
                  slotProps={{ inputLabel: { shrink: true } }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><DiscordIcon fontSize="small" /></InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>

      {/* SEO Settings Tab */}
      <TabPanel value={activeTab} index={3}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Title Configuration
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <TextField
                  fullWidth
                  label="Title Template"
                  value={formData.seo.titleTemplate}
                  onChange={(e) => updateSeoField('titleTemplate', e.target.value)}
                  helperText="Use %s for page title (e.g., '%s | My Site')"
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  label="Default Title"
                  value={formData.seo.defaultTitle}
                  onChange={(e) => updateSeoField('defaultTitle', e.target.value)}
                  helperText="Default title when no page title is set"
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Social Sharing
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <TextField
                  fullWidth
                  label="Default OG Image URL"
                  placeholder="https://example.com/og-image.jpg"
                  value={formData.seo.ogImage || ''}
                  onChange={(e) => updateSeoField('ogImage', e.target.value || null)}
                  helperText="Default image for social sharing (1200x630 recommended)"
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  label="Twitter Card Type"
                  value={formData.seo.twitterCard}
                  onChange={(e) => updateSeoField('twitterCard', e.target.value)}
                  helperText="Usually 'summary' or 'summary_large_image'"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={5000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}
