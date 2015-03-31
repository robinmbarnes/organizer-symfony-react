var React = require('react/lib/ReactWithAddons');
var TodoStore = require('../stores/TodoStore');
var classSet = React.addons.classSet;

var TodoItem = React.createClass({

  render: function () {

    var todoClasses = classSet({
      'input-group': true,
      'todo-item': true,
      'todo-item-complete': this.props.todo.is_complete
    });

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