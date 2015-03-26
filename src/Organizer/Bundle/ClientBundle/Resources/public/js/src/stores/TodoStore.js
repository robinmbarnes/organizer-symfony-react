var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var TodoConstants = require('../constants/TodoConstants');
var http = $;

var CHANGE_EVENT = 'change';
var todos = null;

function fetchTodos (callback) {
  http.get('/api/todo/')
    .done(function (data) {
      todos = {};
      data.forEach(function (todo) {
        todos[todo.id] = todo;
      });
      callback(null, data);
    });
}
var TodoStore = assign(EventEmitter.prototype, {

  getAll: function () {
    if(todos === null) {
      fetchTodos(this.emitChange.bind(this));
    }
    return (todos || {});
  },

  remove: function (id) {
    http.ajax({
      url: '/api/todo/' + id,
      type: 'delete'
    })
      .done(function () {
        delete todos[id];
        this.emitChange();
      }.bind(this));
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

module.exports = TodoStore;