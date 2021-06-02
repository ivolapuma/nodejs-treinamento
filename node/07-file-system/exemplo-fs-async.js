// exemplo do módulo File System

const fs = require('fs'); // LEMBRETE: 'fs' é o módulo File System

// só para ver o que tem no 'fs'...
// console.log(`fs: ${typeof(fs)} | constructor: ${fs.constructor.name}`);
// console.log(fs);

// lendo um arquivo... no modo ASSÍNCRONO...
let retorno = fs.readFile('index2.html' /*caminho do arquivo*/,
    (erro, dados) => {
        // se erro diferente de null, o IF vai ser true
        if (erro) {
            throw erro;
        } else {
            console.log(dados.toString());
        }
    }
);

console.log('retorno:');
console.log(retorno);