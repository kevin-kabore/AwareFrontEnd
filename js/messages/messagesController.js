(function() {
  'use strict';

  angular
      .module('awareApp')
      .controller('MessagesController', MessagesController);

  MessagesController.$inject = ['$state', 'MessageFactory', '$interval', '$http', 'authService'];

  function MessagesController($state, MessageFactory, $interval, $http, authService) {
    var self = this;
    self.authService = authService
    
    self.api = MessageFactory
    self.messages = []

    self.updateMessage = updateMessage
    self.deleteMessage = deleteMessage

    self.api.list()
      .success(function(res){
        self.messages = res
      })

    function refreshMessages(){
      $interval(function(){
        self.api.list()
          .success(function(res){
            self.messages = res
          })
      }, 5000)
    }
    refreshMessages()

    function updateMessage(message){
      message.Body = message.newBody
      $http({
        method: 'PATCH',
        url: 'http://localhost:3000/api/sms/' + message._id,
        data: message
      })
    }

    function deleteMessage(message){
      console.log(message);
      $http({
        method: 'DELETE',
        url: 'http://localhost:3000/api/sms/' + message._id
      })
    }

 }

})();
