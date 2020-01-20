const service = require('./src/services/serviceStock');
const http = require('http');
const url = require('url');
const logger = require("./logger");

module.exports = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    
    // GET Endpoint
    if (reqUrl.pathname == '/stock' && req.method === 'GET') {        
        service.getStockData(req, res);

    } else {
        logger.warning(`Request Type: ${req.method} Invalid Endpoint: ${reqUrl.pathname}`);
        
        service.invalidRequest(req, res);
    }
});
