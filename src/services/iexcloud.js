const https = require('https');
const { API_TOKEN } = require('../../config');

exports.iexapis = function (stockSymbol, type) {
    return new Promise((resolve, reject) => {
        const iexapisUrl = `https://cloud.iexapis.com/stable/stock/${stockSymbol}`;
        const req = https.get(`${iexapisUrl}/${type}?token=${API_TOKEN}`, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject({
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage
                });
            }
            let data = '';
        
            res.on('data', (chunk) => data += chunk);
        
            res.on('end', () => resolve(JSON.parse(data)));
        });

        req.on('error', reject);

        req.end();
    });
}
