// a função filter() retorna um novo array a partir da função passada como parametro
// e vai preencher esse novo array com o retorno true da chamada da função com cada elemento

let numeros = [1, 10, 15, 25, 50, 60, 99];
let numerosPares = [];

console.log(numeros);

// filter com arrow function
numerosPares = numeros.filter(
    (numero) => {
        return numero % 2 == 0;
    }
);
console.log(numerosPares);

// filter com arrow function resumido
numerosPares = numeros.filter((numero) => numero % 2 == 0);
console.log(numerosPares);


// filtro modo raiz
function retornaNumerosPares(numeros) {
    let pares = []
    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] % 2 == 0) {
            pares.push(numeros[i]);
        }
    }
    return pares;    
}
console.log(retornaNumerosPares(numeros));

