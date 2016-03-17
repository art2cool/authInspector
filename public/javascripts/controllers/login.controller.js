
angular.module('MyApp')
    .controller('LoginController', ['UserApi', function(UserApi) {
        console.log('hello from login controller');
        this.user = {};
        this.submit = function () {
            UserApi.loginUser(this.user);
        };
    }]);
