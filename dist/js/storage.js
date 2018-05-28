"use strict";

ready(function () {

    // Callback wenn ein neuer Task erstellt wurde
    todoList.onNewTask = function (task) {
        var speicherName = 'task' + task.id;
        localStorage.setItem(speicherName, JSON.stringify(task));
        return task;
    };

    // Callback wenn die Liste initialisiert wurde
    var maxID = 1;
    todoList.onInit = function (liste) {
        for (var task in localStorage) {
            if (localStorage.hasOwnProperty(task)) {
                var vorlage = JSON.parse(localStorage.getItem(task));
                var t = new Task(vorlage._text);
                t.id = vorlage.id;
                t._position = vorlage._position;
                t.erledigt = vorlage.erledigt;
                todoList.tasks.push(t);
                maxID = t.id + 2;
            }
        }

        todoList._maxID = maxID;
        todoList.onInitComplete();
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
});