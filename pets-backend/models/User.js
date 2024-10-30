const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('pets_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // o 'postgres', dependiendo de tu base de datos
});

// Definición del modelo User
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// Sincroniza el modelo con la base de datos (esto crea la tabla si no existe)
const syncDatabase = async () => {
    try {
        await sequelize.sync();
        console.log('La tabla User ha sido creada (si no existía).');
    } catch (error) {
        console.error('Error al crear la tabla User:', error);
    }
};

syncDatabase();

module.exports = User;
