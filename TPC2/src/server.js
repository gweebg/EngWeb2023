const http = require('http')
const url = require('url')
const fs = require('fs')

const server = http.createServer(function (req, res) {

    const fullUrl = req.url;
    const method = req.method;

    if (method === 'GET') {

        const decomposedUrl = url.parse(fullUrl, true);

        if (decomposedUrl.pathname === "/") {

            fs.readFile('generated/index.html', (err, html) => {

                if (err) {
                    res.writeHead(500);
                    res.end('Error loading index.html');
                }

                else {

                    fs.readFile('generated/app.css', (err, css) => {

                        if (err) {
                            res.writeHead(500);
                            res.end('Error loading app.css');
                        }

                        else {
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.write(html);
                            res.write(`<style>${css}</style>`);
                            res.end();
                        }
                    })
                }
            })

        }

        else  {

            let match = new RegExp("c[1-9][0-9]?[0-9]?")

            if (match.test(decomposedUrl.pathname)) {

                fs.readFile(`generated/cities/${decomposedUrl.pathname}.html`, (err, html) => {

                    if (err) {
                        res.writeHead(500);
                        res.end('Error loading index.html');
                    }

                    else {

                        fs.readFile('generated/app.css', (err, css) => {

                            if (err) {
                                res.writeHead(500);
                                res.end('Error loading app.css');
                            }

                            else {
                                res.writeHead(200, {'Content-Type': 'text/html'});
                                res.write(html);
                                res.write(`<style>${css}</style>`);
                                res.end();
                            }
                        })
                    }
                })

            }

            else {
                res.writeHead(404);
                res.end('Page not found');
            }
        }

    }

});

server.listen(20000);
console.log("(Server is running at localhost:20000)")