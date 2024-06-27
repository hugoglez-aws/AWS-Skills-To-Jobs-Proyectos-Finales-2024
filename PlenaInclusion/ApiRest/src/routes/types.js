const express = require("express");
const router = express.Router();
const { getAllTypes, postType, getType, deleteType, updateType } = require("../controllers/typeController");
const { validatorCreateType, validatorGetType } = require("../valdiators/types");
const { authMiddleware } = require("../middlewares/session")


router.get("/", authMiddleware, getAllTypes);

router.get("/:id", authMiddleware, validatorGetType, getType);

router.post("/", authMiddleware, validatorCreateType, postType);

router.put("/:id", authMiddleware, validatorGetType, validatorCreateType, updateType);

router.delete("/:id", authMiddleware, deleteType);

module.exports = router;