const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateType = [
    check("Name").exists().notEmpty().isString(),
    check("Description").exists().notEmpty().isString(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetType = [
    check("id").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateType, validatorGetType };
