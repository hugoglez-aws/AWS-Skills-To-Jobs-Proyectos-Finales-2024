const multer = require("multer");
require("dotenv").config();
const StorageModel = require("../models/storageModel");

/**
 * Gestión del middleware de multer
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Donde guardar los archivos
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage);
    },
    filename: async function (req, file, cb) {
        // Se reemplaza si tiene el mismo nombre
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        const fileData = {
            filename: filename,
            url: `http://localhost:3000/${filename}`
        };
        await StorageModel.create(fileData);
        cb(null, filename);
    }
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
