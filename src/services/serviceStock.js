const url = require('url');
const logger = require("../../logger");
const { iexapis } = require('./iexcloud');

exports.getStockData = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    const reqUrl = url.parse(req.url, true);
    const stockSymbol = reqUrl.query.symbol;
    if (stockSymbol) {
        try {
            const [getLogo, getPrice, getLatestNews] = await Promise.all([
                iexapis(stockSymbol, 'logo'),
                iexapis(stockSymbol, 'quote'),
                iexapis(stockSymbol, 'news/last')
            ]);
            
            const response = {
                latestPrice: getPrice.latestPrice,
                logo: getLogo.url,
                url: getLatestNews[0].url
            };
            
            res.statusCode = 200;
            res.end(JSON.stringify(response));
            logger.info(`Request Type: ${req.method} Invalid Endpoint: ${reqUrl.pathname} successfully`);
        } catch (error) {
            logger.error(`Request Type: ${req.method} Erro response: ${reqUrl.pathname} failed`);
            res.statusCode = error.statusCode;
            const response = {
                message: 'Error'
            };
            res.end(JSON.stringify(response));
        }
    } else {
        const response = { message: 'The params are incorrect' };

        res.statusCode = 400;
        res.end(JSON.stringify(response));
        logger.warning(`Request Type: ${req.method} Bad request: ${reqUrl.pathname} failed`);
    }
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};
