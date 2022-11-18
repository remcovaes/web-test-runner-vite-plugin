import { playwrightLauncher } from '@web/test-runner-playwright';
import { vitePlugin, removeViteLogging } from '@remcovaes/web-test-runner-vite-plugin';

export default {
  files: 'src/**/*.test.ts',
  plugins: [
    vitePlugin(),
  ],
  coverageConfig: {
    include: [
      'src/**/*.{vue,js,jsx,ts,tsx}'
    ]
  },
  testRunnerHtml: testFramework => `
    <html>
      <body>
        <script type="module">
          // Note: globals expected by @testing-library/vue
          window.process = { env: {} };
        </script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  filterBrowserLogs: removeViteLogging,
  browsers: [
      playwrightLauncher({ product: 'chromium', launchOptions: { slowMo: 300 } }),
      playwrightLauncher({ product: 'firefox', launchOptions: { slowMo: 300 } }),
      playwrightLauncher({ product: 'webkit', launchOptions: { slowMo: 300 } })
  ],
  testFramework: {
    config: {
      timeout: 1200000,
    },
  },
};
