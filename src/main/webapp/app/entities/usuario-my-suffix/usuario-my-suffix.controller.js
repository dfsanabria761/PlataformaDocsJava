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
                console.log(vm.usuarios);

                for (var i = vm.usuarios.length - 1; i >= 0; i--) {
                    for (var j = vm.usuarios[i].authorities.length - 1; j >= 0; j--) {
                        if(vm.usuarios[i].authorities[j]==='ROLE_ADMIN'){
                            vm.usuarios[i].show  = false;
                            break;
                        }
                    }
                }
                vm.searchQuery = null;
            });
        }
    }
})();
