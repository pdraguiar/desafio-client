(function () {
    'use strict';

    angular
        .module('desafioapp')
        .service('DespesaService', DespesaService);

        DespesaService.$inject = ['$http'];

    function DespesaService($http) {
        var vm = this;

        var _baseUrl = "http://localhost:8080/despesas";

        var _headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        // Metodos expostos pelo serviço.
        vm.getDespesasMensais = getDespesasMensais;
        vm.getDespesasPorCategoria = getDespesasPorCategoria;
        vm.getDespesasPorFonteRecurso = getDespesasPorFonteRecurso;
        vm.listarDespesas = listarDespesas;

        function getDespesasMensais(){
            var url = _baseUrl + "/mensais";

            return $http.get(url, {headers: _headers});
        }

        function getDespesasPorCategoria(){
            var url = _baseUrl + "/categoria";

            return $http.get(url, {headers: _headers});
        }

        function getDespesasPorFonteRecurso(){
            var url = _baseUrl + "/fonteRecurso";

            return $http.get(url, {headers: _headers});
        }

        function listarDespesas(pagina, porPagina) {
            var _params = {
                pagina: pagina,
                porPagina: porPagina
            };
            return $http.get(_baseUrl, {headers: _headers, params: _params});
        }
    }
})();
