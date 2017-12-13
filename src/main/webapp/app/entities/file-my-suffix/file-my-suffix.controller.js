(function() {
    'use strict';

    angular
        .module('plataformaDocsApp')
        .controller('FileMySuffixController', FileMySuffixController);

    FileMySuffixController.$inject = ['File'];

    function FileMySuffixController(File) {

        var vm = this;

        vm.files = [];

        loadAll();

        function loadAll() {
            File.query(function(result) {
                vm.files = result;
                vm.searchQuery = null;
            });
        }
    }
})();
