// pages/api/trends/[hashtag].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import trendData, { TrendResponse } from '../../../../mocks/trendData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TrendResponse | { error: string }>
) {
  const raw = req.query.hashtag;
  const key = Array.isArray(raw) ? raw[0] : raw;

  if (!key) {
    // no hashtag supplied
    return res.status(400).json({ error: 'Missing hashtag parameter' });
  }

  const result = trendData[key]; // now key is definitely a string

  if (!result) {
    return res.status(404).json({ error: `No data for #${key}` });
  }

  res.status(200).json(result);
}
