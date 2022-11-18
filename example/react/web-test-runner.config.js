import { vitePlugin, removeViteLogging } from '@remcovaes/web-test-runner-vite-plugin';

export default {
  plugins: [
    vitePlugin(),
  ],
  files: 'src/**/*.test.jsx',
  coverageConfig: {
    include: [
      'src/**/*.{js,jsx,ts,tsx}'
    ]
  },
  testRunnerHtml: testFramework => `
    <html>
      <head>
        <script type="module">
          // Note: globals expected by @testing-library/react
          window.global = window;
          window.process = { env: {} };

          // Note: adapted from https://github.com/vitejs/vite/issues/1984#issuecomment-778289660
          // Note: without this you'll run into https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201
          window.__vite_plugin_react_preamble_installed__ = true;
        </script>
        <script type="module" src="${testFramework}"></script>
      </head>
    </html>
  `,
  filterBrowserLogs: removeViteLogging,
};
