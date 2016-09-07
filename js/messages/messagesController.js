(function() {
  "use strict";

  angular
      .module("awareApp")
      .controller("MessagesController", MessagesController);

  MessagesController.$inject = ["$state", 'MessageFactory', '$interval'];

  function MessagesController($state, MessageFactory, $interval) {
    var self = this;
    self.api = MessageFactory
    self.messages = []


    self.api.list()
      .success(function(res){
        self.messages = res
        console.log(self.messages);
      })

      function refreshMessages(){
        $interval(function(){
          self.api.list()
            .success(function(res){
              self.messages = res
              console.log(self.messages);
            })
        }, 1000)
      }
      refreshMessages()
 }

})();
