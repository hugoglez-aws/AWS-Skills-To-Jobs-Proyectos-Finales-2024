const { handleHttpError } = require("../utils/handleError")

/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (rol) => (req, res, next) => {
    try {
        const { user } = req;
        const rolesByUser = user.Rol;

        const checkValueRol = rol.some((rolSingle) => rolesByUser.includes(rolSingle))
        console.log(checkValueRol)

        if (!checkValueRol) {
            handleHttpError(res, "USER_NOT_PERMISION", 403)
            return;
        }
        next();

    } catch (error) {
        handleHttpError(res, "ERROR_PERMISION", 403)
    }
}

module.exports = { checkRol }