import { vitePlugin } from './src/index.js';

export default {
  files: 'test/**/*.test.ts',
  plugins: [
    vitePlugin(),
  ],
};
