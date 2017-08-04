var ServiceModule = (function () {

    //events binding
    pubSub.subscribe('tasksChanged', sendTasks);

    function getData(url) {

        return new Promise(function (resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, true);
            xhttp.onload = function () {
                if (xhttp.status === 200) {
                    resolve(JSON.parse(xhttp.response))
                } else {
                    reject(xhttp.statusText)
                }
            };
            xhttp.onerror = function () {
                reject(xhttp.statusText)
            };
            xhttp.send()
        });

    }

    function putData(url, tasks) {

        return new Promise(function (resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("PUT", url, true);
            xhttp.onload = function () {
                if (xhttp.status === 200) {
                    resolve(JSON.parse(xhttp.response))
                } else {
                    reject(xhttp.statusText)
                }
            };
            xhttp.onerror = function () {
                reject(xhttp.statusText)
            };
            xhttp.send(JSON.stringify(tasks));
        });

    }

    function sendTasks(tasks) {

        putData('https://to-do-list-b7b38.firebaseio.com/.json', tasks).then(function(tasks){
            pubSub.publish('tasksFetched', tasks)
        });

    }

    function fetchTasks(){

        getData("https://to-do-list-b7b38.firebaseio.com/.json").then(function (tasks) {
            pubSub.publish('tasksFetched', tasks)
        });

    }

    fetchTasks();

})();