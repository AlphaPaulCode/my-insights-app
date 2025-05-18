// my-insights-app/components/SentimentChart.tsx
import React from 'react';
import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import type { TrendPoint } from '../hooks/useHashtagTrend';

interface Props {
  data: TrendPoint[];
}

const SentimentChart: React.FC<Props> = React.memo(({ data }) => {
  // Turn your trend[] into an array of { x, y } objects
  const dataset = React.useMemo(
    () =>
      data.map(pt => ({
        // numeric timestamp
        x: new Date(pt.date).getTime(),
        y: pt.sentiment,
      })),
    [data]
  );

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <LineChart
        // supply the raw data
        dataset={dataset}
        // tell the chart which field is your x
        xAxis={[
          { dataKey: 'x', scaleType: 'time' },
        ]}
        // tell the chart which field is your y
        series={[
          { dataKey: 'y', label: 'Sentiment' },
        ]}
        height={300}
      />
    </Box>
  );
});
SentimentChart.displayName = 'SentimentChart';
export default SentimentChart;
