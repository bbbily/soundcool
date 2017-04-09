angular.module("sound").controller("topCtrl", function($scope, soundSvc) {
  $scope.getTracks = function(genre) {
    soundSvc.getTracks(genre).then(function(result) {
      $scope.tracks = result;
    })

  }
  $scope.genre = "All Music";
  $scope.getTracks("");
  $scope.name = "tracks";
  $(".row").find("div").on("click", function() {
    $(this).text().toLowerCase() == "all" ? $scope.getTracks("") : $scope.getTracks($(this).text());
    $scope.genre = $(this).text();
    $scope.filter = false;
  })

})
