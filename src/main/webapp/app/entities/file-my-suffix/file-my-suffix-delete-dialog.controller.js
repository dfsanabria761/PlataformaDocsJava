(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('FileMySuffixDeleteController',FileMySuffixDeleteController);

    FileMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'File'];

    function FileMySuffixDeleteController($uibModalInstance, entity, File) {
        var vm = this;

        vm.file = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            File.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
