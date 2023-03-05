const axios = require('axios')
const http = require('http')
const url = require("url");
const fs = require("fs");

const people = require('./pages/people')
const person = require('./pages/person')
const genders = require('./pages/genders')


const server = http.createServer(async function (req, res) {

    const fullUrl = req.url;
    const method = req.method;
    const date = new Date().toISOString().substring(0, 16);

    const id_match = new RegExp("^\/people\/p[0-9]+$");
    const styles = new RegExp("styles.css");

    const decomposedUrl = url.parse(fullUrl, true);

    let males, females, others;

    console.log("request " + date + " > " + method + " " + fullUrl);

    if (method === "GET") {

        /* GET /people */
        if (decomposedUrl.pathname === "/people") {

            axios.get("http://localhost:3000/pessoas?_sort=nome")
                .then((resp) => {

                    const data = resp.data;

                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(people.servePeople(data, 'Everyone'));
                })
                .catch((error) => {

                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end("<p>Error: " + error + "</p>")
                });
        }

        /* GET people/{id} */
        else if (id_match.test(decomposedUrl.pathname)) {

            axios.get(`http://localhost:3000/pessoas/${decomposedUrl.pathname.substring(7)}`)
                .then((resp) => {

                    const data = resp.data;

                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(person.servePerson(data));
                })
                .catch((error) => {

                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end("<p>Error: " + error + "</p>")
                });

        }

        /* GET styles.css */
        else if (styles.test(decomposedUrl.pathname)) {

            fs.readFile('pages/styles.css', (err, css) => {

                if (err) {
                    res.writeHead(500);
                    res.end('Error loading styles.css');
                } else {
                    res.writeHead(200, {'Content-Type': 'text/css'});
                    res.write(css);
                    res.end();
                }
            })
        }

        /* GET /people/genders */
        else if (decomposedUrl.pathname === "/people/genders") {

            males = await axios.get("http://localhost:3000/pessoas?sexo=masculino").then(response => response.data);
            females = await axios.get("http://localhost:3000/pessoas?sexo=feminino").then(response => response.data);
            others = await axios.get("http://localhost:3000/pessoas?sexo=outro").then(response => response.data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(genders.serverGenders(males.length, females.length, others.length));
        }

        else if (decomposedUrl.pathname === "/people/males") {

            if (! males)
                males = await axios.get("http://localhost:3000/pessoas?sexo=masculino").then(response => response.data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(people.servePeople(males, 'Males'));
        }


        else if (decomposedUrl.pathname === "/people/females") {

            if (! females)
                females = await axios.get("http://localhost:3000/pessoas?sexo=feminino").then(response => response.data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(people.servePeople(females, 'Females'));
        }

        else if (decomposedUrl.pathname === "/people/others") {

            if (! others)
                others = await axios.get("http://localhost:3000/pessoas?sexo=outro").then(response => response.data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(people.servePeople(others, "Others"));
        }

        else {

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("Page not found!");
            res.end();

        }

    }

});

server.listen(20000);
console.log("(Server is running at localhost:20000)")