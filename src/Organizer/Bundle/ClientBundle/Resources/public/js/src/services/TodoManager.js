/**
 *
 * @param {$http} $http
 * @param {$q} $q
 * @constructor
 */
function TodoManager($http, $q) {
  this._$http = $http;
  this._$q = $q;
}

/**
 *
 * @returns {{name: string, id: null}}
 */
TodoManager.prototype.proto = function () {
  return {
    title: '',
    id: null
  };

};

/**
 *
 * @returns {promise}
 */
TodoManager.prototype.find = function() {

  var deferred = this._$q.defer();

  this._$http.get('/api/todo/')
    .success(function (data, status, headers, config) {
      deferred.resolve(data);
    })
    .error(function (data, status, headers, config) {
      deferred.reject();
    });

  return deferred.promise;
}

/**
 *
 * @param {todo} todo
 * @return {promise}
 */
TodoManager.prototype.create = function (todo) {

  var deferred = this._$q.defer();

  this._$http.post('/api/todo/', todo)
    .success(function (data, status, headers, config) {
      deferred.resolve(data);
    })
    .error(function (data, status, headers, config) {
      deferred.reject();
    });

  return deferred.promise;
};

/**
 *
 * @param todoId
 * @returns {promise|getDeferred.promise|fd.g.promise|result.promise|CodeUnit.promise|qFactory.Deferred.promise}
 */
TodoManager.prototype.delete = function (todoId) {
  var deferred = this._$q.defer();

  this._$http.delete('/api/todo/'+todoId)
    .success(function () {
      deferred.resolve();
    })
    .error(function () {
      deferred.reject();
    });

  return deferred.promise;
}

/**
 *
 * @param todo
 * @returns {promise|getDeferred.promise|fd.g.promise|result.promise|CodeUnit.promise|qFactory.Deferred.promise}
 */
TodoManager.prototype.update = function (todo) {
  var deferred = this._$q.defer();

  this._$http.put('/api/todo/' + todo.id, todo)
    .success(function (data) {
      deferred.resolve(data);
    })
    .error(function () {
      deferred.reject();
    });

  return deferred.promise;
};

/**
 *
 * @type {TodoManager}
 */
module.exports = TodoManager;