"use strict";

let todoList = new TodoList();
todoList.addTask('Milch kaufen');
todoList.addTask('MacBook bestellen');
todoList.addTask('Auto kaufen (ev. Leasen)');

ready(() => {

    let taskInputFields = document.querySelectorAll('.todos__new');
    let liste = document.getElementById('todos__list');

    liste.addEventListener('click', e => {
        if (e.target.classList.contains('delete')) {
            console.log('delete', e.target.parentNode.task)
            /*
            gibt die ID zurück: console.log('delete', e.target.parentNode.task.id)
            let deleten = e.target.parentNode.task.id;
            todoList.removeTask(deleten);
            */
            todoList.removeTaskByID(e.target.parentNode.task.id);
            e.target.parentNode.remove();
        }
        if (e.target.classList.contains('erledigt')) {
            e.target.parentNode.check();
        }

    });

    taskInputFields.forEach((inputEl) => {
        // Auf Enter Taste hören
        inputEl.addEventListener('keypress', e => {
            if (e.keyCode === 13 && inputEl.value !== '') {
                // task der Liste hinzufügen
                let task = todoList.addTask(inputEl.value);
                addTaskToList(task);
                // input wieder leeren
                inputEl.value = '';

            }
        });
    });


    /**
     * fügt einen Task der Liste(DOM) hinzu
     * @param task
     */
    let addTaskToList = (task) => {
        let newDomItem = createItemDom(task);
        liste.appendChild(newDomItem);
    };


    /**
     * Baut die initiale Liste auf
     * @param taskListe
     */
    let initTaskList = (taskListe) => {
        taskListe.forEach(task => {
            let i = createItemDom(task);
            liste.appendChild(i);
        })
    };

    /**
     * Erstellt ein dom item für einen neuen task
     * todo: muss noch vervollständigt werden
     * @param task
     * @returns {HTMLLIElement}
     */
    let createItemDom = (task) => {
        let item = document.createElement('li');
        item.task = task;

        let del = document.createElement('button');
        del.innerText='del';
        del.classList.add('delete');
        item.appendChild(del);

        let erledigt = document.createElement('button');
        erledigt.innerText='done';
        erledigt.classList.add('erledigt');
        item.appendChild(erledigt);

        item.classList.add('todo__item');
        let text = document.createElement('text');
        text.innerText = task.text;
        item.appendChild(text);

        return item;
    };


    // Initialisiert die Liste
    liste.innerHTML = '';
    initTaskList(todoList.tasks);

});
