module.exports = (app) => {

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
        app.controllers.rastreador.cadastrar
    );
}

