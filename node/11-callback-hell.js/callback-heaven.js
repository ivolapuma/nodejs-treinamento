const fs = require('fs');

// 1a versão do callback-heaven

const lerArquivo = (diretorio, arquivo) => {
    // stat() tbm é assíncrona
    fs.stat(
        `${diretorio}/${arquivo}`, // caminho do arquivo
        (erro, resultado) => {
            console.log(`arquivo: ${arquivo} tem ${resultado.size} bytes`);
        }
    );
}

const lerDiretorio = (diretorio) => {
    // readdir() é uma função assíncrona
    fs.readdir(
        diretorio, // o caminho do diretorio
        (erro, arquivos) => {
            if (erro) {
                throw erro;
            } else {
                arquivos.forEach(                    
                    (arquivo) => {
                        lerArquivo(diretorio, arquivo);
                    }
                );   
            }
        }
    );
}

// 2a versão do callback-heaven
// porem, faz uso de uma variável declarada (diretorioPrincipal) 
// num escopo acima do escopo da função (o que é problemático)

// const lerArquivoForEach = (arquivo) => {
//     // stat() tbm é assíncrona
//     fs.stat(
//         `${diretorioPrincipal}/${arquivo}`, // caminho do arquivo        
//         (erro, resultado) => {
//             if (erro) throw erro;
//             let msg = `arquivo: ${arquivo} tem ${resultado.size} bytes`;
//             // console.log(`arquivo: ${arquivo} tem ${resultado.size} bytes`);
//         }
//     );
// }

// const lerDiretorio = (diretorioLocal) => {
//     // readdir() é uma função assíncrona
//     fs.readdir(
//         diretorioLocal, // o caminho do diretorio
//         (erro, arquivos) => {
//             if (erro) {
//                 throw erro;
//             } else {
//                 arquivos.forEach(                    
//                     lerArquivoForEach  // lerArquivoForEach está sendo passada como parâmetro, e não sendo executada agora!
//                 );   
//             }
//         }
//     );
// }

let diretorioPrincipal = './arquivos';
lerDiretorio(diretorioPrincipal);
