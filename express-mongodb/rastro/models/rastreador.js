// configuração do Mongoose
const mongoose = require('mongoose');

module.exports = (app) => {

    // classe Schema do Mongoose permite definir a estrutura de uma coleção no MongoDB
    const Schema = mongoose.Schema;
    // console.log(`Schema: ${typeof(Schema)} | constructor: ${Schema.constructor.name}`);

    // Schema() define a estrutura da coleção
    const rastreadorSchema = Schema(
        {
            codigoRastreador: { type: String, required: true, index: { unique: true } },
            placaVeiculo: { type: String, required: true },
            cpfCliente: { type: String, required: true }
        }
    );
    // console.log(`rastreadorSchema: ${typeof(rastreadorSchema)} | constructor: ${rastreadorSchema.constructor.name}`);

    // model() cria a coleção
    const Rastreador = mongoose.model('rastreadores' /*nome da coleção*/, rastreadorSchema);
    // console.log(`Rastreador: ${typeof(Rastreador)} | constructor: ${Rastreador.constructor.name}`);
    // console.log(Rastreador);

    return Rastreador;
}

