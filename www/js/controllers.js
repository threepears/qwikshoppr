angular.module('starter.controllers', [])

.controller('AddCtrl', function($scope) {})

.controller('ListCtrl', function($scope, Lists) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.lists = Lists.all();
  $scope.remove = function(item) {
    Lists.remove(item);
  };

  $scope.checkItem = function (item) {
    console.log(item);
  }

})

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// });
