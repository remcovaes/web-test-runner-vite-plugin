# @web/dev-server Vite plugin

A [@web/test-runner] plugin that allows files to be built with Vite instead of [@web/dev-server].
Inspired by [vite-web-test-runner].

## Usage

```
npm install @remcovaes/web-test-runner-vite-plugin --save-dev
```

## Examples
Simple and no configuration:
```javascript
// web-test-runner.config.js
import { vitePlugin } from '@remcovaes/web-test-runner-vite-plugin';

export default {
	files: 'src/**/*.test.ts',
	plugins: [
		vitePlugin(),
	],
};
```

Use the following prop in the [@web/test-runner] to remove vite logging.

```javascript
// web-test-runner.config.js
import { removeViteLogging } from '@remcovaes/web-test-runner-vite-plugin';

export default {
	...,
	filterBrowserLogs: removeViteLogging,
};
```

Use a [vite config] to make the build more complex. 
This can be done via a config file or directly passing it to the plugin.
For example, to enable react support without a vite config, you can use the following config:
```javascript
// web-test-runner.config.js
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
```


[@web/test-runner]: https://modern-web.dev/docs/test-runner/overview/
[@web/dev-server]: https://modern-web.dev/docs/dev-server/overview/
[vite-web-test-runner]: https://github.com/material-svelte/vite-web-test-runner-plugin/
[vite config]: https://vitejs.dev/config/
