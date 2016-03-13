angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $rootScope) {

  // Retrieve and assign existing grocery list, if any, from local storage to scope variable (or assign empty array)
  $rootScope.storedItems = JSON.parse(localStorage.getItem("groceries")) || [];


  // Add grocery items to list, both in local storage and scope
  $scope.getGroceries = function(spokenGroc) {
    var localItems = $rootScope.storedItems;

    console.log("6");
    console.log(spokenGroc);
    console.log(localItems);

    if (spokenGroc === "") {
      return false;
    }

    console.log(spokenGroc);

    let grocItems = spokenGroc.toLowerCase().split('next');
    grocItems = grocItems.map( e => {return e.trim();} );

    console.log(grocItems);

    if (localItems) {
      for (let i = 0; i < grocItems.length; i++) {
        if (localItems.indexOf(grocItems[i] !== -1)) {
          localItems.push(grocItems[i]);
        }
      }
    } else {
      localItems = grocItems;
    }

    console.log(spokenGroc);
    console.log(localItems);
    console.log("7");

    localStorage.setItem("groceries", JSON.stringify(localItems));

    console.log("8", localItems);

    $rootScope.storedItems = localItems;

    console.log(localItems);

    $scope.$digest();
  };



  var recognition = new webkitSpeechRecognition();
  var button = document.getElementById("transcriptButton");
  var spokenGroc;
  var toggled = false;


  $scope.reset = function() {
    button.innerHTML = "Record";
    button.classList.remove('recording');
  }


  $scope.toggle = function() {
      if (toggled) {
          recognition.stop();
          $scope.reset();
      } else {
          $scope.startDictation();
      }
      toggled = !toggled;
  };


  // HTML5 Speech Recognition API
  $scope.startDictation = function() {

    button.innerHTML = "Recording";
    button.classList.add('recording');
    console.log("3");

    if (window.hasOwnProperty('webkitSpeechRecognition')) {

      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.lang = "en-US";
      recognition.start();
      console.log("3.5");

      recognition.onresult = function(e) {
        console.log(e);
        console.log("4");
        $scope.transResults = (e.results[0][0].transcript);
        console.log($scope.transResults);
      };

      recognition.onend = function(e) {
        console.log("5.75");
        $scope.getGroceries($scope.transResults);
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
