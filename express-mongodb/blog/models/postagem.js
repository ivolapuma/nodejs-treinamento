const mongoose = require('mongoose');

module.exports = () => {
    const postagemSchema = mongoose.Schema(
        {
            usuario: { type: String, required: true, index: { unique: true } },
            nome: { type: String, required: true },
            email: { type: String, required: true },
            postagens: [
                {
                    titulo: { type: String, required: true },
                    resumo: { type: String, required: true },
                    corpo: { type: String, required: true },
                    assuntos: [String],
                    dataHoraCriacao: { type: Date, required: true },
                    dataHoraAtualizacao: { type: Date }
                }
            ]
        }
    );
    return mongoose.model('postagens', postagemSchema);
}