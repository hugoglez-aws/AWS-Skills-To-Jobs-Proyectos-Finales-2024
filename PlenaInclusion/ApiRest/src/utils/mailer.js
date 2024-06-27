require('dotenv').config();
const nodemailer = require("nodemailer");

const sendMail = async ({ from, to, subject, text, html }) => {
    try {
        console.log(to)
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: html
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Correo Enviado: " + info.response);
    } catch (error) {
        console.error("Error enviando correo: ", error);
    }
};

module.exports = sendMail;
