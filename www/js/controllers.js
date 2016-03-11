angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $rootScope) {

  // Retrieve existing grocery list, if any, from local storage

  $rootScope.storedItems = JSON.parse(localStorage.getItem("groceries")) || [];


  // Set scope variable with local storage list
  // $scope.groceryArray = $scope.storedItems || [];


  // Add grocery items to list, both in local storage and scope
  $scope.getGroceries = function(spokenGroc) {
    var localItems = $rootScope.storedItems;

    // let groc = spokenGroc;
    // document.getElementById("groceries").value;
    console.log(spokenGroc);

    if (spokenGroc === "") {
      return false;
    }

    console.log(spokenGroc);

    let grocItems = spokenGroc.split('next');

    grocItems = grocItems.map( e => {return e.trim();} );

    console.log(grocItems);

    if (localItems) {
      for (let i = 0; i < grocItems.length; i++) {
        if (localItems.indexOf(grocItems[i] !== -1)) {
          localItems.push(grocItems[i]);
          console.log(localItems);
        }
      }
    } else {
      localItems = grocItems;
    }

    localStorage.setItem("groceries", JSON.stringify(localItems));

    console.log(localItems);
    $rootScope.storedItems = localItems;
    // console.log($scope.groceryArray);

    // $scope.groceryArray.push($scope.storedItems);
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
        // document.getElementById('transcript').value
        var spokenGroc = e.results[0][0].transcript;
        console.log(spokenGroc);
        $scope.getGroceries(spokenGroc);
        recognition.stop();
        // document.getElementById('labnol').submit();
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }
    }
  };


  // Delete item from page and local storage
  $scope.deleteItem = function(item) {
    console.log(item);
    let position = $rootScope.storedItems.indexOf(item);
    console.log($rootScope.storedItems);
    $rootScope.storedItems.splice(position, 1);
    console.log($rootScope.storedItems);
    localStorage.setItem("groceries", JSON.stringify($rootScope.storedItems));
    console.log($rootScope.storedItems);
  };

})
