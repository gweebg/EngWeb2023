const tasksView = require("../views/tasks");

const { getAllTasks, collectRequestBodyData, addTask } = require("./utils");
const axios = require("axios");

/* GET /tasks */
async function getTasks(req, res, url) {

    let tasks = await getAllTasks();

    if (tasks === undefined) {
        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
        res.write("<p>Could not fetch task data.</p>");
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.write(tasksView.render(tasks));
    res.end();

}

/* POST /tasks/ */
function addNewTask(req, res, url) {

    collectRequestBodyData(req, async result => {

        if (result) {

            let status = await addTask(result);

            if (status) {
                console.log(`info> New task added`);
                res.writeHead(303, {'Location': '/tasks'});
                res.end();
            } else {
                console.log(`info> Failed to add a new task`);
                res.writeHead(303, {'Location': '/tasks'});
                res.end();
            }
        }
    });
}

/* PUT /tasks/edit/:id */
// function addNewTask(req, res, url) {
//
//     collectRequestBodyData(req, async result => {
//
//         if (result) {
//
//             let status = await addTask(result);
//
//             if (status) {
//                 console.log(`info> New task added`);
//                 res.writeHead(303, {'Location': '/tasks'});
//                 res.end();
//             } else {
//                 console.log(`info> Failed to add a new task`);
//                 res.writeHead(303, {'Location': '/tasks'});
//                 res.end();
//             }
//         }
//     });
// }

/* DELETE /tasks/:id */
function deleteTask(req, res, url) {

    const taskId = url.match(/\/tasks\/delete\/(\d+)/)[1];

    axios.delete(`http://localhost:3000/tasks/${taskId}`)
        .then(() => {
            console.log(`info> Task ${taskId} deleted.`);
            res.writeHead(303, {'Location': '/tasks'});
            res.end();
        })
        .catch(error => console.log(`error> Could not delete task ${taskId}.`));
}


function setDoneTask(req, res, url) {

    const taskId = url.match(/\/tasks\/done\/(\d+)/)[1];

    axios.patch(`http://localhost:3000/tasks/${taskId}`, {status: 0})
        .then(() => {
            console.log(`info> Task ${taskId} set to done.`);
            res.setHeader('Refresh', '0; url=/tasks')
            res.writeHead(303, {'Location': '/tasks'});
            res.end();
        })
        .catch(error => console.log(`error> Could not complete task ${taskId}.`));

}

module.exports.getTasks = getTasks;
module.exports.addNewTask = addNewTask;
module.exports.deleteTask = deleteTask;
module.exports.setDoneTask = setDoneTask;


