const axios = require('axios')
const http = require('http')
const url = require("url");
const fs = require("fs");

const people = require('./pages/people')
const person = require('./pages/person')
const genders = require('./pages/genders')
const index = require("./pages/index")
const sports = require('./pages/sports')
const sport = require('./pages/sport')
const jobs = require('./pages/jobs')
const job = require('./pages/job')


const server = http.createServer(async function (req, res) {

    const fullUrl = req.url;
    const method = req.method;
    const date = new Date().toISOString().substring(0, 16);

    const id_match = new RegExp("^\/people\/p[0-9]+$");
    const styles = new RegExp("styles.css");
    const sportsExp = new RegExp("/people/sports/[a-zA-Z_\s]+");
    const jobExp = new RegExp("/people/jobs/[a-zA-Z_\s]+");

    const decomposedUrl = url.parse(fullUrl, true);

    console.log("request " + date + " > " + method + " " + fullUrl);

    if (method === "GET") {

        /* GET / */
        if (decomposedUrl.pathname === "/") {

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(index.serveIndex());

        }

        /* GET /people */
        else if (decomposedUrl.pathname === "/people") {

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

            fs.readFile('src/pages/styles.css', (err, css) => {

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

            var males = await axios.get("http://localhost:3000/pessoas?sexo=masculino").then(response => response.data);
            var females = await axios.get("http://localhost:3000/pessoas?sexo=feminino").then(response => response.data);
            var others = await axios.get("http://localhost:3000/pessoas?sexo=outro").then(response => response.data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(genders.serveGenders(males.length, females.length, others.length));
        }

        /* GET /people/males */
        else if (decomposedUrl.pathname === "/people/males") {

            console.log(males === undefined);

            males = await axios.get("http://localhost:3000/pessoas?sexo=masculino&_sort=nome").then(response => response.data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(people.servePeople(males, 'Males'));
        }

        /* GET /people/females */
        else if (decomposedUrl.pathname === "/people/females") {

            females = await axios.get("http://localhost:3000/pessoas?sexo=feminino&_sort=nome").then(response => response.data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(people.servePeople(females, 'Females'));
        }

        /* GET /people/others */
        else if (decomposedUrl.pathname === "/people/others") {

            others = await axios.get("http://localhost:3000/pessoas?sexo=outro&_sort=nome").then(response => response.data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(people.servePeople(others, "Others"));
        }

        /* GET /people/sports */
        else if (decomposedUrl.pathname === "/people/sports") {

            let data = await axios.get("http://localhost:3000/pessoas").then(response => response.data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(sports.serveSports(data));
        }

        /* GET /people/sports/{sport_name} */
        else if (sportsExp.test(decomposedUrl.pathname)) {

            console.log(decomposedUrl.pathname.substring(15));

            let data = await axios.get("http://localhost:3000/pessoas").then(response => response.data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(sport.serveSport(data, decomposedUrl.pathname.substring(15)));
        }

        /* GET /people/jobs */
        else if (decomposedUrl.pathname === "/people/jobs") {

            let data = await axios.get("http://localhost:3000/pessoas").then(response => response.data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(jobs.serveJobs(data));
        }

        /* GET /people/jobs/{job_name} */
        else if (jobExp.test(decomposedUrl.pathname)) {

            console.log(decomposedUrl.pathname.substring(13));

            let data = await axios.get("http://localhost:3000/pessoas").then(response => response.data);

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(job.serveJob(data, decomposedUrl.pathname.substring(13)));
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