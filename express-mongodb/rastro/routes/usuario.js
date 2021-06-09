module.exports = (app) => {

    // criando rota para cadastrar usuário
    // POST
    // rota '/usuario'
    app.post(
        '/usuario',
        app.controllers.usuario.cadastrar
    );

    // criando rota para fazer login
    // POST
    // rota '/login'
    app.post(
        '/login',
        app.controllers.usuario.login
    );
}