angular.module("sound", ["ui.router"])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("top", {
        url: "/top",
        templateUrl: "views/top.html",
        controller: "topCtrl"
      })
      .state("likes", {
        url: "/likes",
        templateUrl: "views/likes.html",
        controller: "likesCtrl"
      })
      .state("playlists", {
        url: "/playlists",
        templateUrl: "views/playlists.html",
        controller: "playlistsCtrl"
      });
    $urlRouterProvider.otherwise("top");
  })

angular.module("sound").controller("likesCtrl", function($scope, soundSvc) {
  $scope.test = "agsavasas"
})

angular.module("sound").directive("playerDir", function() {

  return {
    restrict: "E",
    templateUrl: "views/player.html",
    controller: playerCtrl,
    // scope: {
    //   notPlaying: "="
    // }
  }

  function playerCtrl($scope, soundSvc) {
    $scope.notPlaying = true;
    $scope.togglePause = function() {
      soundSvc.togglePause();
      $scope.notPlaying = !$scope.notPlaying;
      $scope.max = soundSvc.max;

    }
    $scope.nextSong = function() {
      soundSvc.nextSong();
      $scope.max = soundSvc.max;

    }
    $scope.prevSong = function() {
      soundSvc.prevSong();
      $scope.max = soundSvc.max;

    }
    $scope.min = 0;
    $scope.goPosition = function(value) {
      soundSvc.goPosition(value);
    }

    // setInterval(function() {
    //   $scope.seek = soundSvc.seek;
    //   console.log($scope.seek);
    // }, 1000)
  }


})

angular.module("sound").controller("playlistsCtrl", function($scope, soundSvc) {

})

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
      // $scope.notPlay = false;
    }
  }
})

angular.module("sound").service("soundSvc", function($http) {
  var id = 'bda4ada8694db06efcac9cf97b872b3e';
  SC.initialize({
  client_id: 'bda4ada8694db06efcac9cf97b872b3e',
  // redirect_uri: 'http://example.com/callback'
});
  var topTen = [];
  var currentSound;
  var currentIdx;
  var historyIdx = -1;
  var tracks = [];
  var history = [];
  this.getTracks = function(genre) {
    return SC.get("/tracks", {
      genre: genre
    }).then(function(result) {
      console.log(result)
       tracks = result;
       return result;
    })
  }
  this.getHistory = function() {
    return history;
  }
  this.playHistory = function(idx) {
    for (var i=0; i<tracks.length; i++) {
      if (tracks[i].id == tracks[idx].id) {
        currentIdx = i;
        break;
      }
    }
    this.max = history[idx].duration;
    historyIdx = idx;
    soundManager.stopAll();
    currentSound = soundManager.createSound({
      // id: "mySound",
      url: history[idx].stream_url + "?client_id=" + id,
      stream: true
    });
    currentSound.play();
  }

  this.playSong = function(idx) {
    var hasSound = false;
    for (var i=0; i<history.length; i++) {
      if (history[i].id == tracks[idx].id) {
        hasSound = true;
        historyIdx = i;
        break;
      }
    }
    if (hasSound == false) {
      history.push(tracks[idx]);
      historyIdx = history.length - 1;
    }
    console.log(history);
    this.max = tracks[idx].duration;
    currentIdx = idx;
    soundManager.stopAll();
    if (currentSound)
      soundManager.destroySound(currentSound.id);
    currentSound = soundManager.createSound({
      // id: "mySound",
      url: tracks[idx].stream_url + "?client_id=" + id,
      stream: true
    });
    currentSound.play();
    // soundManager.onPosition(currentSound.id, 1000, function(eventPosition) {
    //   setInterval (function() {
    //     this.position = eventPosition;
    //   }, 500)
    // })

    // console.log(tracks);
  }

  setInterval(function() {
    if (currentSound) {
      this.seek = currentSound.position;
      console.log(this.seek)
    }
  }, 1000)

  this.prevSong = function() {
    if (currentSound) {
      historyIdx == 0 ? this.playHistory(0) : this.playHistory(historyIdx-1);
    }
  }

  this.nextSong = function() {
    if (currentSound) {
    if (historyIdx == history.length - 1) {
      this.playSong(currentIdx+1);
      console.log(currentIdx)
      console.log(historyIdx)
    }
    else
      this.playHistory(historyIdx+1);
  }
  }

  this.togglePause = function() {
    // console.log(currentSound);
    // console.log(tracks[currentIdx])
    // console.log(currentIdx)
    if (currentSound)
      soundManager.togglePause(currentSound.id);
    else
      this.playSong(0);

  }

  this.goPosition = function(value) {
    soundManager.setPosition(currentSound.id, value);
  }

})

angular.module("sound").controller("topCtrl", function($scope, soundSvc) {
  $scope.getTracks = function() {
    soundSvc.getTracks("Ambient").then(function(result) {
      $scope.tracks = result;
    })

  }
  $scope.getTracks();

  $scope.playSong = function(idx) {
    soundSvc.playSong(idx);
    // $scope.notPlay = false;
  }


})
