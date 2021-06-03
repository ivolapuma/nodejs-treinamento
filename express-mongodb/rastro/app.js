const express = require('express');
// console.log(`express: ${typeof(express)} | constructor:${express.constructor.name}`);

// configuração do Mongoose
const mongoose = require('mongoose');

// para fazer conexão com o MongoDB, através do Mongoose
let conexao = mongoose.connect(
    'mongodb://localhost:27017/rastro-dev', // string de conexão
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);
console.log(`conexao: ${typeof(conexao)} | constructor: ${conexao.constructor.name}`);

// classe Schema do Mongoose permite definir a estrutura de uma coleção no MongoDB
const Schema = mongoose.Schema;
console.log(`Schema: ${typeof(Schema)} | constructor: ${Schema.constructor.name}`);

// Schema(
//     {
//         codigoRastreador
//     }
// );


const app = express();
// console.log(`app: ${typeof(app)} | constructor:${app.constructor.name}`);

// use() que permite configurar alguns recursos do express
// essas configurações vão permitir acessar o body do request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000 /*porta*/, ()=>console.log('Servidor rodando na porta 3000...'));

// criando a 1a rota
// rota '/'
// get() define a rota e a função que deve ser executada...
app.get(
    '/', // é a URL da rota
    (request, response) => {
        console.log('Rota principal chamada...');
        response.send('Servidor rodando, está tudo OK');
    }
);

// criando rota para cadastrar rastreador
// POST
// rota '/rastreador'
app.post(
    '/rastreador',
    (request, response) => {
        console.log('Rota /rastreador chamada...');
        console.log(`request.body: ${request.body}`);
        console.log(request.body);
        response.send('OK');
    }
);

