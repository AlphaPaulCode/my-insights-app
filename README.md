Hashtag Sentiment Insight

 Overview

This app is a Next.js (Pages Router + TypeScript) project that fetches and visualizes hashtag sentiment data in an interactive line chart.  
- **Data layer**: Mocked API under `pages/api/trends/[hashtag].ts` serving static JSON from `mocks/trendData.ts`.  
- **Fetching**: `useHashtagTrend` hook powered by React Query (`@tanstack/react-query`) handles loading, error, and refetch logic.  
- **UI**: Material UI for layout, theming, and responsive design.  
- **Charting**: MUI X Charts’ `<LineChart>` renders sentiment over time, with memoization (`useMemo`, `React.memo`) for optimal performance.  
- **UX**:  
  - Loading spinner and retryable error alerts.  
  - Dropdown to switch hashtags.  
  - Mobile-friendly via MUI breakpoints.  
  - Clean folder structure with `/pages`, `/components`, `/hooks`, `/mocks`.

## Time Spent

Approximately *2 hours* from project scaffolding through polishing responsive layouts and fixing chart integration issues.
