const propertiesReader = require('properties-reader');
const properties = propertiesReader('./app.properties');

module.exports = (app) => {
    const constantesDb = {
        connection: `mongodb://${properties.get('db.servidor')}:${properties.get('db.porta')}/${properties.get('db.database')}`,
        connectionParams: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        } 
    }
    return constantesDb;
}