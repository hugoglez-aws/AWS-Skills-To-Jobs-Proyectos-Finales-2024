const { DataTypes } = require('sequelize');
const db = require("../config/config.js");

const User_ScheduleModel = db.define('UserSchedule', {
    ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    AttendanceDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    Comment: {
        type: DataTypes.STRING
    },
    Rating: {
        type: DataTypes.INTEGER
    },
    UserIDUser: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    ScheduleIDSchedule: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'UserSchedule',
    paranoid: true,
    uniqueKeys: {
        UserSchedule_AttendanceDate_UserIDUser_ScheduleIDSchedule_unique: {
            fields: ['UserIDUser', 'ScheduleIDSchedule', 'ID']
        }
    }
});

(async () => {
    await db.sync();
})();

module.exports = User_ScheduleModel;
