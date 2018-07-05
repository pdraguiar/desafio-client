(function() {
    'use strict';
    
    angular.module("desafioapp",["ui.router", "oc.lazyLoad", "blockUI", "ui.bootstrap", "ui.utils.masks"])
    .config(function($stateProvider) {
        var homeState = {
            url: "/",
            templateUrl: "home.html",
        };

        var somatoriosState = {
            url: "/despesas/somatorios",
            templateUrl: "modules/despesas/templates/despesas.somatorio.template.html",
            controller: "DespesasController",
            controllerAs: "despesasCtrl",
            resolve: {
                loadDeps: ["$ocLazyLoad", function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            "modules/common/constants.js",
                            "modules/despesas/services/despesas.service.js",
                            "modules/despesas/controllers/despesas.controller.js"
                        ]
                    })
                }]
            }
        };
      
        var cadastroDespesaState = {
            url: "/despesas/cadastro",
            templateUrl: "modules/despesas/templates/despesas.template.html",
            controller: "DespesasController",
            controllerAs: "despesasCtrl",
            params: {
                despesa: null
            },
            resolve: {
                loadDeps: ["$ocLazyLoad", function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            "modules/common/constants.js",
                            "modules/despesas/services/despesas.service.js",
                            "modules/despesas/controllers/despesas.controller.js"
                        ]
                    })
                }]
            }
        };

        var cadastroDespesaFormState = {
            url: "/despesas/cadastro/form",
            templateUrl: "modules/despesas/templates/despesas.form.template.html",
            controller: "DespesasFormController",
            controllerAs: "despesasFormCtrl",
            params: {
                despesa: null
            },
            resolve: {
                loadDeps: ["$ocLazyLoad", function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            "modules/common/constants.js",
                            "modules/despesas/services/despesas.service.js",
                            "modules/common/services/dominios.service.js",
                            "modules/despesas/controllers/despesas.form.controller.js"
                        ]
                    })
                }]
            }
        };
      
        $stateProvider.state("home", homeState);
        $stateProvider.state("despesassomatorio", somatoriosState);
        $stateProvider.state("despesascadastro", cadastroDespesaState);
        $stateProvider.state("despesascadastroform", cadastroDespesaFormState);
      });
})();