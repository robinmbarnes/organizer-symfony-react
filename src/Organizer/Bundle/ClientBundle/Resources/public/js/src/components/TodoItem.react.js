var React = require('react');
var TodoStore = require('../stores/TodoStore');

var TodoItem = React.createClass({

  render: function () {
    return (
      <li className="input-group todo-item">
        <span className="input-group-addon">
          <input id="todo-{ props.todo.id }" type="checkbox"/>
        </span>
        <div className="rb-editable-text">
          <div>{ this.props.todo.title }</div>
        </div>
        <span className="input-group-addon">
          <button type="button" className="btn btn-danger btn-circular" onClick={this._onDeleteClick}>
            <span className="glyphicon glyphicon-remove icon-delete"></span>
          </button>
        </span>
      </li>
    );
  },

  _onDeleteClick: function () {
    TodoStore.remove(this.props.todo.id);
  }

});

module.exports = TodoItem;