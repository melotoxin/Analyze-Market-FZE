import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Kept separate from vite.config.ts so the production build config stays clean.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // Forks time out spawning workers on Windows; a single thread is plenty for
    // this suite and keeps CI and local behaviour identical.
    pool: 'threads',
    maxWorkers: 1,
    minWorkers: 1,
    testTimeout: 15000,
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    // The two pre-existing assertion scripts run standalone via tsx (npm run test:unit).
    include: ['src/**/*.test.tsx', 'src/**/*.spec.tsx'],
  },
});
