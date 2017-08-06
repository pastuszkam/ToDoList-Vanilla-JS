/**
 * Created by Maciek on 8/5/2017.
 */

var CreateTaskModule=(function(){

    //utilities
    var getById = helpersModule.getById;

    //cache DOM
    var newTaskNameInput = getById('newTaskNameInput');
    var newTaskSubmit = getById('newTaskSubmit');

    //events
    newTaskSubmit.addEventListener('click', addTask);
    pubSub.subscribe('tasksFetched', fetchTasks);

    function Task(name, priority) {

        this.name = name;
        this.priority = priority;
        this.isDone = false;

    }

    var tasks = [];


    function fetchTasks(newTasks) {

        tasks = newTasks;

    }

    function addTask() {

        tasks.push(new Task(newTaskNameInput.value));
        pubSub.publish('tasksChanged', tasks);

    }


})();