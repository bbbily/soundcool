angular.module("sound").controller("mainCtrl", function($scope, soundSvc) {
    // $scope.notPlaying = true;
    $scope.songDuration = soundSvc.convertTime;


})
