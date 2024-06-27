const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateSchedule = [
    check("ID_Activity").exists().notEmpty().isUUID(),
    check("ID_Type").exists().notEmpty().isUUID(),
    check("Address").exists().notEmpty().isString(),
    check("DayOfWeek").exists().notEmpty().isString(),
    check("StartHour").exists().notEmpty().isString().custom((value) => {
        return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
    }).withMessage("El formato de la hora de inicio debe ser HH:MM, estar en el rango de 00:00 a 23:59 y no ser negativa"),
    check("FinishHour").exists().notEmpty().isString().custom((value) => {
        return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
    }).withMessage("El formato de la hora de finalización debe ser HH:MM, estar en el rango de 00:00 a 23:59 y no ser negativa"),
    check("Frequency").exists().notEmpty().isString().isIn(['Semanal', 'Puntual']),
    check("StartDate").exists().notEmpty().isDate(),
    check("FinishDate").exists().notEmpty().isDate()
        .custom((value, { req }) => {
            const startDate = new Date(req.body.StartDate);
            const finishDate = new Date(value);
            return finishDate >= startDate;
        }).withMessage("La fecha de finalización debe ser posterior o igual a la fecha de inicio"),
    check('Capacity').optional({ checkFalsy: true }).isNumeric().withMessage('Capacity must be a numeric value if provided'),
    check('Attendance').optional({ checkFalsy: true }).isNumeric().withMessage('Attendance must be a numeric value if provided'),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetSchedule = [
    check("id").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateSchedule, validatorGetSchedule };
