import http from 'node:http';
import https from 'node:https';

const get = url => new Promise((resolve, reject) => {
	const getByProtocol = url.startsWith('https') ? https.get : http.get;
	const request = getByProtocol(url, (response) => {
		const buffers = [];
		let bufferLen = 0;

		response.on('data', chunk => {
			bufferLen += chunk.length;
			buffers.push(chunk);
		});

		response.on('end', () => resolve({
			body: Buffer.concat(buffers, bufferLen),
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
