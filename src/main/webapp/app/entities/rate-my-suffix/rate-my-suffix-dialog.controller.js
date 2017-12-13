(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('RateMySuffixDialogController', RateMySuffixDialogController);

    RateMySuffixDialogController.$inject = ['ProfileService','Principal','$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Rate', 'File', 'User'];

    function RateMySuffixDialogController (ProfileService,Principal,$timeout, $scope, $stateParams, $uibModalInstance, entity, Rate, File, User) {
        var vm = this;

        vm.rate = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.files = File.query();
        vm.usuarios = User.query();
        ProfileService.getProfileInfo().then(function(response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });
         getAccount();
        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            
            Rate.save(vm.rate, onSaveSuccess, onSaveError);
            
        }

        function onSaveSuccess (result) {
            $scope.$emit('plataformaDocsApp:rateUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.dateRated = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
         function getAccount() {
            Principal.identity().then(function(account) {
                vm.rate.dateRated= new Date();
                if(vm.account!=null){
                    vm.mostrarNombre=true;
                }
            });
        }
    }
})();
