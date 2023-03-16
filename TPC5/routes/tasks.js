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

module.exports = router;
