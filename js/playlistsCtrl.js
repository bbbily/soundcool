angular.module("sound").controller("playlistsCtrl", function($scope, soundSvc) {
  $scope.getTracks = function() {
    $scope.tracks = soundSvc.getPlaylist();
  }
  $scope.getTracks();
  $scope.name = "playlists";
})
