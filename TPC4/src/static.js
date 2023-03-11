const fs = require('fs');

function isStaticResource(request) {
    return /\/favicon.ico$/.test(request.url);
}

function serveStaticResource(req, res) {

    let parts = req.url.split("/");
    let file = parts[parts.length - 1];

    fs.readFile(`shared/${file}`, (error, data) => {

        if (error) {

            console.log(`fs.error> ${error}`);
            res.statusCode = 404;
            res.end("<p>File ${file} not found</p>");

        }

        else {

            /* Add extensions/files to public. */
            if (file === 'favicon.ico') res.setHeader('Content-Type', 'image/x-icon');
            res.end(data);

        }

    });
}

exports.isStatic = isStaticResource;
exports.serveStaticResource = serveStaticResource;
