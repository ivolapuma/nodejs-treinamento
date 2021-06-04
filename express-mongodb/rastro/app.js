const express = require('express');
// console.log(`express: ${typeof(express)} | constructor:${express.constructor.name}`);

// configuração do Mongoose
const mongoose = require('mongoose');

// classe Schema do Mongoose permite definir a estrutura de uma coleção no MongoDB
const Schema = mongoose.Schema;
console.log(`Schema: ${typeof(Schema)} | constructor: ${Schema.constructor.name}`);

// Schema() define a estrutura da coleção
const rastreadorSchema = Schema(
    {
        codigoRastreador: { type: String, required: true, index: { unique: true } },
        placaVeiculo: { type: String, required: true },
        cpfCliente: { type: String, required: true }
    }
);
console.log(`rastreadorSchema: ${typeof(rastreadorSchema)} | constructor: ${rastreadorSchema.constructor.name}`);

// model() cria a coleção
const Rastreador = mongoose.model('rastreadores' /*nome da coleção*/, rastreadorSchema);
console.log(`Rastreador: ${typeof(Rastreador)} | constructor: ${Rastreador.constructor.name}`);

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

        // validar o request.body...

        // criar o documento na coleção 'rastreadores'
        const rastreador = new Rastreador(request.body);
        console.log(`rastreador: ${rastreador} | constructor: ${rastreador.constructor.name}`);
        console.log(rastreador);
        
        mongoose.connect(
            'mongodb://localhost:27017/rastro-dev', // string de conexão
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        ).then(
            (resultado) => {
                console.log('Conexao com MongoDB realizada.');
                console.log(resultado);
        
                const resultadoCreate = Rastreador.create(rastreador)
                    .then((resultado) => {
                        console.log(`resultado do then: ${resultado} | constructor: ${resultado.constructor.name}`);
                        console.log(resultado);
                        console.log(`Rastreador ${rastreador.codigoRastreador} cadastrado com sucesso.`);
                        mongoose.disconnect();
                        response.status(200).send(resultado);
                    })
                    .catch((erro) => {
                        console.log(`erro do create: ${erro} | constructor: ${erro.constructor.name}`);
                        console.log(erro);
                        console.log(`Erro ao cadastrar o Rastreador: ${erro}`);
                        mongoose.disconnect();
                        response.status(500).send(`Erro ao cadastrar o Rastreador: ${erro}`);
                    });
                ;
                console.log(`resultado do create: ${typeof(resultadoCreate)} | constructor: ${resultadoCreate.constructor.name}`);
            }
        ).catch(
            (erro) => {
                console.log(`erro do connection: ${erro} | constructor: ${erro.constructor.name}`);
                console.log(erro);
                console.log(`Erro ao conectar no banco MongoDB: ${erro}`);
                response.status(500).send(`Erro ao conectar no banco MongoDB: ${erro}`);
            }
        );
    }
);

