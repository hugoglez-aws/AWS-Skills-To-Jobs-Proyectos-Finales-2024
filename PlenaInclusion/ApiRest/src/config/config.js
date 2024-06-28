const Sequelize = require("sequelize");
require("dotenv").config();

// Realiza la conexión con la base de datos, enviando un objeto con
// los datos necesarios para establecer la conexion.
const sequelize = new Sequelize('tfg_plena_inclusion',
    process.env.DATABASEUSER,
    process.env.DATABASEPASS, {
    host: process.env.DATABASEIP,
    dialect: 'mysql'
});

module.exports = sequelize;