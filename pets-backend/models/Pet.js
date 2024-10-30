const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que la ruta sea correcta

const Pet = sequelize.define('Pet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING, // La ruta de la imagen se almacena aquí
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Ajusta el nombre del modelo de usuario si es necesario
            key: 'id',
        },
    },
}, {
    timestamps: true, // Esto asegura que createdAt y updatedAt se manejen automáticamente
});

module.exports = Pet;
