import { vitePlugin } from '@remcovaes/web-test-runner-vite-plugin';

export default {
  files: 'src/**/*.test.ts',
  plugins: [
    vitePlugin(),
  ],
};
