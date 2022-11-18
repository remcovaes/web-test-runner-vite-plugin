/**
 * @param { Record<string, string> } options
 */
export const rewriteImport = (options) => ({
	name: 'rewrite-import',
	resolveId(path) {
		if (!options[path]) {
			return;
		}
		
		return {
			id: options[path],
			external: true
		};
	},
});
