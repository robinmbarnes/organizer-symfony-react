var app = require('angular').module('OrganizerApp');

app.controller('TodoController', [
  '$scope',
  'TodoManager',
  require('./TodoController')
]);

//