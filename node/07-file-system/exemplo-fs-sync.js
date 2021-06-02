// exemplo do módulo File System

const fs = require('fs');

// lendo um arquivo... no modo SÍNCRONO

// let retorno = fs.readFileSync('index2.html');

let retorno = null;
try {
    retorno = fs.readFileSync('index.html');
} catch (erro) {
    console.log(`Erro na leitura do arquivo: ${erro}`)
}

console.log('retorno:');
console.log(retorno);
// console.log(retorno.toString());