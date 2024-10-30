// config/database.js

const { Sequelize } = require('sequelize');

// Configura los datos de conexión a la base de datos
const sequelize = new Sequelize('pets_management', 'root', '', {
    host: '127.0.0.1',      // Cambia si estás usando otro host
    dialect: 'mysql',       // Cambia 'mysql' por 'postgres', 'sqlite', etc., si usas otro gestor de base de datos
    logging: false          // Opcional: desactiva el logging de SQL para limpiar la consola
});

// Prueba la conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa.');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

module.exports = sequelize;
