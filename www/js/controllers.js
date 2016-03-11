angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $rootScope) {

  // Retrieve and assign existing grocery list, if any, from local storage to scope variable (or assign empty array)
  $rootScope.storedItems = JSON.parse(localStorage.getItem("groceries")) || [];


  // Add grocery items to list, both in local storage and scope
  $scope.getGroceries = function(spokenGroc) {
    var localItems = $rootScope.storedItems;

    if (spokenGroc === "") {
      return false;
    }

    let grocItems = spokenGroc.toLowerCase().split('next');
    grocItems = grocItems.map( e => {return e.trim();} );

    if (localItems) {
      for (let i = 0; i < grocItems.length; i++) {
        if (localItems.indexOf(grocItems[i] !== -1)) {
          localItems.push(grocItems[i]);
        }
      }
    } else {
      localItems = grocItems;
    }

    localStorage.setItem("groceries", JSON.stringify(localItems));

    $rootScope.storedItems = localItems;

    $scope.$digest();
  };


  // HTML5 Speech Recognition API
  $scope.startDictation = function() {

    if (window.hasOwnProperty('webkitSpeechRecognition')) {

      var recognition = new webkitSpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function(e) {
        var spokenGroc = e.results[0][0].transcript;
        $scope.getGroceries(spokenGroc);
        recognition.stop();
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }
    }
  };


  // Delete item from page and local storage
  $scope.deleteItem = function(item) {
    let position = $rootScope.storedItems.indexOf(item);

    $rootScope.storedItems.splice(position, 1);
    localStorage.setItem("groceries", JSON.stringify($rootScope.storedItems));
  };

})
