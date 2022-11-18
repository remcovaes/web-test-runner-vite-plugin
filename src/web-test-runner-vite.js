import { createServer } from 'vite';
import { callWithFileNames } from './call-with-file-names.js';
import { rewriteImport } from './rewrite-import.js';
import { proxy } from './proxy.js';

export const vitePlugin = () => {
	let viteServer;
	
	return {
		name: "vite-plugin",
		
		async serverStart({ app, config, fileWatcher }) {
			const plugins = [
				callWithFileNames(id => {
					if (id.includes('plugin-vue')) {
						return;
					}
					
					return fileWatcher.add(id);
				}),
				rewriteImport({
					/* @web/test-runner-commands needs to establish a web-socket
					 * connection. It expects a file to be served from the
					 * @web/dev-server. Since we are taking control with a Vite
					 * server, we need to redirect this one import to the
					 * original @web/dev-server. */
					'/__web-dev-server__web-socket.js': `http://localhost:${config.port}/__web-dev-server__web-socket.js`,
				}),
			];
			
			viteServer = await createServer({
				clearScreen: false,
				plugins,
				/* Disable hmr in favor of the @web/test-runner to take care of
				 * restarts. */
				server: { hmr: false },
			});
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
