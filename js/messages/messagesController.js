(function() {
  'use strict';

  angular
      .module('awareApp')
      .controller('MessagesController', MessagesController)
      .controller('MyMessagesController', MyMessagesController);

  MyMessagesController.$inject = ['$http']
  MessagesController.$inject = ['$state', 'MessageFactory', '$interval', '$http', 'authService'];

  function MyMessagesController($http){
    var self = this

    self.getMyMessages = getMyMessages
    self.myMessages = []

    function getMyMessages(user){
      $http({
        method: 'GET',
        url: 'https://awarebackend.herokuapp.com/users/me',
        data: user
      }).then(function(data){
          console.log(data.data.data.number)
          var phone = encodeURIComponent(data.data.data.number)

          $http({
            method: 'GET',
            url: 'https://awarebackend.herokuapp.com/api/sms/phone/' + phone
          }).then(function(data){
            console.log(data);
            self.myMessages = data.data
          })
        })
    }
    getMyMessages()
  }

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
        url: 'https://awarebackend.herokuapp.com/api/sms/' + message._id,
        data: message
      })
    }

    function deleteMessage(message){
      $http({
        method: 'DELETE',
        url: 'https://awarebackend.herokuapp.com/api/sms/' + message._id
      })
    }
}

})();
