// exemplo 2 do operador de espalhamento (spread operator)

let pessoa = {
    nome: "Jonas",
    idade: 26,
    time: "São Paulo F. C."
}

console.log(pessoa);

let mesmaPessoaMasDiferente = {
    nome: pessoa.nome,
    idade: pessoa.idade,
    time: pessoa.time,
    cidade: "Conchal/SP"
}

console.log(mesmaPessoaMasDiferente);

let mesmaPessoaComSpreadOperator = {
    cidade: "São Paulo/SP",
    ...pessoa
}

console.log(mesmaPessoaComSpreadOperator);



// let pessoa = {
//     nome: "Jonas",
//     idade: 26,
//     time: "São Paulo F. C."
// };

// console.log(pessoa);

// let mesmaPessoaMasDiferente = { ...pessoa, cidade: "Conchal" };

// console.log(pessoa);
// console.log(mesmaPessoaMasDiferente);