// teste de gravação de arquivos texto no modo síncrono

const fs = require('fs');

const inicio = new Date();
console.log(`inicio: ${inicio}`);
for (let i = 1; i <= 1000; i++) {
    // writeFileSync() é síncrono...
    fs.writeFileSync(`teste-sync-${i}.txt`, 'Olá, enfermeira!');
}
const fim = new Date();
console.log(`fim: ${fim}`);
console.log(`tempo (ms): ${fim - inicio}`);

