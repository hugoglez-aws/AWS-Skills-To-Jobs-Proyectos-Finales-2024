const { DataTypes } = require('sequelize');
const db = require("../config/config.js");

const StorageModel = db.define('Storage', {
    ID_storage: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: true,
    tableName: 'Storage'
});


(async () => {
    await db.sync();
})();


module.exports = StorageModel;