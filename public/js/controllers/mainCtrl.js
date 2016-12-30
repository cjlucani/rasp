// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, socket) {

  $scope.startLED = function() {
    console.log("Starting led");
    socket.emit('led');
  }


});
