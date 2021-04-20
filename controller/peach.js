const https = require('https');
const querystring = require('querystring');

const request = async () => {
	const path='/v1/checkouts';
	const data = querystring.stringify({
		'entityId':'8ac7a4c978c689430178cfc5817d10c6',
		'amount':'92.00',
		'currency':'ZAR',
		'paymentType':'DB'
	});
	const options = {
		port: 443,
		host: 'test.oppwa.com',
		path: path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': data.length,
			'Authorization':'Bearer OGFjN2E0Yzk3OGM2ODk0MzAxNzhjZmM1N2Q4NzEwYzR8eTJwRXBzOENXcA=='
		}
	};
	return new Promise((resolve, reject) => {
		const postRequest = https.request(options, function(res) {
			const buf = [];
			res.on('data', chunk => {
				buf.push(Buffer.from(chunk));
			});
			res.on('end', () => {
				const jsonString = Buffer.concat(buf).toString('utf8');
				try {
					resolve(JSON.parse(jsonString));
				} catch (error) {
					reject(error);
				}
			});
		});
		postRequest.on('error', reject);
		postRequest.write(data);
		postRequest.end();
	});
};

const processPayment = (req, res) => {

}
request().then(res => console.log(res.id)).catch(console.error);

exports.request