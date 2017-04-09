angular.module("sound").controller("infosCtrl", function($scope, soundSvc, $stateParams) {
  var name = $stateParams.name;
  var id = $stateParams.id;

  function loop(tracks) {
    for (var i=0; i<tracks.length; i++)
      if (id == tracks[i].id) {
        $scope.track = tracks[i];
        if (!$scope.track.hasOwnProperty("comments"))
          $scope.track.comments = [];
        break;
      }
  }
  function getTrack(loop) {
    if (name == "tracks")
      $scope.tracks = soundSvc.getTracksArr();
    else if (name == "likes")
      $scope.tracks = soundSvc.getLikes();
    else if (name == "plyalists")
      $scope.tracks = soundSvc.getPlaylist();
    loop($scope.tracks);
  }
  getTrack(loop);

  $scope.addMessage = function(message) {
    console.log($scope.track)
    var obj = {
      message: message,
      date: new Date(),
      user: "Yao Ming",
      url: "../images/user.png"
    }
    $scope.track.comments.unshift(obj);
    $scope.message = "";
  }

  $scope.addLike = function(track) {
    soundSvc.addLike(track);
  }
})
