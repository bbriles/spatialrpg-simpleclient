﻿var app = angular.module('app');

app.controller('battleController', function ($scope, $location, gameService) {

    $scope.GetBattle = function () {
        gameService.GetBattle()
            .then(function success(data) {
                $scope.battle = data;
                alert(JSON.stringify(data));
            });
        //TODO: Handle service errors
    };

    $scope.GetBattle();
});