/**
 * Created by Maciek on 7/28/2017.
 */

var StatsModule = (function () {

    //cacheDOM
    var counter = getById('stats__counter');

    //events binding
    pubSub.subscribe('tasksFetched', updateNumberOfTasks);

    function updateNumberOfTasks(tasks) {

        var unDoneTasks = tasks.filter(function(task){
            return task.isDone === false
        });
        counter.innerText = unDoneTasks.length;

    }

    return {}

})();

