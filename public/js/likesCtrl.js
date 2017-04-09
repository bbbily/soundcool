angular.module("sound").controller("likesCtrl", function($scope, soundSvc) {
  $scope.getTracks = function() {
    $scope.tracks = soundSvc.getLikes();
  }
  $scope.getTracks();
  $scope.name = "likes";
})
