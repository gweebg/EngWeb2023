
function renderTasks(taskList) {

    let doneTasks = [];
    let todoTasks = [];

    taskList.forEach(task => {

        if (task.status === 1) doneTasks.push(task);
        else todoTasks.push(task);

    });

    let template = `
    
        <!DOCTYPE html>
        <html lang="en">

            <head>
                <meta charset="UTF-8">
                <title>NodeJS Task List</title>
                <link rel="stylesheet" href="/styles.css">
            </head>

        <body>
    
            <div class="navbar">
                Navbar
            </div>
    
            <div class="task-list">
    
                <div class="completed">
    
                    <div class="list-header">
    
                        <div class="header-text">
                            <h2>Tasks to Complete</h2>
                            <p>You can add more tasks with the button!</p>
                        </div>
    
                        <button type="button" id="add-new">
                            <img src="add.svg" alt="add-button" width="45" height="45"/>
                        </button>
    
                    </div>
    
                    <div class="list">
    
    `;

    doneTasks.forEach(doneTask => {

        template += `
        
            <div class="list-item">
        
            <p>${doneTask.name}</p>
            <div class="context-buttons" id="${doneTask.id}">

<!--                <form method="POST" action="/tasks">-->

                    <button id="edit">
                        <img src="edit.svg" alt="edit-button" width="35" height="35"/>
                    </button>
    
<!--                </form>-->
    
                <form method="POST" action="/tasks/done/${doneTask.id}">
                
                    <button id="set-done">
                        <img src="done.svg" alt="delete-button" width="35" height="35"/>
                    </button>
                
                </form>
                

            </div>
            
            </div>
        
        `;
    });

    template += `
  
                </div>
            </div>

            <div class="completed">

                <div class="list-header">

                    <div class="header-text">
                        <h2>Completed Tasks</h2>
                        <p>Here you can find every completed task!</p>
                    </div>

                </div>

                <div class="list">
    `;

    todoTasks.forEach(todoTask => {

        template += `
        
            <div class="list-item">
                <p>${todoTask.name}</p>

                <div class="context-buttons" id="${todoTask.id}">

                    <form method="POST" action="/tasks/delete/${todoTask.id}">
                        <button type="submit" id="delete">
                            <img src="delete.svg" alt="edit-button" width="35" height="35"/>
                        </button>
                    </form>

                </div>
            </div>
    
        `;
    });

    template += `
                </div>
        
                    </div>
        
                </div>
        
                <!-- Add new task modal. -->
                <div id="add-modal" class="modal">
        
                    <!-- Modal content -->
                    <div class="modal-content">
                        <span style="float: right" class="close">&times;</span>
        
                        <h2>Add a new task:</h2>
                        <p>Fill in the form to add a new task!</p>
        
                        <form id="add-form" method="POST" action="/tasks/">
        
                            <!-- Task Name -->
                            <input type="text" id="task-name" name="name" placeholder="Task Name"><br>
        
                            <!-- Task Desctiption -->
                            <textarea id="desc" name="description" rows="4" cols="50" placeholder="Task Description"></textarea>
        
                            <!-- Due Date -->
                            <input type="datetime-local" name="due_date" placeholder="Due Date">
        
                            <!-- Task Author -->
                            <input class="mid" type="text" name="who" placeholder="Author">
        
                            <button id="submit-button" class="submit-button" type="submit">Add New Task</button>
        
                        </form>
                        
                    </div>
        
                </div>
        
            </body>
        
            <script>
                                          
                /* Adding logic to the set done button. */
                let setDoneButton = document.getElementById("set-done");
                                
                // Get the modal
                let modal = document.getElementById("add-modal");
        
                // Get the button that opens the modal
                let btn = document.getElementById("add-new");
        
                // Get the <span> element that closes the modal
                let span = document.getElementsByClassName("close")[0];
        
                // When the user clicks on the button, open the modal
                btn.onclick = function() {
                    modal.style.display = "block";
                }
        
                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal.style.display = "none";
                }
        
                // When the user clicks anywhere outside the modal, close it
                window.onclick = function(event) {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                }
            </script>
        
        </html>
    `;

    return template;
}

exports.render = renderTasks;