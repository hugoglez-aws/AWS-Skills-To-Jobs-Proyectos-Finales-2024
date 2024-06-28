const UserModel = require('../models/userModel');
const User_ScheduleModel = require('../models/user_scheduleModel');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require("express-validator");

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (e) {
        handleHttpError(res, 'Error al obtener todos los usuarios')
    }
}

const getUser = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const user = await UserModel.findByPk(id);
        res.json(user);
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        handleHttpError(res, "ERROR_GET_USER")
    }
}

const postUser = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await UserModel.create(body);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, 'ERROR_POST_USER')
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const formData = req.body;
        const file = req.file;

        if (file) {
            formData.Photo = `${process.env.PUBLIC_URL}/${file.filename}`;
        }

        const userBeforeUpdate = await UserModel.findByPk(id);
        if (!userBeforeUpdate) {
            return res.status(404).send({ error: "User not found" });
        }
        await UserModel.update(formData, {
            where: { ID_user: id }
        });
        const userAfterUpdate = await UserModel.findByPk(id);

        return res.send({ data: userAfterUpdate });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        handleHttpError(res, 'ERROR_UPDATE_USER');
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await User_ScheduleModel.destroy({
            where: { UserIDUser: id }
        });

        const user = await UserModel.destroy({
            where: { ID_user: id }
        });
        if (user === 1) {
            res.json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        handleHttpError(res, "ERROR_DELETE_USER");
    }
};

module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser,
    postUser: postUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};
