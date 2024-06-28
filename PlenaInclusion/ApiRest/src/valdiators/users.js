const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

// Middleware validador de los datos recibidos al servidor.
const validatorCreateUser = [
    check("DNI").exists().notEmpty().isString(),
    check("Rol").exists().notEmpty().isIn(['Nominal', 'Monitor', 'Administrador']),
    check("Name").exists().notEmpty().isString().isLength({ min: 1, max: 99 }),
    check("Surname_1").exists().notEmpty().isString().isLength({ min: 1, max: 99 }),
    check("Surname_2").exists().notEmpty().isString().isLength({ min: 1, max: 99 }),
    check("Email").exists().notEmpty().isEmail(),
    check("Pass").exists().notEmpty().isString(),
    check("Photo").optional().isString(),
    check("DNI_tutor").optional().custom((value, { req }) => {
        if (value !== null) {
            // Si el valor no es null, debe ser una cadena de hasta 10 caracteres
            return typeof value === 'string' && value.length <= 10;
        }
        // Si es null, la validación pasa
        return true;
    }).withMessage('DNI_tutor debe ser una cadena de hasta 10 caracteres si se proporciona'),
    check("Adress").exists().notEmpty().isString(),
    check("Phone").exists().notEmpty().isString(),
    check("BirthDay").optional().notEmpty().isDate(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Metodo el cual se encarga de comprobar que el parametro enviado es un UUID
const validatorGetUser = [
    check("id").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateUser, validatorGetUser };
