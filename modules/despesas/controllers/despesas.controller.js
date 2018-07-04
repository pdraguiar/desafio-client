(function() {
    'use strict';

    angular
        .module('desafioapp')
        .controller('DespesasController', DespesasController);

        DespesasController.$inject = ['Constants',"DespesaService"];

    
    function DespesasController(Constants, DespesaService) {
        var vm = this;

        vm.getSomatorio = getSomatorio;

        init();

        function init() {
            vm.tipoSomatorios = [
                {valor: 1, nome: "Mês"},
                {valor: 2, nome: "Categoria Econômica"},
                {valor: 3, nome: "Fonte de Recurso"}
            ];
            vm.filtroTipoSomatorio = Constants.TIPOS_SOMATORIO.MENSAL;
            vm.tipoSomatorio = 1; //utilizado para distinguir na tela, qual tipo de somatório utilizado
            vm.resultados = [];
        }

        function getSomatorio() {
            if (vm.filtroTipoSomatorio == Constants.TIPOS_SOMATORIO.MENSAL) {
                DespesaService.getDespesasMensais().then(function(response) {
                    if (response && response.data && response.data.despesasMensais && (response.data.despesasMensais.length > 0)) {
                        vm.resultados = atribuirNomeMes(response.data.despesasMensais);
                        vm.tipoSomatorio = 1;
                    } else {
                        vm.resultados = [];
                    }
                });
            } else if (vm.filtroTipoSomatorio == Constants.TIPOS_SOMATORIO.CATEGORIA_ECONOMICA) {
                DespesaService.getDespesasPorCategoria().then(function(response) {
                    if (response && response.data && response.data.despesasCategoria && (response.data.despesasCategoria.length > 0)) {
                        vm.resultados = response.data.despesasCategoria;
                        vm.tipoSomatorio = 2;
                    } else {
                        vm.resultados = [];
                    }
                });
            } else if (vm.filtroTipoSomatorio == Constants.TIPOS_SOMATORIO.FONTE_RECURSO) {
                DespesaService.getDespesasPorFonteRecurso().then(function(response) {
                    if (response && response.data && response.data.despesasFonteRecurso && (response.data.despesasFonteRecurso.length > 0)) {
                        vm.resultados = response.data.despesasFonteRecurso;
                        vm.tipoSomatorio = 3;
                    } else {
                        vm.resultados = [];
                    }
                });
            }
        }

        function atribuirNomeMes(array) {
            angular.forEach(array, function(registro) {
                registro.nomeMes = Constants.NOME_MESES[registro.mes];
            });

            return array;
        }
    }
})();
