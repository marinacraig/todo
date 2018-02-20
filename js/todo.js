"use strict"

/**
 * neue variable um auf todooo bzw. jene Listen _Klasse zuzugreifen
 * @type {TodoList}
 */
let todoList = new TodoList();

ready(() => {
    /**
     * variable zum eingabe erkennbar machen sowie wohin es soll
     * @type {NodeListOf<Element>}
     */
    let inputNewTask = document.querySelectorAll('.todos__new')
    let todoList = document.getElementById('todos__list')

    inputNewTask.forEach ((input) => {
        input.addEventListener ('keypress', e => {
            if (e.keyCode === 13 && e.value !=='') {
                /**
                 * kreiire einen neuen Eintrag
                 */
                let task = todoList.addTask(input.value);
                addTaskToList(task);
                // input wieder leeren
                input.value = '';
            }
        })
    })
})