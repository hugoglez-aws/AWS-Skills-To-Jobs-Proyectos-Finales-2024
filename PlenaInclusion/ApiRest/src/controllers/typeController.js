const TypeModel = require("../models/typeModel");
const { matchedData } = require("express-validator");
const { handleHttpError } = require('../utils/handleError');
const ScheduleModel = require("../models/scheduleModel");

const getAllTypes = async (req, res) => {
    try {
        const types = await TypeModel.findAll();
        res.json(types);
    } catch (error) {
        handleHttpError(res, 'Error al obtener todos los tipos')
    }
}

const getType = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const type = await TypeModel.findByPk(id);
        res.json(type);
    } catch (error) {
        console.error('Error al obtener todos los tipos:', error);
        handleHttpError(res, "ERROR_GET_type")
    }
}

const postType = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await TypeModel.create(body);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, 'ERROR_POST_TYPE')
    }
}

const updateType = async (req, res) => {
    try {
        const { id } = req.params;
        const body = matchedData(req, { onlyValidData: true });
        const typeBeforeUpdate = await TypeModel.findByPk(id);
        if (!typeBeforeUpdate) {
            return res.status(404).send({ error: "type not found" });
        }
        await TypeModel.update(body, {
            where: { ID_type: id }
        });
        const typeAfterUpdate = await TypeModel.findByPk(id);
        return res.send({ data: typeAfterUpdate });
    } catch (error) {
        console.error('Error al actualizar el tipo:', error);
        handleHttpError(res, 'ERROR_UPDATE_TYPE');
    }
};

const deleteType = async (req, res) => {
    try {
        const { id } = req.params;
        const typeExist = await ScheduleModel.findOne({
            where: { ID_type: id }
        });
        if (typeExist) {
            return res.status(404).json({ error: "TYPE_IN_SCHEDULE" });
        }
        const type = await TypeModel.destroy({
            where: { ID_type: id }
        });
        if (type === 1) {
            res.json({ message: "type deleted successfully" });
        } else {
            res.status(404).json({ error: "type not found" });
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        handleHttpError(res, "ERROR_DELETE_type");
    }
};

module.exports = {
    getAllTypes: getAllTypes,
    getType: getType,
    postType: postType,
    updateType: updateType,
    deleteType: deleteType
};