const { parse } = require('querystring');
const axios = require("axios");

function collectRequestBodyData(request, callback) {

    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {

        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            callback(parse(body));
        });

    } else callback(null);
}

async function getAllTasks() {

    let tasks;

    tasks = await axios.get("http://localhost:3000/tasks")
        .then(response => response.data)
        .catch(error => console.log(`axios.error> ${error}`));

    return tasks;
}

async function addTask(taskData) {

    let status = false;

    taskData["status"] = 1;
    taskData["timestamp"] = new Date().toISOString();

    console.log(taskData);

    await axios.post("http://localhost:3000/tasks", taskData)
        .then(_ => status = true)
        .catch(error => console.log(`axios.error> ${error}`));

    return status;

}

module.exports.getAllTasks = getAllTasks;
module.exports.collectRequestBodyData = collectRequestBodyData;
module.exports.addTask = addTask;