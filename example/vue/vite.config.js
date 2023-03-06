import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		vue(),
	],
	resolve: {
		alias: {
			/* Ensure that we take the esm-browser variant, because the
			 * other variants expect a Vue variable to be globally
			 * defined. The ../../ is needed because this is a monorepo setup. */
			'@vue/test-utils': '../../node_modules/@vue/test-utils/dist/vue-test-utils.esm-bundler.mjs',
		},
	},
})
