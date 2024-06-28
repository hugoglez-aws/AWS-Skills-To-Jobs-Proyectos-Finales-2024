/**
 * Metodo el cual maneja los errores de la aplicacion de manera eficiente.
 * @param {*} res 
 * @param {*} message 
 * @param {*} code 
 */
const handleHttpError = (res, message = "API_ERROR", code = 403) => {
    res.status(code)
    res.send({ error: message })
}

module.exports = { handleHttpError }