var CommonConstants = {
    "TIPOS_SOMATORIO": {
        "MENSAL": 1,
        "CATEGORIA_ECONOMICA": 2,
        "FONTE_RECURSO": 3
    },
    "NOME_MESES": {
        "1": "Janeiro",
        "2": "Fevereiro",
        "3": "Março",
        "4": "Abril",
        "5": "Maio",
        "6": "Junho",
        "7": "Julho",
        "8": "Agosto",
        "9": "Setembro",
        "10": "Outubro",
        "11": "Novembro",
        "12": "Dezembro"
    },
    "LISTA_MESES": [
        { mes: 1, nome: "Janeiro"},
        { mes: 2, nome: "Fevereiro"},
        { mes: 3, nome: "Março"},
        { mes: 4, nome: "Abril"},
        { mes: 5, nome: "Maio"},
        { mes: 6, nome: "Junho"},
        { mes: 7, nome: "Julho"},
        { mes: 8, nome: "Agosto"},
        { mes: 9, nome: "Setembro"},
        { mes: 10, nome: "Outubro"},
        { mes: 11, nome: "Novembro"},
        { mes: 12, nome: "Dezembro"}
    ]
}

angular.module("desafioapp").constant('Constants', CommonConstants);