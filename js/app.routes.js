(function() {
  'use strict';

  angular
    .module('awareApp')
    .config(AppRoutes);

  AppRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('homePage', {
        url: '/',
        templateUrl: './templates/home.html'
      })
      .state('messages', {
        url: '/messages',
        templateUrl: './templates/messages.html',
        controller: 'MessagesController',
        controllerAs: 'messageCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: './js/auth/signup.html',
        controller: 'SignInController',
        controllerAs: 'signUpCtrl'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: './js/auth/signin.html',
        controller: 'SignInController',
        controllerAs: 'signUpCtrl'
      })

    $urlRouterProvider.otherwise('/');
  }

})();
