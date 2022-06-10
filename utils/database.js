const Sequelize = require('sequelize');

////////////////////////////////////////////////////////////

const database = new Sequelize('jml-all', 'root', 'fn102', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = database;