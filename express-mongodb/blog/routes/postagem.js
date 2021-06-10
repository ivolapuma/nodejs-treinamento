module.exports = (app) => {

    app.post(
        '/postagem',
        app.controllers.postagem.cadastrar
    );

    app.put(
        '/postagem',
        app.controllers.postagem.atualizar
    );

    app.get(
        '/postagens/:usuario',
        app.controllers.postagem.buscarPorUsuario
    );

    app.delete(
        '/postagem/:_id',
        app.controllers.postagem.remover
    );

}