const bcryptjs = require("bcryptjs");
/**
 * Metodo que encripta la contrasña recibida como parametro
 * utilizando la biblioteca bcrypt.
 * @param {*} passwordPlain 
 * @returns 
 */
const encrypt = async(passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash;
}
/**
 * Metodo que verifica la contraseña en texto plano y la contraseña
 * encriptada, mediante el metodo compare de la biblioteca bcrypt
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async(passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword);
}

module.exports = {encrypt, compare}

