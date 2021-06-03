// exemplo de servidor http

const http = require('http');

// vamos ver o que é esse 'objeto' http...
// console.log(`http: ${typeof(http)} ${http.constructor.name}`);
// console.log(http);


// criando o servidor http...
const server = http.createServer(
    (request, response) => {
        // sempre serão dois parâmetros...
        // o 1o, request, vai conter os dados da requisicao
        // o 20, response, vai receber os dados que enviados na resposta
        // console.log('request:')
        // console.log(request);
        // console.log('response:')
        // console.log(response);

        response.write('<head><meta charset="UTF-8"></head>')
        response.write('<h1>Olá, enfermeira!</h1>');
        response.end();
    }
);

// console.log(`server: ${typeof(server)} | construtor: ${server.constructor.name}`);
// console.log(server);

// subindo o servidor...
server.listen(3000 /*porta http*/, ()=>console.log('Servidor rodando na porta 3000...'));
// server.listen(3000 /*porta http*/);

console.log('FIM DO SCRIPT');

// no navegador, para acessar o servidor:
// localhost:3000

