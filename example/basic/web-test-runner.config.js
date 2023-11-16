import { vitePlugin } from '@remcovaes/web-test-runner-vite-plugin';
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: 'src/**/*.test.ts',
  plugins: [
    vitePlugin(),
  ],
  browsers: [
    playwrightLauncher({ product: 'chromium' })
  ],
};
