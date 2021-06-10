const propertiesReader = require('properties-reader');
const properties = propertiesReader('./app.properties');

module.exports = (app) => {
    const constants = {
        connection: `mongodb://${properties.get('db.server')}:${properties.get('db.port')}/${properties.get('db.name')}`,
        connectionParams: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    }
    return constants;
}