var TasksModule = (function () {

    //utilities
    var getById = helpersModule.getById;

    //cache DOM
    var list = getById('list');

    //bind events
    list.addEventListener('click', function (e) {

        if (e.target.matches('button.del')) {
            removeTask(e.target);
        }
        else if (e.target.matches('button.mark')) {
            checkTask(e.target);
        }

    });

    list.addEventListener('dblclick', function (e) {

        if (e.target.matches('span')) {
            editTask(e.target)
        }

    });

    pubSub.subscribe('tasksFetched', fetchTasks);

    var tasks = [];

    function fetchTasks(newTasks) {

        tasks = newTasks;
        render(tasks);

    }

    function render(tasks) {

        //clear list
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        //sorting tasks
        sortedTask = tasks.sort(function(a,b){
            return (a.isDone === b.isDone)? 0 : b.isDone? -1 : 1;
        });

        //create task for every element in tasks array
        sortedTask.forEach(function (task) {
            var newTask = new TemplateModule.TaskTemplate().createNewTask(task);
            list.innerHTML = list.innerHTML + newTask;
        });

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
        listElementOfTask.classList.toggle('done');
        listElementOfTask.classList.toggle('undone');
        selectedTask.isDone = selectedTask.isDone !== true;

        pubSub.publish('tasksChanged', tasks);
        
    }

    function editTask(clickedElement) {

        var taskName = clickedElement.innerText;
        var inputParent = clickedElement.parentElement;
        var index = Array.prototype.indexOf.call(list.children, inputParent);
        var selectedTask = tasks[index];
        var taskSpan = clickedElement.parentElement.getElementsByTagName('span');


        inputParent.classList.add('editing');
        var input = document.createElement('input');
        input.value = taskName;
        input.classList.add('taskEdit');
        taskSpan[0].appendChild(input);
        input.focus();


        input.addEventListener('keydown', function(e){

            if (e.keyCode === 13) {
                saveEditingTask(input, selectedTask, inputParent);
            }
            else if(e.keyCode === 27) {
                cancelEditingTask(input, inputParent);
            }
        });

    }

    function saveEditingTask(input, selectedTask, inputParent){

        selectedTask.name = input.value;
        inputParent.classList.remove('editing');
        pubSub.publish('tasksChanged', tasks);

    }

    function cancelEditingTask(input, inputParent){

        inputParent.getElementsByTagName('span')[0].removeChild(input);
        inputParent.classList.remove('editing');

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
