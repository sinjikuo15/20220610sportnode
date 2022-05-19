const Sequelize = require('sequelize');

////////////////////////////////////////////////////////////

const database = new Sequelize('demo', 'root', '403200281', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = database;