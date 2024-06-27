const express = require("express");
const router = express.Router();
const { getAllUsers, getUser, postUser, updateUser, deleteUser } = require("../controllers/userController");
const { validatorCreateUser, validatorGetUser } = require("../valdiators/users")
const { authMiddleware } = require("../middlewares/session");
const uploadMiddleware = require("../utils/handleStorage");
const { checkRol } = require("../middlewares/rol");

// Ruta para listar todos los usuarios
router.get("/", authMiddleware, checkRol(['Nominal', 'Monitor', 'Administrador']), getAllUsers);

// Ruta para recoger un usuario mediante su id
router.get("/:id", authMiddleware, checkRol(['Nominal', 'Monitor', 'Administrador']), validatorGetUser, getUser);

// Ruta para crear un usuario
router.post("/", authMiddleware, checkRol(['Monitor', 'Administrador']), validatorCreateUser, postUser);

// Ruta para modificar un usuario
router.put("/:id", authMiddleware, checkRol(['Nominal', 'Monitor', 'Administrador']), uploadMiddleware.single("Photo"), updateUser);

// Ruta para eliminar un usuario.
router.delete("/:id", authMiddleware, checkRol(['Monitor', 'Administrador']), validatorGetUser, deleteUser);

module.exports = router;
