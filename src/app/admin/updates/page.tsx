'use client';

import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import { OpenInNew, Sync } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

type UpdateStatus = {
  sourceRepo: string;
  current: {
    version: string;
    buildSha: string;
  };
  latest: {
    repo: string;
    tagName: string;
    version: string;
    name: string;
    url: string;
    publishedAt: string;
  } | null;
  updateAvailable: boolean | null;
  warning?: string;
};

function StatusChip({ value }: { value: boolean | null }) {
  if (value === true) {
    return <Chip color="warning" label="Update Available" size="small" />;
  }

  if (value === false) {
    return <Chip color="success" label="Up To Date" size="small" />;
  }

  return <Chip color="default" label="Unknown" size="small" />;
}

export default function UpdatesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<UpdateStatus | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/updates');
      if (!response.ok) {
        throw new Error('Failed to fetch update status');
      }

      const payload = await response.json();
      setStatus(payload.data as UpdateStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected update status error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !status) {
    return <Alert severity="error">{error || 'Update status unavailable.'}</Alert>;
  }

  const latestPublished = status.latest?.publishedAt
    ? formatDistanceToNow(new Date(status.latest.publishedAt), { addSuffix: true })
    : null;

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Updates
        </Typography>
        <Typography color="text.secondary">
          Monitor framework release status before running upstream sync workflows.
        </Typography>
      </Box>

      {status.warning ? <Alert severity="warning">{status.warning}</Alert> : null}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Stack spacing={1.5}>
                <Typography variant="overline" color="text.secondary">
                  Current Build
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  v{status.current.version}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Build SHA: {status.current.buildSha ? status.current.buildSha.slice(0, 7) : 'n/a'}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Stack spacing={1.5}>
                <Typography variant="overline" color="text.secondary">
                  Template Release
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  {status.latest ? status.latest.tagName : 'Unknown'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Source: {status.sourceRepo}
                </Typography>
                {latestPublished ? (
                  <Typography variant="body2" color="text.secondary">
                    Published {latestPublished}
                  </Typography>
                ) : null}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Update Status</Typography>
              <StatusChip value={status.updateAvailable} />
            </Box>

            <Typography color="text.secondary">
              Use <strong>pnpm devholm sync:check --against template/main</strong> before pulling
              framework updates. If your repository uses an upstream remote name, use{' '}
              <strong>--against upstream/main</strong>.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button variant="outlined" startIcon={<Sync />} onClick={fetchStatus}>
                Refresh Status
              </Button>
              {status.latest?.url ? (
                <Button
                  variant="contained"
                  color="primary"
                  href={status.latest.url}
                  target="_blank"
                  rel="noreferrer"
                  startIcon={<OpenInNew />}
                >
                  View Release Notes
                </Button>
              ) : null}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
