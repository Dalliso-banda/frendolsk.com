'use client';

/**
 * Admin Analytics Dashboard
 * =========================
 * 
 * Displays site traffic analytics including:
 * - Total page views and unique visitors
 * - Top pages
 * - Referrer breakdown
 * - Traffic over time
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2 as Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Alert,
  LinearProgress,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Visibility,
  People,
  TrendingUp,
  Language,
  Refresh,
  OpenInNew,
  ErrorOutline,
  ChevronRight,
  ArrowBack,
} from '@mui/icons-material';
import { format } from 'date-fns';

// =============================================================================
// Types
// =============================================================================

interface AnalyticsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  total404s: number;
  topPages: Array<{
    path: string;
    views: number;
    uniqueVisitors: number;
  }>;
  topReferrers: Array<{
    domain: string | null;
    visits: number;
    uniqueVisitors: number;
  }>;
  recentReferrers: Array<{
    domain: string;
    url: string;
    visitedAt: string;
  }>;
  viewsByDay: Array<{
    date: string;
    views: number;
    visitors: number;
  }>;
  trafficSources: Array<{
    source: string;
    visits: number;
  }>;
  top404s: Array<{
    path: string;
    hits: number;
    lastHit: string;
  }>;
}

// Drill-down modal view types
type DrillDownView = 'pages' | 'referrers' | '404s' | 'page-referrers' | 'referrer-pages' | null;

// Breadcrumb item for navigation history
interface BreadcrumbItem {
  view: DrillDownView;
  label: string;
  context?: string; // pagePath or domain for nested views
}

interface PaginatedData<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// =============================================================================
// Stats Card Component
// =============================================================================

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

function StatsCard({ title, value, icon, color, subtitle }: StatsCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', textTransform: 'uppercase', fontWeight: 600 }}
            >
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, color }}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: alpha(color, 0.1),
              color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// =============================================================================
// Traffic Source Bar
// =============================================================================

interface TrafficSourceBarProps {
  label: string;
  value: number;
  total: number;
  color: string;
}

function TrafficSourceBar({ label, value, total, color }: TrafficSourceBarProps) {
  const safeValue = value ?? 0;
  const safeTotal = total ?? 0;
  const percentage = safeTotal > 0 ? (safeValue / safeTotal) * 100 : 0;
  
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" fontWeight={500}>
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {safeValue.toLocaleString()} ({percentage.toFixed(1)}%)
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 1,
          bgcolor: alpha(color, 0.1),
          '& .MuiLinearProgress-bar': {
            bgcolor: color,
            borderRadius: 1,
          },
        }}
      />
    </Box>
  );
}

// =============================================================================
// Simple Chart Component (ASCII-style for now)
// =============================================================================

interface SimpleChartProps {
  data: Array<{ date: string; views: number }>;
}

function SimpleChart({ data }: SimpleChartProps) {
  const theme = useTheme();
  const maxViews = Math.max(...data.map((d) => d.views), 1);
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5, height: 150 }}>
      {data.map((item) => {
        const height = (item.views / maxViews) * 100;
        const date = new Date(item.date);
        const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        return (
          <Tooltip
            key={item.date}
            title={`${date.toLocaleDateString()}: ${item.views} views`}
            arrow
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: `${Math.max(height, 5)}%`,
                  bgcolor: theme.palette.primary.main,
                  borderRadius: '4px 4px 0 0',
                  minHeight: 4,
                  transition: 'height 0.3s ease',
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  fontSize: '0.65rem',
                  color: 'text.secondary',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {dayLabel}
              </Typography>
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
}

// =============================================================================
// Main Dashboard Component
// =============================================================================

export default function AnalyticsDashboard() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [dateRange, setDateRange] = useState(30);
  
  // Drill-down modal state
  const [drillDownView, setDrillDownView] = useState<DrillDownView>(null);
  const [drillDownData, setDrillDownData] = useState<PaginatedData<unknown> | null>(null);
  const [drillDownLoading, setDrillDownLoading] = useState(false);
  const [drillDownPage, setDrillDownPage] = useState(1);
  
  // Navigation history for nested drill-downs
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [currentContext, setCurrentContext] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/analytics?action=summary&days=${dateRange}`);
      
      if (!response.ok) {
        if (response.status === 401) {
          setError('You must be logged in to view analytics.');
        } else {
          setError('Failed to load analytics data.');
        }
        return;
      }
      
      const result = await response.json();
      setData(result);
    } catch {
      setError('An error occurred while loading analytics.');
    } finally {
      setLoading(false);
    }
  }, [dateRange]);
  
  // Fetch drill-down data
  const fetchDrillDownData = useCallback(async (view: DrillDownView, page: number = 1, context?: string) => {
    if (!view) return;
    
    setDrillDownLoading(true);
    try {
      let url = `/api/analytics?days=${dateRange}&page=${page}&limit=25`;
      
      switch (view) {
        case 'pages':
          url += '&action=all-pages';
          break;
        case 'referrers':
          url += '&action=all-referrers';
          break;
        case '404s':
          url += '&action=all-404s';
          break;
        case 'page-referrers':
          if (!context) return;
          url += `&action=page-referrers&pagePath=${encodeURIComponent(context)}`;
          break;
        case 'referrer-pages':
          if (!context) return;
          url += `&action=referrer-pages&domain=${encodeURIComponent(context)}`;
          break;
      }
      
      const response = await fetch(url);
      
      if (response.ok) {
        const result = await response.json();
        setDrillDownData({
          data: result.pages || result.referrers || result.errors || [],
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
        });
      }
    } catch (err) {
      console.error('Failed to fetch drill-down data:', err);
    } finally {
      setDrillDownLoading(false);
    }
  }, [dateRange]);
  
  // Handle opening drill-down view
  const openDrillDown = (view: DrillDownView) => {
    setDrillDownView(view);
    setDrillDownPage(1);
    setCurrentContext(null);
    setBreadcrumbs([{ view, label: getViewTitle(view) }]);
    fetchDrillDownData(view, 1);
  };
  
  // Handle navigating to a nested drill-down view
  const navigateToNestedView = (view: DrillDownView, context: string, label: string) => {
    setBreadcrumbs(prev => [...prev, { view, label, context }]);
    setDrillDownView(view);
    setDrillDownPage(1);
    setCurrentContext(context);
    fetchDrillDownData(view, 1, context);
  };
  
  // Handle navigating back in breadcrumbs
  const navigateToBreadcrumb = (index: number) => {
    const targetCrumb = breadcrumbs[index];
    setBreadcrumbs(prev => prev.slice(0, index + 1));
    setDrillDownView(targetCrumb.view);
    setDrillDownPage(1);
    setCurrentContext(targetCrumb.context || null);
    fetchDrillDownData(targetCrumb.view, 1, targetCrumb.context);
  };
  
  // Get title for a drill-down view
  const getViewTitle = (view: DrillDownView): string => {
    switch (view) {
      case 'pages': return 'All Pages';
      case 'referrers': return 'All Referrers';
      case '404s': return 'All 404 Errors';
      case 'page-referrers': return 'Page Referrers';
      case 'referrer-pages': return 'Referrer Pages';
      default: return '';
    }
  };
  
  // Handle page change in drill-down
  const handleDrillDownPageChange = (_: unknown, newPage: number) => {
    setDrillDownPage(newPage + 1);
    fetchDrillDownData(drillDownView, newPage + 1, currentContext || undefined);
  };
  
  // Close drill-down modal
  const closeDrillDown = () => {
    setDrillDownView(null);
    setDrillDownData(null);
    setDrillDownPage(1);
    setBreadcrumbs([]);
    setCurrentContext(null);
  };

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Traffic source colors
  const sourceColors = {
    direct: theme.palette.primary.main,
    referral: theme.palette.success.main,
    social: theme.palette.info.main,
    search: theme.palette.warning.main,
    other: theme.palette.grey[500],
  };

  // Get referrer icon
  const getReferrerIcon = (domain: string | null) => {
    if (!domain) return <Language />;
    if (domain.includes('facebook') || domain.includes('twitter') || domain.includes('linkedin')) {
      return <People />;
    }
    if (domain.includes('google') || domain.includes('bing') || domain.includes('duckduckgo')) {
      return <TrendingUp />;
    }
    return <Language />;
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track your site&apos;s traffic and referrer sources
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Date Range</InputLabel>
            <Select
              value={dateRange}
              label="Date Range"
              onChange={(e) => setDateRange(Number(e.target.value))}
            >
              <MenuItem value={7}>Last 7 days</MenuItem>
              <MenuItem value={30}>Last 30 days</MenuItem>
              <MenuItem value={90}>Last 90 days</MenuItem>
              <MenuItem value={365}>Last year</MenuItem>
            </Select>
          </FormControl>
          
          <Tooltip title="Refresh data">
            <IconButton onClick={fetchAnalytics} disabled={loading}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Data Display */}
      {!loading && data && (
        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              title="Total Page Views"
              value={data.totalPageViews}
              icon={<Visibility />}
              color={theme.palette.primary.main}
              subtitle={`Last ${dateRange} days`}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              title="Unique Visitors"
              value={data.uniqueVisitors}
              icon={<People />}
              color={theme.palette.success.main}
              subtitle={`Last ${dateRange} days`}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              title="Top Referrer"
              value={data.topReferrers[0]?.domain || 'Direct'}
              icon={<Language />}
              color={theme.palette.info.main}
              subtitle={`${data.topReferrers[0]?.visits || 0} visits`}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              title="Pages per Visit"
              value={
                (data.uniqueVisitors ?? 0) > 0
                  ? ((data.totalPageViews ?? 0) / data.uniqueVisitors).toFixed(1)
                  : '0'
              }
              icon={<TrendingUp />}
              color={theme.palette.warning.main}
              subtitle="Average"
            />
          </Grid>

          {/* Views Over Time Chart */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Views Over Time
                </Typography>
                {data.viewsByDay.length > 0 ? (
                  <SimpleChart data={data.viewsByDay.slice(-14)} />
                ) : (
                  <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                    No data available for this period
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Traffic Sources */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Traffic Sources
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {data.trafficSources.slice(0, 5).map((source, index) => {
                    const colors = [sourceColors.direct, sourceColors.referral, sourceColors.social, sourceColors.search, sourceColors.other];
                    return (
                      <TrafficSourceBar
                        key={source.source}
                        label={source.source === 'direct' ? 'Direct' : source.source}
                        value={source.visits}
                        total={data.totalPageViews}
                        color={colors[index % colors.length]}
                      />
                    );
                  })}
                  {data.trafficSources.length === 0 && (
                    <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                      No traffic source data yet
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Pages */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Top Pages
                  </Typography>
                  <Button
                    size="small"
                    endIcon={<ChevronRight />}
                    onClick={() => openDrillDown('pages')}
                  >
                    View All
                  </Button>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Page</TableCell>
                        <TableCell align="right">Views</TableCell>
                        <TableCell align="right">Visitors</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.topPages.length > 0 ? (
                        data.topPages.slice(0, 10).map((page, index) => (
                          <TableRow key={`${page.path}-${index}`} hover>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    maxWidth: 200,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {page.path}
                                </Typography>
                                <Tooltip title="View page">
                                  <IconButton
                                    size="small"
                                    href={page.path}
                                    target="_blank"
                                  >
                                    <OpenInNew fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight={500}>
                                {(page.views ?? 0).toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" color="text.secondary">
                                {(page.uniqueVisitors ?? 0).toLocaleString()}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            <Typography color="text.secondary" sx={{ py: 2 }}>
                              No page views recorded yet
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Referrers */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Top Referrers
                  </Typography>
                  <Button
                    size="small"
                    endIcon={<ChevronRight />}
                    onClick={() => openDrillDown('referrers')}
                  >
                    View All
                  </Button>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Source</TableCell>
                        <TableCell align="right">Visits</TableCell>
                        <TableCell align="right">Visitors</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.topReferrers.length > 0 ? (
                        data.topReferrers.slice(0, 10).map((referrer, index) => (
                          <TableRow key={referrer.domain || `direct-${index}`} hover>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {getReferrerIcon(referrer.domain)}
                                <Typography variant="body2">
                                  {referrer.domain || 'Direct / None'}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight={500}>
                                {referrer.visits.toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" color="text.secondary">
                                {referrer.uniqueVisitors.toLocaleString()}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            <Typography color="text.secondary" sx={{ py: 2 }}>
                              No referrer data yet
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* 404 Errors Table */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ErrorOutline color="error" />
                    <Typography variant="h6" fontWeight={600}>
                      404 Errors
                    </Typography>
                    {data.total404s > 0 && (
                      <Typography variant="body2" color="text.secondary">
                        ({data.total404s.toLocaleString()} total)
                      </Typography>
                    )}
                  </Box>
                  {data.top404s.length > 0 && (
                    <Button
                      size="small"
                      endIcon={<ChevronRight />}
                      onClick={() => openDrillDown('404s')}
                    >
                      View All
                    </Button>
                  )}
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Requested URL</TableCell>
                        <TableCell align="right">Hits</TableCell>
                        <TableCell align="right">Last Hit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.top404s.length > 0 ? (
                        data.top404s.slice(0, 10).map((error, index) => (
                          <TableRow key={`${error.path}-${index}`} hover>
                            <TableCell>
                              <Typography
                                variant="body2"
                                sx={{
                                  maxWidth: 400,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  fontFamily: 'monospace',
                                  color: 'error.main',
                                }}
                              >
                                {error.path}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight={500}>
                                {error.hits.toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" color="text.secondary">
                                {format(new Date(error.lastHit), 'MMM d, h:mm a')}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            <Typography color="text.secondary" sx={{ py: 2 }}>
                              No 404 errors recorded — great job! 🎉
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Privacy Notice */}
          <Grid size={{ xs: 12 }}>
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Privacy-focused analytics:</strong> This system does not track IP addresses,
                use cookies for tracking, or collect personally identifiable information. Data is
                aggregated and anonymized to provide insights while respecting visitor privacy.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      )}

      {/* Drill-Down Dialog */}
      <Dialog
        open={drillDownView !== null}
        onClose={closeDrillDown}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {/* Breadcrumb Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {breadcrumbs.length > 1 && (
              <IconButton 
                size="small" 
                onClick={() => navigateToBreadcrumb(breadcrumbs.length - 2)}
                sx={{ mr: 1 }}
              >
                <ArrowBack fontSize="small" />
              </IconButton>
            )}
            {breadcrumbs.map((crumb, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                {index > 0 && (
                  <ChevronRight fontSize="small" sx={{ color: 'text.secondary', mx: 0.5 }} />
                )}
                {index < breadcrumbs.length - 1 ? (
                  <Button
                    size="small"
                    onClick={() => navigateToBreadcrumb(index)}
                    sx={{ textTransform: 'none', minWidth: 'auto', p: 0.5 }}
                  >
                    {crumb.label}
                  </Button>
                ) : (
                  <Typography variant="h6" component="span">
                    {crumb.label}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
          {currentContext && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {drillDownView === 'page-referrers' ? `Page: ${currentContext}` : `Referrer: ${currentContext}`}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          {drillDownLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : drillDownData ? (
            <>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {drillDownView === 'pages' && (
                        <>
                          <TableCell>Page</TableCell>
                          <TableCell align="right">Views</TableCell>
                          <TableCell align="right">Visitors</TableCell>
                          <TableCell align="center">Referrers</TableCell>
                        </>
                      )}
                      {drillDownView === 'referrers' && (
                        <>
                          <TableCell>Referrer</TableCell>
                          <TableCell align="right">Visits</TableCell>
                          <TableCell align="right">Visitors</TableCell>
                          <TableCell align="right">Last Visit</TableCell>
                          <TableCell align="center">Pages</TableCell>
                        </>
                      )}
                      {drillDownView === '404s' && (
                        <>
                          <TableCell>URL</TableCell>
                          <TableCell align="right">Hits</TableCell>
                          <TableCell>Referrer</TableCell>
                          <TableCell align="right">Last Hit</TableCell>
                        </>
                      )}
                      {drillDownView === 'page-referrers' && (
                        <>
                          <TableCell>Referrer</TableCell>
                          <TableCell align="right">Visits</TableCell>
                          <TableCell align="right">Visitors</TableCell>
                          <TableCell align="right">Last Visit</TableCell>
                        </>
                      )}
                      {drillDownView === 'referrer-pages' && (
                        <>
                          <TableCell>Page</TableCell>
                          <TableCell align="right">Views</TableCell>
                          <TableCell align="right">Visitors</TableCell>
                          <TableCell align="right">Last Visit</TableCell>
                        </>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(drillDownData.data as Array<Record<string, unknown>>).map((item, index) => (
                      <TableRow key={index} hover>
                        {drillDownView === 'pages' && (
                          <>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    maxWidth: 250,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {item.path as string}
                                </Typography>
                                <IconButton size="small" href={item.path as string} target="_blank">
                                  <OpenInNew fontSize="small" />
                                </IconButton>
                              </Box>
                            </TableCell>
                            <TableCell align="right">{(item.views as number).toLocaleString()}</TableCell>
                            <TableCell align="right">{(item.uniqueVisitors as number).toLocaleString()}</TableCell>
                            <TableCell align="center">
                              <Tooltip title="View referrers for this page">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => navigateToNestedView('page-referrers', item.path as string, `Referrers → ${item.path as string}`)}
                                >
                                  <ChevronRight />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </>
                        )}
                        {drillDownView === 'referrers' && (
                          <>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {getReferrerIcon(item.domain as string)}
                                <Typography variant="body2">{item.domain as string}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">{(item.visits as number).toLocaleString()}</TableCell>
                            <TableCell align="right">{(item.uniqueVisitors as number).toLocaleString()}</TableCell>
                            <TableCell align="right">
                              {format(new Date(item.lastVisit as string), 'MMM d, h:mm a')}
                            </TableCell>
                            <TableCell align="center">
                              <Tooltip title="View pages visited from this referrer">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => navigateToNestedView('referrer-pages', item.domain as string, `Pages → ${item.domain as string}`)}
                                >
                                  <ChevronRight />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </>
                        )}
                        {drillDownView === '404s' && (
                          <>
                            <TableCell>
                              <Typography
                                variant="body2"
                                sx={{
                                  maxWidth: 250,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  fontFamily: 'monospace',
                                  color: 'error.main',
                                }}
                              >
                                {item.path as string}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">{(item.hits as number).toLocaleString()}</TableCell>
                            <TableCell>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  maxWidth: 150,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {(item.referrer as string) || '—'}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              {format(new Date(item.lastHit as string), 'MMM d, h:mm a')}
                            </TableCell>
                          </>
                        )}
                        {drillDownView === 'page-referrers' && (
                          <>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {getReferrerIcon(item.domain as string)}
                                <Typography variant="body2">{item.domain as string}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">{(item.visits as number).toLocaleString()}</TableCell>
                            <TableCell align="right">{(item.uniqueVisitors as number).toLocaleString()}</TableCell>
                            <TableCell align="right">
                              {format(new Date(item.lastVisit as string), 'MMM d, h:mm a')}
                            </TableCell>
                          </>
                        )}
                        {drillDownView === 'referrer-pages' && (
                          <>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    maxWidth: 250,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {item.path as string}
                                </Typography>
                                <IconButton size="small" href={item.path as string} target="_blank">
                                  <OpenInNew fontSize="small" />
                                </IconButton>
                              </Box>
                            </TableCell>
                            <TableCell align="right">{(item.views as number).toLocaleString()}</TableCell>
                            <TableCell align="right">{(item.uniqueVisitors as number).toLocaleString()}</TableCell>
                            <TableCell align="right">
                              {format(new Date(item.lastVisit as string), 'MMM d, h:mm a')}
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {drillDownData.totalPages > 1 && (
                <TablePagination
                  component="div"
                  count={drillDownData.total}
                  page={drillDownPage - 1}
                  onPageChange={handleDrillDownPageChange}
                  rowsPerPage={drillDownData.limit}
                  rowsPerPageOptions={[25]}
                />
              )}
            </>
          ) : (
            <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
              No data available
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDrillDown}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Empty State */}
      {!loading && !error && !data && (
        <Card sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No analytics data available
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Analytics will appear here once your site starts receiving traffic.
          </Typography>
        </Card>
      )}
    </Box>
  );
}
