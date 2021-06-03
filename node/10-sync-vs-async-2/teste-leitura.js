const leituraSync = require('./leitura-sync');
const leituraAsync = require('./leitura-async');

let arquivo = 'node-v14.17.0-linux-x64.tar.xz';

let tempoSync = leituraSync(arquivo);
console.log(tempoSync);

let tempoAsync = leituraAsync(arquivo);
console.log(tempoAsync);
