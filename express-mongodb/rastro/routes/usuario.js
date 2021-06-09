module.exports = (app) => {

    // criando rota para cadastrar usuário
    // POST
    // rota '/usuario'
    app.post(
        '/usuario',
        app.controllers.usuario.cadastrar
    );
    
}