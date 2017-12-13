(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('UsuarioMySuffixDetailController', UsuarioMySuffixDetailController);

    UsuarioMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Usuario', 'User', 'Rate'];

    function UsuarioMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, Usuario, User, Rate) {
        var vm = this;

        vm.usuario = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('plataformaDocsApp:usuarioUpdate', function(event, result) {
            vm.usuario = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
