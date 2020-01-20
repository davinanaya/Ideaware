const server = require('./handleRequest');
const { PORT } = require('./config');

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
