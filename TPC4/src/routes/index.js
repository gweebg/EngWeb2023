const axios = require('axios');


async function getTasks() {

    let tasks;

    tasks = await axios.get("http://localhost:3000/tasks")
        .then(response => response.data)
        .catch(error => console.log(`axios.error> ${error}`));

    return tasks;
}

async function handleIndex(req, res, url) {

    if (req.method === 'GET') await getIndex(req, res, url);
    else {

        res.writeHead(405, {'Content-Type': 'text/html;charset=utf-8'})
        res.write("<p>Method not allowed.</p>")
        res.end()

    }
}

async function getIndex(req, res, url) {

    let tasks = await getTasks();

    if (tasks === undefined) {
        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
        res.write("<p>Could not fetch task data.</p>");
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.write("ola");
    res.end();

}

exports.index = handleIndex;



