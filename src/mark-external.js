/**
 * @param { string[] } options
 */
export const markExternal = (options) => ({
	name: 'mark-external',
	resolveId(path) {
		if (!options.includes(path)) {
			return;
		}
		
		return {
			id: path,
			external: true
		};
	},
});
