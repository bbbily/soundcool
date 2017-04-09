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
      })
      .state("infos", {
        url: "/infos/:name/:id",
        templateUrl: "views/infos.html",
        controller: "infosCtrl"
      });
    $urlRouterProvider.otherwise("top");
  })
