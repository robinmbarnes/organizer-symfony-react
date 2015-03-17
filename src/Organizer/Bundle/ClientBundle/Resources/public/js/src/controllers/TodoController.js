function todoController($scope, todoManager) {

  $scope.newTodo = todoManager.proto();
  $scope.addButton = {
    isProcessing: false
  };

  $scope.todos = [];

  todoManager.find()
    .then(function (data) {
      $scope.todos = data;
    }, function () {
      alert('Could not get todos');
    });

  $scope.addTodo = function() {
    if(!$scope.todoCreateForm.$valid) {
      return;
    }

    $scope.addButton.isProcessing = true;

    todoManager.create($scope.newTodo)
      .then(function (todo) {
        $scope.todos.unshift(todo);
        $scope.newTodo = todoManager.proto();
        $scope.addButton.isProcessing = false;
      }, function () {
        alert('Could not create todo');
      });
  };

  $scope.deleteTodo = function (todoId) {
    todoManager.delete(todoId)
      .then(function () {
        $.each($scope.todos, function (i, todo) {
          if(todo.id === todoId) {
            $scope.todos.splice(i, 1);

            return false;
          }
        });
      }, function () {
        alert('Could not delete todo item');
      });
  };

  $scope.renameTodo = function (todo) {
    todoManager.update(todo)
      .then(function (resultTodo) {
        todo = resultTodo;
      }, function () {
        alert('Could not update todo');
      });
  }
}

module.exports = todoController;
