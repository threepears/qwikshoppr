angular.module('starter.controllers', ['ionic'])

.controller('MainCtrl', function($scope, $rootScope) {

  var recognition;
  // var recognition = new webkitSpeechRecognition();
  var button = document.getElementById("transcriptButton");
  var toggled = false;


  // Retrieve and assign existing grocery list, if any, from local storage to scope variable (or assign empty array)
  $rootScope.storedItems = JSON.parse(localStorage.getItem("groceries")) || [];


  // Add grocery items to list, both in local storage and scope
  $scope.getGroceries = function() {
    console.log("6");

    var groceryList = document.getElementById("transcript");
    var spokenGroc = groceryList.value;

    var localItems = $rootScope.storedItems;

    if (spokenGroc === "") {
      return false;
    }

    var grocItems = spokenGroc.toLowerCase().split('next');
    grocItems = grocItems.map(function (e) {
      return e.trim();
    });

    if (localItems) {
      for (var i = 0; i < grocItems.length; i++) {
        if (localItems.indexOf(grocItems[i] !== -1)) {
          localItems.push(grocItems[i]);
        }
      }
    } else {
      localItems = grocItems;
    }

    groceryList.value = "";

    localStorage.setItem("groceries", JSON.stringify(localItems));

    $rootScope.storedItems = localItems;

    $scope.$digest();
  };


  $scope.reset = function() {
    button.innerHTML = "Record";
    button.classList.remove('recording');
  }


  $scope.toggle = function() {
      if (toggled) {
          recognition.stop();
          console.log("4");
          $scope.reset();
      } else {
          console.log("1");
          $scope.startDictation();
      }
      toggled = !toggled;
  };


  // HTML5 Speech Recognition API
  $scope.startDictation = function() {

    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      recognition = new webkitSpeechRecognition();
      button.innerHTML = "Recording";
      button.classList.add('recording');

      console.log("2");
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.lang = "en-US";
      recognition.start();

      // Process voice results when received
      recognition.onresult = function(e) {
        console.log("3");
        console.log(e);
        $scope.transResults = (e.results[0][0].transcript);
      };

      // When recognition ended, send results to grocery function
      recognition.onend = function(e) {
        console.log("5");
        console.log("e");
        $scope.getGroceries($scope.transResults);
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }
    } else {
      console.log("No speech recognition");
    }
  };


  // Delete item from page and local storage
  $scope.deleteItem = function(item) {
    var position = $rootScope.storedItems.indexOf(item);

    $rootScope.storedItems.splice(position, 1);
    localStorage.setItem("groceries", JSON.stringify($rootScope.storedItems));
  };

})
