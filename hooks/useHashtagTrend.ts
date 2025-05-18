import { useQuery } from '@tanstack/react-query';

export interface TrendPoint {
  date: string;
  sentiment: number;
}

export interface TrendResponse {
  hashtag: string;
  range: string;
  trend: TrendPoint[];
}

export function useHashtagTrend(hashtag: string) {
  return useQuery<TrendResponse, Error>({
    queryKey: ['trend', hashtag],
    queryFn: () =>
      fetch(`/api/trends/${hashtag}`)
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        }),
    enabled: !!hashtag,
  });
}