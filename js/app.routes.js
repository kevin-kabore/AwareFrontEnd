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
        templateUrl: 'templates/home.html'
      })
      .state('messages', {
        url: '/messages',
        templateUrl: 'templates/messages.html',
        controller: 'MessagesController',
        controllerAs: 'messageCtrl'
      })
      // .state("pledges", {
      //   url: "/pledges",
      //   templateUrl: "/templates/pledges.html",
      //   controller: "PledgesController",
      //   controllerAs: "vm"
      // });

    $urlRouterProvider.otherwise('/');
  }

})();
