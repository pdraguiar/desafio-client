(function() {
    'use strict';

    angular
        .module('desafioapp')
        .controller('DespesasFormController', DespesasFormController);

        DespesasFormController.$inject = ['Constants',"DespesaService","$state"];

    
    function DespesasFormController(Constants, DespesaService, $state) {
        var vm = this;

        vm.voltar = voltar;

        init();

        function init() {
            vm.despesa = {};
           vm.listaMeses = Constants.LISTA_MESES;
        }

        function voltar() {
            $state.transitionTo("despesascadastro");
        }
    }
})();
