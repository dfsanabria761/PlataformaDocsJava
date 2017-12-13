(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('RateMySuffixDeleteController',RateMySuffixDeleteController);

    RateMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'Rate'];

    function RateMySuffixDeleteController($uibModalInstance, entity, Rate) {
        var vm = this;

        vm.rate = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Rate.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
