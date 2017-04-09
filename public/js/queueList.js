angular.module("sound").directive("queueList", function() {
  return {
    restrict: "E",
    templateUrl: "views/queueList.html",
    controller: queueCtrl
  }

  function queueCtrl($scope, soundSvc) {
    $scope.tracks = soundSvc.getHistory();

    $scope.playSong = function(idx) {
      soundSvc.playHistory(idx);
      $scope.max = soundSvc.max;
      soundSvc.setPlaying(false);
      $scope.currentPlay = soundSvc.getSong();
      console.log($scope.currentPlay, "aaaaffsdfjsdfjs;lfsad")

    }
    $scope.addLike = function(track) {
      soundSvc.addLike(track);
    }
    $scope.removeTrack = function(track) {
      soundSvc.removeHistory(track);
    }
    // $interval (function() {
    //   currentSound = soundSvc.song();
    //   if(currentSound) {
    //     $scope.currentPlay = soundSvc.getSong();
    //   }
    // })
  }
})
