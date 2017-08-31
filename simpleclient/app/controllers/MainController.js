var app = angular.module('app');

app.controller('mainController', function ($scope, $http, $location, gameService) {

    $scope.GenerateEncounter = function () {
        gameService.GenerateEncounter()
            .then(function success() {
                $scope.GetEncounters();
            }, function failure() {
                alert('it be broke');
                //TODO: Make error handling better/prettier
            });
    };

    $scope.GetEncounters = function () {
        gameService.GetEncounters()
            .then(function success(data) {
                $scope.encounters = data;
            });
        //TODO: Handle service errors
    };

    $scope.GetEncounters();
});