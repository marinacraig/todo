"use strict";

var todoList = new TodoList(); // Unser TodoListen Modell
var taskInputFields = void 0; // Alle Eingabefelder der UI
var liste = void 0; // Die Liste der unerledigten Tasks
var erledigtliste = void 0; // Die Liste der erledigten Tasks
var todos = void 0; // Hülle um beide Listen

var ENTERTASTE = 13;
var ECAPETASTE = 27;

todoList.onInitComplete = function () {
  // Baue die Liste in der UI auf sobald das model bereit ist
  //Todo: Inhalt vom LI im Html entfernen, damit wir auf das leeren des li's verzichten können
  liste.innerHTML = '';
  initListInUI(todoList.tasks);
};

ready(function () {

  taskInputFields = document.querySelectorAll('.todos__new');
  liste = document.getElementById('todos__list');
  todos = document.getElementById('todoslist');
  erledigtliste = document.getElementById('erledigtliste');

  /**
   * UI Listener
   */

  todos.addEventListener('text-blured', function (e) {
    textAktualisierenWennNoetig(e);
  });

  todos.addEventListener('click', function (e) {
    loeschenWennMoeglich(e);
    erledigenWennMoeglich(e);
    unerledigenWennMoeglich(e);
  });

  // Auf den Keyup event hören, weil die ESC Taste keinen Keypress auslösen tut
  todos.addEventListener('keyup', function (e) {

    if (e.keyCode === ECAPETASTE) {
      taskInputFields[0].focus();
    }
    /**
     * control + enter zum speichern. Eigentlich verlassen wir das Feld nur, denn beim verlassen wird gespeichert.
     * TODO: Eventuell das Nächste Item anspringen und nicht wieder auf die Eingabe
     */
    if (e.keyCode === ENTERTASTE && e.ctrlKey === true) {
      taskInputFields[0].focus();
    }
  });

  taskInputFields.forEach(function (inputEl) {
    inputEl.addEventListener('keypress', function (e) {
      // Auf Enter Taste hören
      if (e.keyCode === ENTERTASTE && inputEl.value !== '') {
        createTaskFromInput(inputEl);
        // input wieder leeren
        inputEl.value = '';
      }
    });
  });
});