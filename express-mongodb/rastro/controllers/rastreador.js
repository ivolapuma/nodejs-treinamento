const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

module.exports = (app) => {

    const RastreadorController = {

        // método cadastrar() vai atender a rota POST /rastreador
        cadastrar(request, response) {

            console.log('Rota POST /rastreador chamada...');
            console.log(`request.body: ${request.body}`);
            console.log(request.body);
            console.log(`request.headers.authorization: ${request.headers.authorization}`);

            // validar o token
            let payload;
            try {
                payload = jwt.verify(request.headers.authorization, app.constantes.seguranca.chaveJWT);
            } catch(erro) {
                console.log(erro);
            }

            console.log('payload extraido da verificação do token:');
            console.log(payload);    
    
            if (payload != undefined) {
                mongoose.connect(
                    app.constantes.db.connection,
                    app.constantes.db.connectionParams
                )
                .then(
                    (resultado) => {
    
                        const Usuario = app.models.usuario;
                        Usuario.find( { login: payload.login } )
                        .then((usuariosEncontrados) => {
    
                            if (usuariosEncontrados.length > 0) {
    
                                const Rastreador = app.models.rastreador;
    
                                // criar o documento na coleção 'rastreadores'            
                                const rastreador = new Rastreador(request.body);
                                // console.log(`rastreador: ${rastreador} | constructor: ${rastreador.constructor.name}`);
                                // console.log(rastreador);        
            
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
                                        
                            } else {
                                console.log(`Token invalido. payload.login: ${payload.login}`);
                                mongoose.disconnect();
                                response.status(401).send(`Token invalido.`);    
                            }
                        })
                        .catch((erro) => {
                            console.log(`Erro ao verificar usuario no cadastro: ${erro}`);
                            mongoose.disconnect();
                            response.status(500).send(`Erro ao verificar usuario no cadastro: ${erro}`);
                        });
                            
                    }
                ).catch(
                    (erro) => {
                        console.log(`erro do connection: ${erro} | constructor: ${erro.constructor.name}`);
                        console.log(erro);
                        console.log(`Erro ao conectar no banco MongoDB: ${erro}`);
                        response.status(500).send(`Erro ao conectar no banco MongoDB: ${erro}`);
                    }
                );    
            } else {
                console.log(`Token invalido.`);
                response.status(401).send(`Token invalido.`);    
            }
        },

        alterar(request, response) {

            console.log('Rota PUT /rastreador chamada...');
            console.log(`request.body: ${request.body}`);
            console.log(request.body);

            const Rastreador = app.models.rastreador;

            mongoose.connect(
                app.constantes.db.connection,
                app.constantes.db.connectionParams
            )
            .then(() => {
                // a função updateOne() alterar um documento da coleção
                Rastreador.updateOne(
                    // objeto com o critério de busca do documento
                    {codigoRastreador: request.body.codigoRastreador}, 
                    // objeto com os dados que devem ser atualizados
                    {
                        $set: {
                            placaVeiculo: request.body.placaVeiculo,
                            cpfCliente: request.body.cpfCliente
                        }
                    }
                )
                .then((resultado) => {
                    console.log(`resultado do updateOne:`);
                    console.log(resultado);

                    if (resultado.nModified > 0) {
                        mongoose.disconnect();
                        response.status(200).send('Rastreador alterado com sucesso.');    
                    } else {
                        mongoose.disconnect();
                        response.status(404).send('Rastreador não localizado no cadastro.');    
                    }

                })
                .catch((erro) => {
                    console.log(`Erro ao alterar o Rastreador: ${erro}`);
                    console.log(erro);
                    mongoose.disconnect();
                    response.status(500).send(`Erro ao alterar o Rastreador: ${erro}`);
                });
            })
            .catch((erro) => {
                console.log(`erro do connection: ${erro} | constructor: ${erro.constructor.name}`);
                console.log(erro);
                console.log(`Erro ao conectar no banco MongoDB: ${erro}`);
                response.status(500).send(`Erro ao conectar no banco MongoDB: ${erro}`);
            });
        },

        excluir(request, response) {
            console.log('Rota DELETE /rastreador chamada...');
            console.log('request.params:');
            console.log(request.params);

            mongoose.connect(
                app.constantes.db.connection,
                app.constantes.db.connectionParams
            )
            .then(() => {
                const Rastreamento = app.models.rastreamento;
                const Rastreador = app.models.rastreador;
                Rastreamento.deleteMany(
                    { codigoRastreador: request.params.codigoRastreador }
                )
                .then((resultadoDeleteRastreamento) => {
                    console.log(`resultadoDeleteRastreamento:`);
                    console.log(resultadoDeleteRastreamento);

                    Rastreador.deleteOne(
                        { codigoRastreador: request.params.codigoRastreador }
                    )
                    .then((resultadoDeleteRastreador) => {
                        console.log(`resultadoDeleteRastreador:`);
                        console.log(resultadoDeleteRastreador);
                        mongoose.disconnect();
                        if (resultadoDeleteRastreador.deletedCount > 0) {
                            if (resultadoDeleteRastreamento.deletedCount == 1) {
                                response.status(200).send(`Foi excluído ${resultadoDeleteRastreamento.deletedCount} documento de rastreamento e o documento do Rastreador.`);
                            } else {
                                response.status(200).send(`Foram excluídos ${resultadoDeleteRastreamento.deletedCount} documentos de rastreamento e o documento do Rastreador.`);
                            }                            
                        } else {
                            response.status(404).send(`Rastreador não localizado no cadastro.`);
                        }
                    })
                    .catch((erro) => {
                        console.log(`Erro ao excluir o documento do Rastreador: ${erro}`);
                        console.log(erro);
                        mongoose.disconnect();
                        response.status(500).send(`Erro ao excluir o documento do Rastreador: ${erro}`);    
                    });
                    
                })
                .catch((erro) => {
                    console.log(`Erro ao excluir os documentos de rastreamento do Rastreador: ${erro}`);
                    console.log(erro);
                    mongoose.disconnect();
                    response.status(500).send(`Erro ao excluir os documentos de rastreamento do Rastreador: ${erro}`);
                });

            })
            .catch((erro) => {
                console.log(`Erro ao conectar no banco MongoDB: ${erro}`);
                console.log(erro);
                response.status(500).send(`Erro ao conectar no banco MongoDB: ${erro}`);
            });

        }
    }

    return RastreadorController;
}


