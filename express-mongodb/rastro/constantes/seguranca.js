const propertiesReader = require('properties-reader');
const properties = propertiesReader('./app.properties');

module.exports = (app) => {
    const constantesSeguranca = {
        custoHash: properties.get('seguranca.custo.hash'),
        chaveJWT: properties.get('seguranca.chave.jwt'),
        tempoExpiracaoToken: '2m'
    }
    return constantesSeguranca;
}