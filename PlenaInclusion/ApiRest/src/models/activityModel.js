const { DataTypes } = require('sequelize');
const db = require("../config/config.js");

const ActivityModel = db.define('Activity', {
    ID_activity: {
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
    },
    Photo: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: true,
    tableName: 'Activity',
    paranoid: true,
    deletedAt: 'softDelete'
});

(async () => {
    await db.sync();
})();

module.exports = ActivityModel;