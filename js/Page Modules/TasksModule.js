var TasksModule = (function () {

    function Task(name, priority) {

        this.name = name;
        this.priority = priority;
        this.isDone = false;

    }

    var tasks = [];

    //cache DOM
    var list = getById('list');
    var newTaskNameInput = getById('newTaskNameInput');
    var newTaskPriorityInput = getById('newTaskPriorityInput');
    var newTaskSubmit = getById('newTaskSubmit');


    //bind events
    newTaskSubmit.addEventListener('click', addTask, false);
    list.addEventListener('click', function (e) {

        if (e.target.matches('button.del')) {
            removeTask(e.target);
        }
        else if (e.target.matches('button.mark')) {
            checkTask(e.target);
        }

    });
    pubSub.subscribe('tasksFetched', fetchTasks);

    function fetchTasks(newTasks) {

        tasks = newTasks;
        render(tasks);

    }

    function render(tasks) {
        //clear list
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        //create task for every element in tasks array
        tasks.forEach(function (task) {
            createTask(task);
        });
    }

    function createTask(task) {

        var newTask = new TaskTemplate().createNewTask(task);
        list.innerHTML = list.innerHTML + newTask;

    }

    function addTask() {

        tasks.push(new Task(newTaskNameInput.value, newTaskPriorityInput.value));
        pubSub.publish('tasksChanged', tasks);

    }

    function removeTask(clickedElement) {

        var taskToRemove = clickedElement.parentElement;
        var currentTasksList = list.children;
        var index = Array.prototype.indexOf.call(currentTasksList, taskToRemove);
        tasks.splice(index, 1);
        pubSub.publish('tasksChanged', tasks);

    }

    function checkTask(clickedElement) {

        var listElementOfTask = clickedElement.parentElement;
        var index = Array.prototype.indexOf.call(list.children, listElementOfTask);
        var selectedTask = tasks[index];

        //Toggle 'check'
        selectedTask.isDone = selectedTask.isDone !== true;

        pubSub.publish('tasksChanged', tasks);
    }

    function sendTasks() {
        return tasks;
    }

    //public API
    return {
        render: render,
        sendTasks: sendTasks
    }

})();
