angular.module('app').service('gameService', function ($http, $q, $location) {

    var ApiUrl = "http://localhost:50741"


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

    this.GetParty = function () {
        
    };

    this.GetMonsters = function () {
        
    };

});