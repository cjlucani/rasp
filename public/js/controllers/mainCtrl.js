// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, socket) {

  $scope.LEDState = false;

  socket.on('LEDStateChange', function(newState) {
    console.log('LEDStateChange', newState);
    $scope.LEDState = newState;
  })

  $scope.updateLED = function() {
    console.log("Updating led");
    socket.emit('led');
  }

});
