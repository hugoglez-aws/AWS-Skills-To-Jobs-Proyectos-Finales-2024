const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");


const validatorGetItem = [
    check("id").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorGetItem };
