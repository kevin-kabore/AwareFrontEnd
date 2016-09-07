(function() {
  'use strict';

  angular
    .module('awareApp')
    .controller('SignInController', SignInController);

  SignInController.$inject = ['$log', 'authService', 'userService', '$state'];

  function SignInController($log, authService, userService, $state) {
    var self = this;

    // BINDINGS
    self.signUp = {
      number: '+13474972829',
      email: 'kevin@kevin.com',
      firstName: 'Kevin',
      lastName: 'Kabore',
      password: '12345',
      passwordConfirmation: '12345'
    };
    self.submitSignUp = submitSignUp;
    self.logIn = {
      number: '+13474972829',
      email:    'kevin@kevin.com',
      password: '12345'
    };
    self.submitLogIn = submitLogIn;
    self.conflict = false;

    // FUNCTIONS
    function submitSignUp() {
      userService
        .create(self.signUp)
        .then(function(res) {
          return authService.logIn(self.signUp);
        })
        .then(
          // on success
          function(decodedToken) {
            $log.info('Logged in!', decodedToken);
            $state.go('messages');
          },
          // on error
          function(err) {
            if (err.status === 409) self.conflict = true;
            $log.info('Error Claire-r:', err);
          }
        );
    }

    function submitLogIn() {
      authService
        .logIn(self.logIn)
        .then(
          // on success
          function(decodedToken) {
            $log.info('Logged in!', decodedToken);
            $state.go('messages');
          },
          // on error
          function(err) {
            $log.info('Error:', err);
          }
        );
    }

    $log.info('SignInController loaded!');
  }
})();
