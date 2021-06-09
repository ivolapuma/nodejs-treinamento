const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    const UsuarioController = {

        cadastrar(request, response) {

            console.log('Rota POST /usuario chamada...');
            console.log(`request.body: ${request.body}`);
            console.log(request.body);

            mongoose.connect(
                app.constantes.db.connection,
                app.constantes.db.connectionParams
            )
            .then(() => {

                const Usuario = app.models.usuario;
                const usuario = new Usuario(request.body);

                console.log(`usuario ANTES:`);
                console.log(usuario);

                usuario.senha = bcrypt.hashSync(usuario.senha, app.constantes.seguranca.custoHash);

                console.log(`usuario DEPOIS:`);
                console.log(usuario);

                Usuario.create(usuario)
                .then((usuarioCriado) => {
                    console.log(`Usuario criado com sucesso:`);
                    console.log(usuarioCriado);
                    response.status(200).send(usuarioCriado);
                })
                .catch((erro) => {
                    console.log(`Erro ao cadastrar o usuario: ${erro}`);
                    console.log(erro);
                    response.status(500).send(`Erro ao cadastrar o usuario: ${erro}`);    
                });
                
            })
            .catch((erro) => {
                console.log(`Erro ao conectar no banco MongoDB: ${erro}`);
                console.log(erro);
                response.status(500).send(`Erro ao conectar no banco MongoDB: ${erro}`);
            });

        },

        login(request, response) {
            console.log('Rota POST /login chamada...');
            console.log(`request.body: ${request.body}`);
            console.log(request.body);

            mongoose.connect(
                app.constantes.db.connection,
                app.constantes.db.connectionParams
            )
            .then(() => {
                const Usuario = app.models.usuario;
                Usuario.find( {login: request.body.login} )
                .then((resultado) => {
                    if (resultado.length > 0) {
                        const usuario = resultado[0];
                        console.log('usuario localizado no cadastro:');
                        console.log(usuario);

                        const senhaValida = bcrypt.compareSync(request.body.senha, usuario.senha);
                        console.log(`senhaValida: ${senhaValida}`);

                        if (senhaValida) {
                            // gerar um token para devolver na resposta
                            const payload = { login: usuario.login };
                            const token = jwt.sign(
                                payload,
                                app.constantes.seguranca.chaveJWT,
                                { expiresIn: app.constantes.seguranca.tempoExpiracaoToken }
                            );
                            console.log(`token: ${token}`);
                            mongoose.disconnect();
                            response.set('Authorization', token)
                            response.status(200).send(`Usuario logado com sucesso: ${token}`);
                        } else {
                            mongoose.disconnect();
                            response.status(401).send('Login ou senha inválido.');
                        }

                    } else {
                        console.log(`Usuario não localizado no cadastro.`);
                        mongoose.disconnect();
                        response.status(401).send('Login ou senha inválido.');
                    }
                })
                .catch((erro) => {
                    console.log(`Erro ao tentar localizar o usuario no cadastro: ${erro}`);
                    console.log(erro);
                    mongoose.disconnect();
                    response.status(500).send(`Erro ao tentar localizar o usuario no cadastro: ${erro}`);
                });                
            })
            .catch((erro) => {
                console.log(`Erro ao conectar no banco MongoDB: ${erro}`);
                console.log(erro);
                response.status(500).send(`Erro ao conectar no banco MongoDB: ${erro}`);
            });            
        }
    }
    return UsuarioController
}