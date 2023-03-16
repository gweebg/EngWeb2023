const axios = require('axios');

const baseFetchUrl = "http://localhost:3000";

const getTasks = () => {

    return axios.get(`${baseFetchUrl}/tasks`)
        .then(response => {
            return response.data;
        })
        .catch(error =>  {
            return error;
        });

};

const deleteTask = (taskId) => {

    return axios.delete(`${baseFetchUrl}/tasks/${taskId}`)
        .then(response => {
            return response.data;
        })
        .catch((error => {
            return error;
        }));

}

const updateTask = (taskObject) => {

    return axios.put(`${baseFetchUrl}/tasks/${taskObject.id}`, taskObject)
        .then(response => {
            return response.data;
        })
        .catch((error => {
            return error;
        }));

}

const completeTask = (taskId) => {

    return axios.patch(`${baseFetchUrl}/tasks/${taskId}`, {status: 0})
        .then(response => {
            return response.data;
        })
        .catch((error => {
            return error;
        }));

}

const addTask = (taskObject) => {

    taskObject["status"] = 1;
    taskObject["timestamp"] = new Date().toISOString();

    return axios.post(`${baseFetchUrl}/tasks`, taskObject)
        .then(response => {
            return response.data;
        })
        .catch((error => {
            return error;
        }));

}

const filterByStatusTasks = (tasks) => {

    let doneTasks = [];
    let todoTasks = [];

    tasks.forEach(task => {
        if (task.status === 0) doneTasks.push(task);
        else todoTasks.push(task);
    });

    return {
        doneTasks: doneTasks,
        todoTasks: todoTasks
    };

}

module.exports.addTask = addTask;
module.exports.completeTask = completeTask;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;
module.exports.getTasks = getTasks;

module.exports.filterByStatusTasks = filterByStatusTasks;
