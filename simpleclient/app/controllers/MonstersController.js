var app = angular.module('app');

app.controller('monstersController', function ($scope, $location, gameService) {

    $scope.GetMonsters = function () {
        gameService.GetMonsters()
            .then(function success(data) {
                $scope.monsters = data;
            });
        //TODO: Handle service errors
    };

    $scope.GetMonsters();
});