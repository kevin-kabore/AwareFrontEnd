angular
  .module('awareApp')
  .factory('MessageFactory', MessageFactory)

MessageFactory.$inject = ['$http'];
function MessageFactory($http){
  var messageApi = 'http://localhost:3000/api/sms/'

  var messages = {}

  messages.list = function(){
    return $http.get(messageApi)
  }
  return messages
}
