const calculadora = {
    somar(a, b) {
        return a + b;
    },
    subtrair(a, b) {
        return a - b;
    },
    multiplicar(a, b) {
        return a * b;
    },
    dividir(a, b) {
        return a / b;
    },
    somarNumeros(...numeros) {
        return numeros.reduce(
            (atual, proximo) => {
                return atual + proximo;
            }
        );
    },
    subtrairNumeros(...numeros) {
        return numeros.reduce(
            (atual, proximo) => {
                return atual - proximo;
            }
        );
    },
    multiplicarNumeros(...numeros) {
        return numeros.reduce(
            (atual, proximo) => {
                return atual * proximo;
            }
        );
    },
    dividirNumeros(...numeros) {
        return numeros.reduce(
            (atual, proximo) => {
                return atual / proximo;
            }
        );
    }
}

module.exports = calculadora;