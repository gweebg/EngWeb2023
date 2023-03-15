const url = require('url');
const http = require('http');

const staticResources = require('./static.js');
const {getTasks, addNewTask, deleteTask, setDoneTask} = require("./tasks");

const port = 20000;

async function handler(req, res) {

    const parsedUrl = url.parse(req.url, true);

    console.log(`request> ${req.method} ${parsedUrl.pathname}`);

    if (staticResources.isStatic(req)) staticResources.serveStaticResource(req, res);

    else {

        const pathname = parsedUrl.pathname;

        if (req.method === 'GET' && pathname === '/tasks') await getTasks(req, res, pathname);
        else if (req.method === 'POST' && pathname === '/tasks/') addNewTask(req, res, pathname);
        else if (req.method === 'POST' && /\/tasks\/delete\/\d+/.test(pathname)) deleteTask(req, res, pathname);
        else if (req.method === 'POST' && /\/tasks\/done\/\d+/.test(pathname)) setDoneTask(req, res, pathname);
        else {
            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
            res.write("<p>Page does not exist.</p>");
            res.end();
        }
    }

}

const server = http.createServer(handler);

server.listen(port);

console.log(`info> server is running at port ${port}`);