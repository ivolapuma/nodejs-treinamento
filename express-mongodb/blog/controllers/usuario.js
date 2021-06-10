const mongoose = require('mongoose');

function validarRequestCadastrarUsuario(body) {
    const retorno = {
        valido: true,
        mensagem: "Corpo da requisição válida."
    }
    if (!body.usuario || body.usuario == "") {
        retorno.valido = false;
        retorno.mensagem = "Atributo 'usuario' inválido ou não informado.";
    } else if (!body.nome || body.nome == "") {
        retorno.valido = false;
        retorno.mensagem = "Atributo 'nome' inválido ou não informado.";
    } else if (!body.email || body.email == "") {
        retorno.valido = false;
        retorno.mensagem = "Atributo 'email' inválido ou não informado.";
    }
    return retorno;
}

module.exports = (app) => {

    const usuarioController = {

        cadastrar(request, response) {

            console.log(`Serviço cadastrar usuário chamado.`);
            console.log(`request.body:`)
            console.log(request.body);

            const usuarioRequest = validarRequestCadastrarUsuario(request.body);

            if (usuarioRequest.valido) {

                mongoose.connect(
                    app.constants.db.connection,
                    app.constants.db.connectionParams
                )
                .then(() => {
                    const Postagem = app.models.postagem;
                    const usuarioWhere = { usuario: request.body.usuario };
                    Postagem.find(usuarioWhere)
                    .then((usuarioFound) => {
                        if (usuarioFound.length == 0) {
                            const usuario = new Postagem(request.body);
                            Postagem.create(usuario)
                            .then((usuarioCreated) => {
                                const mensagem = `Usuário cadastrado com sucesso: ${usuarioCreated}`;
                                console.log(mensagem);
                                mongoose.disconnect();
                                response.status(201).send(usuarioCreated);            
                            })
                            .catch((erro) => {
                                const mensagem = `Erro ao cadastrar o Usuário: ${erro}`;
                                console.log(mensagem);
                                mongoose.disconnect();
                                response.status(500).send(mensagem);            
                            });
                        } else {
                            const mensagem = `Usuário já cadastrado: ${usuarioFound.usuario}`;
                            console.log(mensagem);
                            mongoose.disconnect();
                            response.status(400).send(mensagem);        
                        }
                    })
                    .catch((erro) => {
                        const mensagem = `Erro ao localizar cadastro do Usuário: ${erro}`;
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
                const mensagem = usuarioRequest.mensagem;
                console.log(mensagem);
                response.status(400).send(mensagem);
            }

        }
    };

    return usuarioController;

}