(function() {
    'use strict';
    
    angular.module("desafioapp",["ui.router", "oc.lazyLoad", "blockUI"])
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
      
        $stateProvider.state("home", homeState);
        $stateProvider.state("despesassomatorio", somatoriosState);
        $stateProvider.state("despesascadastro", cadastroDespesaState);
      });
})();