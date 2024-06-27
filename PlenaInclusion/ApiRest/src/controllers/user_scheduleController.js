const User_ScheduleModel = require('../models/user_scheduleModel');
const UserModel = require('../models/userModel');
const ScheduleModel = require("../models/scheduleModel");
const ActivityModel = require("../models/activityModel");
const CampaignModel = require("../models/campaignModel");
const TypeModel = require("../models/typeModel");
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require("express-validator");

const getAllUser_Schedules = async (req, res) => {
    try {
        const userSchedules = await User_ScheduleModel.findAll({
            include: [
                {
                    model: ScheduleModel,
                    include: [
                        { model: ActivityModel },
                        { model: TypeModel },
                        { model: CampaignModel }
                    ]
                },
                { model: UserModel }
            ]
        });
        res.json(userSchedules);
    } catch (error) {
        console.error('Error al obtener todos los usuarios con actividades:', error);
        res.status(500).json({ error: 'Error al obtener todos los usuarios con actividades' });
    }
}

const getUserSchedule = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const userSchedule = await User_ScheduleModel.findByPk(id, {
            include: [
                {
                    model: ScheduleModel,
                    include: [
                        { model: ActivityModel },
                        { model: TypeModel },
                        { model: CampaignModel }

                    ]
                },
                { model: UserModel }
            ]
        });
        res.json(userSchedule);
    } catch (error) {
        console.error('Error al obtener el item:', error);
        handleHttpError(res, "ERROR_GET_USER_SCHEDULE")
    }
}

const getUsersByScheduleId = async (req, res) => {
    const { scheduleId } = req.params;

    try {
        const schedule_Users = await User_ScheduleModel.findAll({
            where: { ScheduleIDSchedule: scheduleId },
            include: [
                {
                    model: ScheduleModel,
                    include: [
                        { model: ActivityModel },
                        { model: TypeModel },
                        { model: CampaignModel }
                    ]
                },
                { model: UserModel }
            ]
        });

        if (schedule_Users.length === 0) {
            return res.status(404).json({ error: 'No se encontraron usuarios para el horario especificado' });
        }

        res.json(schedule_Users);
    } catch (error) {
        console.error('Error al obtener los usuarios del horario:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios del horario:' });
    }
}

const getSchedulesByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const user_Schedules = await User_ScheduleModel.findAll({
            where: { UserIDUser: userId },
            include: [
                {
                    model: ScheduleModel,
                    include: [
                        { model: ActivityModel },
                        { model: TypeModel },
                        { model: CampaignModel }
                    ]
                },
                { model: UserModel }
            ]
        });

        res.json(user_Schedules);
    } catch (error) {
        console.error('Error al obtener los horarios del usuario:', error);
        res.status(500).json({ error: 'Error al obtener los horarios del usuario:' });
    }
}

const postUser_Schedule = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await User_ScheduleModel.create(body);
        res.send({ data });
    } catch (e) {
        console.log(e)
        handleHttpError(res, 'ERROR_POST_USER_SCHEDULE')
    }
}

const updateUserSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { AttendanceDate, Comment, Rating } = req.body;

        if (!AttendanceDate && !Comment && !Rating) {
            return res.status(400).json({ error: 'Se requiere al menos uno de los campos para realizar la actualización' });
        }

        const userScheduleToUpdate = await User_ScheduleModel.findByPk(id);
        if (!userScheduleToUpdate) {
            return res.status(404).json({ error: 'No se encontró la relación de usuario y horario para actualizar' });
        }

        await User_ScheduleModel.update(
            { AttendanceDate: AttendanceDate, Comment: Comment, Rating: Rating },
            { where: { id: id } }
        );

        const updatedUserSchedule = await User_ScheduleModel.findByPk(id);
        return res.json({ data: updatedUserSchedule });
    } catch (error) {
        console.error('Error al actualizar la relación de usuario y horario:', error);
        return res.status(500).json({ error: 'Error al actualizar la relación de usuario y horario' });
    }
};


const deleteUserSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        const userScheduleToDelete = await User_ScheduleModel.findByPk(id);
        if (!userScheduleToDelete) {
            return res.status(404).json({ error: "No se encontró la relación de campaña y horario para eliminar" });
        }

        await User_ScheduleModel.destroy({
            where: { id: id }
        });

        return res.json({ message: 'Relación de usuario y horario eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la relación de usuario y horario:', error);
        return res.status(500).json({ error: 'Error al eliminar la relación de usuario y horario' });
    }
};

const deleteByUserAndSchedule = async (req, res) => {
    try {
        const { userId, scheduleId } = req.params;

        await User_ScheduleModel.destroy({
            where: {
                UserIDUser: userId,
                ScheduleIDSchedule: scheduleId
            }
        });

        return res.json({ message: 'Registros eliminados correctamente' });
    } catch (error) {
        console.error('Error al eliminar registros:', error);
        return res.status(500).json({ error: 'Error al eliminar registros' });
    }
};

module.exports = {
    getAllUser_Schedules: getAllUser_Schedules,
    postUser_Schedule: postUser_Schedule,
    getUserSchedule: getUserSchedule,
    getUsersByScheduleId: getUsersByScheduleId,
    getSchedulesByUserId: getSchedulesByUserId,
    deleteUserSchedule: deleteUserSchedule,
    updateUserSchedule: updateUserSchedule,
    deleteByUserAndSchedule: deleteByUserAndSchedule
};
