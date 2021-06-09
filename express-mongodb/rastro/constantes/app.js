const propertiesReader = require('properties-reader');
const properties = propertiesReader('./app.properties');

module.exports = (app) => {
    const constantesApp = {
        porta: properties.get('app.porta')
    }
    return constantesApp;
}