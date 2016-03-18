angular.module('MyApp')
    .service('CurrentUser', ['$window', function($window) {

        var storage = $window.localStorage;
        var cachedUser;
        var currentUser = 'currentUser';

        var user = {
            setUser: function(user) {
                var userString = JSON.stringify(user);
                storage.setItem(currentUser, userString);
            },
            getUser: function() {
                cashedUser = storage.getItem(currentUser);
                return JSON.parse(cashedUser);
            },
            removeUser: function() {
                cashedUser = null;
                storage.removeItem(currentUser);
            },
            getRole: function() {
                return this.getUser().role;
            }
        };
        return user;
    }]);
