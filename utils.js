const { parse } = require('querystring');

const getReqData = (req) => {
	return new Promise((resolve, reject) => {
		try {
			let body = '';
			req.on('data', (chunk) => {
				body += chunk.toString();
			});
			req.on('end', () => {
				// console.log(parse(body));
				resolve(body);
			});
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = getReqData;
