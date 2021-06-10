const mongoose = require('mongoose');

module.exports = (app) => {

    function validarRequestCadastrarPostagem(body) {
        const retorno = {
            valido: true,
            mensagem: "Corpo da requisição válida."
        }
        if (!body.usuario || body.usuario == "") {
            retorno.valido = false;
            retorno.mensagem = "Atributo 'usuario' inválido ou não informado.";
        } else if (!body.postagem) {
            retorno.valido = false;
            retorno.mensagem = "Atributo 'postagem' inválido ou não informado.";
        } else if (!body.postagem.titulo || body.postagem.titulo == "") {
            retorno.valido = false;
            retorno.mensagem = "Atributo 'postagem.titulo' inválido ou não informado.";
        } else if (!body.postagem.resumo || body.postagem.resumo == "") {
            retorno.valido = false;
            retorno.mensagem = "Atributo 'postagem.resumo' inválido ou não informado.";
        } else if (!body.postagem.corpo || body.postagem.corpo == "") {
            retorno.valido = false;
            retorno.mensagem = "Atributo 'postagem.corpo' inválido ou não informado.";
        }
        return retorno;    
    }

    function validarRequestAtualizarPostagem(body) {
        const retorno = {
            valido: true,
            mensagem: "Corpo da requisição válida."
        }
        if (!body.titulo || body.titulo == "") {
            retorno.valido = false;
            retorno.mensagem = "Atributo 'titulo' inválido ou não informado.";
        } else if (!body.resumo || body.resumo == "") {
            retorno.valido = false;
            retorno.mensagem = "Atributo 'resumo' inválido ou não informado.";
        } else if (!body.corpo || body.corpo == "") {
            retorno.valido = false;
            retorno.mensagem = "Atributo 'corpo' inválido ou não informado.";
        } else if (!body._id || body._id == "") {
            retorno.valido = false;
            retorno.mensagem = "Atributo '_id' inválido ou não informado.";
        }
        return retorno;    
    }

    const postagemController = {

        cadastrar(request, response) {

            console.log(`Serviço cadastrar postagem chamado.`);
            console.log(`request.body:`)
            console.log(request.body);

            const postagemRequest = validarRequestCadastrarPostagem(request.body);

            if (postagemRequest.valido) {

                mongoose.connect(
                    app.constants.db.connection,
                    app.constants.db.connectionParams
                )
                .then(() => {

                    const Postagem = app.models.postagem;
                    Postagem.find( { usuario: request.body.usuario } )
                    .then((postagensFound) => {
                        if (postagensFound.length > 0) {
                            request.body.postagem.dataHoraCriacao = new Date();
                            Postagem.updateOne(
                                { usuario: request.body.usuario },
                                { $push: { postagens: request.body.postagem } }
                            )
                            .then((resultadoUpdate) => {
                                console.log(`resultadoUpdate:`);
                                console.log(resultadoUpdate);
                                mongoose.disconnect();
                                response.status(200).send('Postagem cadastrada com sucesso');
                            })
                            .catch((erro) => {
                                const mensagem = `Erro ao cadastrar a postagem do usuário: ${erro}`;
                                console.log(mensagem);
                                mongoose.disconnect();
                                response.status(500).send(mensagem);            
                            });
                        } else {
                            const mensagem = `Usuario ${request.body.usuario} não localizado no cadastro.`;
                            console.log(mensagem);
                            mongoose.disconnect();
                            response.status(404).send(mensagem);
                        }
                    })
                    .catch((erro) => {
                        const mensagem = `Erro ao localizar o usuario no cadastro: ${erro}`;
                        console.log(mensagem);
                        mongoose.disconnect();
                        response.status(500).send(mensagem);    
                    });

                })
                .catch((erro) => {
                    const mensagem = `Erro ao conectar no banco: ${erro}`;
                    console.log(mensagem);
                    response.status(500).send(mensagem);
                });

            } else {
                const mensagem = postagemRequest.mensagem;
                console.log(mensagem);
                response.status(400).send(mensagem);
            }

        },

        atualizar(request, response) {

            console.log(`Serviço atualizar postagem chamado.`);
            console.log(`request.body:`)
            console.log(request.body);

            const postagemRequest = validarRequestAtualizarPostagem(request.body);

            if (postagemRequest.valido) {

                mongoose.connect(
                    app.constants.db.connection,
                    app.constants.db.connectionParams
                )
                .then(() => {

                    const Postagem = app.models.postagem;

                    const postagem = request.body;
                    postagem.dataHoraAtualizacao = new Date();

                    Postagem.updateOne(                        
                        { 
                            'postagens._id': postagem._id
                        },
                        { 
                            $set: { 'postagens.$': postagem } 
                        }
                    )
                    .then((resultado) => {
                        mongoose.disconnect();
                        console.log('resultado do updateOne:');
                        console.log(resultado);
                        if (resultado.nModified > 0) {
                            response.status(200).send('Postagem atualizada com sucesso.');
                        } else {
                            response.status(404).send('Postagem não localizada no cadastro.');
                        }
                    })
                    .catch((erro) => {
                        mongoose.disconnect();
                        const mensagem = `Erro ao atualizar a postagem: ${erro}`;
                        console.log(mensagem);                        
                        response.status(500).send(mensagem);    
                    });

                })
                .catch((erro) => {
                    const mensagem = `Erro ao conectar no banco: ${erro}`;
                    console.log(mensagem);
                    response.status(500).send(mensagem);
                });

            } else {
                const mensagem = postagemRequest.mensagem;
                console.log(mensagem);
                response.status(400).send(mensagem);
            }
        },

        buscarPorUsuario(request, response) {

            console.log(`Serviço buscar postagens do usuário chamado.`);
            console.log(`request.params:`)
            console.log(request.params);

            if (request.params.usuario && request.params.usuario != "") {

                mongoose.connect(
                    app.constants.db.connection,
                    app.constants.db.connectionParams
                )
                .then(() => {
                    const Postagem = app.models.postagem;
                    Postagem.find( { usuario: request.params.usuario } )
                    .then((resultado) => {
                        mongoose.disconnect();
                        if (resultado.length > 0) {
                            console.log('Busca das postagens realizada com sucesso.');
                            response.status(200).send(resultado[0].postagens);
                        } else {
                            const mensagem = `Usuário não localizado no cadastro.`;
                            console.log(mensagem);
                            response.status(404).send(mensagem);
                        }                    
                    })
                    .catch((erro) => {
                        mongoose.disconnect();
                        const mensagem = `Erro ao buscar as postagens do usuario: ${erro}`;
                        console.log(mensagem);                        
                        response.status(500).send(mensagem);    
                    });
                })
                .catch((erro) => {
                    const mensagem = `Erro ao conectar no banco: ${erro}`;
                    console.log(mensagem);
                    response.status(500).send(mensagem);
                });
                
            } else {
                const mensagem = `Atributo 'usuario' inválido ou não informado.`;
                console.log(mensagem);
                response.status(400).send(mensagem);
            }
           
        },

        remover(request, response) {

            console.log(`Serviço remover postagem chamado.`);
            console.log(`request.params:`)
            console.log(request.params);

            if (request.params._id && request.params._id != "") {

                mongoose.connect(
                    app.constants.db.connection,
                    app.constants.db.connectionParams
                )
                .then(() => {
                    const Postagem = app.models.postagem;
                    Postagem.updateOne(
                        { 'postagens._id': request.params._id },
                        { 
                            $pull: 
                            { 
                                postagens: { _id: request.params._id }
                            }
                        }
                    )
                    .then((resultado) => {
                        mongoose.disconnect();
                        console.log('resultado do updateOne $pull:');
                        console.log(resultado);
                        if (resultado.nModified > 0) {
                            response.status(200).send('Postagem removida com sucesso.');
                        } else {
                            const mensagem = `ID da Postagem não localizada no cadastro.`;
                            console.log(mensagem);
                            response.status(404).send(mensagem);            
                        }
                        
                    })
                    .catch((erro) => {
                        mongoose.disconnect();
                        const mensagem = `Erro ao remover a postagem: ${erro}`;
                        console.log(mensagem);
                        response.status(500).send(mensagem);    
                    });
                })
                .catch((erro) => {
                    const mensagem = `Erro ao conectar no banco: ${erro}`;
                    console.log(mensagem);
                    response.status(500).send(mensagem);
                });
                
            } else {
                const mensagem = `Atributo '_id' inválido ou não informado.`;
                console.log(mensagem);
                response.status(400).send(mensagem);
            }
           
        }

    };

    return postagemController;
}