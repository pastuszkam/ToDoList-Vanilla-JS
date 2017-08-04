/**
 * Created by Maciek on 7/31/2017.
 */

var FilteringModule = (function () {

    //cache DOM
    var filtering = getById('filtering');

    //bindEvents
    filtering.addEventListener(('click'), function (e) {

        var tasks = TasksModule.sendTasks();
        if (e.target.matches('button#displayDoneTask')) {
            showDoneTasks(tasks);
        }
        else if (e.target.matches('button#displayUndoneTask')) {
            showUndoneTasks(tasks);
        }
        else if(e.target.matches('button#displayAllTask')){
            showAllTasks(tasks);
        }

    });

    //methods
    function showDoneTasks(tasks) {

        var filteredTasks = tasks.filter(function (task) {
            return task.isDone === true;
        });
        TasksModule.render(filteredTasks);

    }

    function showUndoneTasks(tasks) {

        var filteredTasks = tasks.filter(function(task){
            return task.isDone === false;
        });
        TasksModule.render(filteredTasks);

    }

    function showAllTasks(tasks){

        TasksModule.render(tasks);

    }

})();

