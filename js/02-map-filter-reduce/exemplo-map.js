// a função map() devolve um novo array com o resultado da função 
// passada como parametro para cada elemento do array

let numeros = [1, 10, 100, 1000]
let numerosPelaMetade = [];

console.log(numeros);

// passando uma arrow function...
numerosPelaMetade = numeros.map(
    (numero) => {  
        return numero / 2
    }
);

console.log(numerosPelaMetade);

// passando uma função anônima...
numerosPelaMetade = numeros.map(
    function (numero) {  
        return numero / 2
    }
);

console.log(numerosPelaMetade);

// passando uma função que tem nome
function dividePorDois(numero) {
    return numero / 2;
}

numerosPelaMetade = numeros.map(dividePorDois);

console.log(numerosPelaMetade);



