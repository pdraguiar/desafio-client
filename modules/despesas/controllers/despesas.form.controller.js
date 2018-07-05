(function() {
    'use strict';

    angular
        .module('desafioapp')
        .controller('DespesasFormController', DespesasFormController);

        DespesasFormController.$inject = ['Constants',"DespesaService","$state", "DominiosService", "$q", "$stateParams"];

    
    function DespesasFormController(Constants, DespesaService, $state, DominiosService, $q, $stateParams) {
        var vm = this;

        vm.voltar = voltar;
        vm.salvar = salvar;
        vm.buscarUnidades = buscarUnidades;

        vm.isFormSubmitted = false;

        init();

        function init() {
            vm.despesa = getDespesaDefault();
            vm.listaMeses = Constants.LISTA_MESES;
            vm.listaUnidades = [];

            $q.all([
                DominiosService.listar("orgao"),
                DominiosService.listar("categoriaEconomica"),
                DominiosService.listar("grupoDespesa"),
                DominiosService.listar("fonteRecurso"),
                DominiosService.listar("modalidadeAplicacao"),
                DominiosService.listar("modalidadeEmpenho"),
                DominiosService.listar("modalidadeLicitacao"),
                DominiosService.listar("credor")
            ]).then(function(results) {
                vm.listaOrgaos = (results[0] && results[0].data && results[0].data.dominios) ? results[0].data.dominios : [];
                vm.listaCategoriaEconomica = (results[1] && results[1].data && results[1].data.dominios) ? results[1].data.dominios : [];
                vm.listaGrupoDespesa = (results[2] && results[2].data && results[2].data.dominios) ? results[2].data.dominios : [];
                vm.listaFonteRecurso = (results[3] && results[3].data && results[3].data.dominios) ? results[3].data.dominios : [];
                vm.listaModalidadeAplicacao = (results[4] && results[4].data && results[4].data.dominios) ? results[4].data.dominios : [];
                vm.listaModalidadeEmpenho = (results[5] && results[5].data && results[5].data.dominios) ? results[5].data.dominios : [];
                vm.listaModalidadeLicitacao = (results[6] && results[6].data && results[6].data.dominios) ? results[6].data.dominios : [];
                vm.listaCredor = (results[7] && results[7].data && results[7].data.dominios) ? results[7].data.dominios : [];

                if ($stateParams.despesa) {
                    DespesaService.buscarDespesa($stateParams.despesa)
                        .then(function(response) {
                            vm.despesa = (response && response.data) ? response.data : getDespesaDefault();
                            atribuirOrgaoAndUnidade();
                        });
                }
            });
        }

        function getDespesaDefault() {
            return {
                ano: 2017,
                orgao: {},
                unidade: {},
                categoriaEconomica: {},
                grupoDespesa: {},
                fonteRecurso: {},
                modalidadeAplicacao: {},
                modalidadeEmpenho: {},
                modalidadeLicitacao: {},
                credor: {}
            };
        }

        function buscarUnidades() {
            if (vm.despesa.orgao && vm.despesa.orgao.codigoOrgao) {
                DominiosService.getUnidadesByOrgao(vm.despesa.orgao.codigoOrgao)
                    .then(function(response) {
                        vm.listaUnidades = (response && response.data && response.data.dominios) ? response.data.dominios : [];
                    });
            } else {
                vm.listaUnidades = [];
            }
        }

        function atribuirOrgaoAndUnidade() {
            if ((!vm.despesa.orgao || !vm.despesa.orgao.codigoOrgao) &&
                vm.despesa.unidade && vm.despesa.unidade.orgao && vm.despesa.unidade.orgao.codigoOrgao) {
                vm.despesa.orgao = {
                    codigoOrgao: vm.despesa.unidade.orgao.codigoOrgao
                }

                buscarUnidades()
            }
        }

        function voltar() {
            $state.transitionTo("despesascadastro");
        }

        function salvar() {
            vm.isFormSubmitted = true;

            if (!vm.despesasForm.$invalid) {
                var despesa = angular.copy(vm.despesa);

                if (despesa.codigoDespesa) {
                    DespesaService.atualizarDespesa(despesa)
                    .then(function(response) {
                        alert("Atualizado com sucesso");
                    }, function(erro) {
                        var mensagem = "Erro Genérico.";

                        if (erro && erro.data && erro.data.message) {
                            mensagem = erro.data.message;
                        }

                        alert(mensagem);
                    });
                } else {
                    DespesaService.criarDespesa(despesa)
                    .then(function(response) {
                        alert("Criado com sucesso!");
                        $state.transitionTo("despesascadastro");
                    }, function(erro) {
                        var mensagem = "Erro Genérico.";

                        if (erro && erro.data && erro.data.message) {
                            mensagem = erro.data.message;
                        }

                        alert(mensagem);
                    });
                }
            } else {
                alert("Favor preencher todos os campos.");
            }
        }
    }
})();
