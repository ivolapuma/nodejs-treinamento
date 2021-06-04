const mongoose = require('mongoose');

module.exports = (app) => {

    const RastreadorController = {

        // método cadastrar() vai atender a rota POST /rastreador
        cadastrar(request, response) {

            console.log('Rota /rastreador chamada...');
            console.log(`request.body: ${request.body}`);
            console.log(request.body);
    
            // validar o request.body...
    
            const Rastreador = app.models.rastreador;

            // criar o documento na coleção 'rastreadores'            
            const rastreador = new Rastreador(request.body);
            // console.log(`rastreador: ${rastreador} | constructor: ${rastreador.constructor.name}`);
            // console.log(rastreador);
            
            mongoose.connect(
                'mongodb://localhost:27017/rastro-dev', // string de conexão
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                }
            )
            .then(
                (resultado) => {
    
                    // uma forma de cadastrar o documento, com o create() a partir do tipo Rastreador
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
    
                    // outra forma de cadastrar o documento, com save() a partir do objeto rastreador
                    // const resultadoCreate = rastreador.save()
                    // .then((resultado) => {
                    //     console.log(`resultado do then: ${resultado} | constructor: ${resultado.constructor.name}`);
                    //     console.log(resultado);
                    //     console.log(`Rastreador ${rastreador.codigoRastreador} cadastrado com sucesso.`);
                    //     mongoose.disconnect();
                    //     response.status(200).send(resultado);
                    // })
                    // .catch((erro) => {
                    //     console.log(`erro do create: ${erro} | constructor: ${erro.constructor.name}`);
                    //     console.log(erro);
                    //     console.log(`Erro ao cadastrar o Rastreador: ${erro}`);
                    //     mongoose.disconnect();
                    //     response.status(500).send(`Erro ao cadastrar o Rastreador: ${erro}`);
                    // });
                
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
    }

    return RastreadorController;
}


