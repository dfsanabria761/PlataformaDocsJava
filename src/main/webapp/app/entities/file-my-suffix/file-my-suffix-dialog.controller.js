(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('FileMySuffixDialogController', FileMySuffixDialogController);

    FileMySuffixDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'File', 'Rate'];

    function FileMySuffixDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, File, Rate) {
        var vm = this;

        vm.file = entity;
        vm.clear = clear;
        vm.save = save;
        vm.rates = Rate.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.file.id !== null) {
                File.update(vm.file, onSaveSuccess, onSaveError);
            } else {
                File.save(vm.file, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('plataformaDocsApp:fileUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
