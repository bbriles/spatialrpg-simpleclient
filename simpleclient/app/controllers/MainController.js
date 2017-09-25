﻿var app = angular.module('app');

app.controller('mainController', function ($scope, $location, gameService) {

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
                GetUser();
            });
        //TODO: Handle service errors
    };

    function GetUser() {
        gameService.GetUser()
            .then(function success(data) {
                $scope.user = data;
                CheckInBattle();
            });

    }

    function CheckInBattle() {
        if ($scope.user.inBattle) {
            $location.url("battle");
        }
    }

    GetUser();
    $scope.GetEncounters();
});