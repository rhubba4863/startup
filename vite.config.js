
/**
 * Week 9-10
 * Forward fetch requests like ""fetch('/api/scores')" to connect to the
 * backend server running on port 4000."
 */
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});