const express = require("express");
const router = express.Router();
const { getAllActivities, postActivity, getActivity, deleteActivity, updateActivity } = require("../controllers/activityController");
const { validatorGetActivity } = require("../valdiators/activities");
const { authMiddleware } = require("../middlewares/session");
const { checkRol } = require("../middlewares/rol");
const uploadMiddleware = require("../utils/handleStorage");

router.get("/", authMiddleware, getAllActivities);

router.get("/:id", authMiddleware, validatorGetActivity, getActivity);

router.post("/", authMiddleware, checkRol(["Monitor", "Administrador"]), uploadMiddleware.single("Photo"), postActivity);

router.put("/:id", authMiddleware, uploadMiddleware.single("Photo"), updateActivity);

router.delete("/:id", authMiddleware, validatorGetActivity, deleteActivity);

module.exports = router;