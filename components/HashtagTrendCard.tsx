import React, { useMemo, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import SentimentChart from './SentimentChart';
import type { TrendResponse } from '../hooks/useHashtagTrend';

interface Props {
  data?: TrendResponse;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const HashtagTrendCard: React.FC<Props> = React.memo(
  ({ data, isLoading, isError, refetch }) => {
    const indicator = useMemo(() => {
      if (!data) return '';
      const first = data.trend[0].sentiment;
      const last = data.trend[data.trend.length - 1].sentiment;
      return last > first ? '📈' : '📉';
    }, [data]);

    const handleRetry = useCallback(() => {
      refetch();
    }, [refetch]);

    return (
      <Card sx={{ maxWidth: 600, mx: 'auto', my: 4, px: 2 }}>
        
        <CardHeader
          title={
            <Typography variant="h5">
              {data ? data.hashtag : 'Loading…'} {indicator}
            </Typography>
          }
          subheader={data?.range}
        />

        <CardContent>
          {isLoading && (
            <Box textAlign="center" py={6}>
              <CircularProgress />
            </Box>
          )}

          {isError && (
            <Alert
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={handleRetry}>
                  Retry
                </Button>
              }
            >
              Failed to load data.
            </Alert>
          )}

          {!isLoading && !isError && data && (
            <SentimentChart data={data.trend} />
          )}
        </CardContent>

        <CardActions>
          <Typography variant="caption" sx={{ flexGrow: 1 }}>
            Data from /api/trends/{data?.hashtag.replace('#', '')}
          </Typography>
        </CardActions>
      </Card>
    );
  }
);

HashtagTrendCard.displayName = 'HashtagTrendCard';
export default HashtagTrendCard;