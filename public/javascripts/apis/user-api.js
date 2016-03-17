
angular.module('user.api', []);

angular.module('user.api')
    .factory('userFactory', ['$http', function ($http) {
        var urlBase = '/api/users';
        var userFactory = {};

        userFactory.register = function (user) {
            return $http.post(urlBase + '/register', {user: user});
        };
        userFactory.login = function (user) {
            return $http.post(urlBase + '/login', {user: user});
        };
        userFactory.logout = function (token) {
            return $http.post(urlBase + '/logout', {token: token});
        };
        userFactory.getUsers = function (query) {
            return $http.get(urlBase);
        }

        return userFactory;
    }])

    .service('UserApi', UserApi );

    UserApi.$inject = ['$q', '$state','userFactory', 'AuthToken'];

     function UserApi ($q, $state, userFactory, AuthToken) {

        var UserApi = {};

        UserApi.users = [];

        UserApi.registerUser = function (user) {
            var defered = $q.defer();
            var that = this;
            userFactory.register(user)
                .then(function(data) {
                    console.log(data.data);
                    AuthToken.setToken(data.data);
                    $state.go('main');
                    defered.resolve(data.data);
                })
                .catch(function(reason) {
                    console.log(reason);
                    defered.reject(reason);
                });
            return defered.promise;
        };

        UserApi.loginUser = function (user) {
            var defered = $q.defer();
            var that = this;
            userFactory.login(user)
                .then(function(data) {
                    AuthToken.setToken(data.data);
                    $state.go('main');
                    defered.resolve(data.data);
                })
                .catch(function(reason) {
                    console.log(reason);
                    defered.reject(reason);
                });
            return defered.promise;
        };

        UserApi.logout = function () {
            var token = AuthToken.getToken();
            var defered = $q.defer();
            var that = this;
            userFactory.logout(token)
                .then(function(data) {
                    defered.resolve();
                    AuthToken.removeToken();
                    $state.go('main');
                })
                .catch(function(reason) {
                    console.log(reason);
                    defered.reject();
                });
            return defered.promise;
        };

        UserApi.search = function (query) {
            var defered = $q.defer();
            var that = this;
            userFactory.getUsers(query)
                .then(function(data) {
                    console.log(data.data);
                    UserApi.users = data.data;
                    defered.resolve();
                })
                .catch(function(reason) {
                    console.log(reason);
                    defered.reject();
                });
            return defered.promise;
        };

        return UserApi;
    }
