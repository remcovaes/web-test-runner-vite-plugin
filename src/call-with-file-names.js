/**
 * Rollup/Vite plugin to call callback with all file names.
 * Useful when you want to add files that where built to a watcher
 * @param { (fileName: string) => void } callback
 * */
export const callWithFileNames = (callback) => ({
	name: 'file-name',
	transform(src, id) {
		callback(id);
	},
});
