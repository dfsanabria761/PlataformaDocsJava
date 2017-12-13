(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('FileMySuffixDetailController', FileMySuffixDetailController);

    FileMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'File', 'Rate'];

    function FileMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, File, Rate) {
        var vm = this;

        vm.file = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('plataformaDocsApp:fileUpdate', function(event, result) {
            vm.file = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
