const { DataTypes } = require('sequelize');
const db = require("../config/config.js");

// Se define el modelo del usuario dentro de la base de datos.
const UserModel = db.define('User', {
    ID_user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    DNI: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    Rol: {
        type: DataTypes.ENUM('Nominal', 'Monitor', 'Administrador'),
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Surname_1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Surname_2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Pass: {
        type: DataTypes.STRING,
        allowNull: true,
        // No se puede enviar como valor en un select, para más seguridad
        select: false
    },
    Photo: {
        type: DataTypes.STRING
    },
    DNI_tutor: {
        type: DataTypes.UUID,
        allowNull: true
    },
    Adress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    BirthDay: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: true,
    tableName: 'User',
    paranoid: true,
    deletedAt: 'softDelete'
});

(async () => {
    await db.sync();
})();

module.exports = UserModel;

