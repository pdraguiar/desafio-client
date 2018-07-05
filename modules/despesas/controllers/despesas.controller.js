(function() {
    'use strict';

    angular
        .module('desafioapp')
        .controller('DespesasController', DespesasController);

        DespesasController.$inject = ['Constants',"DespesaService","$state"];

    
    function DespesasController(Constants, DespesaService, $state) {
        var vm = this;

        vm.getSomatorio = getSomatorio;
        vm.transitionTo = transitionTo;
        vm.registrosPorPaginaAlterados = registrosPorPaginaAlterados;
        vm.atualizarBusca = atualizarBusca;
        vm.pagina = 0;
        vm.paginaAtual = 1;
        vm.porPagina = 10;
        vm.totalRegistros = 0;

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

            if ($state && $state.$current && ($state.$current.name == "despesascadastro")) {
                listarDespesas();
            }
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

        function listarDespesas() {
            DespesaService.listarDespesas(vm.pagina, vm.porPagina).then(function(response) {
                if (response && response.data && response.data.despesas) {
                    vm.resultados = vm.resultados = atribuirNomeMes(response.data.despesas);
                    vm.totalRegistros = response.headers("X-Total-Registros");
                } else {
                    vm.resultados = [];
                    vm.totalRegistros = 0;
                }
            });
        }

        function registrosPorPaginaAlterados(novoPorPagina) {
            vm.porPagina = novoPorPagina;

            listarDespesas();
        }

        function atualizarBusca() {
            vm.pagina = (vm.paginaAtual - 1);

            listarDespesas();
        }

        function transitionTo(state, despesa) {
            if (despesa && despesa.codigoDespesa) {
                $state.transitionTo(state, {despesa: despesa.codigoDespesa});
            } else {
                $state.transitionTo(state);
            }
        }
    }
})();
