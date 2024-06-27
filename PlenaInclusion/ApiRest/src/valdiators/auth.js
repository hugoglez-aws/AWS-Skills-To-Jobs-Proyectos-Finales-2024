const { check, body } = require("express-validator");
const validateResults = require("../utils/handleValidator");


const validatorRegister = [
    // Validación de campos de texto
    body("DNI").notEmpty().isString(),
    body("Rol").notEmpty().isIn(['Nominal', 'Monitor', 'Administrador']),
    body("Name").notEmpty().isString().isLength({ min: 3, max: 99 }),
    body("Surname_1").notEmpty().isString().isLength({ min: 3, max: 99 }),
    body("Surname_2").notEmpty().isString().isLength({ min: 3, max: 99 }),
    body("Email").notEmpty().isEmail(),
    //body("Pass").notEmpty().isString().isLength({ min: 3, max: 99 }),
    body("DNI_tutor").optional().isString().isLength({ max: 10 })
        .withMessage('DNI_tutor debe ser una cadena de hasta 10 caracteres si se proporciona'),
    body("Adress").notEmpty().isString(),
    body("Phone").notEmpty().isString(),
    body("BirthDay").optional().isDate(),

    // Validación del campo de foto
    (req, res, next) => {
        // Si hay un archivo en la solicitud, no se requiere validar el campo 'Photo'
        if (req.file) {
            next();
        } else {
            // Si no hay archivo, validamos el campo 'Photo' opcional
            body("Photo").optional().notEmpty().isString();
            next();
        }
    },

    // Ejecutar la validación
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorLogin = [
    check('Email').notEmpty().isEmail().withMessage('Debe ser un correo electrónico válido'),
    check('Pass').exists().notEmpty().isString().isLength({ min: 3, max: 99 }).withMessage('La contraseña debe tener entre 3 y 99 caracteres'),
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

module.exports = { validatorRegister, validatorLogin };
