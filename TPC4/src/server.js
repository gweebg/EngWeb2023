const url = require('url');
const http = require('http');

const staticResources = require('./static.js');

const index = require("./routes/index");

const routes = {
    "/": index.index
};

const port = 20000;

async function handler(req, res) {

    const parsedUrl = url.parse(req.url, true);

    console.log(`request> ${req.method} ${parsedUrl.pathname}`);

    if (staticResources.isStatic(req)) staticResources.serveStaticResource(req, res);

    else {
        let route = routes[parsedUrl.pathname];
        route(req, res, parsedUrl.pathname);
    }

}

const server = http.createServer(handler);

server.listen(port);

console.log(`info> server is running at port ${port}`);