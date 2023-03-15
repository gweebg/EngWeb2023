const fs = require('fs');
const path = require("path");


const MIME_TYPES = {
    html: 'text/html; charset=UTF-8',
    css: 'text/css',
    png: 'image/png',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
};


function isStaticResource(request) {

    if (request.url === "/") return false;
    let path = `./shared${request.url}`;

    return fs.existsSync(path);
}

function serveStaticResource(req, res) {

    let parts = req.url.split("/");
    let file = parts[parts.length - 1];

    fs.readFile(`shared/${file}`, (error, data) => {

            if (error) {

                console.log(`fs.error> ${error}`);
                res.statusCode = 404;
                res.end(`<p>File ${file} not found</p>`);

            }

            else {
                /* Add extensions/files to public. */
                res.setHeader('Content-Type', MIME_TYPES[path.extname(file).substring(1)]);
                res.end(data);
            }

        });
}

exports.isStatic = isStaticResource;
exports.serveStaticResource = serveStaticResource;
