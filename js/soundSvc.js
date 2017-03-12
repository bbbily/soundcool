angular.module("sound").service("soundSvc", function($http) {
  var id = config.id;
  url: "https://api.soundcloud.com/tracks.json?q=diddy&filter=streamable&client_id=" + id;
//   SC.initialize({
//   client_id: 'bda4ada8694db06efcac9cf97b872b3e',
//   redirect_uri: 'http://example.com/callback'
// });
  var service = this;
  var currentSound;
  var currentIdx;
  var historyIdx = -1;
  var tracks = [];
  var history = [];
  var currentPlay;
  var likes = [];
  var playList = [];
  this.notPlaying = true;
  this.addPlaylist = function(track) {
    if (playList.every(play => play.id != track.id))
      playList.push(track);
  }
  this.getPlaylist = function() {
    return playList;
  }

  this.addLike = function(track) {
    if (likes.every(like => like.id != track.id))
      likes.push(track);
    console.log(likes)
  }
  this.getLikes = function() {
    return likes;
  }

  this.getSearch = function(text) {
    return $http({
      method: "GET",
      url: "https://api.soundcloud.com/tracks.json?q=" + text + "&filter=streamable&client_id=bda4ada8694db06efcac9cf97b872b3e",
    }).then(function(result) {
      tracks = result.data
      return result.data;
    })
  }

  this.getTracks = function(genre) {
    return $http({
      method: "GET",
      url: "https://api.soundcloud.com/tracks.json?genre=" + genre + "&filter=streamable&client_id=bda4ada8694db06efcac9cf97b872b3e",
    }).then(function(result) {
      tracks = result.data;
      return result.data;
    })
  }
  this.getTracksArr = function() {
    return tracks;
  }


  this.getHistory = function() {
    return history;
  }

  this.removeHistory = function(track) {
    for (var i=0; i<history.length; i++) {
      if (track.id == history[i].id)
        history.splice(i, 1);
    }
  }

  this.playHistory = function(idx) {
    for (var i=0; i<tracks.length; i++) {
      if (tracks[i].id == tracks[idx].id) {
        currentIdx = i;
        break;
      }
    }
    // this.notPlaying = false;
    this.max = history[idx].duration;
    historyIdx = idx;
    currentPlay = history[idx];
    soundManager.stopAll();
    currentSound = soundManager.createSound({
      url: history[idx].stream_url + "?client_id=" + id,
      stream: true
    });
    soundManager.play(currentSound.id, {
      onfinish: function() {
        if (idx < history.length)
          service.playHistory(historyIdx+1);
      }
    });
  }

  this.playSong = function(name, idx) {
    if (name == "tracks")
      var songs = tracks
    else if (name == "likes")
      var songs = likes
    else if (name == "playlists")
      var songs = playList;
    var hasSound = false;
    for (var i=0; i<history.length; i++) {
      if (history[i].id == songs[idx].id) {
        hasSound = true;
        historyIdx = i;
        break;
      }
    }
    if (hasSound == false) {
      history.push(songs[idx]);
      historyIdx = history.length - 1;
    }
    // this.notPlaying = false;
    this.max = songs[idx].duration;
    currentIdx = idx;
    currentPlay = songs[idx];
    soundManager.stopAll();
    if (currentSound)
      soundManager.destroySound(currentSound.id);
    currentSound = soundManager.createSound({
      url: songs[idx].stream_url + "?client_id=" + id,
      stream: true
    });
    soundManager.play(currentSound.id, {

      onfinish: function() {
        if (idx < songs.length)
          service.playSong(name, currentIdx+1);
      }
    });
  }


  this.prevSong = function() {
    if (currentSound) {
      historyIdx == 0 ? this.playHistory(0) : this.playHistory(historyIdx-1);
    }
  }

  this.nextSong = function(name) {
    if (currentSound) {
      if (historyIdx == history.length - 1) {
        this.playSong(name, currentIdx+1);
      }
      else
        this.playHistory(historyIdx+1);
    }
  }

  this.togglePause = function() {
    if (currentSound)
      soundManager.togglePause(currentSound.id);
    else
      this.playSong("tracks", 0);
  }

  this.goPosition = function(value) {
    soundManager.setPosition(currentSound.id, value);
  }

  this.volume = function(value) {
    soundManager.setVolume(value);
  }

  this.getSong = function() {
    return currentPlay;
  }

  this.song = function() {
    return currentSound;
  }

  this.getPosition = function() {
    if (currentSound)
      return currentSound.position
  }

  this.setPlaying = function(boolean) {
    this.notPlaying = boolean;
  }

  this.convertTime = function(duration) {
    var min = Math.floor(duration / 60000);
    var sec = Math.floor(duration / 1000) % 60;
    return sec < 10 ? (min + ":0" + sec) : (min + ":" + sec);
  }

  // var subscribers = [];
  //
  // $interval(function() {
  //   subscribers.forEach(s => {
  //     s(currentSound)
  //   })
  // }, 300)
  //
  // this.subscribe(cb) {
  //   subscribers.push(cb);
  // }
})
