const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const UserModel = require('../models/userModel');

/**
 * Este conrolador es el encargado de registrar al usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerController = async (req, res) => {
    try {
        const formData = req.body;

        const file = req.file;

        if (file) {
            formData.Photo = file.filename;
        }

        const Pass = await encrypt(formData.Pass);

        const userData = {
            DNI: formData.DNI,
            Rol: formData.Rol,
            Name: formData.Name,
            Surname_1: formData.Surname_1,
            Surname_2: formData.Surname_2,
            Email: formData.Email,
            Pass: Pass,
            Photo: `${process.env.PUBLIC_URL}/${formData.Photo}`,
            DNI_tutor: formData.DNI_tutor,
            Adress: formData.Adress,
            Phone: formData.Phone,
            BirthDay: formData.BirthDay
        };

        const newUser = await UserModel.create(userData);

        newUser.set('Pass', undefined, { strict: false });

        const token = await tokenSign(newUser);

        res.status(201).json({ token, user: newUser });
    } catch (error) {
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
};

/**
 * Es el encargado de loggear una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginController = async (req, res) => {
    try {
        const formData = req.body;
        if (!formData.Email || !formData.Pass) {
            handleHttpError(res, "VALIDATION_ERROR", 400);
            return;
        }

        const user = await UserModel.findOne({ where: { Email: formData.Email } });

        if (!user) {
            handleHttpError(res, "USER_NOT_FOUND", 404);
            return;
        }

        const hashPassword = user.Pass;
        const check = await compare(formData.Pass, hashPassword);

        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401);
            return;
        }

        user.set('Pass', undefined, { strict: false });
        const data = {
            token: await tokenSign(user),
            user
        };
        res.send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_LOGGIN_USER");
    }
};

/**
 * Método que gestiona el registro mediante Google
 * @param {} req 
 * @param {*} res 
 * @returns 
 */
const loginFromGoogle = async (req, res) => {
    try {
        const body = req.body;
        // Revisar aqui los datos del body
        console.log(body);

        const data = await UserModel.findOne({
            where: { Email: body.Email }
        });

        if (data) {
            const returningData = {
                token: await tokenSign(data),
                user: data
            };
            return res.send(returningData);
        }

        const newUser = await UserModel.create(body);
        console.log(newUser)

        const token = await tokenSign(newUser);
        console.log(token)

        return res.status(201).json({ token, user: newUser.dataValues });

    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_LOGGING_USER");
    }
};

module.exports = { loginController, registerController, loginFromGoogle }