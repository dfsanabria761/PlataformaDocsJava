(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('UsuarioMySuffixController', UsuarioMySuffixController);

    UsuarioMySuffixController.$inject = ['Usuario'];

    function UsuarioMySuffixController(Usuario) {

        var vm = this;

        vm.usuarios = [];

        loadAll();

        function loadAll() {
            Usuario.query(function(result) {
                vm.usuarios = result;
                vm.searchQuery = null;
            });
        }
    }
})();
