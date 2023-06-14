import { existsSync } from 'node:fs';

import { createServer, mergeConfig } from 'vite';

import { callWithFileNames } from './call-with-file-names.js';
import { markExternal } from './mark-external.js';
import { proxy } from './proxy.js';

/**
 * @param config {import('vite').UserConfig}
 */
export const vitePlugin = (config = {}) => {
	let viteServer;
	
	return {
		name: "vite-plugin",
		
		async serverStart({ app, fileWatcher }) {
			const plugins = [
				callWithFileNames(id => {
					const file = id.split('?')[0];
					if (!file.startsWith('\0') && existsSync(file)) {
						fileWatcher.add(id);
					}
				}),
				markExternal([
					/* @web/test-runner-commands needs to establish a web-socket
					 * connection. It expects a file to be served from the
					 * @web/dev-server. So it should be ignored by Vite */
					'/__web-dev-server__web-socket.js',
				]),
			];
			
			viteServer = await createServer(
				mergeConfig(config, {
					clearScreen: false,
					plugins,
					/* Disable hmr in favor of the @web/test-runner to take care of
					* restarts. */
					server: { hmr: false },
				})
			);
			await viteServer.listen();
			
			const vitePort = viteServer.config.server.port;
			const viteProtocol = viteServer.config.server.https ? "https" : "http";
			
			app.use(proxy(`${viteProtocol}://localhost:${vitePort}`));
		},
		
		async serverStop() {
			return viteServer.close();
		},
	};
};
