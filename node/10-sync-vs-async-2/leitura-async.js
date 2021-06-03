const fs = require('fs');

const leituraAsync = (arquivo) => {
    console.log(`Fazendo a leitura no modo assíncrono do arquivo: ${arquivo}`);
    const inicio = new Date();

    fs.readFile(
        arquivo, 
        (erro, dados) => {
            if (erro) {
                throw erro;
            } else {
                const fimLeitura = new Date();
                console.log(`Tempo (ms) de leitura do arquivo: ${fimLeitura - inicio}`);
            }
        }
    );

    const fim = new Date();
    const tempo = fim - inicio
    console.log(`Tempo (ms) de duração da função no modo assíncrono: ${tempo}`);

    return tempo;
}

module.exports = leituraAsync;