(function() {
  "use strict";

  angular
    .module("awareApp")
    .controller("NavbarController", NavbarController);

  NavbarController.$inject = ["$log", "authService"];

  function NavbarController($log, authService) {
    var self = this;

    self.authService = authService;

    $log.info("NavbarController loaded!");
  }
})();
