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

    $scope.ClickEncounter = function (encounterId) {
        gameService.JoinEncounter(encounterId)
            .then(function success() {
                checkInBattle();
            });
        //TODO: Handle service errors
    };

    function getUser() {
        gameService.GetUser()
            .then(function success(data) {
                $scope.user = data;
                checkInBattle();
            })

    }

    function checkInBattle() {
        if ($scope.user.inBattle) {
            $location.url("battle");
        }
    }

    getUser();
    $scope.GetEncounters();
});