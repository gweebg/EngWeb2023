const express = require('express');

const Tasks = require('../controllers/tasks');

const router = express.Router();


/* GET /tasks */
router.get("/", function(req, res) {

    Tasks.getTasks()
        .then(tasksData => res.render('tasks', Tasks.filterByStatusTasks(tasksData)))
        .catch(error => res.render('error', {error: error, message: "Failed to fetch task data."}));

});

router.post("/new", function (req, res) {

   Tasks.addTask(req.body)
       .then(_ => res.redirect("/tasks"))
       .catch(error => res.render('error', {error: error, message: "Invalid form submission, check trace."}));

});

router.get("/complete/:taskId", function (req, res) {

   Tasks.completeTask(req.params.taskId)
       .then(_ => res.redirect("/tasks"))
       .catch(error => res.render('error', {error: error, message: "Something went wrong completing the task."}));

});

router.get("/delete/:taskId", function (req, res) {

   Tasks.deleteTask(req.params.taskId)
       .then(_ => res.redirect("/tasks"))
       .catch(error => res.render('error', {error: error, message: "Could not delete the task."}));

});

module.exports = router;
