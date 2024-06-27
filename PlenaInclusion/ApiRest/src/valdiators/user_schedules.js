const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateUserSchedule = [
    check("ScheduleIDSchedule").exists().notEmpty().isUUID(),
    check("UserIDUser").exists().notEmpty().isUUID(),
    check("AttendanceDate").exists().notEmpty().isDate(),
    check("Comment").optional().isString(),
    check("Rating").optional().isInt({ min: 0, max: 10 })
        .withMessage("La calificación debe ser un número entero entre 0 y 5"),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetUserId = [
    check("userId").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetScheduleId = [
    check("scheduleId").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetId = [
    check("id").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateUserSchedule, validatorGetUserId, validatorGetScheduleId, validatorGetId };
