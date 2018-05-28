"use strict";

/**
 * UI Controller,
 * Diese Methoden kennen nur die UI und das Model
 */

// task erzeugen und der Liste hinzufügen

var createTaskFromInput = function createTaskFromInput(inputEl) {
  var task = todoList.addTask(inputEl.value);
  addTaskToUI(task);
};

/**
 * fügt einen Task der Liste(DOM) hinzu
 * @param task
 */
var addTaskToUI = function addTaskToUI(task) {
  var newDomItem = createDomItem(task);
  liste.appendChild(newDomItem);
};

/**
 * Baut die initiale Liste auf
 * @param taskListe
 */
var initListInUI = function initListInUI(taskListe) {
  taskListe.forEach(function (task) {
    var i = createDomItem(task);
    liste.appendChild(i);
  });
};

var textAktualisierenWennNoetig = function textAktualisierenWennNoetig(e) {
  var task = e.detail.parentNode.task;
  var uiText = e.detail.innerHTML;
  if (task.text !== uiText) {
    task.text = uiText;
  }
};
/**
 * prüft ob ein Eintrag als erledigt markiert werden kann,
 * und macht es dann auch gleich
 * @param e
 */
var erledigenWennMoeglich = function erledigenWennMoeglich(e) {
  if (e.target.classList.contains('check')) {
    e.target.parentNode.task.check();
    erledigtliste.appendChild(createDomItem(e.target.parentNode.task));
    e.target.parentNode.remove();
  }
};

/**
 * Prüft ob ein Eintrag gelöscht werden soll
 * und macht es dann auch gleich
 * @param e
 */
var loeschenWennMoeglich = function loeschenWennMoeglich(e) {
  if (e.target.classList.contains('delete')) {
    todoList.removeTaskByID(e.target.parentNode.task.id);
    e.target.parentNode.remove();
  }
};

/**
 * prüft ob ein Eintrag als unerledigt markiert werden kann,
 * und macht es dann auch gleich
 * @param e
 */
var unerledigenWennMoeglich = function unerledigenWennMoeglich(e) {
  if (e.target.classList.contains('uncheck')) {
    e.target.parentNode.task.uncheck();
    liste.appendChild(createDomItem(e.target.parentNode.task));
    e.target.parentNode.remove();
  }
};

/**
 * Erstellt ein dom item für einen neuen task
 * @param task
 * @returns {HTMLLIElement}
 */
var createDomItem = function createDomItem(task) {
  var item = document.createElement('li');
  var deleteButton = document.createElement('button');
  var erledigtButton = document.createElement('button');
  var text = document.createElement('text');

  item.task = task;
  /**
   * leider müssen wir wegen dem zu spezifischen CSS die Klasse dem li hinzufügen.
   * TODO: das CSS weniger spezifisch machen, damit wir dem li nicht noch extra eine Klasse zuweisen müssen.
   */
  item.classList.add('todo__item');

  /**
   * Erledigt Button kann check oder uncheck sein.
   */
  if (!task.erledigt) {
    erledigtButton.innerText = '[ ]';
    erledigtButton.classList.add('check');
    item.appendChild(erledigtButton);
  } else {
    erledigtButton.innerText = '[x]';
    erledigtButton.classList.add('uncheck');
    item.appendChild(erledigtButton);
  }

  /**
   * Wir machen den Text direkt editierbar und benachrichtigen bei blur
   * TODO: im CSS für den Text den outline auf none setzen.
   */
  text.innerHTML = task.text;
  text.setAttribute('contentEditable', true);
  text.addEventListener('blur', function (e) {
    var customEvent = new Event('text-blured', { bubbles: true });
    customEvent.detail = e.target;
    text.dispatchEvent(customEvent);
  });
  item.appendChild(text);

  /**
   * Delete Button bekommt die Klasse delete weil wir in loeschenWennMoeglich diesen abfragen
   */
  deleteButton.innerText = 'del';
  deleteButton.classList.add('delete');
  item.appendChild(deleteButton);

  return item;
};