module.exports = (app) => {

    // criando rota para cadastrar rastreamento
    // POST
    // rota '/rastreamento'
    app.post('/rastreamento', app.controllers.rastreamento.cadastrar);

}