var app = require('angular').module('OrganizerApp');

app.service('TodoManager', [
  '$http',
  '$q',
  require('./TodoManager')
]);