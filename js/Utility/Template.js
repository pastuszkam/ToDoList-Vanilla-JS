/**
 * Created by Maciek on 8/3/2017.
 */

var TemplateModule = (function () {

    function TaskTemplate() {

        this.defaultTemplate
            = '<li class="{{taskDone}}">'
            + '<button class="mark"></button>'
            + '<span>{{taskName}}</span>'
            + '<button class="del"></button>'

    }

    TaskTemplate.prototype.createNewTask = function (task) {

        var template = this.defaultTemplate;

        if (task.isDone === true) {
            template = template.replace('{{taskDone}}', 'done')
        }
        else {
            template = template.replace('{{taskDone}}', 'undone')
        }

        template = template.replace('{{taskName}}', task.name);

        return template;

    };

    return {
        TaskTemplate: TaskTemplate
    }

})();



