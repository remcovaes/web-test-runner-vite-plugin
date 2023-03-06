import http from 'node:http';

const get = url => new Promise((resolve, reject) => {
	const request = http.get(url, (response) => {
		const strings = [];
		const buffers = [];
		let bufferLen = 0;

		response.on('data', chunk => {
			if (!Buffer.isBuffer(chunk)) {
				strings.push(chunk);
			} else if (chunk.length) {
				bufferLen += chunk.length;
				buffers.push(chunk);
			}
		});

		response.on('end', () => {
			let body;

			if (bufferLen) {
				body = Buffer.concat(buffers, bufferLen);
			} else {
				body = strings.join('');
			}
			resolve({
				body,
				headers: response.headers,
				status: response.statusCode
			});
		});
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
