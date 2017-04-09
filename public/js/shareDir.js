angular.module("sound").directive("shareDir", function() {
  return {
    restrict: "E",
    templateUrl: "views/share.html",
    controller: function($scope, soundSvc) {
      $scope.addLike = function(track) {
        soundSvc.addLike(track);
      }
      $scope.addPlaylist = function(track) {
        soundSvc.addPlaylist(track);
      }
    }
  }
})
