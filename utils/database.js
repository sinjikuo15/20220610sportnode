const Sequelize = require('sequelize');

////////////////////////////////////////////////////////////

const database = new Sequelize('vue-node-sports', 'root', '403200281', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = database;