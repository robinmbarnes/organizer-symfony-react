var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

  create: function (title) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      title: title
    });
  },

  toggle: function (id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE,
      id: id
    });
  }
};

module.exports = TodoActions;