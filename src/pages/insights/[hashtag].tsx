import { useRouter } from 'next/router';
// import dynamic from 'next/dynamic';
import React, { useCallback } from 'react';
import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useHashtagTrend } from '../../../hooks/useHashtagTrend';
import HashtagTrendCard from '../../../components/HashtagTrendCard';

const HASHTAGS = ['uri', 'nextjs', 'react', 'typescript'];

const InsightsPage: React.FC = () => {
  const router = useRouter();
  const tag = Array.isArray(router.query.hashtag)
    ? router.query.hashtag[0]
    : (router.query.hashtag as string) || HASHTAGS[0];

  const { data, isLoading, isError, refetch } = useHashtagTrend(tag);
console.log('trend data:', data?.trend);
  const handleChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      router.push(`/insights/${e.target.value}`);
    },
    [router]
  );

  return (
    <Box sx={{ p: 2 }}>
      <Select
        value={tag}
        onChange={handleChange}
        sx={{ mb: 2, minWidth: 120 }}
      >
        {HASHTAGS.map(h => (
          <MenuItem key={h} value={h}>
            #{h}
          </MenuItem>
        ))}
      </Select>

      <HashtagTrendCard
        data={data}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
    </Box>
  );
};

export default InsightsPage;