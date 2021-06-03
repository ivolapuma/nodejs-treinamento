const fs = require('fs');

const leituraSync = (arquivo) => {
    console.log(`Fazendo a leitura no modo síncrono do arquivo: ${arquivo}`);
    const inicio = new Date();
    let dados = fs.readFileSync(arquivo);
    const fim = new Date();
    const tempo = fim - inicio
    console.log(`Tempo (ms) de duração da função no modo síncrono: ${tempo}`)
    return tempo;
}

module.exports = leituraSync;