angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) {

  // Retrieve existing grocery list, if any, from local storage
  let storedItems = JSON.parse(localStorage.getItem("groceries"));


  // Set scope variable with local storage list
  $scope.groceryArray = storedItems;


  // Add grocery items to list, both in local storage and scope
  $scope.getGroceries = function() {

    let groc = document.getElementById("groceries").value;

    if (groc === "") {
      return false;
    }

    console.log(groc);

    let grocItems = groc.split('next');

    grocItems = grocItems.map( e => {return e.trim();} );

    console.log(grocItems);

    if (storedItems) {
      for (let i = 0; i < grocItems.length; i++) {
        if (storedItems.indexOf(grocItems[i] !== -1)) {
          storedItems.push(grocItems[i]);
        }
      }
    } else {
      storedItems = grocItems;
    }

    localStorage.setItem("groceries", JSON.stringify(storedItems));
    $scope.groceryArray = storedItems;

    console.log(storedItems);
  };


  // Delete item from page and local storage
  $scope.deleteItem = function(item) {
    let position = storedItems.indexOf(item);
    storedItems.splice(position, 1);
    localStorage.setItem("groceries", JSON.stringify(storedItems));
  };

})
