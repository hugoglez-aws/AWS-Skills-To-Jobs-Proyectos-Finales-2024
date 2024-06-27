const { validationResult } = require("express-validator");

/**
 * Metodo que valida la entrada de datos por parte del cliente.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        res.status(403);
        res.send({ errors: err.array() });
    }
};

module.exports = validateResults;
