const propertiesReader = require('properties-reader');
const properties = propertiesReader('./app.properties');

module.exports = (app) => {
    const constants = {
        port: properties.get('app.port')
    }
    return constants;
}