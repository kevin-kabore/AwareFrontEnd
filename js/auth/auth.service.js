(function () {
  'use strict';

  angular
    .module('awareApp')
    .factory("authService", authService);

  authService.$inject = ["$log", "tokenService", "$http"];

  function authService($log, token, $http) {
    $log.info("auth service loaded!");

    var service = {
      logIn:      logIn,
      isLoggedIn: isLoggedIn,
      logOut:     logOut,
      isAdmin: isAdmin
    };
    return service;

    function isAdmin(){
      if (token.retrieve()){
        return token.decode().admin
      } else {
        return false
      }
    }

    function isLoggedIn() {
      return (token.retrieve() != null);
    }

    function logIn(data) {
      console.log(data);
      var promise = $http({
        method: 'POST',
        url:    'http://localhost:3000/token',
        data:   data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        // if the request succeeded, then run this
        // handler, and pass on the decoded token.
        function(res) {
          token.store(res.data);
          return token.decode();
        }
        // since there is no error handler, pass
        // an error on to the next promise, without
        // calling the above success handler
        // , function(err) { null; }
      );

      return promise;
    }
    function logOut() {
      token.destroy();
    }
  }

})();
