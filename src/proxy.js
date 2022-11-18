import http from 'node:http';

const get = url => new Promise((resolve, reject) => {
	const request = http.get(url, (response) => {
		if (response.statusCode < 200 || response.statusCode > 299) {
			reject(new Error('Failed to load page, status code: ' + response.statusCode));
		}
		
		const body = [];
		response.on('data', (chunk) => body.push(chunk));
		
		response.on('end', () => resolve({
			body: body.join(''),
			headers: response.headers,
		}));
	});
	
	request.on('error', (err) => reject(err))
});

/**
 * Simple koa middleware proxy to handle get requests.
 *
 * Used in favor of installing a dependency.
 *
 * @param {string} url
 */
export const proxy = (url) => async ctx => {
	const { body, headers } = await get(url + ctx.originalUrl);
	
	Object.entries(headers).forEach(([ key, value ]) => {
		ctx.set(key, value);
	});
	ctx.body = body;
};
