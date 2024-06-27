const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateCampaign = [
    check("Name").exists().notEmpty().isString(),
    check("Description").exists().notEmpty().isString(),
    check("StartDate").exists().notEmpty().isDate(),
    check("FinishDate").exists().notEmpty().isDate()
        .custom((value, { req }) => {
            const startDate = new Date(req.body.StartDate);
            const finishDate = new Date(value);
            return finishDate >= startDate;
        }).withMessage("La fecha de finalización debe ser posterior o igual a la fecha de inicio"),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetCampaing = [
    check("id").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateCampaign, validatorGetCampaing };
