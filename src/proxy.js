import http from 'node:http';

const get = url => new Promise((resolve, reject) => {
	const request = http.get(url, (response) => {
		const body = [];
		response.on('data', (chunk) => body.push(chunk));
		
		response.on('end', () => resolve({
			body: body.join(''),
			headers: response.headers,
			status: response.statusCode,
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
	const { body, headers, status } = await get(url + ctx.originalUrl);
	ctx.set(headers);
	ctx.body = body;
	ctx.status = status;
};
