"use strict"

/**
 * neue variable um auf todooo bzw. jene Listen _Klasse zuzugreifen
 *
 */
let todoList = new TodoList();

ready(() => {
    /**
     * variable zum eingabe erkennbar machen sowie wohin es soll
     * @type {NodeListOf<Element>}
     */
    let inputNewTask = document.querySelectorAll('.todos__new');
    let todoList = document.getElementById('todos__list');

    /**
     * Loop für jede neue Eingabe im Eingabefeld
     */
    [].forEach.call(inputNewTask, function(event) {
        /**
         * für jeden eintrag darauf achten ob die Enter Taste gedrückt wurde und ob dieser nicht leer ist
         */
        event.addEventListener("keypress", function (e) {
            if(e.keyCode === 13 && event.value !== '') {
                console.log(event.value);

            }
        })
    });

});

