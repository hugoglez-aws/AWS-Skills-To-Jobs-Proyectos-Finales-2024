const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateActivity = [
    check("Name").exists().notEmpty().isString(),
    check("Description").exists().notEmpty().isString(),
    check("Photo").optional().isString(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetActivity = [
    check("id").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateActivity, validatorGetActivity };
