angular.module("sound").directive("topbarDir", function() {
  return {
    restrict: "E",
    templateUrl: "views/topbar.html",
    controller: function($scope, soundSvc, $state) {
      $scope.submit = function(text) {
        $scope.filter = true;
        soundSvc.getSearch(text).then(function(result) {
          $scope.data = result;
          console.log(result);
        });
      }
      $scope.goBack = function() {
        window.history.back();
      }
      $scope.goForward = function() {
        window.history.forward();
      }
    }
  }
})
