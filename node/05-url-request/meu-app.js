// exemplo para obter informações da URL

const http = require('http');


// criando o servidor http...
const server = http.createServer(
    (request, response) => {

        // interpretando os dados da URL da requisição...
        const url = new URL(request.url, 'http://localhost:3000/');

        console.log(`url: ${typeof(url)} | constructor: ${url.constructor.name}`);
        console.log(`url: ${url}`);
        console.log(url);

        const resultado = new URLSearchParams(url.searchParams);

        console.log(`resultado: ${typeof(resultado)} | constructor: ${resultado.constructor.name}`);
        console.log(resultado);

        response.write('<head><meta charset="UTF-8"></head>')
        response.write('<h1>Consulta de Pontos</h1>');
        response.write(`<h3>${request.url}</h3>`);
        response.write(`<br>`);
        response.write(`<h3>${resultado}</h3>`);
        resultado.forEach(
            (valor, chave) => {
                response.write(`<br>`);
                response.write(`<h3>${chave}: ${valor}</h3>`);
            }
        );
        response.end();
    }
);


// subindo o servidor...
server.listen(3000 /*porta http*/, ()=>console.log('Servidor rodando na porta 3000...'));

console.log('FIM DO SCRIPT');

// no navegador, para acessar o servidor:
// localhost:3000/consulta-ponto?nome-jogador=Gabigol&time=Flamengo
