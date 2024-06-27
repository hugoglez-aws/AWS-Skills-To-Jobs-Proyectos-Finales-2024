const fs = require("fs");
const StorageModel = require("../models/storageModel");
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require("express-validator");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

const getItems = async (req, res) => {
    try {
        const data = await StorageModel.findAll({});
        res.send({ data });
    } catch (e) {
        handleHttpError(res, e);
    }
}

const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await StorageModel.findByPk(id);
        res.send({ data });
    } catch (e) {
        console.log(e)
        handleHttpError(res, e);
    }
}

const createItem = async (req, res) => {
    try {
        const { file } = req;
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await StorageModel.create(fileData);
        res.send(data);

    } catch (e) {
        console.log(e)
        handleHttpError(res, e);
    }
}


const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const dataFile = await StorageModel.findByPk(id);
        if (!dataFile) {
            return res.status(404).json({ error: "No se encontró el archivo" });
        }
        await StorageModel.destroy({
            where: { ID_storage: id }
        })
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`
        fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted: 1
        }
        res.send({ data });
    } catch (e) {
        console.log(e)
        handleHttpError(res, e);
    }
}

module.exports = {
    getItems: getItems,
    createItem: createItem,
    deleteItem: deleteItem,
    getItem: getItem
}