(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state','Auth','ProfileService'];

    function HomeController ($scope, Principal, LoginService, $state,Auth, ProfileService,) {
        var vm = this;
        
        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.$state = $state;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;

            });
        }
        function register () {
            $state.go('register');
        }

        

        
    }
})();
