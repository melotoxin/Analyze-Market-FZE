import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './index.css';

// Both scripts are served by Vercel's edge from /_vercel/insights. Off Vercel —
// cPanel, or a file:// preview — that path 404s on every page load and nothing is
// ever recorded, so only mount them where they can actually work.
const onVercel =
  typeof window !== 'undefined' && /(^|\.)vercel\.app$/.test(window.location.hostname);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
      {/* Cookieless: no consent banner obligation. */}
      {onVercel && <Analytics />}
      {onVercel && <SpeedInsights />}
    </ErrorBoundary>
  </React.StrictMode>
);
