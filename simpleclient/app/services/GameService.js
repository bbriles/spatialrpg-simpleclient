angular.module('app').service('gameService', function ($http, $q, $location) {

    var ApiUrl = "http://localhost:50741";
    var UserId = 1;
    this.User = {};
    var InBattle = false;

    this.GetUser = function () {
        return $q(function (resolve, reject) {
            $http.get(ApiUrl + '/api/user/' + UserId)
                .then(function (response) {
                    this.User = response.data;
                    resolve(response.data);
                },
                function (data) {
                    reject("Error getting user");
                });
        });
    };

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
        return $q(function (resolve, reject) {
            $http.get(ApiUrl + '/api/user/' + UserId + '/party')
                .then(function (response) {
                    resolve(response.data);
                },
                function (data) {
                    reject("Error getting user's party");
                });
        });
    };

    this.JoinEncounter = function (encounterId) {
        return $q(function (resolve, reject) {
            $http.post(ApiUrl + '/api/encounter/' + encounterId + '/join/' + UserId)
                .then(function (response) {
                    InBattle = true;
                    resolve();
                },
                function (data) {
                    reject("Error joining encounter");
                });
        });
    };

    this.GetBattle = function () {
        return $q(function (resolve, reject) {
            $http.get(ApiUrl + '/api/battle/user/' + UserId)
                .then(function (response) {
                    resolve(response.data);
                },
                function (data) {
                    reject("Error getting battle");
                });
        });
    };

    this.SendBattleUpdate = function (battleId, actions) {
        return $q(function (resolve, reject) {
            $http.post(ApiUrl + "/api/battle/" + battleId + "/actions", JSON.stringify(actions))
                .then(function (response) {
                    resolve(response.data);
                },
                function (data) {
                    reject("Error sending battle actions");
                });
        });
    };
});