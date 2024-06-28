const { DataTypes } = require('sequelize');
const db = require("../config/config.js");

const TypeModel = db.define('Type', {
    ID_type: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true,
    tableName: 'Type',
    paranoid: true,
    deletedAt: 'softDelete'
});


(async () => {
    await db.sync();
})();

module.exports = TypeModel;

