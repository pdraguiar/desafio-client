(function () {
    'use strict';

    angular
        .module('desafioapp')
        .service('DominiosService', DominiosService);

        DominiosService.$inject = ['$http'];

    function DominiosService($http) {
        var vm = this;

        var _baseUrl = "http://localhost:8080/dominios";

        var _headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        // Metodos expostos pelo serviço.
        vm.listar = listar;
        vm.getUnidadesByOrgao = getUnidadesByOrgao;

        function listar(nomeDominio){
            var _params = {
                nomeDominio: nomeDominio
            };

            return $http.get(_baseUrl, {headers: _headers, params: _params});
        }

        function getUnidadesByOrgao(codigoOrgao) {
            var url  = _baseUrl + "/unidadesPorOrgao/" + codigoOrgao;

            return $http.get(url, {headers: _headers});
        }
    }
})();
