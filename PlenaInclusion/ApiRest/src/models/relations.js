const UserModel = require("./userModel.js");
const ScheduleModel = require("./scheduleModel.js");
const ActivityModel = require("./activityModel.js");
const User_ScheduleModel = require("./user_scheduleModel.js");
const TypeModel = require("./typeModel.js");
const CampaignModel = require("./campaignModel.js");

// Define las relaciones entre los modelos
const defineRelations = () => {
    // Relación 1:N entre Schedule y Activity
    ScheduleModel.belongsTo(ActivityModel, { foreignKey: 'ID_Activity', onDelete: 'CASCADE' });

    // Relación entre Type y Schedule
    ScheduleModel.belongsTo(TypeModel, { foreignKey: 'ID_Type', onDelete: 'CASCADE' });

    // Relación 1:N entre Campaign y Schedule
    ScheduleModel.belongsTo(CampaignModel, { foreignKey: 'ID_Campaign', onDelete: 'CASCADE' });
    CampaignModel.hasMany(ScheduleModel, { foreignKey: 'ID_Campaign' });

    // Relación N:N entre User y Schedule a través de la tabla de unión User_Schedule
    UserModel.belongsToMany(ScheduleModel, { through: User_ScheduleModel });
    ScheduleModel.belongsToMany(UserModel, { through: User_ScheduleModel });
    User_ScheduleModel.belongsTo(ScheduleModel, { foreignKey: 'ScheduleIDSchedule', onDelete: 'CASCADE' });
    User_ScheduleModel.belongsTo(UserModel, { foreignKey: 'UserIDUser', onDelete: 'CASCADE' });
}

module.exports = defineRelations;
