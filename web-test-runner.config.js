import { vitePlugin } from './src/index.js';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: [ 'test/**/*.test.ts', 'test/**/*.test.jsx' ],
  plugins: [
    vitePlugin({
      plugins: [ reactRefresh() ],
    }),
  ],
  browsers: [
    playwrightLauncher({ product: 'chromium' })
  ],
};
