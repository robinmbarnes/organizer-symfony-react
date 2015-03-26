var React = require('react/lib/ReactWithAddons');
var TodoStore = require('../stores/TodoStore');
var TodoItem = require('./TodoItem.react.js');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

function getState() {
  return {
    todos: TodoStore.getAll()
  };
}

TodoList = React.createClass({

  getInitialState: function () {
    return getState();
  },

  componentDidMount: function () {
    TodoStore.addChangeListener(this._onChange);
  },

  render: function () {

    if(Object.keys(this.state.todos).length < 1) {
      return null;
    }

    var todos = [];
    for(var i in this.state.todos) {
      todos.push(<TodoItem key={ i } todo={ this.state.todos[i] } />);
    }


    return (
      <ul className="input-group-list">
        <ReactCSSTransitionGroup transitionName="todo" transitionEnter={false}>
          { todos }
        </ReactCSSTransitionGroup>
      </ul>
    );
  },

  _onChange: function () {
    this.setState(getState());
  }

});


module.exports = TodoList;