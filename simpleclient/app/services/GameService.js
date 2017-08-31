angular.module('app').service('gameService', function ($http, $q, $location) {

    var ApiUrl = "http://localhost:50741";
    var UserId = 1;


    this.GenerateEncounter = function () {
        return $q(function (resolve, reject) {
            $http.post(ApiUrl + '/api/encounter/new')
                .then(function (response) {
                    resolve(response.data);
                },
                function (data) {
                    reject("Error generating encounter");
                });
        });
    };

    this.GetEncounters = function () {
        return $q(function (resolve, reject) {
            $http.get(ApiUrl + '/api/encounter')
                .then(function (response) {
                    resolve(response.data);
                },
                function (data) {
                    reject("Error getting encounters");
                });
        });
    };

    this.GetMonsters = function () {
        return $q(function (resolve, reject) {
            $http.get(ApiUrl + '/api/monster/user/' + UserId)
                .then(function (response) {
                    resolve(response.data);
                },
                function (data) {
                    reject("Error getting user's monsters");
                });
        });
    };

    this.GetParty = function () {
        
    };

});