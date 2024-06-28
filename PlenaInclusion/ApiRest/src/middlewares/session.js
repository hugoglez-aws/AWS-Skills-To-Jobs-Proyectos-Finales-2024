const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const UserModel = require('../models/userModel');

// Middleware para comprobar si la peitción posee un token de sesion
// valido.
const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT-TOKEN", 401);
            return;
        }
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if (!dataToken.ID_user) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401);
            return;
        }

        const user = await UserModel.findByPk(dataToken.ID_user);
        req.user = user

        next();

    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401);
        return;
    }
}

module.exports = { authMiddleware };

