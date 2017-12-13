(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('RateController', RateController);

    RateController.$inject = ['Rate'];

    function RateController(Rate) {

        var vm = this;

        vm.rates = [];

        loadAll();

        function loadAll() {
            Rate.query(function(result) {
                vm.rates = result;
                vm.searchQuery = null;
            });
        }
    }
})();
