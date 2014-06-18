var pollsApp = angular.module('pollsApp',[]);

pollsApp.factory('pollFactory', ['$http', function($http) {

  var baseUrl = '/api/v1/';
  var pollUrl = baseUrl + 'polls/';
  var pollItemsUrl = baseUrl + 'poll_items/';

  var pollFactory = {};

  pollFactory.getPoll = function(id) {
    return $http.get(pollUrl + id);
  };
  
  pollFactory.vote_for_item = function(poll_item) {
    poll_item.votes +=1;
    return $http.put(pollItemsUrl + poll_item.id, poll_item);
  }

  return pollFactory;
}]);

pollsApp.controller('UserPollCtrl', ['$scope', 'pollFactory', 
    function($scope, $http, pollFactory) {

  //get the Poll
  $scope.poll = ""
  function setPoll(promise){
    $scope.poll = promise.data;
  }

  function getPoll(){
    return pollFactory.getPoll(1);
  }

  $scope.barcolor = function(i) {
    colors = ['progress-bar-success','progress-bar-info',
      'progress-bar-warning','progress-bar-danger','']
    idx = i % colors.length;
    return colors[idx];
  }

  getPoll().then(setPoll);

  $scope.vote = function(item) {
    pollFactory.vote_for_item(item) 
                        .then(getPoll)
                        .then(setPoll);
  }

}]);