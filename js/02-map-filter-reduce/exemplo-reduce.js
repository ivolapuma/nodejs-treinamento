// a função reduce() retorna apenas um valor que é o resultado de cada chamada
// da função que é passada como parâmetro

let numeros = [10, 20, 30, 40, 50]

let soma = numeros.reduce(
    (atual, proximo) => {
        console.log(`atual = ${atual}, proximo = ${proximo}`);
        return atual + proximo;
    }
);

console.log(numeros)
console.log(soma);