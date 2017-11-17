(function() {

  var app = angular.module("CoolWeather", []);

  var MainController = function($scope, $http) {
    $scope.cities = [];
    $scope.temperature = "N/A";
    $scope.description = "conditii necunoscute";
    $scope.image = "";
    var imageBase = "https://openweathermap.org/img/w/";
    $scope.buttonClicked = false;

    $scope.displayAddGroup = function() {
      $scope.buttonClicked = true;
    };

    $scope.addLocation = function() {
      $scope.cities.push($scope.city);
      $scope.buttonClicked = false;
      $scope.city = "";
    };

    $scope.refreshData = function(selectedCity) {

      var onSuccess = function(response) {
        $scope.temperature = response.data.main.temp;
        $scope.description = response.data.weather[0].description;
        $scope.image = imageBase + response.data.weather[0].icon + ".png";
      };

      var onError = function(reason) {
        console.log(reason.statusText);
      };

      var promise = $http.get("https://api.openweathermap.org/data/2.5/weather?q=" + $scope.selectedCity + "&appid=7b10426ee90376dc3d6525f847128b35&units=metric&lang=ro");
      promise.then(onSuccess, onError);
    };
  };

  app.controller("MainController", MainController);
}());