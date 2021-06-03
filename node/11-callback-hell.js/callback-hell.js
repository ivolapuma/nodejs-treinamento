const fs = require('fs');

let diretorio = './arquivos';

// readdir() é uma função assíncrona
fs.readdir(
    diretorio, // o caminho do diretorio
    (erro, arquivos) => {
        if (erro) {
            throw erro;
        } else {
            arquivos.forEach(
                (arquivo) => {
                    // stat() tbm é assíncrona
                    fs.stat(
                        `${diretorio}/${arquivo}`, // caminho do arquivo
                        (erro, resultado) => {
                            console.log(`arquivo: ${arquivo} tem ${resultado.size} bytes`);
                        }
                    );
                }
            );   
        }
    }
);