(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('RateMySuffixDetailController', RateMySuffixDetailController);

    RateMySuffixDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Rate', 'File', 'Usuario'];

    function RateMySuffixDetailController($scope, $rootScope, $stateParams, previousState, entity, Rate, File, Usuario) {
        var vm = this;

        vm.rate = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('plataformaDocsApp:rateUpdate', function(event, result) {
            vm.rate = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
