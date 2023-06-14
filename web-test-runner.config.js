import { vitePlugin } from './src/index.js';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default {
  files: [ 'test/**/*.test.ts', 'test/**/*.test.jsx' ],
  plugins: [
    vitePlugin({
      plugins: [ reactRefresh() ],
    }),
  ],
};
