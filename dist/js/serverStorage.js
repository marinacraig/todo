"use strict";

ready(function () {

    // Callback wenn ein neuer Task erstellt wurde
    todoList.onNewTask = function (task) {
        var speicherName = 'task' + task.id;
        localStorage.setItem(speicherName, JSON.stringify(task));
        return task;
    };

    // Callback wenn die Liste initialisiert wurde
    todoList.onInit = function (liste) {

        var promisedJson = fetch('api/alltasks.json').then(function (response) {
            return response.json();
        });

        promisedJson.then(function (json) {
            todoList._maxID = _taskObjErzeugenUndAnTodolistAnhaengen(json);
        });

        promisedJson.catch(function (ex) {
            console.warn('Konnte initale Liste nicht erstellen');
            todoList._maxID = 1;
        });

        promisedJson.finally(function () {
            todoList.onInitComplete();
        });
    };

    todoList.onInit(todoList);

    // Todo: Callback wenn ein neuer Task gelöscht wurde
    todoList.onDeleteTask = function (taskToDelete) {
        for (var task in localStorage) {
            var taskFromStorage = JSON.parse(localStorage.getItem(task));
            if (taskFromStorage.id === taskToDelete.id) {
                localStorage.removeItem('task' + taskFromStorage.id);
                break;
            }
        }
    };

    // Todo: Callback wenn ein neuer Task aktualisiert wurde
    TodoList.onUpdateTask = function (taskToUpdate) {
        for (var task in localStorage) {
            var taskFromStorage = JSON.parse(localStorage.getItem(task));
            if (taskFromStorage.id === taskToUpdate.id) {
                var template = '{"id":' + taskToUpdate.id + ',"_text":"' + taskToUpdate._text + '"' + ',"erledigt":' + taskToUpdate.erledigt + ',"_position":' + taskToUpdate._position + '}';
                localStorage.setItem(task, template);
                break;
            }
        }
    };

    /**
     * Erzeugt ein Task Object und pusht dieses dann an todoList.tasks
     *
     * @param list
     * @returns {Number} Höchste ID+2
     * @private
     */
    var _taskObjErzeugenUndAnTodolistAnhaengen = function _taskObjErzeugenUndAnTodolistAnhaengen(list) {
        var maxID = 1;
        list.forEach(function (vorlage) {
            var t = new Task(vorlage._text);
            t.id = vorlage.id;
            t._position = vorlage._position;
            t.erledigt = vorlage.erledigt;
            todoList.tasks.push(t);
            maxID = t.id + 2;
        });
        return maxID;
    };
});