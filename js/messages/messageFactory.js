angular
  .module('awareApp')
  .factory('MessageFactory', MessageFactory)

MessageFactory.$inject = ['$http'];
function MessageFactory($http){
  var messageApi = 'https://awarebackend.herokuapp.com/api/sms/'

  var messages = {}

  messages.list = function(){
    return $http.get(messageApi)
  }
  return messages

}
