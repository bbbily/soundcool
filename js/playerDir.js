angular.module("sound").directive("playerDir", function() {

  return {
    restrict: "E",
    templateUrl: "views/player.html",
    controller: playerCtrl,
    link: function(scope, elem, attrs) {
      $(".listToggle").on("click", function() {
        console.log("abc")
        $(".queueShow").toggle("slide", {direction: "up"}, 1000);
      })
      $(".fa-bars").on("click", function() {
        $("nav").toggle("slide", 500);
      })
    }
  }
  function playerCtrl($scope, soundSvc, $interval) {

    function getSound() {
      currentSound = soundSvc.song();
      if (currentSound) {
        $scope.currentPlay = soundSvc.getSong();
        $scope.seek = soundSvc.getPosition();
        $scope.notPlaying = soundSvc.notPlaying;
        $scope.currentPosition = soundSvc.convertTime($scope.seek) + " /  ";
        $scope.duration = soundSvc.convertTime(currentSound.duration);
      }
    }

    getSound();
    $scope.soundSvc = soundSvc;
    $scope.showVol = false;
    $scope.min = 0;
    $scope.seek = soundSvc.getPosition();
    $scope.notPlaying = soundSvc.notPlaying;
    var currentSound;

    $scope.playSong = function(name, idx) {
      soundSvc.playSong(name, idx);
      $scope.currentPlay = soundSvc.getSong();
      $scope.notPlaying = false;
      soundSvc.setPlaying(false);
      currentSound = soundSvc.song();
      $scope.max = soundSvc.max;
    }

      $scope.togglePause = function() {
        soundSvc.togglePause();
        $scope.notPlaying = !$scope.notPlaying;
        soundSvc.setPlaying($scope.notPlaying);
        $scope.max = soundSvc.max;
      }
      $scope.nextSong = function(name) {
        soundSvc.nextSong(name);
        $scope.currentPlay = soundSvc.getSong();
        $scope.notPlaying = false;
        soundSvc.setPlaying(false);
        currentSound = soundSvc.song();
        $scope.max = soundSvc.max;

      }
      $scope.prevSong = function() {
        soundSvc.prevSong();
        $scope.max = soundSvc.max;
        $scope.currentPlay = soundSvc.getSong();
        $scope.notPlaying = false;
        soundSvc.setPlaying(false);
        currentSound = soundSvc.song();
      }
      $scope.goPosition = function(value) {
        soundSvc.goPosition(value);
      }
      $scope.setVolume = function(value) {
        soundSvc.volume(value);
      }
      $scope.toggleVol = function() {
        $scope.showVol = !$scope.showVol;
      }
      $interval(getSound, 300)
    //   $scope.$watch(soundSvc.song, function() {
    //     console.log('UPDATING')
    //     currentSound = soundSvc.song();
    //
    //     if (currentSound) {
    //     $scope.currentPlay = soundSvc.getSong();
    //     $scope.position = soundSvc.getPosition();
    //     currentSound = soundSvc.song();
    //     $scope.max = soundSvc.max;
    //     $scope.currentPosition = soundSvc.convertTime($scope.position) + " /  ";
    //     $scope.duration = soundSvc.convertTime(currentSound.duration);
    //     $("#seekbar").val($scope.position);
    //   }
    // }, true)
  }
})
