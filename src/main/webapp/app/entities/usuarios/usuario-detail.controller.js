(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('UsuarioDetailController', UsuarioDetailController);

    UsuarioDetailController.$inject = ['$stateParams', 'User'];

    function UsuarioDetailController($stateParams, User) {
        var vm = this;

        vm.load = load;
        vm.user = {};

        vm.load($stateParams.login);

        function load(login) {
            User.get({login: login}, function(result) {
                vm.user = result;
            });
        }
    }
})();
